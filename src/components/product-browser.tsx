"use client";

import { useEffect, useMemo, useState } from "react";
import { sitePath } from "@/data/paths";
import { categories, products } from "@/data/site";

const searchKey = (value: string) => value.toLowerCase().replace(/ies\b/g, "y");

export function ProductBrowser() {
  const [categoryId, setCategoryId] = useState("all");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("category");
    if (categories.some((category) => category.id === requested)) setCategoryId(requested!);
  }, []);
  const [query, setQuery] = useState("");
  const matches = useMemo(() => products.filter((product) => {
    const category = categories.find((item) => item.id === product.categoryId);
    return (categoryId === "all" || product.categoryId === categoryId)
      && searchKey(`${product.name} ${category?.name ?? ""}`).includes(searchKey(query.trim()));
  }), [categoryId, query]);
  const rangeCount = new Set(matches.map((product) => product.categoryId)).size;

  return (
    <div className="catalog-browser" id="product-search">
      <div className="catalog-controls">
        <label className="catalog-search">
          <span>Search product directions</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search berries, raspberry leaf, tea..." />
        </label>
        <div className="catalog-filters" role="group" aria-label="Filter by product range">
          <button type="button" className={categoryId === "all" ? "is-active" : ""} aria-pressed={categoryId === "all"} onClick={() => setCategoryId("all")}>All ranges</button>
          {categories.map((category) => <button type="button" key={category.id} className={categoryId === category.id ? "is-active" : ""} aria-pressed={categoryId === category.id} onClick={() => setCategoryId(category.id)}>{category.name}</button>)}
        </div>
      </div>
      <p className="catalog-count" role="status">{matches.length} product {matches.length === 1 ? "direction" : "directions"} across {rangeCount} {rangeCount === 1 ? "range" : "ranges"}</p>
      {matches.length ? <div className="catalog-groups">
        {categories.map((category) => {
          const groupProducts = matches.filter((product) => product.categoryId === category.id);
          if (!groupProducts.length) return null;
          return <section className={`catalog-group ${category.id === "frozen-berries" ? "catalog-group-frozen" : ""}`} aria-labelledby={`catalog-${category.id}`} key={category.id}>
            <div className="catalog-group-heading">
              <div><span className="catalog-group-number">{category.number} / 05 · Ingredient range</span><h2 id={`catalog-${category.id}`}>{category.name}</h2></div>
              <p>{category.description}</p>
            </div>
            <div className="catalog-grid">
              {groupProducts.map((product) => {
                const href = sitePath(product.detail ? `/products/${product.id}` : `/?product=${encodeURIComponent(product.id)}#quote`);
                const image = product.conceptImage ?? product.detail?.images.main;
                return <article className={`catalog-card ${product.id === "iqf-frozen-raspberries" ? "catalog-card-raspberry" : ""} ${product.id === "iqf-frozen-blueberries" ? "catalog-card-blueberry" : ""}`} key={product.id}>
                  <a className="catalog-card-media" href={href} aria-label={`${product.detail ? "View" : "Discuss"} ${product.name}`}>
                    {image ? <img src={sitePath(image)} alt={`Illustrative concept of ${product.name.toLowerCase()}`} width={1254} height={1254} loading="lazy" /> : <span className="catalog-visual-pending">Visual in preparation</span>}
                    <span className="catalog-visual-label">Illustrative concept</span>
                  </a>
                  <div className="catalog-card-copy">
                    <span className="mini-label">{category.name}</span>
                    <h3>{product.name}</h3>
                    <p>{product.cardDescription ?? product.detail?.intro}</p>
                    <a className="text-link" href={href}>{product.detail ? "View sourcing details" : "Discuss this direction"} <span aria-hidden="true">↗</span></a>
                  </div>
                </article>;
              })}
            </div>
          </section>;
        })}
      </div> : <p className="catalog-empty">No matching directions. Try another product name or range.</p>}
      <p className="catalog-image-note">Images are illustrative concepts, not photographs of confirmed supply lots. Product details are verified by project.</p>
    </div>
  );
}
