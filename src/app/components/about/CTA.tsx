import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#E02C69] via-[#EB3F76] to-[#F04E84] px-6 py-14 text-center text-white shadow-2xl sm:px-10 sm:py-16 lg:rounded-[40px] lg:px-16 lg:py-20">

          {/* Badge */}

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white sm:text-sm">
            Explore Pari Jewels
          </span>

          {/* Heading */}

          <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Discover Jewellery You'll Love
          </h2>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-pink-100 sm:text-lg sm:leading-8">
            Explore thoughtfully curated collections designed
            for everyday elegance, special occasions, and
            unforgettable gifts.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

            <Link
              href="/products"
              className="rounded-xl bg-white px-6 py-3 text-center font-semibold text-[#E02C69] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:px-8 sm:py-4"
            >
              Explore Collection
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#E02C69] sm:px-8 sm:py-4"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}