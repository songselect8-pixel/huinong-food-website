"use client";
import SiteLink from "@/components/site-link";

import { useEffect, useState, type KeyboardEvent } from "react";
import { certifications, documentGroups, documentTypes, marketGuides, requestMarkets } from "@/data/quality";
import { categories, products } from "@/data/site";
import { sitePath } from "@/data/paths";
import { useRouter } from "next/navigation";
import { useInquiryDraft } from "./inquiry-draft";

function FileIcon({ shield = false }: { shield?: boolean }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shield ? <><path d="m16 3-10 4v9c0 6 5 10 10 13 5-3 10-7 10-13V7L16 3Z" /><path d="m11 16 3 3 7-8" /></> : <><path d="M8 3h11l6 6v20H8V3Zm11 0v7h6M12 15h9m-9 5h9m-9 5h5" /></>}</svg>;
}

function Tabs({id, label, items, selected, onSelect}: {id: string; label: string; items: {id: string; name: string}[]; selected: string; onSelect: (id: string) => void}) {
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault(); onSelect(items[next].id);
    document.getElementById(`${id}-tab-${items[next].id}`)?.focus();
  };
  return <div className="q-tabs" role="tablist" aria-label={label}>{items.map((item, index) => <button key={item.id} type="button" role="tab" id={`${id}-tab-${item.id}`} aria-controls={`${id}-panel-${item.id}`} aria-selected={selected === item.id} tabIndex={selected === item.id ? 0 : -1} onClick={() => onSelect(item.id)} onKeyDown={event => onKeyDown(event, index)}>{item.name}</button>)}</div>;
}

