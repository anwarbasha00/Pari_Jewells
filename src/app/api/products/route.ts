import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/connectdb";
import Product from "@/src/models/product.model";
import uploadCloudinary from "@/src/lib/cloudinary";
import { url } from "inspector";
import slugify from "slugify";
export async function POST(request: NextRequest) {//add to data base...
  try {
    await connectDB();

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const price = Number(formData.get("price"));
    const originalPrice = Number(formData.get("originalPrice"));
    const discount = Number(formData.get("discount"));

    const category = formData.get("category") as string;

    const keywords =
      (formData.get("keywords") as string)
        ?.split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean) || [];

    const featured = formData.get("featured") === "true";
    const bestseller = formData.get("bestseller") === "true";
    const newArrival = formData.get("newArrival") === "true";
    const inStock = formData.get("inStock") === "true";
    const stock = formData.get("stock") === "true";

    const image = formData.get("image") as File;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !image
    ) {
      return NextResponse.json(
        {
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }
    const slug = slugify(name, {
  lower: true,
  strict: true,
});

    const uploadedImage = await uploadCloudinary(image);
    const product = await Product.create({
      name,
      description,
      slug,
      price,
      originalPrice,
      discount,

      category,

      keywords,

      images: [
        {
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        },
      ],

      featured,
      bestseller,
      newArrival,
      inStock,
      stock
    });

    return NextResponse.json(
      {
        message: "Product created successfully.",
        product,
      },
      {
        status: 201,
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
