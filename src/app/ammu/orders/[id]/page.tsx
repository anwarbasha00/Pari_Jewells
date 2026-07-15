export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

import Navbar from "../../layout/Navbar";
import Footer from "@/src/app/components/layout/Footer";
import OrderDetails from "@/src/app/components/ammu/OrderDetails";
import { connectDB } from "@/src/lib/connectdb";
import Order from "@/src/models/orders.model";
async function getOrder(id: string) {
  await connectDB();

  const order = await Order.findById(id).lean();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
}
export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#FAFAFA]">
              <Navbar/>


        <div className="mx-auto max-w-7xl px-4 py-12">

          <OrderDetails order={order} />

        </div>

      </main>

    </>
  );
}