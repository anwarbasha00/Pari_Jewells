import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/connectdb";
import Order from "@/src/models/orders.model";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/* ---------------- GET ONE ORDER ---------------- */

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
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

/* ---------------- UPDATE STATUS ---------------- */

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const { status } = body;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    order.status = status;

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order updated successfully.",
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order.",
      },
      {
        status: 500,
      }
    );
  }
}