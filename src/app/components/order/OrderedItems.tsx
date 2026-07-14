"use client";

import Image from "next/image";

interface Props {
  items: any[];
}

export default function OrderedItems({
  items,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-[#3D2430]">
        Items Ordered
      </h2>

      <div className="space-y-5">

        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-5 rounded-2xl border border-gray-100 p-4"
          >

            <div className="relative h-20 w-20 overflow-hidden rounded-xl">

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

            <p className="font-bold text-[#3D2430]">
              ₹
              {(
                item.price * item.quantity
              ).toLocaleString()}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}