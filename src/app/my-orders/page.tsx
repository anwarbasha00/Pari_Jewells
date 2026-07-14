"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import OrderCard from "../components/order/Ordercard";

interface Order {
  _id: string;
  items: any[];
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
}

export default function MyOrdersPage() {
  const router = useRouter();

  const { status } = useSession();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    fetchOrders();
  }, [status, router]);

  async function fetchOrders() {
    try {
      setLoading(true);

      const res = await axios.get("/api/my/orders");

      setOrders(res.data.orders);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.replace("/login");
        return;
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 py-12">

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#3D2430]">
              My Orders
            </h1>

            <p className="mt-3 text-gray-500">
              View and track all your jewellery purchases.
            </p>
          </div>

          {loading && (
            <p className="text-center text-gray-500">
              Loading orders...
            </p>
          )}

          {!loading && orders.length === 0 && (
            <div className="rounded-2xl bg-white py-20 text-center shadow-sm">

              <h2 className="text-2xl font-semibold text-[#3D2430]">
                No Orders Yet
              </h2>

              <p className="mt-3 text-gray-500">
                Start shopping to see your orders here.
              </p>

            </div>
          )}

          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
              />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}