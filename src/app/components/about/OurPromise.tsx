import { CheckCircle2 } from "lucide-react";

const promises = [
  "Thoughtfully curated fashion jewellery collections.",
  "Quality checked before every shipment.",
  "Secure online payments with trusted gateways.",
  "Fast and reliable delivery across India.",
  "Friendly customer support whenever you need assistance.",
  "Beautiful jewellery at prices you'll love.",
];

export default function OurPromise() {
  return (
    <section className="bg-[#FFF7F8] py-16 sm:py-20 lg:py-24">

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* LEFT */}

        <div className="text-center lg:text-left">

          <span className="inline-flex rounded-full bg-[#FDECF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E02C69] sm:px-5 sm:text-sm">

            Our Promise

          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight text-[#3D2430] sm:text-4xl lg:text-5xl">

            Every Order Is Packed

            <span className="block text-[#E02C69]">

              With Care & Confidence.

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:mx-0">

            At Pari Jewels, every customer matters.
            From selecting beautiful jewellery to delivering
            it safely to your doorstep, we are committed to
            making every shopping experience memorable.

          </p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 sm:leading-8 lg:mx-0">

            Our promise goes beyond selling jewellery.
            We strive to build lasting relationships through
            quality, transparency, and exceptional customer care.

          </p>

        </div>

        {/* RIGHT */}

        <div
          className="
            rounded-3xl
            border
            border-[#F4D6DD]
            bg-white
            p-6
            shadow-sm
            sm:p-8
            lg:p-10
          "
        >

          <h3 className="text-center text-2xl font-bold text-[#3D2430] lg:text-left">

            When You Shop With Us

          </h3>

          <div className="mt-8 space-y-5">

            {promises.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4"
              >

                <div
                  className="
                    mt-1
                    flex
                    h-8
                    w-8
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FFF1F5]
                    text-[#E02C69]
                  "
                >

                  <CheckCircle2 size={18} />

                </div>

                <p className="text-base leading-7 text-gray-600">

                  {item}

                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}