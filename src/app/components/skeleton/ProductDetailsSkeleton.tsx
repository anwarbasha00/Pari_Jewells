import Skeleton from "./Skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">

      <div className="mx-auto max-w-7xl px-4 py-12">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <Skeleton className="h-[520px] w-full rounded-3xl" />

            <div className="mt-5 flex gap-3">

              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-24 w-24 rounded-xl"
                />
              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <Skeleton className="h-5 w-28" />

            <Skeleton className="mt-5 h-10 w-4/5" />

            <Skeleton className="mt-6 h-9 w-32" />

            <div className="mt-8 space-y-3">

              <Skeleton className="h-4 w-full" />

              <Skeleton className="h-4 w-11/12" />

              <Skeleton className="h-4 w-10/12" />

              <Skeleton className="h-4 w-9/12" />

            </div>

            <Skeleton className="mt-8 h-12 w-36 rounded-xl" />

            <Skeleton className="mt-6 h-14 w-full rounded-xl" />

            <Skeleton className="mt-4 h-14 w-full rounded-xl" />

          </div>

        </div>

        {/* Shipping */}

        <div className="mt-14 rounded-3xl border border-[#F5D9E0] bg-white p-8">

          <Skeleton className="h-7 w-48" />

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <Skeleton className="h-24 rounded-2xl" />

            <Skeleton className="h-24 rounded-2xl" />

            <Skeleton className="h-24 rounded-2xl" />

          </div>

        </div>

        {/* Related Products */}

        <div className="mt-16">

          <Skeleton className="h-10 w-56" />

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}