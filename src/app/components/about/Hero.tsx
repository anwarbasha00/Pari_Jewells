import Link from "next/link";
import Image from "next/image";

import heroImage from "../../../app/public/images/pari_logo-Picsart-BackgroundRemover.jpeg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7F8] via-white to-[#FFF3F6]">

      {/* Background Blur */}

      <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-[#FCE4EC] opacity-70 blur-3xl lg:-left-40 lg:h-80 lg:w-80" />

      <div className="absolute -right-24 bottom-0 h-60 w-60 rounded-full bg-[#FFE8EC] opacity-70 blur-3xl lg:-right-32 lg:h-72 lg:w-72" />

      <div className="relative mx-auto grid min-h-[70vh] max-w-7xl items-center gap-12 px-5 py-14 sm:px-6 sm:py-16 lg:min-h-[85vh] lg:grid-cols-2 lg:gap-16 lg:py-20">

        {/* LEFT */}

        <div className="text-center lg:text-left">

          <span className="inline-flex rounded-full bg-[#FDECF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E02C69] sm:px-5 sm:text-sm">

            About Pari Jewels

          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-[#3D2430] sm:text-5xl lg:mt-8 lg:text-6xl">

            Crafted for Every Woman,

            <span className="block text-[#E02C69]">

              Designed for Every Moment.

            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:mx-0">

            From everyday elegance to memorable celebrations,
            Pari Jewels brings modern fashion jewellery that
            combines style, quality and affordability.

          </p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 sm:leading-8 lg:mx-0">

            Founded with a passion for affordable luxury,
            our collections are thoughtfully curated to help
            every woman express her unique style with confidence.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

            <Link
              href="/products"
              className="rounded-xl bg-[#E02C69] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#C91F5B] sm:px-8 sm:py-4"
            >
              Explore Collection →
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-[#E02C69] px-6 py-3 text-center font-semibold text-[#E02C69] transition hover:bg-[#FFF2F6] sm:px-8 sm:py-4"
            >
              Contact Us
            </Link>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative mt-10 flex justify-center lg:mt-0">

          {/* Circle */}

          <div className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#FFE8EC] to-[#FFF7F7] sm:h-[380px] sm:w-[380px] lg:h-[520px] lg:w-[520px]" />

          <Image
            src={heroImage}
            alt="Pari Jewels"
            priority
            width={650}
            height={700}
            className="relative w-[260px] object-contain drop-shadow-2xl sm:w-[340px] lg:w-[520px]"
          />

        </div>

      </div>

      {/* Floating Cards */}

      <div className="relative z-20 mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-4 px-5 pb-16 sm:px-6 md:grid-cols-2 lg:-mt-8 lg:grid-cols-4 lg:gap-6 lg:pb-20">

        <StatCard
          title="Founded"
          value="2025"
        />

        <StatCard
          title="Delivery"
          value="Across India"
        />

        <StatCard
          title="Style"
          value="Modern Gen-Z"
        />

        <StatCard
          title="Promise"
          value="Affordable Luxury"
        />

      </div>

    </section>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#F5D9E0] bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">

      <p className="text-xs uppercase tracking-widest text-gray-400 sm:text-sm">

        {title}

      </p>

      <h3 className="mt-2 text-lg font-bold text-[#3D2430] sm:text-xl">

        {value}

      </h3>

    </div>
  );
}