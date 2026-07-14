import { CircleUserRound, Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  location: string;
  review: string;
}

export default function TestimonialCard({
  name,
  location,
  review,
}: TestimonialProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      {/* Rating */}

      <div className="mb-8 flex justify-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Review */}

      <blockquote className="text-2xl font-light leading-10 text-[#3D2430] md:text-3xl">
        "{review}"
      </blockquote>

      {/* Customer */}

      <div className="mt-12 flex flex-col items-center">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFE8EC] text-[#E02C69]">
          <CircleUserRound size={48} strokeWidth={1.5} />
        </div>

        <h4 className="mt-5 text-lg font-semibold text-[#3D2430]">
          {name}
        </h4>

        <p className="text-sm text-gray-500">
          {location}
        </p>

      </div>

    </div>
  );
}