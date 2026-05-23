import { create } from "zustand";

export const useFilterStore = create((set) => ({
  title: "",
  category: "",
  price: "",

  setTitle: (value) => set({ title: value }),
  setCategory: (value) => set({ category: value }),
  setPrice: (value) => set({ price: value }),

  reset: () =>
    set({
      title: "",
      category: "",
      price: "",
    }),
}));
