import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";
import { useCartContext } from "../contexts/cartContext";

export default function ProductDetail() {
  const { dispatch } = useCartContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState("");
  const { data: product, error, loading } = useFetch(`products/${id}`);

  if (error) throw error;
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">{product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
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
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: "add", id, sku });
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
