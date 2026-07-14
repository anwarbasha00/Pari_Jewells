import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  ChevronRight,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";

import logo from "../../public/images/pari_logo-Picsart-BackgroundRemover.jpeg"; // Update path if needed

const shopLinks = [
  { name: "Rings", href: "/products?category=Ring" },
  { name: "Necklaces", href: "/products?category=Necklace" },
  { name: "Earrings", href: "/products?category=Earring" },
  { name: "Bracelets", href: "/products?category=Bracelet" },
  { name: "Pendants", href: "/products?category=Pendant" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "shipping-policy", href: "/shipping-policy" },

  { name: "cancellation-refund-policy", href: "/cancellation-refund-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#3D2430] text-white">

      {/* Main Footer */}

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-14 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <Image
              src={logo}
              alt="Pari Jewels"
              width={170}
              className="h-auto w-auto"
            />

            <p className="mt-5 leading-8 text-gray-300">
              Discover elegant jewellery collections curated for every
              celebration. Timeless designs that add sparkle to every
              special moment.
            </p>

            {/* Social */}

            <div className="mt-8 flex gap-4">

              <Link
                href="https://www.instagram.com/_pari_jewels?igsh=MTgxcGp0c3M0dm15cg=="
                target="_blank"
                className="rounded-full bg-white/10 p-3 transition-all hover:bg-[#E02C69]"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="https://facebook.com/"
                target="_blank"
                className="rounded-full bg-white/10 p-3 transition-all hover:bg-[#E02C69]"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="https://pinterest.com/"
                target="_blank"
                className="rounded-full bg-white/10 p-3 transition-all hover:bg-[#E02C69]"
              >
                <FaPinterestP size={18} />
              </Link>

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Shop
            </h3>

            <ul className="space-y-4">

              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 transition hover:text-[#E02C69]"
                  >
                    <ChevronRight size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Company
            </h3>

            <ul className="space-y-4">

              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 transition hover:text-[#E02C69]"
                  >
                    <ChevronRight size={16} />
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Contact
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-3">

                <Mail
                  size={20}
                  className="mt-1 text-[#E02C69]"
                />

                <span className="text-gray-300">
                  support@parijewels.com
                </span>

              </div>

              <div className="flex items-start gap-3">

                <Phone
                  size={20}
                  className="mt-1 text-[#E02C69]"
                />

                <span className="text-gray-300">
                  +91 98765 43210
                </span>

              </div>

              <div className="flex items-start gap-3">

                <MapPin
                  size={20}
                  className="mt-1 text-[#E02C69]"
                />

                <span className="text-gray-300">
                  Hyderabad, Telangana, India
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} Pari Jewels. All Rights Reserved.
          </p>

          <p>
            Crafted with ❤️ for Jewellery Lovers
          </p>

        </div>

      </div>

    </footer>
  );
}