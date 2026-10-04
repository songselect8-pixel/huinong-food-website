"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/site";
import { documentTypes } from "@/data/quality";
import { useInquiryDraft } from "./inquiry-draft";

export function GuideInquiry({title,slug,productIds}: {title:string;slug:string;productIds:string[]}) {
  const router=useRouter(); const {fields,applyBrief}=useInquiryDraft(); const source=`/resources/${slug}`;
  const previous=fields.source===source;
  const [productId,setProductId]=useState(previous?fields.productId:"");
  const [documents,setDocuments]=useState<string[]>(previous?fields.documents:[]);
  const related=products.filter(p=>productIds.includes(p.id));
  return <form className="guide-inquiry" onSubmit={e=>{e.preventDefault();const product=related.find(p=>p.id===productId);applyBrief({articleTitle:title,source,productId:product?.id??"",categoryId:product?.categoryId??"",documents:documentTypes.filter(d=>documents.includes(d.id)).map(d=>d.id),kind:documents.length?"quality":"product"});router.push("/contact");}}>
    <div><span className="eyebrow">Your next conversation</span><h2>Discuss Your Sourcing Requirements</h2><p>Bring this guide into your inquiry. Choose only the product or documents you want to discuss; your existing message stays with you.</p></div>
    <div><label htmlFor="guide-product">Product to discuss <small>Optional</small></label><select id="guide-product" value={productId} onChange={e=>setProductId(e.target.value)}><option value="">No product selected</option>{related.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select><details><summary>Add document requests <small>Optional</small></summary><fieldset><legend className="sr-only">Document requests</legend>{documentTypes.map(d=><label key={d.id}><input type="checkbox" checked={documents.includes(d.id)} onChange={e=>setDocuments(e.target.checked?[...documents,d.id]:documents.filter(id=>id!==d.id))}/>{d.name}</label>)}</fieldset></details><button className="button button-dark" type="submit">Discuss Your Sourcing Requirements <span aria-hidden="true">↗</span></button><p className="guide-small">Continue to the existing inquiry preview. Nothing is sent.</p></div>
  </form>;
}

export function InquiryTemplate({text}: {text:string}) {
  const [value,setValue]=useState(text); const [status,setStatus]=useState("");
  return <div className="guide-template"><label htmlFor="inquiry-template">Your editable inquiry draft</label><textarea id="inquiry-template" value={value} onChange={e=>{setValue(e.target.value);setStatus("");}} rows={21}/><button className="button button-outline" type="button" onClick={async()=>{try{await navigator.clipboard.writeText(value);setStatus("Copied. You can paste and revise your draft.");}catch{setStatus("Select the text above and copy it manually.");}}}>Copy template <span aria-hidden="true">↗</span></button><p role="status">{status}</p></div>;
}
