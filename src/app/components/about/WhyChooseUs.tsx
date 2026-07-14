import {
  ShieldCheck,
  Truck,
  CreditCard,
  Gift,
  Headset,
  PackageCheck,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck size={34} />,
      title: "Quality Checked",
      description:
        "Every jewellery piece is carefully inspected before it reaches you.",
    },
    {
      icon: <Truck size={34} />,
      title: "Fast Shipping",
      description:
        "Reliable delivery across India with safe and secure packaging.",
    },
    {
      icon: <CreditCard size={34} />,
      title: "Secure Payments",
      description:
        "Shop confidently with trusted and secure online payment options.",
    },
    {
      icon: <Gift size={34} />,
      title: "Gift Hampers",
      description:
        "Beautifully prepared gift hampers for birthdays, anniversaries and special occasions.",
    },
    {
      icon: <Headset size={34} />,
      title: "Customer Support",
      description:
        "Our team is always ready to assist you before and after your purchase.",
    },
    {
      icon: <PackageCheck size={34} />,
      title: "Cash on Delivery",
      description:
        "Convenient Cash on Delivery available for eligible orders across India.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-[#FDECF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E02C69] sm:px-5 sm:text-sm">
            Why Choose Pari Jewels
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight text-[#3D2430] sm:text-4xl lg:text-5xl">
            Everything You Need for a Delightful Shopping Experience
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            From premium quality to reliable delivery,
            every detail is designed to make your shopping
            experience smooth, secure, and memorable.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-[#F5D9E0]
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-[#E02C69]
        hover:shadow-xl
        sm:p-8
      "
    >

      {/* Icon */}

      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-[#FFF2F6]
          to-[#FFE7EF]
          text-[#E02C69]
          transition-all
          duration-300
          group-hover:from-[#E02C69]
          group-hover:to-[#C91F5B]
          group-hover:text-white
          lg:mx-0
        "
      >
        {icon}
      </div>

      {/* Title */}

      <h3 className="mt-6 text-center text-xl font-bold text-[#3D2430] sm:text-2xl lg:text-left">
        {title}
      </h3>

      {/* Description */}

      <p className="mt-4 text-center text-base leading-7 text-gray-600 sm:leading-8 lg:text-left">
        {description}
      </p>

    </div>
  );
}