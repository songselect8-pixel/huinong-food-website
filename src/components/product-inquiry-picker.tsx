"use client";
import SiteLink from "@/components/site-link";

import { createContext, useContext, useState, type ReactNode } from "react";
import { sitePath } from "@/data/paths";
import { useInquiryDraft } from "./inquiry-draft";
import { useRouter } from "next/navigation";
import { products } from "@/data/site";
import { productReview } from "@/data/buyer-support";

const ProductInquiryContext = createContext<{ productId: string; selected: string; select: (value: string) => void; href: string }>({ productId: "", selected: "", select: () => {}, href: "" });

export function ProductInquiryProvider({ productId, children }: { productId: string; children: ReactNode }) {
  const { fields } = useInquiryDraft();
  const [selected, setSelected] = useState(() => fields.productId === productId ? fields.form : "");
  const href = sitePath(`/contact?product=${encodeURIComponent(productId)}${selected ? `&form=${encodeURIComponent(selected)}` : ""}`);
  return <ProductInquiryContext.Provider value={{ productId, selected, select: (value) => setSelected((current) => current === value ? "" : value), href }}>{children}</ProductInquiryContext.Provider>;
}

export function ProductSampleBrief() {
  const { productId, selected } = useContext(ProductInquiryContext);
  const { applyBrief, fields } = useInquiryDraft();
  const router = useRouter();
  const product = products.find(item => item.id === productId);
  const review = productReview[productId];
  const [checks, setChecks] = useState<string[]>(fields.productId === productId ? (review?.checks.filter(check => fields.sampleFocus.split("\n").includes(check)) ?? []) : []);
  if (!product || !review) return null;
  return <aside className="pd-sample-brief" id="sample-review" aria-labelledby="sample-review-title">
    <div><span className="mini-label">Evaluate before you specify</span><h3 id="sample-review-title">Plan Your Sample Review</h3><p>Select the checks relevant to your trial. Sample availability, quantity, cost and delivery arrangements are agreed separately.</p><button type="button" className="button button-outline" onClick={() => {applyBrief({kind:"sample", productId, categoryId:product.categoryId, form:selected, sampleFocus:checks.join("\n"), source:`/products/${productId}`}); router.push("/contact");}}>Discuss a Sample <span aria-hidden="true">↗</span></button></div>
    <fieldset><legend>Evaluation topics <span>Optional</span></legend>{review.checks.map(check => <label key={check}><input type="checkbox" checked={checks.includes(check)} onChange={event => setChecks(event.target.checked ? [...checks, check] : checks.filter(item => item !== check))} /><span>{check}</span></label>)}</fieldset>
  </aside>;
}

export function ProductQuoteLink({ children = "Request a Quote", className = "button button-dark" }: { children?: ReactNode; className?: string }) {
  const { href } = useContext(ProductInquiryContext);
  return <SiteLink className={className} href={href}>{children} <span aria-hidden="true">↗</span></SiteLink>;
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
