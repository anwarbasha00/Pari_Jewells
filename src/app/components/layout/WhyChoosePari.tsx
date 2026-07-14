import FeatureCard from "./FeatureCard";

import {
  Gem,
  BadgeCheck,
  ShieldCheck,
  Truck,
  Gift,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: <Gem size={30} strokeWidth={1.8} />,
    title: "Curated Collection",
    description:
      "Discover a thoughtfully selected collection of elegant jewellery for every style and celebration.",
  },
  {
    icon: <BadgeCheck size={30} strokeWidth={1.8} />,
    title: "Quality Checked",
    description:
      "Every piece is carefully inspected before dispatch to ensure it meets our quality standards.",
  },
  {
    icon: <ShieldCheck size={30} strokeWidth={1.8} />,
    title: "Secure Shopping",
    description:
      "Shop confidently with trusted payment options and a secure checkout experience.",
  },
  {
    icon: <Truck size={30} strokeWidth={1.8} />,
    title: "Fast Delivery",
    description:
      "Orders are packed with care and delivered safely to your doorstep across India.",
  },
  {
    icon: <Gift size={30} strokeWidth={1.8} />,
    title: "Gift-Ready Packaging",
    description:
      "Elegant packaging makes every order perfect for birthdays, anniversaries, and special occasions.",
  },
  {
    icon: <HeartHandshake size={30} strokeWidth={1.8} />,
    title: "Dedicated Support",
    description:
      "Our team is here to assist you before and after your purchase whenever you need help.",
  },
];

export default function WhyChoosePari() {
  return (
    <section className="bg-[#FFF7F7] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[5px] text-[#E02C69]">
            WHY CHOOSE US
          </span>

          <h2 className="mt-4 text-3xl font-bold text-[#3D2430] md:text-5xl">
            Why Choose Pari Jewels
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            We carefully curate elegant jewellery from trusted suppliers,
            ensuring every order delivers quality, value, and a delightful
            shopping experience.
          </p>

        </div>

        {/* Features */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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