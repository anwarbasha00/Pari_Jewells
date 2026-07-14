import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Skeleton from "../components/skeleton/Skeleton";
import OrderCardSkeleton from "../components/skeleton/OrderCardSkeleton";

export default function Loading() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA]">

        <div className="mx-auto max-w-7xl px-4 py-12">

          {/* Heading */}

          <Skeleton className="h-10 w-56" />

          <Skeleton className="mt-4 h-5 w-72" />

          {/* Orders */}

          <div className="mt-10 space-y-6">

            {Array.from({ length: 4 }).map((_, index) => (
              <OrderCardSkeleton key={index} />
            ))}

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}