"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { useCartStore } from "@/src/store/cartStore";

export default function CartSync() {
  const { status } = useSession();

  const setCart = useCartStore(
    (state) => state.setCart
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await axios.get("/api/cart");

        if (res.data.success && res.data.cart) {
          setCart(res.data.cart.items);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (status === "authenticated") {
      loadCart();
    }

    if (status === "unauthenticated") {
      clearCart();
    }
  }, [status, setCart, clearCart]);

  return null;
}