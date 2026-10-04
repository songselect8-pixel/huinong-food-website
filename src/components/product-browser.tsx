"use client";

import { useEffect, useMemo, useState } from "react";
import { sitePath } from "@/data/paths";
import { categories, products, type Product } from "@/data/site";

const searchKey = (value: string) => value.toLowerCase().replace(/ies\b/g, "y");
const orderedProducts = categories.flatMap((category) => products.filter((product) => product.categoryId === category.id));

function ProductCard({ product }: { product: Product }) {
  const category = categories.find((item) => item.id === product.categoryId);
  const href = sitePath(product.detail ? `/products/${product.id}` : `/?product=${encodeURIComponent(product.id)}#quote`);
  const image = product.detail?.images.main ?? product.conceptImage;
  const action = product.detail ? "View Product" : "Discuss Product";

  return <article className="catalog-card">
    <a className="catalog-card-media" href={href} aria-label={`${action}: ${product.name}`}>
      {image ? <img src={sitePath(image)} alt={`Illustrative concept of ${product.name.toLowerCase()}`} width={1254} height={1254} loading="lazy" /> : <span className="catalog-visual-pending">Visual in preparation</span>}
      <span className="catalog-visual-label">Illustrative concept</span>
    </a>
    <div className="catalog-card-copy">
      <span className={`mini-label ${product.id === "iqf-frozen-raspberries" ? "catalog-label-raspberry" : ""} ${product.id === "iqf-frozen-blueberries" ? "catalog-label-blueberry" : ""}`}>{category?.name}</span>
      <h2><a href={href}>{product.name}</a></h2>
      <p>{product.cardDescription ?? product.detail?.intro}</p>
      <a className="text-link" href={href}>{action} <span aria-hidden="true">↗</span></a>
    </div>
  </article>;
}

export function ProductBrowser() {
  const [categoryId, setCategoryId] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("category");
    if (categories.some((category) => category.id === requested)) setCategoryId(requested!);
  }, []);

  const selectedCategory = categories.find((category) => category.id === categoryId);
  const matches = useMemo(() => orderedProducts.filter((product) => {
    const category = categories.find((item) => item.id === product.categoryId);
    return (categoryId === "all" || product.categoryId === categoryId)
      && searchKey(`${product.name} ${category?.name ?? ""} ${product.cardDescription ?? ""}`).includes(searchKey(query.trim()));
  }), [categoryId, query]);
  const filtered = categoryId !== "all" || query.trim().length > 0;
  const selectCategory = (id: string) => {
    setCategoryId(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    window.history.replaceState(window.history.state, "", url);
  };
  const clearFilters = () => { selectCategory("all"); setQuery(""); };

  return <div className="catalog-browser" id="product-search">
    <div className="catalog-controls">
      <label className="catalog-search">
        <span>Search products</span>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search berries, raspberry leaf, tea..." />
      </label>
      <div className="catalog-filters" role="group" aria-label="Filter by product range">
        <button type="button" className={categoryId === "all" ? "is-active" : ""} aria-pressed={categoryId === "all"} onClick={() => selectCategory("all")}>All Products</button>
        {categories.map((category) => <button type="button" key={category.id} className={categoryId === category.id ? "is-active" : ""} aria-pressed={categoryId === category.id} onClick={() => selectCategory(category.id)}>{category.name}</button>)}
      </div>
    </div>
    {selectedCategory && <div className="catalog-category-intro"><strong>{selectedCategory.name}</strong><p>{selectedCategory.description}</p></div>}
    <div className="catalog-results">
      <p className="catalog-count" role="status">{matches.length} {matches.length === 1 ? "product" : "products"}{filtered ? " found" : ""}</p>
      {filtered && <button className="catalog-clear" type="button" onClick={clearFilters}>Clear filters <span aria-hidden="true">×</span></button>}
    </div>
    {matches.length ? <div className="catalog-grid">{matches.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="catalog-empty"><p>No products match this search. Try another name or range.</p><button type="button" onClick={clearFilters}>Show all products <span aria-hidden="true">↗</span></button></div>}
    <p className="catalog-image-note">Images are illustrative concepts, not photographs of confirmed supply lots. Product details are verified by project.</p>
  </div>;
}
