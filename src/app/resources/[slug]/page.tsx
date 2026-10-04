import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteLink from "@/components/site-link";
import { GuideCard } from "@/components/guide-card";
import { GuideInquiry, InquiryTemplate } from "@/components/guide-inquiry";
import { getGuides, guideSummary } from "@/data/guides";
import { guideImage } from "@/data/guide-types";
import { pageMetadata } from "@/data/metadata";
import { products, siteIdentity } from "@/data/site";
import { sitePath } from "@/data/paths";

export const dynamicParams=false;
// Next 16 static export rejects an empty param list. The sentinel always renders
// notFound(), never article content; it is not a guide or a public navigation entry.
export function generateStaticParams(){const guides=getGuides();return guides.length?guides.map(g=>({slug:g.slug})):[{slug:"__unpublished"}];}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const guide=getGuides().find(g=>g.slug===slug);if(!guide)return {};
  const meta=pageMetadata(guide.title,guide.metaDescription);
  const url=siteIdentity.siteUrl?new URL(sitePath(`/resources/${guide.slug}/`),siteIdentity.siteUrl).toString():undefined;
  const image=siteIdentity.siteUrl?new URL(sitePath(guideImage(guide.slug,"cover")),siteIdentity.siteUrl).toString():undefined;
  return {...meta,robots:{index:false,follow:false},alternates:url?{canonical:url}:undefined,openGraph:{...meta.openGraph,type:"article",url,images:image?[{url:image,alt:guide.coverAlt}]:undefined},twitter:{...meta.twitter,images:image?[image]:undefined}};
}
// Minimal link syntax for our own structured editorial content; no raw HTML/MDX execution.
function Text({text}:{text:string}){return <>{text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part,i)=>{const link=/^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);return link?(link[2].startsWith("/")?<SiteLink key={i} href={link[2]}>{link[1]}</SiteLink>:<a key={i} href={link[2]} rel="noreferrer" target="_blank">{link[1]} ↗</a>):part;})}</>;}

