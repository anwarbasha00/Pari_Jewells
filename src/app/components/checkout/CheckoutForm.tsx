"use client";

interface CheckoutFormProps {
  formData: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function CheckoutForm({
  formData,
  onChange,
}: CheckoutFormProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="mb-8 text-2xl font-semibold text-[#3D2430]">
        Shipping Address
      </h2>

      <div className="space-y-6">

        {/* Full Name */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-[#3D2430]">
  Full Name
</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Enter your full name"
            className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-[#3D2430]
placeholder:text-gray-400
transition
focus:border-[#E02C69]
focus:ring-4
focus:ring-[#FFE7EF]
outline-none
"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block font-medium text-[#3D2430]">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Enter phone number"
            className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-[#3D2430]
placeholder:text-gray-400
transition
focus:border-[#E02C69]
focus:ring-4
focus:ring-[#FFE7EF]
outline-none
"
          />

        </div>

        {/* Address */}

        <div>

          <label className="mb-2 block font-medium text-[#3D2430]">
            Address
          </label>

          <textarea
            rows={4}
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="House No, Street, Landmark"
            className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-[#3D2430]
placeholder:text-gray-400
transition
focus:border-[#E02C69]
focus:ring-4
focus:ring-[#FFE7EF]
outline-none
"
          />

        </div>

        {/* City + State */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium text-[#3D2430]">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="City"
              className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-[#3D2430]
placeholder:text-gray-400
transition
focus:border-[#E02C69]
focus:ring-4
focus:ring-[#FFE7EF]
outline-none
"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium text-[#3D2430]">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChange}
              placeholder="State"
              className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-[#3D2430]
placeholder:text-gray-400
transition
focus:border-[#E02C69]
focus:ring-4
focus:ring-[#FFE7EF]
outline-none
"
            />

          </div>

        </div>

        {/* Pincode */}

        <div>

          <label className="mb-2 block font-medium text-[#3D2430]">
            Pincode
          </label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={onChange}
            placeholder="6-digit pincode"
            className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-[#3D2430]
placeholder:text-gray-400
transition
focus:border-[#E02C69]
focus:ring-4
focus:ring-[#FFE7EF]
outline-none
"
          />

        </div>

      </div>


    </div>
  );
}