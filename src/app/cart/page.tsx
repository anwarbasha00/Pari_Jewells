"use client";

import Link from "next/link";

import { useCartStore } from "@/src/store/cartStore";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAFAFA]">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <EmptyCart />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA]">

        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">

          {/* Header */}

          <div className="mb-12 flex flex-col gap-5 border-b border-gray-200 pb-8 md:flex-row md:items-center md:justify-between">

            <div>

              <h1 className="text-4xl font-bold tracking-tight text-[#3D2430]">
                Shopping Cart
              </h1>

              <p className="mt-3 text-gray-500">
                {items.length} Item{items.length > 1 ? "s" : ""} in your cart
              </p>

            </div>

            <Link
              href="/products"
              className="font-medium text-[#E02C69] transition hover:text-[#C91F5B]"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* Content */}

          <div className="grid gap-10 xl:grid-cols-[2fr_380px]">

            {/* Cart Items */}

            <div className="space-y-6">

              {items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                />
              ))}

            </div>

            {/* Summary */}

            <div className="h-fit">
              <CartSummary />
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}