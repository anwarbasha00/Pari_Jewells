import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import ProductDetailsSkeleton from "../../components/skeleton/ProductDetailsSkeleton";

export default function Loading() {
  return (
    <>
      <Navbar />

      <ProductDetailsSkeleton />

      <Footer />
    </>
  );
}