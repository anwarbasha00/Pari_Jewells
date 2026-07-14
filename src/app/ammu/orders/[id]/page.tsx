import { notFound } from "next/navigation";

import Navbar from "../../layout/Navbar";
import Footer from "@/src/app/components/layout/Footer";
import OrderDetails from "@/src/app/components/ammu/OrderDetails";

async function getOrder(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/orders/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data.order;
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