import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/src/lib/connectdb";
import Order from "@/src/models/orders.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
  items,
  shippingAddress,

  paymentMethod,

  paymentStatus,

  razorpayOrderId,

  razorpayPaymentId,

  razorpaySignature,
} = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          message: "Cart is empty",
        },
        {
          status: 400,
        }
      );
    }

    const subtotal = items.reduce(
      (
        total: number,
        item: any
      ) =>
        total +
        item.price * item.quantity,
      0
    );

    const deliveryCharge = 0;

    const total =
      subtotal + deliveryCharge;

    const order = await Order.create({
  items,
  shippingAddress,

  paymentMethod:
    paymentMethod || "Cash on Delivery",

  paymentStatus:
    paymentStatus || "Pending",

  razorpayOrderId,

  razorpayPaymentId,

  razorpaySignature,

  subtotal,

  deliveryCharge,

  total,

  status: "Pending",
});
    return NextResponse.json(
      {
        success: true,
        message:
          "Order placed successfully",
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}


export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        orders,
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
        message: "Failed to fetch orders.",
      },
      {
        status: 500,
      }
    );
  }
}