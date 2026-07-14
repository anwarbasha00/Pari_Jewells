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
export default function OrderDetailsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
console.log("Status:", status);
console.log("Session:", session);;
  
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

  const [loading, setLoading] = useState(true);

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
  </>
);
}