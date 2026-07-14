"use client";

import Image from "next/image";
import Link from "next/link";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({
  order,
}: OrderCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Top */}

      <div className="flex flex-col gap-5 border-b border-gray-100 pb-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-xl font-bold text-[#3D2430]">
            Order #{order._id.slice(-6).toUpperCase()}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Placed on{" "}
            {new Date(
              order.createdAt
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

        </div>

        <div className="flex gap-3">

          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>

          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              order.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {order.paymentStatus}
          </span>

        </div>

      </div>

      {/* Products */}

      <div className="divide-y divide-gray-100">

        {order.items.slice(0, 2).map((item: any) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 py-5"
          >

            <div className="relative h-20 w-20 overflow-hidden rounded-xl border bg-[#FFF7F7]">

              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />

            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-[#3D2430]">
                {item.name}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Qty × {item.quantity}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-[#3D2430]">
                ₹
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </p>

            </div>

          </div>
        ))}

        {order.items.length > 2 && (
          <p className="pt-4 text-sm font-medium text-[#E02C69]">
            +{order.items.length - 2} more item(s)
          </p>
        )}

      </div>

      {/* Bottom */}

      <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Total Amount
          </p>

          <h3 className="mt-1 text-2xl font-bold text-[#3D2430]">
            ₹{order.total.toLocaleString()}
          </h3>

        </div>

        <Link
          href={`/my-orders/${order._id}`}
          className="rounded-xl bg-[#E02C69] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#C91F5B]"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}