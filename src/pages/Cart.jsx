import { useCartStore } from "../store/useCartStore";

export const Cart = () => {
  const { items, removeFromCart, clearCart } = useCartStore();

  return (
    <div>
      <h1>Cart</h1>

      <button onClick={clearCart}>Clear cart</button>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div key={item.id} style={{ margin: "10px 0" }}>
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
