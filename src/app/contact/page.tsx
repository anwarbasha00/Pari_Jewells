import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA] py-16 sm:py-20">

        <div className="mx-auto max-w-3xl px-5 sm:px-6">

          {/* Heading */}

          <div className="text-center">

            <span className="inline-flex rounded-full bg-[#FDECF2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E02C69] sm:text-sm">
              Contact Us
            </span>

            <h1 className="mt-6 text-4xl font-bold text-[#3D2430] sm:text-5xl">
              We'd Love to Hear From You
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Have a question about our jewellery, your order,
              or need assistance? Reach out to us anytime.
            </p>

          </div>

          {/* Contact Card */}

         {/* Contact Cards */}

<div className="mt-14 grid gap-6 lg:grid-cols-2">

  {/* Email */}

  <div className="rounded-3xl border border-[#F4D6DD] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

    <div className="flex flex-col items-center text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1F5] text-[#E02C69]">

        <Mail size={30} />

      </div>

      <h2 className="mt-5 text-2xl font-bold text-[#3D2430]">
        Email Us
      </h2>

      <p className="mt-3 text-gray-600 break-all">
        support@parijewels.com
      </p>

      <Link
        href="mailto:support@parijewels.com"
        className="mt-8 rounded-xl bg-[#E02C69] px-6 py-3 font-semibold text-white transition hover:bg-[#C91F5B]"
      >
        Send Email
      </Link>

    </div>

  </div>

  {/* Instagram */}

  <div className="rounded-3xl border border-[#F4D6DD] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

    <div className="flex flex-col items-center text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1F5] text-[#E02C69]">

        <FaInstagram size={30} />

      </div>

      <h2 className="mt-5 text-2xl font-bold text-[#3D2430]">
        Instagram
      </h2>

      <p className="mt-3 text-gray-600">
        @parijewels
      </p>

      <Link
        href="https://instagram.com/parijewels"
        target="_blank"
        className="mt-8 rounded-xl border border-[#E02C69] px-6 py-3 font-semibold text-[#E02C69] transition hover:bg-[#FFF1F5]"
      >
        Visit Profile
      </Link>

    </div>

  </div>

</div>

        </div>

      </main>

      <Footer />
    </>
  );
}