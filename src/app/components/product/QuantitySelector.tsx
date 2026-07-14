"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<
    React.SetStateAction<number>
  >;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
}: QuantitySelectorProps) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">
      <button
        type="button"
        onClick={() =>
          setQuantity((prev) => Math.max(1, prev - 1))
        }
        className="p-3 transition hover:bg-gray-100"
      >
        <Minus size={18} />
      </button>

      <span className="w-14 text-center font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() =>
          setQuantity((prev) => prev + 1)
        }
        className="p-3 transition hover:bg-gray-100"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}