import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth";

import authOptions from "@/src/lib/auth";
import { connectDB } from "@/src/lib/connectdb";

import Cart from "@/src/models/cart.model";
import Order from "@/src/models/orders.model";
import Product from "@/src/models/product.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
      isBuyNow,
      buyNowItem,
    } = await req.json();

    // Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    // Prevent Duplicate Orders
    const existingOrder = await Order.findOne({
      razorpayPaymentId: razorpay_payment_id,
    });

    if (existingOrder) {
      return NextResponse.json(
        {
          success: true,
          message: "Order already exists.",
          order: existingOrder,
        },
        {
          status: 200,
        }
      );
    }

    let orderItems: any[] = [];
    let cart: any = null;

    // =========================
    // BUY NOW FLOW
    // =========================

    if (isBuyNow) {
      const product = await Product.findById(
        buyNowItem.productId
      );

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: "Product not found.",
          },
          {
            status: 404,
          }
        );
      }

      // Final Stock Validation
      if (product.stock < buyNowItem.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} has only ${product.stock} item(s) left.`,
          },
          {
            status: 400,
          }
        );
      }

      orderItems = [
        {
          productId: product._id.toString(),
          name: product.name,
          slug: product.slug,
          image: product.images?.[0]?.url || "",
          price: product.price,
          quantity: buyNowItem.quantity,
        },
      ];
    }

    // =========================
    // CART FLOW
    // =========================

    else {
      cart = await Cart.findOne({
        user: session.user.id,
      }).populate(
        "items.product",
        "name slug price images stock"
      );

      if (!cart || cart.items.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Cart is empty.",
          },
          {
            status: 400,
          }
        );
      }

      orderItems = cart.items.map((item: any) => ({
        productId: item.product._id.toString(),
        name: item.product.name,
        slug: item.product.slug,
        image:
          item.product.images?.[0]?.url || "",
        price: item.product.price,
        quantity: item.quantity,
      }));

      // Final Stock Validation
      for (const item of cart.items) {
        const product = await Product.findById(
          item.product._id
        );

        if (!product) {
          return NextResponse.json(
            {
              success: false,
              message: "Product not found.",
            },
            {
              status: 404,
            }
          );
        }

        if (product.stock < item.quantity) {
          return NextResponse.json(
            {
              success: false,
              message: `${product.name} has only ${product.stock} item(s) left.`,
            },
            {
              status: 400,
            }
          );
        }
      }
    }

    // =========================
    // CALCULATE TOTALS
    // =========================

    const subtotal = orderItems.reduce(
      (total: number, item: any) =>
        total + item.price * item.quantity,
      0
    );

    const deliveryCharge = 0;
    const total = subtotal + deliveryCharge;

    // =========================
    // CREATE ORDER
    // =========================

    const order = await Order.create({
      user: session.user.id,

      items: orderItems,

      shippingAddress,

      paymentMethod: "Online",

      paymentStatus: "Paid",

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId:
        razorpay_payment_id,

      razorpaySignature:
        razorpay_signature,

      subtotal,

      deliveryCharge,

      total,

      status: "Pending",
    });

    // =========================
    // REDUCE STOCK
    // =========================

    if (isBuyNow) {
      const product = await Product.findById(
        buyNowItem.productId
      );

      if (product) {
        product.stock -= buyNowItem.quantity;
        product.inStock = product.stock > 0;

        await product.save();
      }
    } else {
      for (const item of cart.items) {
        const product = await Product.findById(
          item.product._id
        );

        if (!product) continue;

        product.stock -= item.quantity;
        product.inStock = product.stock > 0;

        await product.save();
      }

      // Clear Cart
      cart.items = [];
      await cart.save();
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Payment verified successfully.",
        order,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}