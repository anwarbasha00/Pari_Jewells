"use client";

import Image from "next/image";
import axios from "axios";
import { Trash2 } from "lucide-react";

import { CartItem as CartItemType } from "@/src/types/cart";
import { useCartStore } from "@/src/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({
  item,
}: CartItemProps) {
  const setCart = useCartStore((state) => state.setCart);

  // Increase Quantity
  const handleIncrease = async () => {
    try {
      const res = await axios.patch("/api/cart", {
  productId: item.productId,
  action: "increase",
});

console.log("PATCH Response:", res.data.cart.items);

setCart(res.data.cart.items);
    } catch (error) {
      console.error(error);
    }
  };

  // Decrease Quantity
  const handleDecrease = async () => {
    try {
      const res = await axios.patch("/api/cart", {
        productId: item.productId,
        action: "decrease",
      });
console.log("PATCH Response:", res.data.cart.items);
      setCart(res.data.cart.items);
    } catch (error) {
      console.error(error);
    }
  };

  // Remove Item
  const handleRemove = async () => {
    try {
      const res = await axios.delete("/api/cart", {
        data: {
          productId: item.productId,
        },
      });
console.log("DELETE Response:", res.data.cart.items);
      setCart(res.data.cart.items);
    } catch (error) {
      console.error(error);
    }
  };
console.log("Cart Item:", item);
  return (
    <div className="flex items-center gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Product Image */}

      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#FFF7F7]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}

      <div className="flex flex-1 flex-col">

        <h3 className="text-xl font-semibold text-[#3D2430]">
          {item.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Product
        </p>

        {/* Quantity */}

        <div className="mt-6 flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">

          <button
            onClick={handleDecrease}
            className="px-4 py-2 transition hover:bg-gray-100"
          >
            -
          </button>

          <span className="w-12 text-center font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrease}
            className="px-4 py-2 transition hover:bg-gray-100"
          >
            +
          </button>

        </div>

      </div>

      {/* Price + Remove */}

      <div className="flex flex-col items-end justify-between self-stretch">

        <h2 className="text-2xl font-bold text-[#3D2430]">
          ₹{item.price.toLocaleString()}
        </h2>

        <button
          onClick={handleRemove}
          className="flex items-center gap-2 text-red-500 transition hover:text-red-600"
        >
          <Trash2 size={18} />
          Remove
        </button>

      </div>

    </div>
  );
}