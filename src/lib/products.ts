import Product from "../models/product.model";
import { connectDB } from "./connectdb";

interface GetProductsOptions {
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
}

export async function getProducts({
  featured,
  bestSeller,
  newArrival,
  category,
  search,
  limit,
  page = 1,
}: GetProductsOptions = {}) {
  await connectDB();

  const query: Record<string, any> = {};

  // Featured
  if (featured !== undefined) {
    query.featured = featured;
  }

  // Best Seller
  if (bestSeller !== undefined) {
    query.bestSeller = bestSeller;
  }

  // Category
  if (category) {
    query.category = category;
  }

  // Search
  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        keywords: {
          $in: [new RegExp(search, "i")],
        },
      },
    ];
  }

  // Debug Logs

  let productsQuery = Product.find(query);

  // New Arrivals
  if (newArrival) {
    productsQuery = productsQuery.sort({
      createdAt: -1,
    });
  }

  // Pagination
  if (limit) {
    productsQuery = productsQuery
      .skip((page - 1) * limit)
      .limit(limit);
  }

  const products = await productsQuery.lean();


  return products;
}

export async function getProductBySlug(slug: string) {
  await connectDB();

 const product = await Product.findOne({ slug }).lean();

return JSON.parse(JSON.stringify(product));
}

export async function getRelatedProducts(
  category: string,
  currentSlug: string,
  limit = 4
) {
  await connectDB();

  return await Product.find({
    category,
    slug: { $ne: currentSlug },
    inStock: true,
  })
    .limit(limit)
    .lean();
}