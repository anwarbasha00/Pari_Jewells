import {
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { BsPatchCheck } from "react-icons/bs";

const announcements = [
  {
    icon: FiTruck,
    text: "Free Shipping Above ₹999",
  },
  {
    icon: BsPatchCheck,
    text: "Hallmarked Jewellery",
  },
  {
    icon: FiShield,
    text: "100% Secure Payments",
  },
  {
    icon: FiRefreshCw,
    text: "7-Day Easy Returns",
  },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-[#3D2430] text-white">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4">

        {/* Mobile */}
        <div className="flex items-center gap-2 text-sm md:hidden">
          <FiTruck className="text-[#C8A95A]" />
          <span>{announcements[0].text}</span>
        </div>

        {/* Desktop */}
        <div className="hidden items-center gap-6 text-sm md:flex">
          {announcements.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Icon className="text-[#C8A95A]" />

                <span>{item.text}</span>

                {index !== announcements.length - 1 && (
                  <span className="ml-4 text-[#7D5A67]">|</span>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}