import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import Skeleton from "../components/skeleton/Skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA]">

        <div className="mx-auto max-w-7xl px-4 py-14">

          {/* Heading */}

          <Skeleton className="h-10 w-64" />

          <Skeleton className="mt-4 h-5 w-80" />

          {/* Products */}

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}