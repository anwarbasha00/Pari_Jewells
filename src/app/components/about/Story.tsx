export default function Story() {
  return (
    <>
      {/* Story Section */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">

          {/* Left */}

          <div className="text-center lg:text-left">

            <span className="inline-flex rounded-full bg-[#FDECF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E02C69] sm:text-sm">

              Our Story

            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-[#3D2430] sm:text-4xl lg:text-5xl">

              From a Small Instagram Store to a Growing Jewellery Brand

            </h2>

          </div>

          {/* Right */}

          <div className="space-y-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">

            <p>
              Pari Jewels began with a simple dream—to make stylish,
              modern jewellery accessible to every woman without
              compromising on quality or affordability.
            </p>

            <p>
              What started as a small Instagram jewellery store quickly
              grew through the trust and support of customers who loved
              our carefully curated collections, honest service, and
              attention to detail.
            </p>

            <p>
              Today, Pari Jewels proudly serves customers across India,
              offering elegant fashion jewellery for everyday wear,
              celebrations, gifting, and life's special moments.
            </p>

            <p>
              As we continue to grow, our commitment remains the same:
              bringing beautiful jewellery, exceptional service, and an
              enjoyable shopping experience to every customer.
            </p>

          </div>

        </div>

      </section>

      {/* Timeline */}

      <section className="bg-[#FFF7F8] py-16 sm:py-20">

        <div className="mx-auto max-w-6xl px-5 sm:px-6">

          <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold text-[#3D2430] sm:text-4xl">
              Our Journey
            </h2>

            <p className="mt-3 text-gray-600">
              Every milestone reflects our passion for making elegant
              jewellery accessible across India.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Card */}

            <div className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">

              <div className="text-3xl font-bold text-[#E02C69]">
                2025
              </div>

              <h3 className="mt-4 text-xl font-semibold text-[#3D2430]">
                The Beginning
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Pari Jewels started its journey as an Instagram-based
                jewellery business.
              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">

              <div className="text-3xl font-bold text-[#E02C69]">
                6+ Months
              </div>

              <h3 className="mt-4 text-xl font-semibold text-[#3D2430]">
                Growing Community
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Serving customers with carefully curated fashion
                jewellery collections and personalized service.
              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">

              <div className="text-3xl font-bold text-[#E02C69]">
                Today
              </div>

              <h3 className="mt-4 text-xl font-semibold text-[#3D2430]">
                Across India
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Expanding through our dedicated online store to bring
                affordable luxury and everyday elegance to women across
                India.
              </p>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}