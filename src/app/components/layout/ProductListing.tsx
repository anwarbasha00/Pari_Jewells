import Link from "next/link";
import ProductCard from "../ProductCard";

interface ProductImage {
  url: string;
}

interface ProductCategory {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: ProductImage[];
  category: ProductCategory;
}

interface ProductListingProps {
  title: string;
  subtitle?: string;
  products: Product[];
  buttonText?: string;
  buttonLink?: string;
  showButton?: boolean;
  className?: string;
  emptyMessage?: string;
}

export default function ProductListing({
  title,
  subtitle,
  products,
  buttonText = "View All",
  buttonLink = "/shop",
  showButton = true,
  className = "",
  emptyMessage = "No products found.",
}: ProductListingProps) {
  return (
    <section className={`py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          {subtitle && (
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#E02C69]">
              {subtitle}
            </p>
          )}

          <h2 className="mt-3 text-3xl font-semibold text-[#3D2430] md:text-4xl">
            {title}
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#E02C69]" />
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center text-gray-500">
            {emptyMessage}
          </div>
        )}

        {/* CTA */}
        {showButton && products.length > 0 && (
          <div className="mt-14 flex justify-center">
            <Link
              href={buttonLink}
              className="rounded-full border border-[#3D2430] px-8 py-3 text-sm font-medium text-[#3D2430] transition-all duration-300 hover:bg-[#3D2430] hover:text-white"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}