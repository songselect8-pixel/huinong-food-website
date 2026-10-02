"use client";

import { useState } from "react";
import { sitePath } from "@/data/paths";

export function ProductInquiryPicker({ productId, options }: { productId: string; options: { name: string; note: string }[] }) {
  const [selected, setSelected] = useState("");
  const href = sitePath(`/?product=${encodeURIComponent(productId)}${selected ? `&form=${encodeURIComponent(selected)}` : ""}#quote`);
  return <div className="pd-option-picker">
    <div className="pd-option-grid" role="group" aria-label="Select a form to discuss">
      {options.map((option) => <button type="button" key={option.name} className={`pd-option ${selected === option.name ? "is-selected" : ""}`} aria-pressed={selected === option.name} onClick={() => setSelected((current) => current === option.name ? "" : option.name)}>
        <span className="pd-option-check" aria-hidden="true">{selected === option.name ? "✓" : "+"}</span>
        <strong>{option.name}</strong>
        <span>{option.note}</span>
      </button>)}
    </div>
    <div className="pd-option-action"><p>{selected ? `${selected} added to your inquiry brief. You can change or remove it.` : "Select an option, or discuss the product without choosing a form yet."}</p><a className="button button-dark" href={href}>Discuss this product <span aria-hidden="true">↗</span></a></div>
  </div>;
}
