import { connectDB } from "@/src/lib/connectdb";
import Order from "@/src/models/orders.model";
import Navbar from "../layout/Navbar";
import Link from "next/link";
import mongoose from "mongoose";

import {
  FiShoppingBag,
  FiClock,
  FiTruck,
  FiSearch,
} from "react-icons/fi";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    payment?: string;
    sort?: string;
  }>;
}

export default async function Page({
  searchParams,
}: PageProps) {
  await connectDB();

  const params = await searchParams;

  const search = params.search || "";
  const status = params.status || "";
  const payment = params.payment || "";
  const sort = params.sort || "newest";

  const query: any = {};

  // Search
  if (search) {
  const orConditions: any[] = [
    {
      "shippingAddress.fullName": {
        $regex: search,
        $options: "i",
      },
    },
    {
      "shippingAddress.phone": {
        $regex: search,
        $options: "i",
      },
    },
  ];

  if (mongoose.Types.ObjectId.isValid(search)) {
    orConditions.push({
      _id: new mongoose.Types.ObjectId(search),
    });
  }

  query.$or = orConditions;
}

  // Status Filter
  if (status) {
    query.status = status;
  }

  // Payment Filter
  if (payment) {
    query.paymentMethod = payment;
  }

  const sortOption =
    sort === "oldest"
      ? { createdAt: 1 }
      : { createdAt: -1 };

  const orders = await Order.find(query)
    .sort(sortOption)
    .lean();

  // Dashboard Stats
  const allOrders = await Order.find().lean();

  const totalOrders = allOrders.length;

  const pendingOrders = allOrders.filter(
    (order: any) => order.status === "Pending"
  ).length;

  const shippedOrders = allOrders.filter(
    (order: any) => order.status === "Shipped"
  ).length;

  const deliveredOrders = allOrders.filter(
    (order: any) => order.status === "Delivered"
  ).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF7F7] p-6">

        {/* ================= HEADER ================= */}

        <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-4xl font-bold text-[#3D2430]">
              Orders
            </h1>

            <p className="mt-2 text-[#7D5A67]">
              Manage customer orders and track deliveries.
            </p>
          </div>

          <div className="rounded-xl bg-[#FFE8EC] px-6 py-3 font-semibold text-[#E02C69]">
            Total Orders : {totalOrders}
          </div>

        </div>

        {/* ================= STATS ================= */}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}

          <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[#A69A9A]">
                  Total Orders
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                  {totalOrders}
                </h2>

              </div>

              <div className="rounded-xl bg-[#FFE8EC] p-3">
                <FiShoppingBag
                  size={28}
                  className="text-[#E02C69]"
                />
              </div>

            </div>

          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[#A69A9A]">
                  Pending
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                  {pendingOrders}
                </h2>

              </div>

              <div className="rounded-xl bg-yellow-100 p-3">
                <FiClock
                  size={28}
                  className="text-yellow-700"
                />
              </div>

            </div>

          </div>

          {/* Shipped */}

          <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[#A69A9A]">
                  Shipped
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                  {shippedOrders}
                </h2>

              </div>

              <div className="rounded-xl bg-blue-100 p-3">
                <FiTruck
                  size={28}
                  className="text-blue-700"
                />
              </div>

            </div>

          </div>

          {/* Delivered */}

          <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[#A69A9A]">
                  Delivered
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                  {deliveredOrders}
                </h2>

              </div>

              <div className="rounded-xl bg-green-100 p-3">

                <span className="text-xl font-bold text-green-700">
                  ✓
                </span>

              </div>

            </div>

          </div>

        </div>
                {/* ================= FILTER BAR ================= */}

        <form method="GET">

          <div className="mt-8 rounded-2xl border border-[#F0C8CF] bg-white p-5 shadow-sm">

            <div className="flex flex-wrap items-center gap-4">

              {/* Search */}

              <div className="relative min-w-[320px] flex-1">

                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69A9A]"
                />

                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Search Order ID, Customer or Phone..."
                  className="h-12 w-full rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] pl-11 pr-4 outline-none transition focus:border-[#E02C69] focus:ring-4 focus:ring-[#E02C69]/10"
                />

              </div>

              {/* Status */}

              <select
                name="status"
                defaultValue={status}
                className="h-12 w-48 rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] px-4 outline-none focus:border-[#E02C69] focus:ring-4 focus:ring-[#E02C69]/10"
              >

                <option value="">
                  All Status
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

              {/* Payment */}

              <select
                name="payment"
                defaultValue={payment}
                className="h-12 w-56 rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] px-4 outline-none focus:border-[#E02C69] focus:ring-4 focus:ring-[#E02C69]/10"
              >

                <option value="">
                  All Payments
                </option>

                <option value="Cash on Delivery">
                  Cash on Delivery
                </option>

                <option value="Online">
                  Online
                </option>

              </select>

              {/* Sort */}

              <select
                name="sort"
                defaultValue={sort}
                className="h-12 w-44 rounded-xl border border-[#F0C8CF] bg-[#FFF7F7] px-4 outline-none focus:border-[#E02C69] focus:ring-4 focus:ring-[#E02C69]/10"
              >

                <option value="newest">
                  Newest
                </option>

                <option value="oldest">
                  Oldest
                </option>

              </select>

              {/* Search */}

              <button
                type="submit"
                className="h-12 rounded-xl bg-[#E02C69] px-6 font-semibold text-white transition hover:bg-[#C91F59]"
              >
                Search
              </button>

              {/* Clear */}

              <Link
                href="/ammu/orders"
                className="flex h-12 items-center justify-center rounded-xl border border-[#F0C8CF] bg-white px-6 font-medium text-[#3D2430] transition hover:bg-[#FFF1F4]"
              >
                Clear
              </Link>

            </div>

          </div>

        </form>

        {/* ================= ORDERS TABLE ================= */}

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#F0C8CF] bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#FFF1F4]">

                <tr className="text-left text-[#3D2430]">

                  <th className="px-6 py-5 font-semibold">
                    Order ID
                  </th>

                  <th className="px-6 py-5 font-semibold">
                    Customer
                  </th>

                  <th className="px-6 py-5 font-semibold">
                    Phone
                  </th>

                  <th className="px-6 py-5 text-center font-semibold">
                    Items
                  </th>

                  <th className="px-6 py-5 text-right font-semibold">
                    Amount
                  </th>

                  <th className="px-6 py-5 text-center font-semibold">
                    Payment
                  </th>

                  <th className="px-6 py-5 text-center font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-5 text-center font-semibold">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>
                              {orders.length > 0 ? (
                orders.map((order: any) => (
                  <tr
                    key={order._id.toString()}
                    className="border-t border-[#F8DDE3] transition hover:bg-[#FFF7F7]"
                  >
                    {/* Order ID */}

                    <td className="px-6 py-5 font-semibold text-[#3D2430]">
                      #{order._id.toString().slice(-6).toUpperCase()}
                    </td>

                    {/* Customer */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-[#3D2430]">
                          {order.shippingAddress.fullName}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </td>

                    {/* Phone */}

                    <td className="px-6 py-5">
                      {order.shippingAddress.phone}
                    </td>

                    {/* Items */}

                    <td className="px-6 py-5 text-center font-medium">
                      {order.items.length}
                    </td>

                    {/* Amount */}

                    <td className="px-6 py-5 text-right font-bold text-[#3D2430]">
                      ₹{order.total.toLocaleString()}
                    </td>

                    {/* Payment */}

                    <td className="px-6 py-5 text-center">

                      {order.paymentMethod ===
                      "Cash on Delivery" ? (
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                          COD
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          ONLINE
                        </span>
                      )}

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">

                      {order.status === "Pending" && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Pending
                        </span>
                      )}

                      {order.status === "Confirmed" && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          Confirmed
                        </span>
                      )}

                      {order.status === "Shipped" && (
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                          Shipped
                        </span>
                      )}

                      {order.status === "Delivered" && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Delivered
                        </span>
                      )}

                      {order.status === "Cancelled" && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Cancelled
                        </span>
                      )}

                    </td>

                    {/* Action */}

                    <td className="px-6 py-5 text-center">

                      <Link
                        href={`/ammu/orders/${order._id}`}
                        className="rounded-lg bg-[#E02C69] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C91F59]"
                      >
                        View
                      </Link>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-16 text-center text-gray-500"
                  >
                    No Orders Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

    </>
  );
}
    