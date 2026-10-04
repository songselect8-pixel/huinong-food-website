"use client";
import SiteLink from "@/components/site-link";

import { useState } from "react";
import { categories } from "@/data/site";
import { useInquiryDraft } from "@/components/inquiry-draft";

const steps = [
  { title: "Choose Your Product", hint: "Select the product direction you want to discuss." },
  { title: "Describe Your Packaging", hint: "Describe the presentation or packing details you have in mind." },
  { title: "Share Your Requirements", hint: "Add quantity, market or document questions for review." },
] as const;

export function PackagingPlanner() {
  const [activeStep, setActiveStep] = useState(0);
  const [product, setProduct] = useState("");
  const [packaging, setPackaging] = useState("");
  const [requirements, setRequirements] = useState("");
  const [added, setAdded] = useState(false);
  const { applyBrief } = useInquiryDraft();

  const addToInquiry = () => {
    applyBrief({
      kind: "private-label",
      categoryId: categories.find(item => item.name === product)?.id ?? "",
      packaging: packaging.trim(),
      projectNotes: requirements.trim(),
      source: "/#private-label",
    });
    setAdded(true);
  };

  return (
    <div className="planner" data-reveal>
      <div className="planner-steps" aria-label="Packaging brief steps">
        {steps.map((step, index) => (
          <button
            type="button"
            className={`planner-step ${index === activeStep ? "is-active" : ""}`}
            aria-current={index === activeStep ? "step" : undefined}
            aria-controls="planner-panel"
            key={step.title}
            onClick={() => setActiveStep(index)}
          >
            <span className="planner-step-number">0{index + 1}</span>
            <span className="planner-step-title">{step.title}</span>
            <span className="planner-step-indicator" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="planner-progress" aria-hidden="true"><span style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} /></div>
      <div className="planner-panel" id="planner-panel">
        <div className="planner-explanation">
          <span className="mini-label">Step 0{activeStep + 1} / 03</span>
          <h3>{steps[activeStep].title}</h3>
          <p>{steps[activeStep].hint}</p>
          <small>Packaging options and project terms are confirmed individually. This brief is a starting point.</small>
        </div>
        <div className="planner-input-area">
          {activeStep === 0 && (
            <div className="planner-product-options" role="group" aria-label="Product direction">
              {categories.map((category) => (
                <button
                  type="button"
                  className={`planner-product-option ${product === category.name ? "is-selected" : ""}`}
                  aria-pressed={product === category.name}
                  key={category.id}
                  onClick={() => {
                    setProduct((current) => current === category.name ? "" : category.name);
                    setAdded(false);
                  }}
                >
                  <span>{category.name}</span>
                  <span aria-hidden="true">{product === category.name ? "✓" : "↗"}</span>
                </button>
              ))}
            </div>
          )}
          {activeStep === 1 && (
            <label className="planner-field">
              <span>Your packaging idea</span>
              <textarea
                value={packaging}
                onChange={(event) => { setPackaging(event.target.value); setAdded(false); }}
                rows={4}
                maxLength={600}
                placeholder="Describe the presentation, pack size or labeling questions you would like to discuss."
              />
            </label>
          )}
          {activeStep === 2 && (
            <>
              <label className="planner-field">
                <span>Other requirements</span>
                <textarea
                  value={requirements}
                  onChange={(event) => { setRequirements(event.target.value); setAdded(false); }}
                  rows={3}
                  maxLength={600}
                  placeholder="Share the intended quantity, destination market or documents your team needs."
                />
              </label>
              <p className="planner-review">Product: {product || "to be discussed"} · Packaging notes: {packaging.trim() ? "added" : "not added yet"}</p>
            </>
          )}
          {activeStep < 2 ? (
            <button className="button button-dark planner-next" type="button" disabled={activeStep === 0 && !product} onClick={() => setActiveStep(activeStep + 1)}>
              Continue <span aria-hidden="true">↗</span>
            </button>
          ) : (
            <SiteLink className="button button-dark planner-next" href="#quote" onClick={addToInquiry}>
              {added ? "Update Inquiry" : "Add to Inquiry"} <span aria-hidden="true">↗</span>
            </SiteLink>
          )}
        </div>
      </div>
    </div>
  );
}
