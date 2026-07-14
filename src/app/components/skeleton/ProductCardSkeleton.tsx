import Skeleton from "./Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#F5D9E0] bg-white shadow-sm">

      {/* Image */}

      <Skeleton className="h-72 w-full rounded-none" />

      <div className="space-y-4 p-5">

        <Skeleton className="h-4 w-20" />

        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="h-6 w-24" />

        <Skeleton className="mt-6 h-11 w-full rounded-xl" />

      </div>

    </div>
  );
}