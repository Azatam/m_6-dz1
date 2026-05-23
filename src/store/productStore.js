import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set) => ({
      search: "",
      category: "",
      maxPrice: "",

      setSearch: (value) => set({ search: value }),
      setCategory: (value) => set({ category: value }),
      setMaxPrice: (value) => set({ maxPrice: value }),

      resetFilters: () =>
        set({
          search: "",
          category: "",
          maxPrice: "",
        }),
    }),
    {
      name: "product-filters", // ключ в localStorage
    },
  ),
);
