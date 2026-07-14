"use client";

import Link from "next/link";
import { useCartStore } from "@/src/store/cartStore";

export default function CartSummary() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const delivery = 0;

  const total = subtotal + delivery;

  return (
    <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-semibold text-[#3D2430]">
        Order Summary
      </h2>

      <div className="mt-8 space-y-5">

        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Items ({totalItems})
          </span>

          <span className="font-medium">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Delivery
          </span>

          <span className="font-medium text-green-600">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex items-center justify-between text-lg font-semibold">

          <span>Total</span>

          <span className="text-[#3D2430]">
            ₹{total.toLocaleString()}
          </span>

        </div>

      </div>

      <Link
        href="/checkout"
        className="mt-8 flex w-full items-center justify-center rounded-xl bg-[#E02C69] px-6 py-4 font-semibold text-white transition hover:bg-[#C91F5B]"
      >
        Proceed to Checkout
      </Link>

    </div>
  );
}