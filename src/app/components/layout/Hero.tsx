import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiShield, FiTruck } from "react-icons/fi";
import { BsGem } from "react-icons/bs";
import logo from "../../public/images/pari_logo-Picsart-BackgroundRemover.jpeg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF7F7]">

      {/* Decorative Blur */}
      <div className="absolute -left-24 top-20 h-52 w-52 rounded-full bg-[#FFE8EC] blur-3xl opacity-70 md:h-72 md:w-72" />

      <div className="absolute -right-24 bottom-10 h-52 w-52 rounded-full bg-[#FCE7D4] blur-3xl opacity-70 md:h-72 md:w-72" />

      <div
        className="
        mx-auto
        grid
        max-w-7xl
        items-center
        gap-12
        px-5
        py-12
        lg:min-h-[90vh]
        lg:grid-cols-[45%_55%]
        lg:px-6
        lg:py-20
      "
      >

        {/* RIGHT IMAGE (Mobile First) */}

        <div className="order-1 relative flex items-center justify-center lg:order-2 lg:justify-end">

          <div className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#FFE8EC] via-[#FFF4F6] to-[#FFF7F7] sm:h-[360px] sm:w-[360px] lg:h-[600px] lg:w-[600px]" />

          <div className="relative z-10 flex items-center justify-center">

            <Image
              src={logo}
              alt="Pari Jewellery"
              priority
              width={820}
              height={820}
              className="
                w-[240px]
                object-contain
                drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]
                sm:w-[320px]
                lg:w-[520px]
              "
            />

          </div>

        </div>

        {/* LEFT CONTENT */}

        <div className="order-2 relative z-10 text-center lg:order-1 lg:text-left">

          <span
            className="
            inline-flex
            rounded-full
            bg-[#FFE8EC]
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[#E02C69]
            sm:text-sm
          "
          >
            Luxury Jewellery Since 2025
          </span>

          <h1
            className="
            mt-6
            text-4xl
            font-bold
            leading-tight
            text-[#3D2430]
            sm:text-5xl
            lg:mt-8
            lg:text-7xl
          "
          >
            Celebrate

            <span className="block text-[#E02C69]">
              Every Moment.
            </span>

          </h1>

          <p
            className="
            mx-auto
            mt-6
            max-w-xl
            text-base
            leading-8
            text-[#6D5C61]
            sm:text-lg
            lg:mx-0
            lg:mt-8
            lg:text-xl
          "
          >
            Timeless jewellery crafted to celebrate love,
            elegance and life's unforgettable moments.
            Designed to make every occasion shine.
          </p>

          {/* Buttons */}

          <div
            className="
            mt-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:justify-center
            lg:justify-start
          "
          >

            <Link
              href="/products"
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#E02C69]
                px-6
                font-semibold
                text-white
                transition
                hover:bg-[#C91F59]
                sm:h-14
                sm:px-8
              "
            >
              <BsGem />

              Shop Collection
            </Link>

            <Link
              href="/products?filter=new"
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#E02C69]
                bg-white
                px-6
                font-semibold
                text-[#E02C69]
                transition
                hover:bg-[#FFE8EC]
                sm:h-14
                sm:px-8
              "
            >
              Explore New

              <FiArrowRight />
            </Link>

          </div>

          {/* Trust */}

          <div
            className="
            mt-8
            flex
            flex-col
            items-center
            gap-4
            text-sm
            font-medium
            text-[#6D5C61]
            sm:flex-row
            sm:justify-center
            sm:gap-8
            lg:justify-start
          "
          >

            <div className="flex items-center gap-2">

              <FiShield className="text-[#C8A95A]" />

              Hallmarked Jewellery

            </div>

            <div className="flex items-center gap-2">

              <FiTruck className="text-[#C8A95A]" />

              Free Shipping

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}