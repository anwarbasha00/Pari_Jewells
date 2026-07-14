import {
  Truck,
  ShieldCheck,
  Gift,
} from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Carefully packed and delivered safely to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description:
      "Safe and trusted payment experience with secure checkout.",
  },
  {
    icon: Gift,
    title: "Perfect for Gifting",
    description:
      "Beautiful jewellery that's ideal for birthdays, anniversaries and celebrations.",
  },
];

export default function ShippingInfo() {
  return (
    <section className="mt-20">

      <div className="grid gap-6 md:grid-cols-3">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#F3E4E8] bg-[#FFF9FA] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E02C69]/40 hover:shadow-lg"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE8EC]">

                <Icon
                  size={28}
                  className="text-[#E02C69]"
                />

              </div>

              <h3 className="text-lg font-semibold text-[#3D2430]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {item.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}