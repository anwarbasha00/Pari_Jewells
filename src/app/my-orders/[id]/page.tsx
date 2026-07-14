"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/app/components/layout/Navbar";
import Footer from "@/src/app/components/layout/Footer";
import OrderCard from "../../components/order/Ordercard";
import OrderedItems from "../../components/order/OrderedItems";
import OrderHeader from "../../components/order/OrderHeader";
import PaymentCard from "../../components/order/PaymentCard";
import ShippingAddressCard from "../../components/order/ShippingAddressCard";
import SummaryCard from "../../components/order/SummaryCard";
import TimelineCard from "../../components/order/TimelineCard";
import { CircleCheckBig } from "lucide-react";
export default function OrderDetailsPage() {
  
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] =
  useState(false);

  async function handleCancelOrder() {
  try {
    setCancelLoading(true);

    const res = await axios.patch(
      `/api/orders/${id}/cancel`
    );

    if (res.data.success) {
      setOrder((prev: any) => ({
        ...prev,
        status: "Cancelled",
        cancelledAt: new Date(),
        cancelReason: "Customer Requested",
      }));

      setShowCancelDialog(false);

      setShowSuccessDialog(true);
    }
  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      "Unable to cancel order."
    );
  } finally {
    setCancelLoading(false);
  }
}

 useEffect(() => {
  if (status !== "authenticated") {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
    return;
  }

  fetchOrder();
}, [status, id, router]);

  async function fetchOrder() {
    try {
      const res = await axios.get(
        `/api/orders/${id}`
      );

      setOrder(res.data.order);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">

          Loading...

        </main>

        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">

          Order Not Found

        </main>

        <Footer />
      </>
    );
  }

  return (
  <>
    <Navbar />

    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 py-12">

        {/* Header */}

        <OrderHeader order={order} />
        {["Pending", "Confirmed"].includes(order.status) && (
  <div className="mt-6 flex justify-end">

    <button
      onClick={() => setShowCancelDialog(true)}
      className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600"
    >
      Cancel Order
    </button>

  </div>
)}

        {/* Items */}

        <OrderedItems items={order.items} />

        {/* Bottom Grid */}

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          <ShippingAddressCard
            address={order.shippingAddress}
          />

          <PaymentCard
            order={order}
          />

          <SummaryCard
            order={order}
          />

          <TimelineCard
            status={order.status}
          />

        </div>

      </div>
    </main>

    <Footer />

    {showCancelDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

    <div className="w-full max-w-md rounded-3xl bg-white p-8">

      <h2 className="text-2xl font-bold text-[#3D2430]">
        Cancel Order?
      </h2>

      <p className="mt-4 leading-7 text-gray-600">
        Are you sure you want to cancel this order?
        This action cannot be undone.
      </p>

      <div className="mt-8 flex justify-end gap-4">

        <button
          onClick={() => setShowCancelDialog(false)}
          className="rounded-xl border px-5 py-3"
        >
          No
        </button>

        <button
          onClick={handleCancelOrder}
          disabled={cancelLoading}
          className="rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600 disabled:bg-gray-300"
        >
          {cancelLoading
            ? "Cancelling..."
            : "Yes, Cancel"}
        </button>

      </div>

    </div>

  </div>
)}

{showSuccessDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

    <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">

      <CircleCheckBig
        size={70}
        className="mx-auto text-green-600"
      />

      <h2 className="mt-6 text-3xl font-bold text-[#3D2430]">
        Your Order Has Been Cancelled
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Order #{order._id.slice(-6).toUpperCase()}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Cancelled on {new Date().toLocaleDateString("en-IN")}
      </p>

      {order.paymentMethod === "Online" ? (
        <>
          <p className="mt-5 leading-8 text-gray-600">
            Your order has been cancelled successfully.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            If your payment was completed,
            your refund will be processed by our support
            team according to our refund policy.
          </p>

          <p className="mt-4 rounded-xl bg-[#FFF7F8] p-4 text-sm leading-7 text-gray-600">
            Refunds typically take
            <span className="font-semibold">
              {" "}
              5–7 business days
            </span>{" "}
            after they are initiated.
          </p>
        </>
      ) : (
        <>
          <p className="mt-5 leading-8 text-gray-600">
            Your Cash on Delivery order has been cancelled
            successfully.
          </p>

          <p className="mt-4 rounded-xl bg-[#F5FFF8] p-4 text-sm leading-7 text-gray-600">
            No payment was charged for this order.
          </p>
        </>
      )}

      <button
        onClick={() => router.push("/products")}
        className="mt-8 w-full rounded-xl bg-[#E02C69] py-4 font-semibold text-white transition hover:bg-[#C91F5B]"
      >
        Continue Shopping
      </button>

    </div>

  </div>
)}
  </>
);
}