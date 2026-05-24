import { Card, Button } from "antd";
import { useCartStore } from "../store/useCartStore";

export const Cart = () => {
  const { items, removeFromCart, clearCart } = useCartStore();

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 20 }}>Cart</h1>

      {items.length > 0 && (
        <Button danger onClick={clearCart} style={{ marginBottom: 20 }}>
          Clear cart
        </Button>
      )}

      {items.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: 50 }}>Cart is empty</h2>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {items.map((item) => (
          <Card
            key={item.id}
            style={{
              borderRadius: 16,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  background: "#f5f5f5",
                  borderRadius: 12,
                  padding: 10,
                }}
              />

              <div style={{ flex: 1 }}>
                <h2>{item.title}</h2>

                <p style={{ color: "gray" }}>Quantity: {item.quantity}</p>

                <h3>${item.price}</h3>
              </div>

              <Button danger onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
