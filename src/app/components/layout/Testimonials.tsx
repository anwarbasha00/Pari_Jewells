"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Hyderabad",
    review:
      "Absolutely beautiful jewellery. The quality exceeded my expectations and the packaging was elegant.",
  },
  {
    name: "Anjali Reddy",
    location: "Bengaluru",
    review:
      "Exactly as shown in the photos. Delivery was quick and the necklace looks stunning.",
  },
  {
    name: "Sneha Patel",
    location: "Mumbai",
    review:
      "Loved the shopping experience. The jewellery feels premium and customer support was wonderful.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6">

        {/* Heading */}

        <div className="mb-14 text-center">
          <p className="text-sm font-medium uppercase tracking-[5px] text-[#E02C69]">
            Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-semibold text-[#3D2430]">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-600">
            Hear from customers who chose Pari Jewels for life's
            special moments.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
          >
            <TestimonialCard {...testimonials[index]} />
          </motion.div>
        </AnimatePresence>

        {/* Dots */}

        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === i
                  ? "w-8 bg-[#E02C69]"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}