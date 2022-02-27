import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";

export default function ProductDetailRefs({ addToCart }) {
  const { id } = useParams();
  const skuRef = useRef();
  const navigate = useNavigate();
  const { data: product, error, loading } = useFetch(`products/${id}`);

  if (error) throw error;
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">{product.price}</p>
      <select id="size" ref={skuRef}>
        <option value="">What Size?</option>
        {product.skus.map((p) => {
          return (
            <option key={p.sku} value={p.sku}>
              {p.size}
            </option>
          );
        })}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert("Select Size.");
            addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.name} />
    </div>
  );
}
