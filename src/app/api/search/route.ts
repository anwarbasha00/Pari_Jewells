import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/src/lib/products";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("q");

    if (!search) {
      return NextResponse.json([]);
    }

    const products = await getProducts({
      search,
      limit: 6,
    });

    return NextResponse.json(products);
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