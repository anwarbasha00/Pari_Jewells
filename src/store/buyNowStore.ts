import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BuyNowItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface BuyNowStore {
  item: BuyNowItem | null;

  setItem: (item: BuyNowItem) => void;

  clearItem: () => void;
}

export const useBuyNowStore = create<BuyNowStore>()(
  persist(
    (set) => ({
      item: null,

      setItem: (item) =>
        set({
          item,
        }),

      clearItem: () =>
        set({
          item: null,
        }),
    }),
    {
      name: "pari-buy-now",
    }
  )
);