export default async function GuidePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const guides=getGuides();const guide=guides.find(g=>g.slug===slug);if(!guide)notFound();
  const relatedProducts=products.filter(p=>guide.relatedProducts.includes(p.id));
  const relatedGuides=guide.relatedGuides.map(id=>guides.find(g=>g.slug===id)).filter(g=>g!==undefined);
  const absolute=(path:string)=>siteIdentity.siteUrl?new URL(sitePath(path),siteIdentity.siteUrl).toString():sitePath(path);
  const schema={"@context":"https://schema.org","@graph":[{"@type":"BlogPosting",headline:guide.title,description:guide.lead,inLanguage:"en",articleSection:guide.category,creativeWorkStatus:guide.status==="draft"?"Draft":"Published",image:{"@type":"ImageObject",contentUrl:absolute(guideImage(slug,"cover")),caption:guide.coverAlt},...(guide.author?{author:{"@type":"Person",name:guide.author}}:{}),...(guide.status==="published"&&guide.publishedAt?{datePublished:guide.publishedAt,dateModified:guide.updatedAt}:{}),...(siteIdentity.siteUrl?{url:absolute(`/resources/${slug}/`)}:{})},{"@type":"BreadcrumbList",itemListElement:[{name:"Home",item:absolute("/")},{name:"Resources",item:absolute("/resources/")},{name:guide.title,item:absolute(`/resources/${slug}/`)}].map((item,index)=>({"@type":"ListItem",position:index+1,...item}))}]};
  const toc=<>{guide.sections.map((s,i)=><a key={s.id} href={`#${s.id}`}><span>{String(i+1).padStart(2,"0")}</span>{s.title}</a>)}<a href="#references"><span>↗</span>References</a></>;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
    <nav className="shell guide-breadcrumb" aria-label="Breadcrumb"><SiteLink href="/">Home</SiteLink><span aria-hidden="true">/</span><SiteLink href="/resources">Resources</SiteLink><span aria-hidden="true">/</span><span aria-current="page">{guide.title}</span></nav>
    <header className="shell guide-heading"><span className="eyebrow">{guide.category}</span><h1>{guide.title}</h1><p className="guide-lead">{guide.lead}</p><div className="guide-byline">{guide.status==="draft"&&<span className="guide-draft">Editorial draft · awaiting review · not published</span>}{guide.author&&<span>By {guide.author}</span>}{guide.reviewer&&<span>Reviewed by {guide.reviewer}</span>}{guide.status==="published"&&guide.publishedAt&&<time dateTime={guide.publishedAt}>{guide.publishedAt}</time>}</div></header>
    <figure className="shell guide-cover"><img src={sitePath(guideImage(slug,"cover"))} width={1672} height={941} alt={guide.coverAlt} fetchPriority="high"/><figcaption>Illustrative Concept</figcaption></figure>
    <div className="shell guide-reading-layout"><aside className="guide-toc"><span className="eyebrow">In this guide</span><nav aria-label="Article contents">{toc}</nav></aside><article className="guide-body">
      <details className="guide-mobile-toc"><summary>In this guide <span aria-hidden="true">+</span></summary><nav aria-label="Mobile article contents">{toc}</nav></details>
      {guide.sections.map((section,index)=><Fragment key={section.id}><section id={section.id}><h2>{section.title}</h2>{section.paragraphs.map((p,i)=><p key={i}><Text text={p}/></p>)}{section.table&&<div className="guide-table-scroll" role="region" aria-label={`${section.title} table`} tabIndex={0}><table><thead><tr>{section.table.headers.map(h=><th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{section.table.rows.map((row,i)=><tr key={i}>{row.map((cell,c)=>c===0?<th scope="row" key={c}>{cell}</th>:<td key={c}>{cell}</td>)}</tr>)}</tbody></table></div>}{section.bullets&&<ul className="guide-checklist">{section.bullets.map(item=><li key={item}><Text text={item}/></li>)}</ul>}{section.id==="template"&&guide.inquiryTemplate&&<InquiryTemplate text={guide.inquiryTemplate}/>}</section>{index===1&&<figure className="guide-body-image"><img src={sitePath(guideImage(slug,"body"))} width={1448} height={1086} alt={guide.bodyAlt} loading="lazy"/><figcaption>Illustrative Concept · {guide.bodyAlt.replace(/^Illustrative /,"")}</figcaption></figure>}</Fragment>)}
      <section className="guide-references" id="references"><span className="eyebrow">Source notes</span><h2>References</h2><p>These sources support the points linked in the text. General references do not verify a FRUNORIA product specification or a lot.</p><ol>{guide.references.map(r=><li key={r.url}><a href={r.url} target="_blank" rel="noreferrer">{r.title} ↗</a><p>{r.scope}</p><small>Source checked {r.checkedAt}</small></li>)}</ol></section>
    </article></div>
    <section className="guide-related-products"><div className="shell"><div className="guide-section-heading"><span className="eyebrow">From the current range</span><h2>Related Products</h2><p>Existing ingredient directions to explore. Product photographs are illustrative concepts.</p></div><div className="guide-product-grid">{relatedProducts.map(p=><article key={p.id}><SiteLink href={`/products/${p.id}`} aria-label={`View Product: ${p.name}`}><img src={sitePath(p.detail!.images.main)} width={1254} height={1254} alt={`Illustrative concept: ${p.name}`} loading="lazy"/></SiteLink><div><h3><SiteLink href={`/products/${p.id}`}>{p.name}</SiteLink></h3><SiteLink className="text-link" href={`/products/${p.id}`}>View Product <span aria-hidden="true">↗</span></SiteLink></div></article>)}</div></div></section>
    <section className="shell guide-related-guides"><div className="guide-section-heading"><span className="eyebrow">Continue reading</span><h2>Related Guides</h2></div><div className="guide-grid">{relatedGuides.map(g=><GuideCard key={g.slug} guide={guideSummary(g)}/>)}</div></section>
    <section className="guide-inquiry-section"><div className="shell"><GuideInquiry key={slug} title={guide.title} slug={slug} productIds={guide.relatedProducts}/></div></section>
  </>;
}
