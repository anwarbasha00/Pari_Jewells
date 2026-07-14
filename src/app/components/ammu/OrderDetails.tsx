"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface Props {
  order: any;
}

export default function OrderDetails({
  order,
}: Props) {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSave() {
  try {
    setLoading(true);

    const response = await fetch(
      `/api/orders/${order._id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update order."
      );
    }

    alert("Order status updated successfully.");

    router.refresh();
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          Order #{order._id.slice(-6).toUpperCase()}
        </h1>

        <p className="mt-2 text-gray-500">
          Created on{" "}
          {new Date(
            order.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

      {/* Customer */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Customer Information
        </h2>

        <div className="space-y-3">

          <p>

            <strong>Name:</strong>{" "}
            {order.shippingAddress.fullName}

          </p>

          <p>

            <strong>Phone:</strong>{" "}
            {order.shippingAddress.phone}

          </p>

          <p>

            <strong>Address:</strong>{" "}
            {order.shippingAddress.address},{" "}
            {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} -
            {order.shippingAddress.pincode}

          </p>

        </div>

      </div>

      {/* Products */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Ordered Products
        </h2>

        <div className="space-y-5">

          {order.items.map((item: any) => (
            <div
              key={item.productId}
              className="flex items-center gap-5 border-b pb-5"
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

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>

              </div>

              <div className="font-semibold">
                ₹{item.price}
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Summary */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Order Summary
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">

            <span>Payment</span>

            <span>{order.paymentMethod}</span>

          </div>

          <div className="flex justify-between">

            <span>Subtotal</span>

            <span>₹{order.subtotal}</span>

          </div>

          <div className="flex justify-between">

            <span>Delivery</span>

            <span>
              ₹{order.deliveryCharge}
            </span>

          </div>

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span>₹{order.total}</span>

          </div>

        </div>

      </div>

      {/* Status */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Update Status
        </h2>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full rounded-xl border p-4"
        >
          <option>Pending</option>

          <option>Confirmed</option>

          <option>Shipped</option>

          <option>Delivered</option>

          <option>Cancelled</option>

        </select>

        <button
  onClick={handleSave}
  disabled={loading}
  className="mt-6 rounded-xl bg-[#E02C69] px-8 py-3 font-medium text-white transition hover:bg-[#C91F5B] disabled:bg-gray-300"
>
  {loading ? "Saving..." : "Save Changes"}
</button>

      </div>

    </div>
  );
}