import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { connectDB } from "@/src/lib/connectdb";
import authOptions from "@/src/lib/auth";

import Order from "@/src/models/orders.model";
import Product from "@/src/models/product.model";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    // Verify ownership

    if (order.user.toString() !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    // Allow cancellation only before shipping

    if (
      !["Pending", "Confirmed"].includes(order.status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This order can no longer be cancelled.",
        },
        { status: 400 }
      );
    }

    // Restore stock

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            stock: item.quantity,
          },
        }
      );
    }

    order.status = "Cancelled";
    order.cancelledAt = new Date();
    order.cancelReason = "Customer Requested";

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order cancelled successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}