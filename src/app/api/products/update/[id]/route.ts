import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/connectdb";
import Product from "@/src/models/product.model";
import uploadCloudinary, {
  cloudinary,
} from "@/src/lib/cloudinary";
import slugify from "slugify";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const originalPrice = Number(
      formData.get("originalPrice")
    );
    const discount = Number(formData.get("discount"));
    const stock = Number(formData.get("stock"));
    console.log("Received stock:", stock);
    const category = formData.get("category") as string;

    const keywords = (formData.get("keywords") as string)
      .split(",")
      .map((k) => k.trim());

    const featured =
      formData.get("featured") === "true";

    const bestSeller =
      formData.get("bestseller") === "true";

    const newArrival =
      formData.get("newArrival") === "true";

    const image = formData.get("image") as File | null;

    const product = await Product.findById(id);

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

    // Upload new image if selected
    if (image && image.size > 0) {
      if (
        product.images &&
        product.images.length > 0
      ) {
        await cloudinary.uploader.destroy(
          product.images[0].public_id
        );
      }

      const uploadedImage =
        await uploadCloudinary(image);

      product.images = [
        {
          public_id: uploadedImage.public_id,
          url: uploadedImage.url,
        },
      ];
    }

    product.name = name;
    product.slug = slugify(name, {
      lower: true,
      strict: true,
    });

    product.description = description;
    product.price = price;
    product.originalPrice = originalPrice;
    product.discount = discount;
    product.stock = stock;
    product.inStock = stock > 0;

    product.category = category;
    product.keywords = keywords;

    product.featured = featured;
    product.bestSeller = bestSeller;
    product.newArrival = newArrival;

    console.log("Before Save:", product.stock);
    
    await product.save();

    console.log("After Save:", product.stock);

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully.",
        product,
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
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}