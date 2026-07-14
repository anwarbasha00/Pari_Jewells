"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchProduct {
  _id: string;
  slug: string;
  name: string;
  price: number;
  images: {
    url: string;
  }[];
}

export default function SearchModal({
  isOpen,
  onClose,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Close on ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Live Search
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm">

      <div className="mx-auto mt-24 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center border-b p-5">

          <FiSearch
            className="mr-3 text-gray-500"
            size={22}
          />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewellery..."
            className="flex-1 text-lg outline-none"
          />

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Content */}

        <div className="p-6">

          {query.length === 0 ? (
            <>
              <h3 className="mb-4 font-semibold text-[#3D2430]">
                Popular Searches
              </h3>

              <div className="flex flex-wrap gap-3">

                {[
                  "Ring",
                  "Necklace",
                  "Earrings",
                  "Bracelet",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="rounded-full bg-[#FFF3F7] px-4 py-2 text-sm text-[#E02C69] transition hover:bg-[#FFE8EC]"
                  >
                    {item}
                  </button>
                ))}

              </div>
            </>
          ) : (
            <div className="max-h-[420px] overflow-y-auto">

              {loading && (
                <p className="py-8 text-center text-gray-500">
                  Searching...
                </p>
              )}

              {!loading &&
                products.length === 0 && (
                  <p className="py-8 text-center text-gray-500">
                    No products found.
                  </p>
                )}

              {!loading &&
                products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-[#FFF7F7]"
                  >

                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-[#FFF7F7]">

                      <Image
                        src={
                          product.images?.[0]?.url ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />

                    </div>

                    <div className="flex-1">

                      <h4 className="line-clamp-1 font-medium text-[#3D2430]">
                        {product.name}
                      </h4>

                      <p className="mt-1 font-semibold text-[#E02C69]">
                        ₹{product.price}
                      </p>

                    </div>

                  </Link>
                ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}