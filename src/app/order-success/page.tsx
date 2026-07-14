"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

import { useCartStore } from "@/src/store/cartStore";
import { useBuyNowStore } from "@/src/store/buyNowStore";

export default function OrderSuccessPage() {
  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const clearBuyNowItem = useBuyNowStore(
    (state) => state.clearItem
  );

  useEffect(() => {
    clearCart();
    clearBuyNowItem();
  }, [clearCart, clearBuyNowItem]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">

        <CircleCheckBig
          size={80}
          className="mx-auto text-green-600"
        />

        <h1 className="mt-6 text-3xl font-bold text-[#3D2430]">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          Thank you for shopping with Pari Jewels.
          Your order has been received and will be processed soon.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-flex rounded-xl bg-[#E02C69] px-8 py-3 font-semibold text-white transition hover:bg-[#C91F5B]"
        >
          Continue Shopping
        </Link>

      </div>
    </main>
  );
}