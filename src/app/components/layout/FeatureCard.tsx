import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-3xl border border-[#F4E4E7] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#E02C69] hover:shadow-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFE8EC] text-[#E02C69] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-[#3D2430]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-600">
        {description}
      </p>
    </div>
  );
}