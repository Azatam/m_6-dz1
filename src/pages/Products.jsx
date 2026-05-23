import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";
import { useProductStore } from "../store/productStore";

export const Products = () => {
  const {
    search,
    category,
    maxPrice,
    setSearch,
    setCategory,
    setMaxPrice,
    resetFilters,
  } = useProductStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );
      return response.data;
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  const filteredProducts = data.filter((product) => {
    const matchTitle = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? product.category?.name?.toLowerCase().includes(category.toLowerCase())
      : true;

    const matchPrice = maxPrice ? product.price <= Number(maxPrice) : true;

    return matchTitle && matchCategory && matchPrice;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={resetFilters}>Reset</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
