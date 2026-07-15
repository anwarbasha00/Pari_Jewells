"use client";

import Link from "next/link";
import ProductCard from "../ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface ProductImage {
  url: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: ProductImage[];
  category: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
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
          <Swiper
            modules={[Navigation]}
            navigation={products.length > 4}
            grabCursor={true}
            watchOverflow={true}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1536: {
                slidesPerView: 5,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
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