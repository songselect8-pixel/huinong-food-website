import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ApplicationInquiry } from "@/components/application-inquiry";
import { applicationPages } from "@/data/applications";
import { products, categories } from "@/data/site";
import { pageMetadata } from "@/data/metadata";
import { sitePath } from "@/data/paths";

type Props = {params: Promise<{slug: string}>};
export function generateStaticParams() { return applicationPages.map(application => ({slug:application.id})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const application = applicationPages.find(item => item.id === slug);
  return application ? pageMetadata(application.name,application.shortDescription) : {};
}

export default async function ApplicationDetailPage({params}: Props) {
  const {slug} = await params;
  const application = applicationPages.find(item => item.id === slug);
  if (!application) notFound();
  const related = application.productIds.flatMap(id => {const product = products.find(item => item.id === id && item.detail); return product ? [product] : [];});

  return <><SiteHeader /><main className="ap-page ap-detail" id="top">
    <nav className="shell ap-breadcrumb" aria-label="Breadcrumb"><a href={sitePath("/applications")}>Applications</a><span aria-hidden="true">/</span><span aria-current="page">{application.name}</span></nav>
    <section className="shell ap-detail-hero"><div className="ap-detail-copy"><span className="eyebrow">Application / {application.number}</span><h1>{application.name}</h1><p>{application.intro}</p><div className="ap-actions"><a className="button button-dark" href="#application-inquiry">Discuss This Application <span aria-hidden="true">↓</span></a><a className="text-link" href="#related-products">Explore Products <span aria-hidden="true">↓</span></a></div></div><figure className="ap-detail-visual"><img src={sitePath(application.heroImage)} alt={application.heroAlt} width={1536} height={1024} fetchPriority="high" /><figcaption>Application Concept</figcaption></figure></section>
    <nav className="shell ap-section-nav" aria-label="Application page sections"><a href="#ingredient-forms">Ingredient forms</a><a href="#related-products">Related products</a><a href="#selection">Selection brief</a><a href="#documents">Packing & documents</a><a href="#faq">FAQ</a></nav>

    <section className="shell ap-section" id="ingredient-forms"><div className="ap-heading"><div><span className="eyebrow">01 / The ingredient direction</span><h2>Start with <em>the right form.</em></h2></div><p>{application.shortDescription}</p></div><div className="ap-form-grid">{application.forms.map((form,index) => <article key={form.name}><span className="ap-index">0{index+1}</span><h3>{form.name}</h3><p>{form.detail}</p></article>)}</div></section>

    <section className="ap-related-section ap-section" id="related-products"><div className="shell"><div className="ap-heading"><div><span className="eyebrow">02 / Existing product directions</span><h2>Explore <em>the ingredients.</em></h2></div><p>Open a product to review its form, selection questions and documentation. Product visuals remain illustrative concepts.</p></div><div className="ap-related-grid">{related.map(product => <article className="ap-product-card" key={product.id}><a className="ap-product-image" href={sitePath(`/products/${product.id}`)} aria-label={`View Product: ${product.name}`}><img src={sitePath(product.detail!.images.main)} alt={`Illustrative product concept: ${product.name}`} width={1254} height={1254} loading="lazy" /></a><div><span className="mini-label">{categories.find(category => category.id === product.categoryId)?.name}</span><h3><a href={sitePath(`/products/${product.id}`)}>{product.name}</a></h3><a className="text-link" href={sitePath(`/products/${product.id}`)}>View Product <span aria-hidden="true">↗</span></a></div></article>)}</div></div></section>

    <section className="shell ap-section" id="selection"><div className="ap-heading"><div><span className="eyebrow">03 / Before sourcing</span><h2>Build a <em>clear selection brief.</em></h2></div><p>{application.suitability}</p></div><dl className="ap-check-list">{application.checks.map((check,index) => <div key={check.name}><dt><span>0{index+1}</span>{check.name}</dt><dd>{check.detail}</dd></div>)}</dl></section>

    <section className="ap-document-section ap-section" id="documents"><div className="shell ap-document-layout"><div><span className="eyebrow">04 / Packing & evidence</span><h2>Connect the pack <em>and the paperwork.</em></h2><p>{application.packaging}</p><a className="text-link" href={sitePath("/private-label")}>Private Label & Packaging <span aria-hidden="true">↗</span></a></div><div className="ap-document-panel"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M8 3h11l6 6v20H8V3Zm11 0v7h6M12 15h9m-9 5h9m-9 5h5" /></svg><h3>Documents to discuss</h3><ul>{application.documents.map(document => <li key={document}>{document}</li>)}</ul><a className="button button-outline" href={sitePath("/quality")}>Explore Quality & Compliance <span aria-hidden="true">↗</span></a><p className="ap-document-note">Document availability and certification scope are checked against the product, holder and project.</p></div></div></section>

    <section className="shell ap-section ap-faq" id="faq"><div><span className="eyebrow">05 / Common questions</span><h2>Before <em>we begin.</em></h2></div><div className="ap-faq-list">{application.faq.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>

    <section className="ap-inquiry-section ap-section" id="application-inquiry"><div className="shell"><div className="ap-heading"><div><span className="eyebrow">06 / Your project brief</span><h2>Discuss <em>This Application</em></h2></div><p>Choose a product if you have one in mind. Your application, product and optional requirements carry into the existing inquiry.</p></div><ApplicationInquiry applicationId={application.id} /></div></section>
  </main><SiteFooter /></>;
}
