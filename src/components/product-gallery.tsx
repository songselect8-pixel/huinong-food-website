"use client";

import { useState } from "react";
import { sitePath } from "@/data/paths";

export function ProductGallery({ name, images }: { name: string; images: { main: string; detail: string; application: string } }) {
  const [selected, setSelected] = useState(0);
  const views = [
    { src: images.main, label: "Product", alt: `Illustrative product concept of ${name.toLowerCase()}` },
    { src: images.detail, label: "Detail", alt: `Illustrative close detail of ${name.toLowerCase()}` },
    { src: images.application, label: "Application", alt: `Illustrative use concept for ${name.toLowerCase()}` },
  ];
  return <div className="pd-product-gallery">
    <figure className="pd-main-image">
      <img src={sitePath(views[selected].src)} alt={views[selected].alt} width={1254} height={1254} loading="eager" fetchPriority="high" />
      <figcaption aria-live="polite">{views[selected].label} concept · not a verified lot photograph</figcaption>
    </figure>
    <div className="pd-gallery-thumbs" role="group" aria-label={`${name} image views`}>
      {views.map((view, index) => <button type="button" key={view.src} aria-pressed={selected === index} aria-label={`Show ${view.label.toLowerCase()} image`} onClick={() => setSelected(index)}>
        <img src={sitePath(view.src)} alt="" width={180} height={135} />
        <span>{view.label}</span>
      </button>)}
    </div>
  </div>;
}
