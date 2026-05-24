import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/fetchProducts";
import { useProductStore } from "../store/productStore";
import { ProductCard } from "../components/ProductCard";

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
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <h1 style={{ textAlign: "center", marginTop: 50 }}>Loading...</h1>;
  }

  if (isError) {
    return (
      <h1 style={{ textAlign: "center", marginTop: 50 }}>
        Error loading products
      </h1>
    );
  }

  const filtered = data.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (!category ||
        p.category?.toLowerCase().includes(category.toLowerCase())) &&
      (!maxPrice || p.price <= Number(maxPrice))
    );
  });

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 25 }}>Products</h1>

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 30,
          flexWrap: "wrap",
          alignItems: "center",
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 16,
        }}
      >
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: 10,
            border: "1px solid #ddd",
            minWidth: 220,
            fontSize: 16,
            outline: "none",
          }}
        />

        <input
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: 10,
            border: "1px solid #ddd",
            minWidth: 180,
            fontSize: 16,
            outline: "none",
          }}
        />

        <input
          type="number"
          placeholder="Max price..."
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: 10,
            border: "1px solid #ddd",
            width: 150,
            fontSize: 16,
            outline: "none",
          }}
        />

        <button
          onClick={resetFilters}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: "black",
            color: "white",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Reset
        </button>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
