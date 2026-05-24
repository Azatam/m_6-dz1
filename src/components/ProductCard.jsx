import { Card } from "antd";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

export const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card
      hoverable
      style={{ width: 250 }}
      cover={
        <Link to={`/products/${product.id}`}>
          <img
            alt={product.title}
            src={product.thumbnail}
            style={{
              height: 200,
              objectFit: "cover",
              width: "100%",
            }}
          />
        </Link>
      }
    >
      <Link to={`/products/${product.id}`}>
        <h3 style={{ margin: 0 }}>{product.title}</h3>
      </Link>

      <p style={{ margin: "5px 0" }}>{product.price}$</p>

      <p style={{ color: "gray", fontSize: 12 }}>{product.category}</p>

      <button
        onClick={() => addToCart(product)}
        style={{
          marginTop: 10,
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        Add to cart
      </button>
    </Card>
  );
};
