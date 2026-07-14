import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

interface PolicyLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  description,
  children,
}: PolicyLayoutProps) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF7F8]">

        {/* Hero */}

        <section className="border-b border-[#F4D6DD] bg-white">

          <div className="mx-auto max-w-5xl px-6 py-16 text-center">

            <h1 className="text-4xl font-bold text-[#3D2430] lg:text-5xl">
              {title}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {description}
            </p>

          </div>

        </section>

        {/* Content */}

        <section className="mx-auto max-w-5xl px-6 py-14">

          <div className="rounded-3xl border border-[#F5D9E0] bg-white p-8 shadow-sm lg:p-12">

            {children}

            <div className="mt-12 border-t border-[#F5D9E0] pt-6">

              <p className="text-sm text-gray-500">
                Last Updated: July 2026
              </p>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}