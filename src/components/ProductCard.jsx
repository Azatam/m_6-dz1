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
            src={product.images[0]}
            style={{
              height: 200,
              objectFit: "cover",
            }}
          />
        </Link>
      }
    >
      <h3>{product.title}</h3>

      <p>{product.price}$</p>

      <p>{product.category?.name}</p>

      <button onClick={() => addToCart(product)}>Add to cart</button>
    </Card>
  );
};
