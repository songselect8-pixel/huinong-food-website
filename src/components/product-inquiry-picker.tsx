"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { sitePath } from "@/data/paths";

const ProductInquiryContext = createContext<{ selected: string; select: (value: string) => void; href: string }>({ selected: "", select: () => {}, href: "" });

export function ProductInquiryProvider({ productId, children }: { productId: string; children: ReactNode }) {
  const [selected, setSelected] = useState("");
  const href = sitePath(`/?product=${encodeURIComponent(productId)}${selected ? `&form=${encodeURIComponent(selected)}` : ""}#quote`);
  return <ProductInquiryContext.Provider value={{ selected, select: (value) => setSelected((current) => current === value ? "" : value), href }}>{children}</ProductInquiryContext.Provider>;
}

export function ProductQuoteLink({ children = "Request a Quote", className = "button button-dark" }: { children?: ReactNode; className?: string }) {
  const { href } = useContext(ProductInquiryContext);
  return <a className={className} href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

export function ProductInquiryPicker({ options }: { options: { name: string; note: string }[] }) {
  const { selected, select } = useContext(ProductInquiryContext);
  return <div className="pd-option-picker">
    <div className="pd-option-grid" role="group" aria-label="Select a form to discuss">
      {options.map((option) => <button type="button" key={option.name} className={`pd-option ${selected === option.name ? "is-selected" : ""}`} aria-pressed={selected === option.name} onClick={() => select(option.name)}>
        <span className="pd-option-check" aria-hidden="true">{selected === option.name ? "✓" : "+"}</span>
        <strong>{option.name}</strong>
        <span>{option.note}</span>
      </button>)}
    </div>
    <div className="pd-option-action"><p role="status">{selected ? `${selected} selected. Click it again to clear, or choose another brief.` : "Choose a requirement to include in your inquiry, or continue without a selection."}</p><ProductQuoteLink /></div>
  </div>;
}
