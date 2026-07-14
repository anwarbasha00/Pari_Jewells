import Link from "next/link";

export default function AmmuNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFF7F7] border-b border-pink-100 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/ammu"
          className="text-2xl font-bold text-[#E02C69]"
        >
          Pari Jewels
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link
            href="/ammu"
            className="transition hover:text-[#E02C69]"
          >
            Dashboard
          </Link>

          <Link
            href="/ammu/products"
            className="transition hover:text-[#E02C69]"
          >
            Products
          </Link>

          <Link
            href="/ammu/orders"
            className="transition hover:text-[#E02C69]"
          >
            Orders
          </Link>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E02C69] font-semibold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-[#3D2430]">
              Ammu
            </p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}