import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import authOptions from "@/src/lib/auth";
import { connectDB } from "@/src/lib/connectdb";

import Order from "@/src/models/orders.model";

export async function GET() {
  try {
    await connectDB();

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

    const orders = await Order.find({
      user: session.user.id,
    })
      .sort({
        createdAt: -1,
      })
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
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}