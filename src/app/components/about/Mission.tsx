import {
  Sparkles,
  Gem,
  HeartHandshake,
} from "lucide-react";

export default function Mission() {
  return (
    <section className="bg-[#FFF7F8] py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-[#FDECF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E02C69] sm:text-sm">
            Our Mission
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight text-[#3D2430] sm:text-4xl lg:text-5xl">
            Making Everyday Elegance Accessible
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            We believe every woman deserves jewellery that
            makes her feel confident, stylish, and beautiful
            without spending a fortune.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <MissionCard
            icon={<Sparkles size={34} />}
            title="Affordable Luxury"
            description="Curated fashion jewellery that offers premium style at prices everyone can enjoy."
          />

          <MissionCard
            icon={<Gem size={34} />}
            title="Modern Designs"
            description="Elegant collections inspired by today's fashion trends while remaining timeless and versatile."
          />

          <MissionCard
            icon={<HeartHandshake size={34} />}
            title="Customer First"
            description="Every order is carefully packed, quality checked, and delivered with the attention our customers deserve."
          />

        </div>

      </div>

    </section>
  );
}

function MissionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-3xl border border-[#F5D9E0] bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#E02C69] hover:shadow-xl sm:p-8 lg:text-left">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1F5] text-[#E02C69] transition duration-300 group-hover:bg-[#E02C69] group-hover:text-white lg:mx-0">

        {icon}

      </div>

      <h3 className="mt-6 text-xl font-bold text-[#3D2430] sm:text-2xl">
        {title}
      </h3>

      <p className="mt-4 text-base leading-7 text-gray-600 sm:leading-8">
        {description}
      </p>

    </div>
  );
}