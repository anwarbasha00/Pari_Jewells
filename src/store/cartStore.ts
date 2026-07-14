import { create } from "zustand";
import { CartItem } from "../types/cart";

interface CartStore {
  items: CartItem[];

  setCart: (items: CartItem[]) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  setCart: (items) =>
    set({
      items,
    }),

  clearCart: () =>
    set({
      items: [],
    }),
}));