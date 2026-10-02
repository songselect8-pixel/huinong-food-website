import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductInquiryPicker } from "@/components/product-inquiry-picker";
import { ScrollReveals } from "@/components/scroll-reveals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categories, products } from "@/data/site";
import { sitePath } from "@/data/paths";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.filter((product) => product.detail).map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug && item.detail);
  return product ? { title: `${product.name} | Huinong Food`, description: product.detail!.intro } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug && item.detail);
  if (!product?.detail) notFound();
  const detail = product.detail;
  const category = categories.find((item) => item.id === product.categoryId)!;
  const related = products.filter((item) => item.id !== product.id && (item.detail || item.categoryId === product.categoryId)).slice(0, 3);

  return <>
    <SiteHeader />
    <main className="pd-page" id="top">
      <section className="shell pd-hero">
        <div className="pd-hero-copy">
          <nav className="pd-breadcrumb" aria-label="Breadcrumb"><a href={sitePath("/products")}>Products</a><span aria-hidden="true">/</span><a href={sitePath(product.categoryId === "frozen-berries" ? "/products/frozen-berries" : `/products?category=${product.categoryId}`)}>{category.name}</a></nav>
          <span className="eyebrow section-kicker">Ingredient direction / sourcing brief</span>
          <h1>{product.name}</h1>
          <p className="pd-lead">{detail.intro}</p>
          <p className="pd-positioning">{detail.positioning}</p>
          <div className="pd-hero-actions"><a className="button button-dark" href="#product-options">Choose a request <span aria-hidden="true">↓</span></a><a className="text-link" href={sitePath(`/?product=${product.id}#quote`)}>Ask about this product <span aria-hidden="true">↗</span></a></div>
        </div>
        <figure className="pd-main-image"><img src={sitePath(detail.images.main)} alt={`Illustrative image of ${product.name.toLowerCase()}`} width={1254} height={1254} loading="eager" fetchPriority="high" /><figcaption>Illustrative product image · not a verified lot photograph</figcaption></figure>
      </section>

      <section className="shell pd-gallery" aria-label="Product and application image gallery">
        <figure><img src={sitePath(detail.images.detail)} alt={`Illustrative close detail of ${product.name.toLowerCase()}`} width={1448} height={1086} loading="lazy" /><figcaption>Illustrative product detail</figcaption></figure>
        <figure><img src={sitePath(detail.images.application)} alt={`Illustrative application concept for ${product.name.toLowerCase()}`} width={1448} height={1086} loading="lazy" /><figcaption>Application concept · suitability to confirm</figcaption></figure>
      </section>

      <section className="pd-options section-space" id="product-options"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">01 / Product form</span><h2>Choose the <em>right brief.</em></h2></div><p>{detail.positioning}</p></div><ProductInquiryPicker productId={product.id} options={detail.forms} /></div></section>

      <section className="shell pd-specs section-space" id="specifications"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">02 / Specification</span><h2>What buyers should <em>confirm.</em></h2></div><p>Use these topics to agree on a test method and acceptance standard. No numerical lot specification is assumed here.</p></div><div className="pd-spec-grid">{detail.specification.map((item, index) => <article key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.name}</h3><p>{item.buyerCheck}</p></article>)}</div></section>

      <section className="pd-applications section-space" id="applications"><div className="shell pd-application-layout"><div className="pd-application-copy"><span className="eyebrow section-kicker">03 / Application directions</span><h2>Plan around the <em>finished use.</em></h2><p>These are project discussion directions. Product suitability, processing and market requirements must be checked against the actual supply.</p><div className="pd-use-list">{detail.applications.map((item) => <article key={item.name}><h3>{item.name}</h3><p>{item.note}</p></article>)}</div></div><figure><img src={sitePath(detail.images.application)} alt={`Illustrative application concept for ${product.name.toLowerCase()}`} width={1448} height={1086} loading="lazy" /><figcaption>Application concept · product suitability requires review</figcaption></figure></div></section>

      <section className="shell pd-logistics section-space" id="packing"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">04 / Handling</span><h2>Packaging, storage <em>&amp; shipment.</em></h2></div><p>Agree on the actual packaging and handover details for the selected product and destination.</p></div><div className="pd-logistics-grid">{detail.storage.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div></section>

      <section className="pd-documents section-space" id="quality"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">05 / Quality support</span><h2>Documents for the <em>right decision.</em></h2></div><p>Access, system scope and batch files are different questions. Availability and applicability must be checked for the supplying site, lot and market.</p></div><div className="pd-document-grid">{detail.documents.map((group, index) => <article key={group.group}><span className="pd-document-number">0{index + 1}</span><span className="pd-document-icon" aria-hidden="true">{index === 0 ? "◎" : index === 1 ? "◇" : "▤"}</span><h3>{group.group}</h3><p>{group.note}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><p className="pd-document-note">These are document topics for a buyer checklist. No certificate, test result or market approval is asserted for this product.</p></div></section>

      <section className="shell pd-faq section-space" id="faq"><div><span className="eyebrow section-kicker">06 / Buyer questions</span><h2>Frequently asked <em>questions.</em></h2></div><div className="pd-faq-list">{detail.faq.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className="pd-related section-space"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">Explore more</span><h2>Related <em>directions.</em></h2></div><a className="text-link" href={sitePath("/products")}>View all products <span aria-hidden="true">↗</span></a></div><div className="pd-related-grid">{related.map((item) => <a href={sitePath(item.detail ? `/products/${item.id}` : `/products?category=${item.categoryId}`)} key={item.id}><span className="mini-label">{categories.find((entry) => entry.id === item.categoryId)?.name}</span><strong>{item.name}</strong><span aria-hidden="true">↗</span></a>)}</div></div></section>

      <section className="pd-cta section-space"><div className="shell pd-cta-layout"><div><span className="eyebrow section-kicker">Start a sourcing conversation</span><h2>Tell us what <em>you need.</em></h2><p>Your product, category and selected form can carry into the inquiry preview. Add your use, market, quantity and documentation questions there.</p></div><a className="button button-dark" href={sitePath(`/?product=${product.id}#quote`)}>Start an inquiry <span aria-hidden="true">↗</span></a></div></section>
    </main><SiteFooter /><ScrollReveals />
  </>;
}
