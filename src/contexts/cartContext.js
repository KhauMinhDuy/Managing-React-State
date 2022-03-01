import React, { useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducer/CartReducer";

const CartContext = React.createContext(null);

let initialize;
try {
  initialize = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch (e) {
  console.log(e);
  initialize = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialize);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCartContext must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error"
    );
  }
  return context;
}
