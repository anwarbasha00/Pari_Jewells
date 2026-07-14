import Skeleton from "./Skeleton";

export default function OrderCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#F5D9E0] bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <Skeleton className="h-6 w-40" />

          <Skeleton className="mt-3 h-4 w-56" />

        </div>

        <Skeleton className="h-8 w-28 rounded-full" />

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-[#F5D9E0]" />

      {/* Bottom */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div className="space-y-3">

          <Skeleton className="h-4 w-44" />

          <Skeleton className="h-4 w-36" />

        </div>

        <Skeleton className="h-11 w-32 rounded-xl" />

      </div>

    </div>
  );
}