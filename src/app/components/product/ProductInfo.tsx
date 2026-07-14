"use client";
import axios from "axios";
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Zap,
  CircleCheckBig,
} from "lucide-react";
import { useBuyNowStore } from "@/src/store/buyNowStore";
import { useCartStore } from "@/src/store/cartStore";
import QuantitySelector from "./QuantitySelector";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: {
    _id: string;
    slug: string;
    name: string;
    category: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    inStock: boolean;
    images: {
      url: string;
    }[];
  };
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const { status } = useSession();
  const setCart = useCartStore((state) => state.setCart);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const setBuyNowItem = useBuyNowStore(
  (state) => state.setItem
);
function handleBuyNow() {
   if (status !== "authenticated") {
    router.push(
      `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
    );
    return;
  }
  setBuyNowItem({
    productId: product._id,
    slug: product.slug,
    name: product.name,
    image: product.images[0]?.url || "",
    price: product.price,
    quantity,
  });

  router.push("/checkout");
}

const handleAddToCart = async () => {
  if (status !== "authenticated") {
    alert("Please login to continue.");

    router.push(
      `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
    );

    return;
  }

  try {
    const response = await axios.post("/api/cart", {
      productId: product._id,
      quantity,
    });
    if (response.data.success) {
      // Update Zustand from MongoDB response
      setCart(response.data.cart.items);

      alert("Product added to cart.");
    }
  } catch (error: any) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to add product to cart."
    );
  }
};
  return (
    <div className="flex flex-col">

      {/* Category */}

      <span className="mb-4 w-fit rounded-full bg-[#FFE8EC] px-4 py-1 text-sm font-medium text-[#E02C69]">
        {product.category}
      </span>

      {/* Product Name */}

      <h1 className="text-3xl font-semibold leading-tight text-[#3D2430] lg:text-4xl">
        {product.name}
      </h1>

      {/* Price */}

      <div className="mt-6 flex flex-wrap items-center gap-3">

        <span className="text-4xl font-bold text-[#3D2430]">
          ₹{product.price}
        </span>

        {product.originalPrice && (
          <span className="text-xl text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
        )}

        {product.discount && (
          <span className="rounded-full bg-[#FFE8EC] px-3 py-1 text-sm font-semibold text-[#E02C69]">
            {product.discount}% OFF
          </span>
        )}

      </div>

      {/* Stock */}

      <div className="mt-5 flex items-center gap-2">

        <CircleCheckBig
          size={18}
          className={
            product.inStock
              ? "text-green-600"
              : "text-red-500"
          }
        />

        <span
          className={`font-medium ${
            product.inStock
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {product.inStock
            ? "In Stock"
            : "Out of Stock"}
        </span>

      </div>

      {/* Divider */}

      <div className="my-8 h-px bg-gray-200" />

      {/* Description */}

      <div>

        <h3 className="mb-3 text-lg font-semibold text-[#3D2430]">
          Description
        </h3>

        <p className="leading-8 text-gray-600">
          {product.description}
        </p>

      </div>

      {/* Divider */}

      <div className="my-8 h-px bg-gray-200" />

      {/* Quantity */}

      <div>

        <h3 className="mb-4 text-lg font-semibold text-[#3D2430]">
          Quantity
        </h3>

        <QuantitySelector
          setQuantity={setQuantity}
          quantity={quantity}
        />

      </div>

      {/* Buttons */}

      <div className="mt-10 space-y-4">

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#E02C69] px-6 py-4 font-semibold text-white transition hover:bg-[#C91F5B] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
          
        <button
  onClick={handleBuyNow}
  disabled={!product.inStock}
  className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#E02C69] px-6 py-4 font-semibold text-[#E02C69] transition hover:bg-[#FFF3F7] disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
>
  <Zap size={20} />
  Buy Now
</button>


      </div>

    </div>
  );
}