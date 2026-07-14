import ProductForm from "@/src/app/components/ProductForm";
import { connectDB } from "@/src/lib/connectdb";
import Product from "@/src/models/product.model";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {

  await connectDB();

  const { id } = await params;

  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  return (
    <ProductForm
      mode="edit"
      product={JSON.parse(JSON.stringify(product))}
    />
  );
}