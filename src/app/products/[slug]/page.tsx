import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/src/lib/products";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";
import ShippingInfo from "../../components/product/ShippingInfo";
import RelatedProducts from "../../components/product/RelatedProducts";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.slug
  );

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10">

        {/* Product */}

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          <ProductInfo
            product={product}
          />

        </div>

        {/* Shipping */}

        <ShippingInfo />

        {/* Related Products */}

        <RelatedProducts
        
          products={relatedProducts}
        />

      </main>

      <Footer />
    </>
  );
}