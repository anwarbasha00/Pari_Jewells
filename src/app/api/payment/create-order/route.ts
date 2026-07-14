import { NextResponse } from "next/server";
import razorpay from "@/src/lib/razorpay";
import Product from "@/src/models/product.model";
import Cart from "@/src/models/cart.model";
import { getServerSession } from "next-auth";
import authOptions from "@/src/lib/auth";
import { connectDB } from "@/src/lib/connectdb";
export async function POST(req: Request) {
  try {
const { amount, isBuyNow } = await req.json();    
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

  connectDB();
  
    const options = {
      amount: amount * 100, // Convert ₹ to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    if (!isBuyNow) {
  const cart = await Cart.findOne({
    user: session.user.id,
    
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Cart is empty.",
      },
      { status: 400 }
    );
  }

  for (const item of cart.items as any[]) {
    const product = await Product.findById(item.product._id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    if (product.stock < item.quantity) {
      return NextResponse.json(
        {
          success: false,
          message: `Only ${product.stock} item(s) available for ${product.name}.`,
        },
        { status: 400 }
      );
    }
  }
}
    const order = await razorpay.orders.create(options);
    
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Razorpay Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create Razorpay order",
      },
      { status: 500 }
    );
  }
}