"use client";

import { useEffect, useState } from "react";
import { categories, products } from "@/data/site";
import { useInquiryDraft } from "@/components/inquiry-draft";
import { readDocumentationRequest } from "@/data/quality";
import { readApplicationRequest } from "@/data/applications";

export function QuoteForm() {
  const [previewed, setPreviewed] = useState(false);
  const [prefilledProductId, setPrefilledProductId] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [documentRequest, setDocumentRequest] = useState("");
  const [packagingRequest, setPackagingRequest] = useState("");
  const { interest, setInterest, contextNote, applyBrief, clearBrief } = useInquiryDraft();

  useEffect(() => setPreviewed(false), [interest, contextNote]);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const applicationRequest = readApplicationRequest(search);
    if (applicationRequest) {
      const {application, productId, packaging, documents, source} = applicationRequest;
      const selectedProduct = products.find(item => item.id === productId);
      const category = categories.find(item => item.id === selectedProduct?.categoryId);
      setPrefilledProductId(selectedProduct?.id ?? "");
      setPackagingRequest(packaging);
      setDocumentRequest(documents);
      applyBrief({interest: category?.name ?? "Not sure yet", note: [
        `Application: ${application.name}`,
        `Product: ${selectedProduct?.name ?? "To be discussed"}`,
        `Page source: ${source}`,
        packaging ? `Packaging requirements: ${packaging}` : "",
        documents ? `Document requirements: ${documents}` : "",
      ].filter(Boolean).join("\n")});
      return;
    }
    const product = products.find((item) => item.id === search.get("product"));
    if (product) {
      const category = categories.find((item) => item.id === product.categoryId);
      const requestedForm = search.get("form");
      const form = product.detail?.forms.find((item) => item.name === requestedForm);
      setPrefilledProductId(product.id);
      const documentation = readDocumentationRequest(search);
      if (documentation) {
        const requestedDocuments = documentation.types.map(item => item.name).join("; ");
        setTargetMarket(documentation.market);
        setDocumentRequest([requestedDocuments, documentation.certificate].filter(Boolean).join(" — "));
        applyBrief({interest: category?.name, note: [
          `Product: ${product.name}`,
          `Category: ${category?.name ?? "To be discussed"}`,
          `Document types: ${requestedDocuments}`,
          documentation.certificate ? `Certification topic: ${documentation.certificate}` : "",
          `Target market: ${documentation.market}`,
          "Page source: /quality",
        ].filter(Boolean).join("\n")});
        return;
      }
      applyBrief({ interest: category?.name, note: [
        `Product: ${product.name}`,
        `Category: ${category?.name ?? "To be discussed"}`,
        `Page source: ${product.detail ? `/products/${product.id}` : "/products"}`,
        `Requested form: ${form?.name ?? "To be discussed"}`,
      ].join("\n") });
      return;
    }
    const category = categories.find((item) => item.id === search.get("category"));
    if (category) applyBrief({ interest: category.name, note: `Category: ${category.name}\nProduct and format: To be discussed` });
  }, [applyBrief]);

  return (
    <form
      className="quote-form"
      onChange={() => setPreviewed(false)}
      onSubmit={(event) => {
        event.preventDefault();
        setPreviewed(true);
      }}
    >
      {contextNote && (
        <div className="form-context" aria-live="polite">
          <div>
            <span className="mini-label">Added to your inquiry</span>
            <p>{contextNote}</p>
          </div>
          <button type="button" onClick={() => {clearBrief(); setTargetMarket(""); setDocumentRequest(""); setPackagingRequest("");}} aria-label="Remove added inquiry details">Remove</button>
        </div>
      )}
      <input type="hidden" name="briefContext" value={contextNote ?? ""} />
      <div className="form-grid">
        <label>
          <span>Name <b aria-hidden="true">*</b></span>
          <input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your name" />
        </label>
        <label>
          <span>Email <b aria-hidden="true">*</b></span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@company.com" />
        </label>
        <label>
          <span>Company <b aria-hidden="true">*</b></span>
          <input name="company" type="text" autoComplete="organization" maxLength={120} required placeholder="Company name" />
        </label>
        <label>
          <span>Country / Region</span>
          <input name="region" type="text" autoComplete="country-name" maxLength={100} placeholder="Where you are based" />
        </label>
        <label className="form-wide">
          <span>Product Interest <b aria-hidden="true">*</b></span>
          <select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)} required>
            <option value="" disabled>Select a product direction</option>
            {categories.map((category) => <option value={category.name} key={category.id}>{category.name}</option>)}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label className="form-wide">
          <span>Message <b aria-hidden="true">*</b></span>
          <textarea
            name="message"
            rows={5}
            minLength={10}
            maxLength={2000}
            required
            placeholder="Tell us the ingredient, intended use, quantity or packing format you have in mind."
          />
        </label>
      </div>
      <details className="form-extra">
        <summary>Optional project details <span aria-hidden="true">+</span></summary>
        <div className="form-grid">
          <label><span>Intended use</span><input name="use" maxLength={120} placeholder="Bakery, botanical blend..." /></label>
          <label><span>Target market</span><input name="targetMarket" maxLength={100} value={targetMarket} onChange={event => setTargetMarket(event.target.value)} placeholder="Destination country or region" /></label>
          <label><span>Estimated quantity</span><input name="quantity" type="number" min="0" step="any" placeholder="Amount to discuss" /></label>
          <label><span>Unit</span><select name="unit" defaultValue=""><option value="">Select a unit</option><option value="kg">kg</option><option value="tonnes">tonnes</option><option value="other">Other / to discuss</option></select></label>
          <label className="form-wide"><span>Packaging requirements</span><input name="packagingRequest" maxLength={250} value={packagingRequest} onChange={event => setPackagingRequest(event.target.value)} placeholder="Pack format, unit weight or material questions" /></label>
          <label className="form-wide"><span>Testing or certification questions</span><input name="documentRequest" maxLength={300} value={documentRequest} onChange={event => setDocumentRequest(event.target.value)} placeholder="Documents your team needs us to check" /></label>
          {(prefilledProductId === "iqf-frozen-raspberries" || prefilledProductId === "iqf-frozen-blueberries") && <label className="form-wide"><span>Cold-chain delivery requirements</span><input name="coldChain" maxLength={250} placeholder="Temperature records, handover or route questions" /></label>}
          {prefilledProductId === "raspberry-leaf-tea" && <label className="form-wide"><span>Leaf cut or tea-bag development brief</span><input name="leafFormat" maxLength={250} placeholder="Cut size or a separate filled-bag project question" /></label>}
        </div>
      </details>
      <div className="form-actions">
        <button className="button button-dark" type="submit">
          Preview Request <span aria-hidden="true">↗</span>
        </button>
        <p id="preview-note">Preview mode — your request has not been sent.</p>
      </div>
      {previewed && (
        <p className="form-feedback" role="status">
          Your details passed the preview check. Preview mode — your request has not been sent.
        </p>
      )}
    </form>
  );
}
