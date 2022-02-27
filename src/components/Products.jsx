import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";
import { useParams, Link } from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();
  const {
    data: products,
    error,
    loading,
  } = useFetch(`products?category=${category}`);

  const filterProducts = size
    ? products.filter((product) =>
        product.skus.find((e) => e.size === parseInt(size))
      )
    : products;

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  const changeSize = (e) => setSize(e.target.value);

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select id="size" value={size} onChange={changeSize}>
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filterProducts.length} items</h2>}
      </section>
      <section id="products">{filterProducts.map(renderProduct)}</section>
    </>
  );
}
