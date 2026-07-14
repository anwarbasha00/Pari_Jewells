"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  onPlaceOrder: () => void;
  loading: boolean;
}

export default function OrderSummary({
  items,
  onPlaceOrder,
  loading,
}: OrderSummaryProps) {
  const router = useRouter();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 0;

  const total = subtotal + deliveryCharge;

  return (
    <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-semibold text-[#3D2430]">
        Order Summary
      </h2>

      {/* Products */}

      <div className="max-h-[320px] space-y-5 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4"
          >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#FFF7F7]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h4 className="line-clamp-2 text-sm font-medium text-[#3D2430]">
                {item.name}
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <span className="font-semibold text-[#3D2430]">
              ₹{(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-gray-200" />

      {/* Pricing */}

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span>
            ₹{subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Delivery
          </span>

          <span className="font-medium text-green-600">
            FREE
          </span>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>

          <span className="text-[#3D2430]">
            ₹{total.toLocaleString()}
          </span>
        </div>

      </div>

      {/* Buttons */}

      <div className="mt-8 space-y-3">

        <button
          onClick={onPlaceOrder}
          disabled={loading || items.length === 0}
          className="w-full rounded-xl bg-[#E02C69] py-4 font-semibold text-white transition hover:bg-[#C91F5B] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/products")}
          className="w-full rounded-xl border border-[#E02C69] bg-white py-4 font-semibold text-[#E02C69] transition hover:bg-[#FFF5F8]"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}