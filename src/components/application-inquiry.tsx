"use client";

import { useState } from "react";
import { applicationPages } from "@/data/applications";
import { products } from "@/data/site";
import { sitePath } from "@/data/paths";

// A short application brief hands off to the existing contact/inquiry form.
export function ApplicationInquiry({ applicationId }: { applicationId?: string }) {
  const [selectedApplication, setSelectedApplication] = useState(applicationId ?? "");
  const [productId, setProductId] = useState("");
  const [packaging, setPackaging] = useState("");
  const [documents, setDocuments] = useState("");
  const application = applicationPages.find(item => item.id === selectedApplication);
  const related = application ? products.filter(product => application.productIds.includes(product.id)) : [];

  return <form className="ap-brief" onSubmit={event => {
    event.preventDefault();
    if (!application) return;
    const query = new URLSearchParams({source:"application", application:application.id});
    if (!applicationId) query.set("origin","overview");
    if (related.some(product => product.id === productId)) query.set("product",productId);
    if (packaging.trim()) query.set("packaging",packaging.trim());
    if (documents.trim()) query.set("documents",documents.trim());
    window.location.assign(sitePath(`/?${query.toString()}#quote`));
  }}>
    <div className="ap-brief-fields">
      {applicationId ? <p className="ap-brief-application"><span className="mini-label">Application</span><strong>{application?.name}</strong></p> : <label><span>Application <b aria-hidden="true">*</b></span><select name="application" required value={selectedApplication} onChange={event => {setSelectedApplication(event.target.value); setProductId("");}}><option value="" disabled>Choose an application</option>{applicationPages.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
      <label><span>Product to discuss <small>Optional</small></span><select name="applicationProduct" value={productId} onChange={event => setProductId(event.target.value)} disabled={!application}><option value="">Help me select a product</option>{related.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
    </div>
    <details className="ap-brief-extra"><summary>Add packaging or document requirements <span aria-hidden="true">+</span></summary><div className="ap-brief-extra-fields"><label><span>Packaging requirements</span><textarea name="applicationPackaging" rows={3} maxLength={250} value={packaging} onChange={event => setPackaging(event.target.value)} placeholder="Pack format, portioning or handling questions" /></label><label><span>Document requirements</span><textarea name="applicationDocuments" rows={3} maxLength={300} value={documents} onChange={event => setDocuments(event.target.value)} placeholder="Specification, testing scope or storage information" /></label></div></details>
    <div className="ap-brief-footer"><p>Your application and selections carry into the inquiry preview. You can add contact details there.</p><button className="button button-dark" type="submit">Continue to Inquiry <span aria-hidden="true">↗</span></button></div>
  </form>;
}