export function QualityExplorer() {
  const router = useRouter();
  const { fields } = useInquiryDraft();
  const previous = fields.kind === "quality" && fields.source === "/quality";
  const [groupId, setGroupId] = useState("frozen");
  const [marketTab, setMarketTab] = useState("eu");
  const [productId, setProductId] = useState(previous ? fields.productId : "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(previous ? fields.documents : ["specification"]);
  const [marketId, setMarketId] = useState(previous ? requestMarkets.find(item => item.name === fields.targetMarket)?.id ?? "undecided" : "undecided");
  const [certificateId, setCertificateId] = useState(previous ? fields.certificateId : "");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const product = products.find(item => item.id === search.get("product"));
    if (product) {
      setProductId(product.id);
      const group = documentGroups.find(item => item.categoryIds.includes(product.categoryId));
      if (group) setGroupId(group.id);
    }
    const requested = documentTypes.filter(item => search.getAll("document").includes(item.id)).map(item => item.id);
    if (requested.length) setSelectedTypes(requested);
    const certificate = certifications.find(item => item.id === search.get("certification"));
    if (certificate && requested.includes("certification")) setCertificateId(certificate.id);
  }, []);

  const prepareRequest = (type: string, group?: string, certificate = "") => {
    setSelectedTypes([type]); setCertificateId(certificate);
    if (group) {
      const selected = products.find(item => item.id === productId);
      if (selected && !documentGroups.find(item => item.id === group)?.categoryIds.includes(selected.categoryId)) setProductId("");
    }
    document.getElementById("documentation-requests")?.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start"});
    document.getElementById("request-product")?.focus({preventScroll: true});
  };

  const selectedProduct = products.find(item => item.id === productId);
  const selectedMarket = requestMarkets.find(item => item.id === marketId)!;
  const requestedCertificate = certifications.find(item => item.id === certificateId);

  return <>
    <section className="q-certifications shell q-section" id="certifications" aria-labelledby="certifications-title">
      <div className="q-section-heading"><div><span className="eyebrow">01 / Systems & scope</span><h2 id="certifications-title">Food Safety <em>Certifications</em></h2></div><p>Check a certification against its actual holder, production site and product scope. The brand name alone does not establish certificate coverage.</p></div>
      <div className="q-cert-note"><FileIcon shield /><p><strong>Certification names confirmed in project records.</strong> Holder, scope and validity verification is pending. File availability is tracked separately from certification status.</p></div>
      <div className="q-cert-grid">{certifications.map(certificate => <article className="q-cert-card" key={certificate.id}>
        <div className="q-cert-top"><div className="q-cert-icon"><FileIcon shield /></div><div><span className="mini-label">Food safety system</span><h3>{certificate.name}</h3></div></div>
        <dl className="q-cert-status"><div><dt>Certification record</dt><dd>{certificate.confirmation === "owner-attested" ? "Owner-confirmed" : "Document-confirmed"} · {certificate.verification === "verified" ? "verified" : "verification pending"}</dd></div><div><dt>File status</dt><dd>{certificate.file.status === "not-supplied" ? "Copy not yet supplied for review" : "Copy held for review"}</dd></div></dl>
        <details className="q-cert-details"><summary>Holder, scope & verification <span aria-hidden="true">+</span></summary><dl>
          <div><dt>Actual certificate holder</dt><dd>{certificate.holder ?? "Awaiting holder confirmation"}</dd></div>
          <div><dt>Production site / scope</dt><dd>{certificate.siteScope ?? "Awaiting site and process scope"}</dd></div>
          <div><dt>Related product categories</dt><dd>{certificate.productCategories.length ? certificate.productCategories.join(", ") : "Not yet mapped to the product ranges"}</dd></div>
          <div><dt>Validity</dt><dd>{certificate.validUntil ?? "Not yet verified"}</dd></div>
          <div><dt>Verification record</dt><dd>{certificate.verification === "verified" && certificate.verifiedOn ? `Reviewed ${certificate.verifiedOn}` : "Original document and issuer check pending"}</dd></div>
          <div><dt>Public file access</dt><dd>{certificate.file.publicPermission === "approved" ? "Approved for public access" : certificate.file.publicPermission === "restricted" ? "Restricted access" : "Publication permission not confirmed"}</dd></div>
        </dl></details>
        {certificate.file.status === "on-file" && certificate.file.publicPermission === "approved" && certificate.file.href ? <SiteLink className="text-link" href={sitePath(certificate.file.href)} download>View certificate <span aria-hidden="true">↓</span></SiteLink> : <button type="button" className="text-link q-text-button" onClick={() => prepareRequest("certification", undefined, certificate.id)} aria-label={`Request ${certificate.name} certification information`}>Request certification information <span aria-hidden="true">↗</span></button>}
      </article>)}</div>
    </section>

    <section className="q-documents q-section" id="product-documents" aria-labelledby="documents-title"><div className="shell">
      <div className="q-section-heading"><div><span className="eyebrow">02 / By product type</span><h2 id="documents-title">Product Testing <em>& Quality Documents</em></h2></div><p>Build a relevant document request around the ingredient, its format and your intended use.</p></div>
      <Tabs id="documents" label="Product document categories" items={documentGroups} selected={groupId} onSelect={setGroupId} />
      <div className="q-panels">{documentGroups.map(group => <div className="q-panel q-document-panel" key={group.id} id={`documents-panel-${group.id}`} role="tabpanel" aria-labelledby={`documents-tab-${group.id}`} aria-hidden={groupId !== group.id} inert={groupId !== group.id}>
        <div className="q-document-intro"><span className="q-document-icon"><FileIcon /></span><h3>{group.name}</h3><p>{group.intro}</p><span className="q-side-note">Select a topic to see what to review and how to request it.</span></div>
        <div className="q-document-topics">{group.topics.map((topic,index) => <details key={topic.title} open={index === 0}><summary><span className="q-topic-number">0{index + 1}</span><span>{topic.title}</span><b aria-hidden="true">+</b></summary><div className="q-topic-content"><dl><div><dt>What it contains</dt><dd>{topic.includes}</dd></div><div><dt>What to check</dt><dd>{topic.check}</dd></div><div><dt>How to request</dt><dd>{topic.request}</dd></div></dl><button type="button" className="text-link q-text-button" onClick={() => prepareRequest(topic.type, group.id)}>Prepare document request <span aria-hidden="true">↗</span></button></div></details>)}</div>
      </div>)}</div>
      <p className="q-footnote">A COA reports the scope actually tested. Pesticide residues, heavy metals and microbiology are not automatically included in every COA or every lot.</p>
    </div></section>

    <section className="q-markets shell q-section" id="markets" aria-labelledby="markets-title">
      <div className="q-section-heading"><div><span className="eyebrow">03 / Destination context</span><h2 id="markets-title">Target Market <em>Requirements</em></h2></div><p>Separate the legal baseline, condition-triggered documents and the buyer’s own requirements before preparing a request.</p></div>
      <Tabs id="markets" label="Target market guides" items={marketGuides} selected={marketTab} onSelect={setMarketTab} />
      <div className="q-panels">{marketGuides.map(market => <div className="q-panel q-market-panel" key={market.id} id={`markets-panel-${market.id}`} role="tabpanel" aria-labelledby={`markets-tab-${market.id}`} aria-hidden={marketTab !== market.id} inert={marketTab !== market.id}>
        <div className="q-market-heading"><div><span className={`q-status ${market.status === "draft" ? "is-draft" : ""}`}>{market.status === "draft" ? "Research draft · not verified" : `Official sources checked · ${market.checkedOn}`}</span><h3>{market.name}</h3><p>{market.intro}</p></div><button type="button" className="button button-outline" onClick={() => {setMarketId(market.id); document.getElementById("documentation-requests")?.scrollIntoView({block: "start"}); document.getElementById("request-product")?.focus({preventScroll: true});}}>Use this market <span aria-hidden="true">↓</span></button></div>
        {market.status === "source-reviewed" ? <div className="q-market-rows"><article><span className="q-rule-label">Legal / import requirements</span><p>{market.legal}</p></article><article><span className="q-rule-label">When conditions apply</span><p>{market.conditional}</p></article><article><span className="q-rule-label">Buyer requirements</span><p>{market.buyer}</p></article></div> : <div className="q-draft-panel"><FileIcon /><p>The existing report is a research starting point. This draft is not a current import checklist and makes no claim of market access.</p></div>}
        <div className="q-market-footer"><p>{market.next}</p>{market.sources.length > 0 && <ul aria-label={`${market.name} official sources`}>{market.sources.map(source => <li key={source.url}><SiteLink href={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></SiteLink></li>)}</ul>}</div>
      </div>)}</div>
      <p className="q-footnote">These sourcing guides cover the cited topics, not a shipment clearance decision. Check the actual product, origin, intended use and rules at dispatch with the destination importer.</p>
    </section>

    <section className="q-requests q-section" id="documentation-requests" aria-labelledby="requests-title"><div className="shell">
      <div className="q-section-heading"><div><span className="eyebrow">04 / Build a document brief</span><h2 id="requests-title">Documentation <em>Requests</em></h2></div><p>Choose your product and the documents you need. These details carry into the existing inquiry preview.</p></div>
      <form id="documentation-request-form" className="q-request-form" onSubmit={event => {
        event.preventDefault();
        const search = new URLSearchParams({source:"quality",product:productId,market:marketId});
        documentTypes.filter(item => selectedTypes.includes(item.id)).forEach(item => search.append("document", item.id));
        if (certificateId && selectedTypes.includes("certification")) search.set("certification",certificateId);
        router.push(`/contact?${search.toString()}`);
      }}>
        <div className="q-request-controls"><div className="q-select-row"><label htmlFor="request-product"><span>Product <b aria-hidden="true">*</b></span><select id="request-product" name="product" required value={productId} onChange={event => setProductId(event.target.value)}><option value="" disabled>Choose a product</option>{categories.map(category => <optgroup key={category.id} label={category.name}>{products.filter(product => product.categoryId === category.id).map(product => <option key={product.id} value={product.id}>{product.name}</option>)}</optgroup>)}</select></label><label htmlFor="request-market"><span>Target market</span><select id="request-market" name="market" value={marketId} onChange={event => setMarketId(event.target.value)}>{requestMarkets.map(market => <option value={market.id} key={market.id}>{market.name}{market.id === "jp" ? " (guide in draft)" : ""}</option>)}</select></label></div>
          <fieldset className="q-type-options"><legend>Documents to discuss <span>Choose one or more</span></legend>{documentTypes.map((type,index) => <label key={type.id} className={selectedTypes.includes(type.id) ? "is-selected" : ""}><input type="checkbox" name="document" value={type.id} checked={selectedTypes.includes(type.id)} required={index === 0 && selectedTypes.length === 0} onChange={() => {setSelectedTypes(current => current.includes(type.id) ? current.filter(id => id !== type.id) : [...current,type.id]); if (type.id === "certification") setCertificateId("");}} /><span><strong>{type.name}</strong><small>{type.description}</small></span></label>)}</fieldset>
        </div>
        <aside className="q-request-summary" aria-label="Documentation request summary"><span className="eyebrow">Your document brief</span><FileIcon /><dl aria-live="polite"><div><dt>Product</dt><dd>{selectedProduct?.name ?? "Choose a product to continue"}</dd></div><div><dt>Target market</dt><dd>{selectedMarket.name}</dd></div><div><dt>Documents</dt><dd>{selectedTypes.length ? documentTypes.filter(type => selectedTypes.includes(type.id)).map(type => type.name).join(" · ") : "Select at least one document type"}</dd></div>{requestedCertificate && selectedTypes.includes("certification") && <div><dt>Certification topic</dt><dd>{requestedCertificate.name}</dd></div>}<div><dt>Source page</dt><dd>Quality & Compliance</dd></div></dl><button type="submit" className="button button-dark">Request Documentation <span aria-hidden="true">↗</span></button><p>Continues to the inquiry preview. Document availability and sharing permission will be checked for your project.</p></aside>
      </form>
    </div></section>

    <section className="q-closing q-section"><div className="shell q-closing-layout"><div><span className="eyebrow">05 / Start the conversation</span><h2>Need Documents for <em>Your Sourcing Project?</em></h2><p>Send your selected product, document topics and target market into one inquiry brief.</p></div><button className="button q-button-light" type="submit" form="documentation-request-form">Request Documentation <span aria-hidden="true">↗</span></button></div></section>
  </>;
}
