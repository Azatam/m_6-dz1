import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const items = get().items;

        const exists = items.find((i) => i.id === product.id);

        if (exists) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
            ),
          });
        } else {
          set({
            items: [...items, { ...product, qty: 1 }],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter((i) => i.id !== id),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
