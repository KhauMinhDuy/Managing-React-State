import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Checkout from "./components/Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((item) => item.sku === sku);
      if (itemInCart) {
        return items.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0
        ? items.filter((item) => item.sku !== sku)
        : items.map((item) =>
            item.sku === sku ? { ...item, quantity } : item
          );
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
