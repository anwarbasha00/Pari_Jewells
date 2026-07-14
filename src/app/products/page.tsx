import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductListing from "../components/layout/ProductListing";
import { getProducts } from "@/src/lib/products";

interface ProductsPageProps {
  searchParams: Promise<{
    filter?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { filter, category, search } = await searchParams;

  let products = [];

  // Category Filter
  if (category) {
    products = await getProducts({
      category,
    });
  }

  // Search
  else if (search) {
    products = await getProducts({
      search,
    });
  }

  // Special Filters
  else {
    switch (filter) {
      case "featured":
        products = await getProducts({
          featured: true,
        });
        break;

      case "bestseller":
        products = await getProducts({
          bestSeller: true,
        });
        break;

      case "new":
        products = await getProducts({
          newArrival: true,
        });
        break;

      default:
        products = await getProducts();
    }
  }

  const pageTitle = category
    ? category
    : search
    ? `Search: "${search}"`
    : filter === "featured"
    ? "Featured Collection"
    : filter === "bestseller"
    ? "Best Sellers"
    : filter === "new"
    ? "New Arrivals"
    : "Our Collection";

  return (
    <>
      <Navbar />

      <ProductListing
        title={pageTitle}
        products={products}
      />

      <Footer />
    </>
  );
}