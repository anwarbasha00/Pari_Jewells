import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF3F7]">
        <ShoppingBag
          size={42}
          className="text-[#E02C69]"
        />
      </div>

      <h2 className="mt-8 text-3xl font-semibold text-[#3D2430]">
        Your Cart is Empty
      </h2>

      <p className="mt-3 max-w-md leading-7 text-gray-500">
        Looks like you haven't added any jewellery to your cart yet.
        Explore our latest collection and find something you'll love.
      </p>

      <Link
        href="/products"
        className="mt-10 rounded-xl bg-[#E02C69] px-8 py-3 font-medium text-white transition hover:bg-[#C91F5B]"
      >
        Continue Shopping
      </Link>

    </div>
  );
}