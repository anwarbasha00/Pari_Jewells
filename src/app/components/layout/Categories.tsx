import Link from "next/link";
import {
  GiDiamondRing,
  GiHeartNecklace,
} from "react-icons/gi";
import { PiDiamondsFourFill } from "react-icons/pi";
import { FaGem } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { IoDiamondOutline } from "react-icons/io5";

const categories = [
  {
    title: "Rings",
    href: "/products?category=Ring",
    icon: GiDiamondRing,
  },
  {
    title: "Necklaces",
    href: "/products?category=Necklace",
    icon: GiHeartNecklace,
  },
  {
    title: "Earrings",
    href: "/products?category=Earrings",
    icon: PiDiamondsFourFill,
  },
  {
    title: "Pendants",
    href: "/products?category=Pendant",
    icon: FaGem,
  },
  {
    title: "Bracelets",
    href: "/products?category=Bracelet",
    icon: IoDiamondOutline,
  },
  {
    title: "Collections",
    href: "/products",
    icon: BsStars,
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E02C69]">
            Discover
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#3D2430]">
            Shop By Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#7D5A67]">
            Find the perfect jewellery for every occasion.
          </p>

        </div>

        {/* Categories */}

        <div className="grid grid-cols-2 mt-14 flex flex-wrap justify-center gap-5">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#F0C8CF]
                  bg-white
                  px-6
                  py-3
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#E02C69]
                  hover:bg-[#FFE8EC]
                  hover:shadow-lg
                "
              >
                <Icon
                  size={22}
                  className="text-[#3D2430] transition group-hover:text-[#E02C69]"
                />

                <span className="font-medium text-[#3D2430] transition group-hover:text-[#E02C69]">
                  {category.title}
                </span>

              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}