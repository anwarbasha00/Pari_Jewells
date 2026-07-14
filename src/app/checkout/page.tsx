"use client";
import {
  ShoppingCart,
  CreditCard,
  CircleCheck,
} from "lucide-react";
import {
  Wallet,
  Banknote,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";

import { useCartStore } from "@/src/store/cartStore";
import { useBuyNowStore } from "@/src/store/buyNowStore";
import auth from "../../lib/auth";
import { redirect } from "next/navigation";
import axios from "axios";
export default function CheckoutPage() {
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
  "COD" | "ONLINE"
>("COD");
  // Cart Store
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  // Buy Now Store
  const buyNowItem = useBuyNowStore((state) => state.item);
  const clearBuyNowItem = useBuyNowStore(
    (state) => state.clearItem
  );

  // Checkout Items
  const items = buyNowItem ? [buyNowItem] : cartItems;

  const totalPrice = items.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const loadRazorpay = () => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

  async function handlePlaceOrder() {
    const loaded = await loadRazorpay();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (items.length === 0) {
      alert("No products found.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items,
          shippingAddress: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order."
        );
      }

      router.push("/order-success");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handlePayment = async () => {
  try {
  const loaded = await loadRazorpay();

if (!loaded) {
  alert("Failed to load Razorpay SDK");
  return;
}
    // Validate form
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (items.length === 0) {
      alert("No products found.");
      return;
    }

    setLoading(true);

    // Create Razorpay Order
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
  amount: totalPrice,
  isBuyNow: !!buyNowItem,
  buyNowItem,
}),
    });

    const order = await res.json();


if (!res.ok) {
  throw new Error(
    order.message || "Failed to create payment."
  );
}

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "Pari Jewels",

      description: "Jewellery Purchase",

      order_id: order.id,

handler: async function (response: any) {
  try {
    const verifyRes = await axios.post("/api/payment/verify", {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,

    shippingAddress: formData,

    isBuyNow: !!buyNowItem,

    buyNowItem,
});

    if (verifyRes.data.success) {
      router.replace("/order-success");
    }
  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      error.message ||
      "Payment verification failed."
    );
  }
},

      prefill: {
        name: formData.fullName,
        contact: formData.phone,
      },

      theme: {
        color: "#E02C69",
      },
    };

    const razorpay = new (window as any).Razorpay(options);

    razorpay.open();
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
 const { status } = useSession();

useEffect(() => {
  if (status === "loading") return;

  if (status === "unauthenticated") {
    router.replace("/login");
    return;
  }

  if (status === "authenticated" && items.length === 0) {
    router.replace("/cart");
  }
}, [status, items, router]);
if (
  status === "loading" ||
  (status === "authenticated" && items.length === 0)
) {
  return null;
}
  
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">

          {/* Header */}
<div className="mb-12">

  <h1 className="text-4xl font-bold text-[#3D2430]">
    Secure Checkout
  </h1>

  <p className="mt-3 text-gray-500">
    Complete your purchase securely. All payments are encrypted and protected.
  </p>

  {/* Progress Stepper */}

  <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

    <div className="flex items-center justify-between">

      {/* Cart */}

      <div className="flex flex-col items-center">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
          <ShoppingCart size={22} />
        </div>

        <p className="mt-2 text-sm font-semibold">
          Cart
        </p>

        <CircleCheck
          size={18}
          className="mt-1 text-green-600"
        />

      </div>

      <div className="h-[2px] flex-1 bg-gray-200 mx-4" />

      {/* Checkout */}

      <div className="flex flex-col items-center">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E02C69] text-white">

          <CreditCard size={22} />

        </div>

        <p className="mt-2 font-semibold text-[#E02C69]">
          Checkout
        </p>

      </div>

      <div className="h-[2px] flex-1 bg-gray-200 mx-4" />

      {/* Success */}

      <div className="flex flex-col items-center">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">

          <CircleCheck size={22} />

        </div>

        <p className="mt-2 text-sm text-gray-400">
          Success
        </p>

      </div>

    </div>

  </div>

</div>

          {/* Layout */}

          <div className="grid gap-8 lg:grid-cols-[1.7fr_420px]">

            {/* Shipping Form */}
<div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

  {/* Header */}

  <div className="mb-8 flex items-center gap-4">

    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE7EF] text-lg font-bold text-[#E02C69]">
      1
    </div>

    <div>
      <h2 className="text-2xl font-bold text-[#3D2430]">
        Shipping Address
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Enter your delivery details for a smooth and secure delivery.
      </p>
    </div>

  </div>

  <CheckoutForm
    formData={formData}
    onChange={handleChange}
  />

</div>

            {/* Order Summary */}
<div className="sticky top-24 h-fit">

  <OrderSummary
    items={items}
    loading={loading}
    onPlaceOrder={
      paymentMethod === "COD"
        ? handlePlaceOrder
        : handlePayment
    }
  />

</div>

<div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

  {/* Header */}

  <div className="mb-8 flex items-center gap-4">

    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE7EF] text-lg font-bold text-[#E02C69]">
      2
    </div>

    <div>

      <h2 className="text-2xl font-bold text-[#3D2430]">
        Payment Method
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Choose how you'd like to complete your purchase.
      </p>

    </div>

  </div>

  <div className="space-y-5">

    {/* COD */}

    <label
      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-6 transition-all duration-200 ${
        paymentMethod === "COD"
          ? "border-[#E02C69] bg-[#FFF5F8] shadow-sm"
          : "border-gray-200 hover:border-[#E02C69]"
      }`}
    >

      <div className="flex items-center gap-5">

        <div className="rounded-full bg-[#FFE7EF] p-3">

          <Banknote
            className="text-[#E02C69]"
            size={24}
          />

        </div>

        <div>

          <h3 className="text-lg font-semibold text-[#3D2430]">
            Cash on Delivery
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Pay once your jewellery is delivered.
          </p>

        </div>

      </div>

      <input
        type="radio"
        checked={paymentMethod === "COD"}
        onChange={() => setPaymentMethod("COD")}
      />

    </label>

    {/* ONLINE */}

    <label
      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-6 transition-all duration-200 ${
        paymentMethod === "ONLINE"
          ? "border-[#E02C69] bg-[#FFF5F8] shadow-sm"
          : "border-gray-200 hover:border-[#E02C69]"
      }`}
    >

      <div className="flex items-center gap-5">

        <div className="rounded-full bg-[#FFE7EF] p-3">

          <CreditCard
            className="text-[#E02C69]"
            size={24}
          />

        </div>

        <div>

          <h3 className="text-lg font-semibold text-[#3D2430]">
            Secure Online Payment
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            UPI, Cards, Wallets & Net Banking
          </p>

        </div>

      </div>

      <input
        type="radio"
        checked={paymentMethod === "ONLINE"}
        onChange={() =>
          setPaymentMethod("ONLINE")
        }
      />

    </label>

  </div>

  {/* Security Note */}

  <div className="mt-8 rounded-2xl bg-[#FFF8F9] p-5">

    <div className="flex items-start gap-3">

      <ShieldCheck
        className="mt-1 text-green-600"
        size={22}
      />

      <div>

        <h4 className="font-semibold text-[#3D2430]">
          Secure Payments
        </h4>

        <p className="mt-1 text-sm text-gray-500">
          All online payments are encrypted and
          securely processed via Razorpay.
        </p>

      </div>

    </div>

  </div>

</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}