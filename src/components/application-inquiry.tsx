"use client";

import { useState } from "react";
import { applicationPages } from "@/data/applications";
import { applicationTrials } from "@/data/buyer-support";
import { products } from "@/data/site";
import { useRouter } from "next/navigation";
import { useInquiryDraft } from "./inquiry-draft";

// A short application brief hands off to the existing contact/inquiry form.
export function ApplicationInquiry({ applicationId }: { applicationId?: string }) {
  const router = useRouter();
  const { applyBrief, fields } = useInquiryDraft();
  const previous = fields.source.startsWith("/applications") ? applicationPages.find(item => item.name === fields.application && (!applicationId || item.id === applicationId)) : undefined;
  const [selectedApplication, setSelectedApplication] = useState(applicationId ?? previous?.id ?? "");
  const [productId, setProductId] = useState(previous ? fields.productId : "");
  const [packaging, setPackaging] = useState(previous ? fields.packaging : "");
  const [documents, setDocuments] = useState(previous ? fields.documentNote : "");
  const [trialChecks, setTrialChecks] = useState<string[]>(previous ? (fields.projectNotes ? fields.projectNotes.split("\n") : []) : []);
  const application = applicationPages.find(item => item.id === selectedApplication);
  const related = application ? products.filter(product => application.productIds.includes(product.id)) : [];

  return <form className="ap-brief" onSubmit={event => {
    event.preventDefault();
    if (!application) return;
    const product = related.find(item => item.id === productId);
    applyBrief({application:application.name, productId:product?.id ?? "", categoryId:product?.categoryId ?? "", packaging:packaging.trim().slice(0,250), documentNote:documents.trim().slice(0,300), projectNotes:trialChecks.join("\n"), source:applicationId ? `/applications/${application.id}` : "/applications"});
    router.push("/contact");
  }}>
    <div className="ap-brief-fields">
      {applicationId ? <p className="ap-brief-application"><span className="mini-label">Application</span><strong>{application?.name}</strong></p> : <label><span>Application <b aria-hidden="true">*</b></span><select name="application" required value={selectedApplication} onChange={event => {setSelectedApplication(event.target.value); setProductId(""); setTrialChecks([]);}}><option value="" disabled>Choose an application</option>{applicationPages.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
      <label><span>Product to discuss <small>Optional</small></span><select name="applicationProduct" value={productId} onChange={event => setProductId(event.target.value)} disabled={!application}><option value="">Help me select a product</option>{related.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
    </div>
    <details className="ap-brief-extra"><summary>Add packaging, documents or trial requirements <span aria-hidden="true">+</span></summary><div className="ap-brief-extra-fields"><label><span>Packaging requirements</span><textarea name="applicationPackaging" rows={3} maxLength={250} value={packaging} onChange={event => setPackaging(event.target.value)} placeholder="Pack format, portioning or handling questions" /></label><label><span>Document requirements</span><textarea name="applicationDocuments" rows={3} maxLength={300} value={documents} onChange={event => setDocuments(event.target.value)} placeholder="Specification, testing scope or storage information" /></label></div>{application && <fieldset className="ap-trial-options"><legend>Sample evaluation topics <small>Optional</small></legend><p>{applicationTrials[application.id].intro}</p>{applicationTrials[application.id].checks.map(check => <label key={check}><input type="checkbox" checked={trialChecks.includes(check)} onChange={event => setTrialChecks(event.target.checked ? [...trialChecks,check] : trialChecks.filter(item => item !== check))} /><span>{check}</span></label>)}</fieldset>}</details>
    <div className="ap-brief-footer"><p>Your application and selections carry into the inquiry preview. You can add contact details there.</p><button className="button button-dark" type="submit">Continue to Inquiry <span aria-hidden="true">↗</span></button></div>
  </form>;
}
