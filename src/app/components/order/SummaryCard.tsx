"use client";

interface Props {
  order: any;
}

export default function SummaryCard({
  order,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-[#3D2430]">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Subtotal
          </span>

          <span>
            ₹{order.subtotal.toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Delivery
          </span>

          <span className="text-green-600 font-semibold">
            FREE
          </span>

        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">

          <span>Total</span>

          <span className="text-[#E02C69]">
            ₹{order.total.toLocaleString()}
          </span>

        </div>

      </div>

    </div>
  );
}