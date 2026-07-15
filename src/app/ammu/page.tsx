export const dynamic = "force-dynamic";
import React from "react";
import Link from "next/link";
import {
  FiDollarSign,
  FiShoppingBag,
  FiPackage,
  FiClock,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";
import { connectDB } from "@/src/lib/connectdb";

import Product from "@/src/models/product.model";
import Order from "@/src/models/orders.model";

import Navbar from "../ammu/layout/Navbar";

export default  async function Page() {
  await connectDB()
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  // Products
const totalProducts =
  await Product.countDocuments();

// Orders
const totalOrders =
  await Order.countDocuments();

// Pending Orders
const pendingOrders =
  await Order.countDocuments({
    status: "Pending",
  });

// Revenue
const revenueData = await Order.aggregate([
  {
    $match: {
      paymentStatus: "Paid",
    },
  },

  {
    $group: {
      _id: null,

      totalRevenue: {
        $sum: "$total",
      },
    },
  },
]);

const revenue =
  revenueData.length > 0
    ? revenueData[0].totalRevenue
    : 0;

const recentOrders = await Order.find()
  .sort({ createdAt: -1 })
  .limit(5)
  .lean();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF7F7]">
        <div className="mx-auto max-w-7xl p-8">

          {/* Header */}

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#3D2430]">
              {greeting}, Ammu 👋
            </h1>

            <p className="mt-2 text-[#7D5A67]">
              Welcome back to Pari Jewels Admin Dashboard.
            </p>
          </div>

          {/* Stats */}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl borader border-[#F0C8CF] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-[#A69A9A]">
                    Revenue
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                    ₹{revenue.toLocaleString()}
                  </h2>
                </div>

                <div className="rounded-xl bg-green-100 p-3">
                  <FiDollarSign
                    size={28}
                    className="text-green-600"
                  />
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-[#A69A9A]">
                    Orders
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

            <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-[#A69A9A]">
                    Products
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#3D2430]">
                    {totalProducts}
                  </h2>
                </div>

                <div className="rounded-xl bg-blue-100 p-3">
                  <FiPackage
                    size={28}
                    className="text-blue-600"
                  />
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-[#A69A9A]">
                    Pending Orders
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

          </div>

          {/* Bottom Grid */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div className="space-y-4">

  {recentOrders.map((order: any) => (

    <div
      key={order._id.toString()}
      className="flex items-center justify-between rounded-xl border border-[#F0C8CF] p-4"
    >

      <div>

        <p className="font-semibold text-[#3D2430]">
          {order.shippingAddress.fullName}
        </p>

        <p className="text-sm text-gray-500">
          #{order._id.toString().slice(-6)}
        </p>

      </div>

      <div className="text-right">

        <p className="font-bold">
          ₹{order.total}
        </p>

        <p className="text-sm text-[#E02C69]">
          {order.status}
        </p>

      </div>

    </div>

  ))}

</div>

            {/* Quick Actions */}

            <div className="rounded-2xl border border-[#F0C8CF] bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-xl font-semibold text-[#3D2430]">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <Link
                  href="/ammu/add-products"
                  className="flex items-center justify-between rounded-xl bg-[#FFF7F7] p-4 transition hover:bg-[#FFE8EC]"
                >
                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-[#E02C69] p-3 text-white">
                      <FiPlus />
                    </div>

                    <div>

                      <p className="font-semibold text-[#3D2430]">
                        Add Product
                      </p>

                      <p className="text-sm text-gray-500">
                        Create a new jewellery listing.
                      </p>

                    </div>

                  </div>

                  <FiArrowRight />

                </Link>

                <Link
                  href="/ammu/products"
                  className="flex items-center justify-between rounded-xl bg-[#FFF7F7] p-4 transition hover:bg-[#FFE8EC]"
                >
                  <div>

                    <p className="font-semibold text-[#3D2430]">
                      Manage Products
                    </p>

                    <p className="text-sm text-gray-500">
                      Edit or remove products.
                    </p>

                  </div>

                  <FiArrowRight />

                </Link>

                <Link
                  href="/ammu/orders"
                  className="flex items-center justify-between rounded-xl bg-[#FFF7F7] p-4 transition hover:bg-[#FFE8EC]"
                >
                  <div>

                    <p className="font-semibold text-[#3D2430]">
                      Manage Orders
                    </p>

                    <p className="text-sm text-gray-500">
                      View and update customer orders.
                    </p>

                  </div>

                  <FiArrowRight />

                </Link>

              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}