"use client";

import { useState } from "react";
import { applications, categories, products } from "@/data/site";
import { useInquiryDraft } from "@/components/inquiry-draft";
import { sitePath } from "@/data/paths";

export function ApplicationExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { applyBrief } = useInquiryDraft();

  return (
    <div className="application-explorer" data-reveal>
      <div className="application-tabs" aria-label="Explore applications">
        {applications.map((application, index) => (
          <button
            className={`application-tab ${index === activeIndex ? "is-active" : ""}`}
            type="button"
            aria-pressed={index === activeIndex}
            key={application.number}
            onClick={() => setActiveIndex(index)}
          >
            <span className="application-tab-number">{application.number} / 03</span>
            <span className="application-tab-name">{application.name}</span>
            <span className="application-tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className="application-stage" aria-live="polite">
        <figure className="application-visual">
          {applications.map((application, index) => (
            <img
              className={index === activeIndex ? "is-active" : ""}
              src={sitePath(application.image)}
              alt={index === activeIndex ? application.imageAlt : ""}
              aria-hidden={index !== activeIndex}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              key={application.number}
            />
          ))}
          <figcaption>Illustrative application concept · confirm suitability for your project</figcaption>
        </figure>

        {applications.map((application, index) => {
          const relatedProducts = application.productIds.flatMap((id) => {
            const product = products.find((item) => item.id === id);
            return product ? [product] : [];
          });
          const categoryIds = [...new Set(relatedProducts.map((product) => product.categoryId))];
          const matchingCategory = categoryIds.length === 1
            ? categories.find((category) => category.id === categoryIds[0])
            : undefined;

          return (
            <div
              className={`application-detail ${index === activeIndex ? "is-active" : ""}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex}
              key={application.number}
            >
              <span className="eyebrow section-kicker">Application / {application.number}</span>
              <h3>{application.name}</h3>
              <p>{application.detail}</p>
              <div className="application-related">
                <span className="mini-label">Related product directions</span>
                <div className="application-product-links">
                  {relatedProducts.map((product) => (
                    <a href={sitePath(product.detail ? `/products/${product.id}` : `/products?category=${product.categoryId}`)} key={product.id}>
                      {product.name} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
              <a
                className="button button-dark"
                href="#quote"
                onClick={() => applyBrief({
                  interest: matchingCategory?.name ?? "",
                  note: `Application: ${application.name}\nRelated product directions: ${relatedProducts.map((product) => product.name).join(", ")}\nSuitability and specifications to be confirmed.`,
                })}
              >
                Discuss this application <span aria-hidden="true">↗</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
