"use client";

import { MapPin } from "lucide-react";

interface Props {
  address: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export default function ShippingAddressCard({
  address,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-full bg-[#FFF5F8] p-3">
          <MapPin
            className="text-[#E02C69]"
            size={22}
          />
        </div>

        <h2 className="text-2xl font-bold text-[#3D2430]">
          Shipping Address
        </h2>

      </div>

      <div className="space-y-2 text-[#3D2430]">

        <p className="font-semibold">
          {address.fullName}
        </p>

        <p>{address.phone}</p>

        <p>{address.address}</p>

        <p>
          {address.city}, {address.state}
        </p>

        <p>{address.pincode}</p>

      </div>

    </div>
  );
}