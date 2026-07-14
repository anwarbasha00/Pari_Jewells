"use client";

import { CreditCard } from "lucide-react";

interface Props {
  order: any;
}

export default function PaymentCard({
  order,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-full bg-[#FFF5F8] p-3">
          <CreditCard
            className="text-[#E02C69]"
            size={22}
          />
        </div>

        <h2 className="text-2xl font-bold text-[#3D2430]">
          Payment Details
        </h2>

      </div>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Method
          </span>

          <span className="font-semibold">
            {order.paymentMethod}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Status
          </span>

          <span className="font-semibold text-green-600">
            {order.paymentStatus}
          </span>
        </div>

        {order.razorpayPaymentId && (
          <div>

            <p className="text-gray-500">
              Payment ID
            </p>

            <p className="mt-2 break-all font-mono text-sm">
              {order.razorpayPaymentId}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}