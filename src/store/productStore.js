import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set) => ({
      search: "",
      category: "",
      maxPrice: "",

      setSearch: (v) => set({ search: v }),
      setCategory: (v) => set({ category: v }),
      setMaxPrice: (v) => set({ maxPrice: v }),

      resetFilters: () => set({ search: "", category: "", maxPrice: "" }),
    }),
    {
      name: "product-filters",
    },
  ),
);
