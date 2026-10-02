"use client";

import { useState } from "react";

const topics = [
  {
    title: "Ingredient specifications",
    answer: "Tell us the ingredient, intended use and cut or presentation you need. We can then discuss which product details are available for review.",
  },
  {
    title: "Packaging information",
    answer: "Share your preferred format, pack size and labeling questions. Available options must be confirmed for the specific product and project.",
  },
  {
    title: "Documents for your market",
    answer: "Let us know which supporting documents your team requires and where the product will be sold. We will confirm what can be provided; no documents are implied here.",
  },
] as const;

export function QualityDetails() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  return (
    <div className="quality-questions" data-reveal>
      {topics.map((topic, index) => {
        const open = openItems.includes(index);
        return (
          <div className={`quality-item ${open ? "is-open" : ""}`} key={topic.title}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`quality-answer-${index}`}
              onClick={() => setOpenItems((items) => open ? items.filter((item) => item !== index) : [...items, index])}
            >
              <span className="quality-item-number">0{index + 1}</span>
              <span>{topic.title}</span>
              <span className="quality-item-icon" aria-hidden="true">+</span>
            </button>
            <div className="quality-answer" id={`quality-answer-${index}`} aria-hidden={!open}>
              <div><p>{topic.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
