"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  public_id?: string;
  url: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImage =
    images[selectedImage]?.url || "/placeholder.png";

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5">

      {/* Desktop Thumbnails */}

      {images.length > 1 && (
        <div className="hidden lg:flex flex-col gap-3">

          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-16 w-16 overflow-hidden rounded-xl border bg-white transition-all duration-200 ${
                selectedImage === index
                  ? "border-[#E02C69] ring-2 ring-[#E02C69]/20"
                  : "border-gray-200 hover:border-[#E02C69]"
              }`}
            >
              <Image
                src={image.url}
                alt={`${productName}-${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}

        </div>
      )}

      {/* Main Image */}

      <div className="relative flex h-[620px] w-full max-w-[620px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-[#FFF9FA]">

        <Image
          key={displayImage}
          src={displayImage}
          alt={productName}
          fill
          priority
          sizes="(max-width:768px) 100vw, 420px"
          className="object-center p-5 transition-transform duration-300 hover:scale-105"
        />

      </div>

      {/* Mobile Thumbnails */}

      {images.length > 1 && (
        <div className="mt-4 flex w-full justify-center gap-3 overflow-x-auto lg:hidden">

          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border ${
                selectedImage === index
                  ? "border-[#E02C69] ring-2 ring-[#E02C69]/20"
                  : "border-gray-200"
              }`}
            >
              <Image
                src={image.url}
                alt={`${productName}-${index + 1}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}

        </div>
      )}

    </div>
  );
}