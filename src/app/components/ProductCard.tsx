import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { BsPatchCheckFill } from "react-icons/bs";

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    category: string;
    price: number;

    originalPrice?: number;
    discount?: number;

    images: {
      url: string;
    }[];

    featured?: boolean;
    bestseller?: boolean;
    newArrival?: boolean;
  };
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div
      className="
      group
      w-full
      overflow-hidden
      rounded-2xl
      border
      border-[#F0C8CF]
      bg-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      {/* Image */}

      <div className="relative overflow-hidden bg-[#FFF7F7]">

        {/* Badge */}

        {product.featured && (
          <span
            className="
            absolute
            left-3
            top-3
            z-20
            rounded-full
            bg-[#E02C69]
            px-2.5
            py-1
            text-[11px]
            font-semibold
            text-white
          "
          >
            Featured
          </span>
        )}

        {/* Wishlist */}

        <button
          className="
          absolute
          right-3
          top-3
          z-20
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-white
          shadow-md
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
          hover:bg-[#FFE8EC]
        "
        >
          <FiHeart size={18} />
        </button>

        {/* Product Image */}

        <Image
          src={product.images?.[0]?.url || "/images/placeholder.png"}
          alt={product.name}
          width={500}
          height={500}
          className="
          h-52
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
        />
      </div>

      {/* Content */}

      <div className="p-4">

        {/* Category */}

        <p className="text-xs uppercase tracking-[0.2em] text-[#E02C69]">
          {product.category}
        </p>

        {/* Name */}

        <h3
          className="
          mt-2
          line-clamp-2
          min-h-[56px]
          text-lg
          font-semibold
          leading-7
          text-[#3D2430]
        "
        >
          {product.name}
        </h3>

        {/* Trust Badge */}

        <div className="mt-3 flex items-center gap-2 text-sm text-[#7D5A67]">

          {/* Rating */}

        <div className="mt-3 flex items-center gap-2">

          <span className="text-yellow-500">
            ★★★★★
          </span>

          <span className="text-sm text-gray-500">
            (24 Reviews)
          </span>

        </div>


        </div>

        {/* Price */}

        <div className="mt-4 flex flex-wrap items-center gap-2">

          <span className="text-xl font-bold text-[#3D2430]">
            ₹{product.price}
          </span>

          {product.originalPrice &&
  product.originalPrice > product.price && (
    <>
      <span className="text-sm text-gray-400 line-through">
        ₹{product.originalPrice}
      </span>

      {product.discount && (
        <span
          className="
            rounded-full
            bg-[#FFE8EC]
            px-2
            py-1
            text-[11px]
            font-semibold
            text-[#E02C69]
          "
        >
          {product.discount}% OFF
        </span>
      )}
    </>
)}

        </div>

        {/* Button */}

        <Link
          href={`/products/${product?.slug}`}
          className="
          mt-5
          flex
          h-10
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#E02C69]
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-[#C91F59]
        "
        >
          View Details

          <FiArrowRight size={16} />
        </Link>

      </div>
    </div>
  );
}