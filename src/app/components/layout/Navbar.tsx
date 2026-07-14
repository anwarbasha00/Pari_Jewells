"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react";

import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiPackage,
} from "react-icons/fi";

import SearchModal from "./SearchModal";
import { useCartStore } from "@/src/store/cartStore";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Collections",
    href: "/products",
  },
  {
    name: "New Arrivals",
    href: "/products?filter=new",
  },
  {
    name: "Best Sellers",
    href: "/products?filter=bestseller",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const router = useRouter();

  const { status } = useSession();

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const items = useCartStore(
    (state) => state.items
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );


const clearCart = useCartStore((state) => state.clearCart);

const handleLogout = async () => {
  clearCart();

  await signOut({
    callbackUrl: "/",
  });
};

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#F0C8CF] bg-white/90 backdrop-blur-md">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}

          <Link href="/">
            <h1 className="text-3xl font-bold tracking-wide text-[#3D2430]">
              Pari
              <span className="text-[#E02C69]">
                {" "}
                Jewels
              </span>
            </h1>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-10 lg:flex">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="
                  relative
                  text-[15px]
                  font-medium
                  text-[#3D2430]
                  transition
                  hover:text-[#E02C69]

                  after:absolute
                  after:left-0
                  after:-bottom-2
                  after:h-[2px]
                  after:w-0
                  after:bg-[#E02C69]
                  after:transition-all

                  hover:after:w-full
                "
              >
                {link.name}
              </Link>
            ))}

          </nav>

          {/* Right Section */}

          <div className="flex items-center gap-5">

            {/* Search */}

            <button
              onClick={() =>
                setIsSearchOpen(true)
              }
              className="transition hover:text-[#E02C69]"
            >
              <FiSearch size={22} />
            </button>

            {/* Cart */}

            <Link
              href="/cart"
              className="relative transition hover:text-[#E02C69]"
            >
              <FiShoppingBag size={22} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E02C69] text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Login / Logout */}

       {status === "authenticated" ? (
  <>
    <Link
      href="/my-orders"
      className="
        hidden
        md:flex
        items-center
        gap-2
        rounded-xl
        border
        border-[#E02C69]
        px-5
        py-2.5
        font-medium
        text-[#E02C69]
        transition
        hover:bg-[#FFF5F8]
      "
    >
      <FiPackage />
      My Orders
    </Link>

    <button
      onClick={handleLogout}
      className="
        hidden
        md:flex
        items-center
        gap-2
        rounded-xl
        bg-red-500
        px-5
        py-2.5
        font-medium
        text-white
        transition
        hover:bg-red-600
      "
    >
      <FiUser />
      Logout
    </button>
  </>
) :(
              <Link
                href="/login"
                className="
                  hidden
                  md:flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#E02C69]
                  px-5
                  py-2.5
                  font-medium
                  text-white
                  transition
                  hover:bg-[#C91F59]
                "
              >
                <FiUser />

                Login
              </Link>
            )}

            {/* Mobile Menu */}

            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="lg:hidden"
            >
              {mobileMenuOpen ? (
                <FiX size={28} />
              ) : (
                <FiMenu size={28} />
              )}
            </button>

          </div>

        </div>
                {/* Mobile Menu */}

        {mobileMenuOpen && (
          <div className="border-t border-[#F0C8CF] bg-white lg:hidden">

            <nav className="flex flex-col px-6 py-6">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 py-4 text-[16px] font-medium text-[#3D2430] transition hover:text-[#E02C69]"
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-6">

                {status === "authenticated" ? (
                  <>
  <Link
    href="/my-orders"
    onClick={() => setMobileMenuOpen(false)}
    className="
      mb-3
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-[#E02C69]
      py-3
      font-medium
      text-[#E02C69]
      transition
      hover:bg-[#FFF5F8]
    "
  >
    <FiPackage />
    My Orders
  </Link>

  <button
    onClick={async () => {
      setMobileMenuOpen(false);
      await handleLogout();
    }}
    className="
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-red-500
      py-3
      font-medium
      text-white
      transition
      hover:bg-red-600
    "
  >
    <FiUser />
    Logout
  </button>
</>
                ) : (
                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E02C69] py-3 font-medium text-white transition hover:bg-[#C91F59]"
                  >
                    <FiUser />

                    Login
                  </Link>
                )}

              </div>

            </nav>

          </div>
        )}
      </header>

      {/* Search Modal */}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() =>
          setIsSearchOpen(false)
        }
      />
    </>
  );
}