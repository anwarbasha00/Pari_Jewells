"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  order: any;
}

export default function OrderHeader({
  order,
}: Props) {
  return (
    <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <Link
        href="/my-orders"
        className="mb-6 inline-flex items-center gap-2 text-[#E02C69] hover:underline"
      >
        <ArrowLeft size={18} />
        Back to My Orders
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#3D2430]">
            Order #{order._id.slice(-6).toUpperCase()}
          </h1>

          <p className="mt-2 text-gray-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>

        </div>

        <div className="flex gap-3">

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-700"
                : order.status === "Processing"
                ? "bg-purple-100 text-purple-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              order.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {order.paymentStatus}
          </span>

        </div>

      </div>

    </div>
  );
}