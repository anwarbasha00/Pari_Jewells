"use client";

import {
  Circle,
  CircleCheck,
} from "lucide-react";

interface Props {
  status: string;
}

const steps = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
];

export default function TimelineCard({
  status,
}: Props) {
  const currentIndex =
    steps.indexOf(status);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="mb-8 text-2xl font-bold text-[#3D2430]">
        Order Timeline
      </h2>

      <div className="space-y-6">

        {steps.map((step, index) => {

          const completed =
            index <= currentIndex;

          return (
            <div
              key={step}
              className="flex items-center gap-4"
            >

              {completed ? (
                <CircleCheck
                  size={22}
                  className="text-green-600"
                />
              ) : (
                <Circle
                  size={22}
                  className="text-gray-300"
                />
              )}

              <span
                className={
                  completed
                    ? "font-semibold"
                    : "text-gray-400"
                }
              >
                {step}
              </span>

            </div>
          );

        })}

      </div>

    </div>
  );
}