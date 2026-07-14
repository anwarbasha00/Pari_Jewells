import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/connectdb";
import Product from "@/src/models/product.model";
import { cloudinary } from "@/src/lib/cloudinary";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Delete image from Cloudinary
    if (product.images?.public_id) {
      await cloudinary.uploader.destroy(
        product.images.public_id
      );
    }

    // Delete product from MongoDB
    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Product deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}