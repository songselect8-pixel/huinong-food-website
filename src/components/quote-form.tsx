"use client";

import { useEffect, useRef, useState } from "react";
import { categories, products } from "@/data/site";
import { applicationPages } from "@/data/applications";
import { certifications, documentTypes, requestMarkets } from "@/data/quality";
import { briefRows, inquiryTypes, type InquiryBrief, type InquiryFields } from "@/data/inquiry";
import { useInquiryDraft } from "./inquiry-draft";

export function QuoteForm() {
  const { fields, patch, clearBrief, clearAll, notice } = useInquiryDraft();
  const [previewed, setPreviewed] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const extraRef = useRef<HTMLDetailsElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rows = briefRows(fields);
  const product = products.find(item => item.id === fields.productId);
  useEffect(() => setPreviewed(false), [fields]);
  useEffect(() => { if (previewed) previewRef.current?.focus(); }, [previewed]);
  const update = (value: Partial<InquiryFields>) => { patch(value); setErrors({}); };
  const remove = (key: keyof InquiryBrief) => {
    if (key === "productId") update({ productId: "", form: "", coldChain: "", leafFormat: "" });
    else if (key === "categoryId") update({ categoryId: "", productId: "", form: "", coldChain: "", leafFormat: "" });
    else if (key === "documents") update({ documents: [], certificateId: "" });
    else if (key === "quantity") update({ quantity: "", unit: "" });
    else update({ [key]: "" });
  };
  const editBrief = () => { if (extraRef.current) {extraRef.current.open = true; extraRef.current.querySelector<HTMLElement>("select,input,textarea")?.focus();} };
  const input = (key: keyof InquiryFields, label: string, options: { required?: boolean; type?: string; autoComplete?: string; max?: number; wide?: boolean; placeholder?: string } = {}) => <label className={options.wide ? "form-wide" : undefined}>
    <span>{label}{options.required && <> <b aria-hidden="true">*</b></>}</span>
    <input name={key} type={options.type ?? "text"} value={String(fields[key])} onChange={event => update({[key]:event.target.value})} required={options.required} autoComplete={options.autoComplete} maxLength={options.max ?? 250} placeholder={options.placeholder} min={options.type === "number" ? "0" : undefined} step={options.type === "number" ? "any" : undefined} list={key === "application" ? "application-suggestions" : key === "targetMarket" ? "market-suggestions" : undefined} aria-invalid={errors[key] ? true : undefined} aria-describedby={errors[key] ? `error-${key}` : undefined} />
    {errors[key] && <small className="field-error" id={`error-${key}`}>{errors[key]}</small>}
  </label>;
  return <form ref={formRef} className="quote-form unified-inquiry" noValidate onSubmit={event => {
    event.preventDefault();
    const next: Record<string,string> = {};
    if (!fields.name.trim()) next.name = "Please enter your name.";
    const email = formRef.current?.elements.namedItem("email") as HTMLInputElement;
    if (!fields.email.trim() || !email.validity.valid) next.email = "Enter a valid email address.";
    if (!fields.message.trim()) next.message = "Please tell us what you would like to discuss.";
    if (fields.quantity && (!Number.isFinite(Number(fields.quantity)) || Number(fields.quantity) < 0)) next.quantity = "Enter a quantity of zero or more, or leave this blank.";
    setErrors(next);
    if (Object.keys(next).length) {
      if (next.quantity && extraRef.current) extraRef.current.open = true;
      (formRef.current?.elements.namedItem(Object.keys(next)[0]) as HTMLElement)?.focus();
      return;
    }
    setPreviewed(true);
  }}>
    <div hidden={previewed}>
      <fieldset className="inquiry-kind"><legend>What would you like to discuss?</legend><div>{inquiryTypes.map(type => <label key={type.id}><input type="radio" name="inquiryType" value={type.id} checked={fields.kind === type.id} onChange={() => update({kind:type.id})} /><span>{type.name}</span></label>)}</div></fieldset>
      {notice && <p className="inquiry-notice" role="status">{notice}</p>}
      {rows.length > 0 && <section className="inquiry-summary" aria-label="Your sourcing brief"><div className="inquiry-summary-heading"><span className="mini-label">Your sourcing brief</span><button type="button" onClick={editBrief}>Edit details</button></div><dl>{rows.map(row => <div key={row.key}><dt>{row.label}</dt><dd>{row.value}</dd><button type="button" onClick={() => remove(row.key)} aria-label={`Remove ${row.label.toLowerCase()}`}>×</button></div>)}</dl><button type="button" className="inquiry-clear" onClick={clearBrief}>Remove all sourcing details</button></section>}
      <p className="form-required-note">Fields marked * are required. Project details are optional.</p>
      <div className="form-grid">
        {input("name","Name",{required:true,autoComplete:"name",max:100,placeholder:"Your name"})}
        {input("email","Email",{required:true,type:"email",autoComplete:"email",max:254,placeholder:"you@company.com"})}
        {input("company","Company",{autoComplete:"organization",max:120,placeholder:"Company name"})}
        {input("region","Country / Region",{autoComplete:"country-name",max:100,placeholder:"Where you are based"})}
        <label className="form-wide"><span>Message <b aria-hidden="true">*</b></span><textarea name="message" required rows={4} maxLength={2000} value={fields.message} onChange={event => update({message:event.target.value})} placeholder="Tell us about your sourcing requirements. Details already in your brief do not need to be repeated." aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? "error-message" : undefined} />{errors.message && <small className="field-error" id="error-message">{errors.message}</small>}</label>
      </div>
      <details className="form-extra" ref={extraRef}><summary>Optional {fields.kind === "quality" ? "document" : "project"} details <span aria-hidden="true">+</span></summary><div className="form-grid">
        <label className="form-wide"><span>Product direction</span><select name="interest" value={fields.categoryId} onChange={event => update({categoryId:event.target.value,productId:"",form:"",coldChain:"",leafFormat:""})}><option value="">Help me select a direction</option>{categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
        <label className="form-wide"><span>Product</span><select name="product" value={fields.productId} onChange={event => {const next = products.find(item => item.id === event.target.value); update({productId:next?.id ?? "",categoryId:next?.categoryId ?? fields.categoryId,form:"",coldChain:"",leafFormat:""});}}><option value="">Help me select a product</option>{products.filter(item => !fields.categoryId || item.categoryId === fields.categoryId).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        {product && <label className="form-wide"><span>Form / selection requirement</span><select name="form" value={fields.form} onChange={event => update({form:event.target.value})}><option value="">To be discussed</option>{product.detail?.forms.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}</select></label>}
        {(fields.kind !== "quality" || fields.packaging || fields.quantity || fields.application || fields.timeline) && <>
          {(fields.kind === "product" || fields.application) && <>{input("application","Intended application",{wide:true,max:160,placeholder:"Tell us the planned use"})}<datalist id="application-suggestions">{applicationPages.map(item => <option key={item.id} value={item.name} />)}</datalist></>}
          {input("packaging",fields.kind === "private-label" ? "Packaging format / requirements" : "Packaging requirements",{wide:true,max:600,placeholder:"Format, pack size or labeling questions"})}
          {input("quantity",fields.kind === "private-label" ? "Estimated quantity" : "Quantity",{type:"number"})}
          <label><span>Unit</span><select name="unit" value={fields.unit} onChange={event => update({unit:event.target.value})}><option value="">To be discussed</option><option value="kg">kg</option><option value="tonnes">tonnes</option><option value="packs">packs</option><option value="other">Other</option></select></label>
          {(fields.kind === "private-label" || fields.timeline) && input("timeline","Project timing requirements",{wide:true,placeholder:"Your proposed milestones or timing questions"})}
        </>}
        {input("targetMarket","Target market",{max:100,placeholder:"Destination country or region",wide:true})}<datalist id="market-suggestions">{requestMarkets.map(item => <option key={item.id} value={item.name} />)}</datalist>
        {(fields.kind === "quality" || fields.documents.length > 0) && <><fieldset className="inquiry-documents form-wide"><legend>Document types</legend>{documentTypes.map(type => <label key={type.id}><input type="checkbox" name="documentType" value={type.id} checked={fields.documents.includes(type.id)} onChange={event => update({documents:event.target.checked ? [...fields.documents,type.id] : fields.documents.filter(id => id !== type.id), ...(!event.target.checked && type.id === "certification" ? {certificateId:""} : {})})} /><span>{type.name}</span></label>)}</fieldset>{fields.documents.includes("certification") && <label className="form-wide"><span>Certification topic</span><select name="certification" value={fields.certificateId} onChange={event => update({certificateId:event.target.value})}><option value="">To be discussed</option>{certifications.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><small>Topic selection does not establish the certificate holder or product scope.</small></label>}</>}
        {input("documentNote","Document requirements",{wide:true,max:300,placeholder:"Reports or information your team needs to review"})}
        {(product?.categoryId === "frozen-berries") && input("coldChain","Cold-chain delivery requirements",{wide:true})}
        {product?.id === "raspberry-leaf-tea" && input("leafFormat","Leaf cut or tea-bag development brief",{wide:true})}
        {input("projectNotes","Other project requirements",{wide:true,max:600})}
      </div></details>
      <div className="form-actions"><button className="button button-dark" type="submit">Preview Inquiry <span aria-hidden="true">↗</span></button><p>Preview mode — your request has not been sent.</p></div>
      <p className="inquiry-privacy">This preview keeps your entries only in this open page session. Nothing is sent or saved to browser storage. Reloading or closing the page clears this draft.</p>
      <button type="button" className="inquiry-clear" onClick={() => {clearAll(); setErrors({});}}>Clear this draft</button>
    </div>
    {previewed && <div className="inquiry-preview" tabIndex={-1} ref={previewRef} aria-label="Inquiry preview"><span className="eyebrow">Review your inquiry</span><h3>{inquiryTypes.find(type => type.id === fields.kind)?.name}</h3><p className="form-feedback" role="status">Preview mode — your request has not been sent.</p><dl>{[{label:"Name",value:fields.name},{label:"Email",value:fields.email},{label:"Company",value:fields.company},{label:"Country / Region",value:fields.region},...rows,{label:"Message",value:fields.message}].filter(row => row.value).map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl><button className="button button-outline" type="button" onClick={() => {setPreviewed(false); requestAnimationFrame(() => (formRef.current?.elements.namedItem("message") as HTMLElement)?.focus());}}>Back to Edit <span aria-hidden="true">↗</span></button></div>}
  </form>;
}
