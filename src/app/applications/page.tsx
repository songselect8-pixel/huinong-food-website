import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ApplicationInquiry } from "@/components/application-inquiry";
import { applicationPages, applicationOverviewImage } from "@/data/applications";
import { pageMetadata } from "@/data/metadata";
import { sitePath } from "@/data/paths";

export const metadata: Metadata = pageMetadata("Applications", "Explore tea, beverage garnish, bakery and prepared berry dessert application briefs with FRUNORIA. Connect your intended use to products and quality documents.");

export default function ApplicationsPage() {
  return <><SiteHeader /><main className="ap-page ap-overview" id="top">
    <section className="shell ap-overview-hero">
      <div className="ap-overview-copy"><span className="eyebrow">FRUNORIA / Applications</span><h1>Ingredients for <em>Your Next Application</em></h1><p>From a citrus garnish to a berry filling, start with the food you want to create. Explore the ingredient forms, selection questions and documents that shape your sourcing brief.</p><div className="ap-actions"><a className="button button-dark" href="#application-ranges">Explore Applications <span aria-hidden="true">↓</span></a><a className="text-link" href="#application-inquiry">Discuss Your Project <span aria-hidden="true">↗</span></a></div></div>
      <figure className="ap-overview-visual"><img src={sitePath(applicationOverviewImage)} alt="Application concept: a continuous food development workbench with separate tea, citrus drink and baked berry loaf scenes" width={1600} height={900} fetchPriority="high" /><figcaption>Application Concept</figcaption></figure>
    </section>

    <section className="shell ap-section" id="application-ranges" aria-labelledby="ap-ranges-title">
      <div className="ap-heading"><div><span className="eyebrow">Four ways to begin</span><h2 id="ap-ranges-title">Find your <em>application.</em></h2></div><p>Each guide connects a use concept with existing products and practical questions to discuss before sourcing.</p></div>
      <div className="ap-range-grid">{applicationPages.map(application => <article className="ap-range-card" key={application.id}>
        <a className="ap-range-image" href={sitePath(`/applications/${application.id}`)} aria-label={`Explore ${application.name}`}><img src={sitePath(application.cardImage)} alt={application.cardAlt} width={1448} height={1086} loading="lazy" /><span className="ap-image-note">Application Concept</span></a>
        <div className="ap-range-copy"><span className="eyebrow">Application / {application.number}</span><h3><a href={sitePath(`/applications/${application.id}`)}>{application.name}</a></h3><p>{application.shortDescription}</p><div className="ap-directions"><span className="mini-label">Related product directions</span><p>{application.direction}</p></div><a className="text-link" href={sitePath(`/applications/${application.id}`)}>Explore Application <span aria-hidden="true">↗</span></a></div>
      </article>)}</div>
    </section>

    <section className="ap-selection-band ap-section"><div className="shell ap-selection-layout"><div><span className="eyebrow">A useful starting point</span><h2>Begin with the <em>finished use.</em></h2><a className="text-link" href={sitePath("/quality")}>Explore Quality & Compliance <span aria-hidden="true">↗</span></a></div><ol className="ap-selection-list"><li><span>01</span><div><h3>Describe the food or drink</h3><p>Share its intended use, preparation and target market.</p></div></li><li><span>02</span><div><h3>Define the ingredient form</h3><p>Discuss slices, leaf cuts, blends or berry forms against the actual product.</p></div></li><li><span>03</span><div><h3>Agree what needs checking</h3><p>Identify the specification, packing and document questions for your project.</p></div></li></ol></div></section>

    <section className="ap-inquiry-section ap-section" id="application-inquiry"><div className="shell"><div className="ap-heading"><div><span className="eyebrow">Start a sourcing conversation</span><h2>Discuss <em>Your Project</em></h2></div><p>Choose an application and, if known, a product. Add only the packing or document details you already have.</p></div><ApplicationInquiry /></div></section>
  </main><SiteFooter /></>;
}
