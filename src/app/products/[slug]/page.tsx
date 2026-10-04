import SiteLink from "@/components/site-link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInquiryPicker, ProductInquiryProvider, ProductQuoteLink } from "@/components/product-inquiry-picker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categories, products } from "@/data/site";
import { sitePath } from "@/data/paths";
import { pageMetadata } from "@/data/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.filter((product) => product.detail).map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug && item.detail);
  return product ? pageMetadata(product.name, product.detail!.intro) : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.id === slug && item.detail);
  if (!product?.detail) notFound();
  const detail = product.detail;
  const category = categories.find((item) => item.id === product.categoryId)!;
  const others = products.filter((item) => item.id !== product.id && item.detail);
  const related = [...others.filter((item) => item.categoryId === product.categoryId), ...others.filter((item) => item.categoryId !== product.categoryId)].slice(0, 3);
  const productForm = detail.knownFacts.find((fact) => fact.name === "Product form" || fact.name === "Product direction");

  return <>
    <SiteHeader />
    <ProductInquiryProvider key={product.id} productId={product.id}>
      <main className="pd-page" id="top">
        <nav className="shell pd-breadcrumb pd-top-breadcrumb" aria-label="Breadcrumb"><SiteLink href={sitePath("/products")}>Products</SiteLink><span aria-hidden="true">/</span><SiteLink href={sitePath(product.categoryId === "frozen-berries" ? "/products/frozen-berries" : `/products?category=${product.categoryId}`)}>{category.name}</SiteLink><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
        <section className="shell pd-hero" aria-labelledby="product-title">
          <ProductGallery name={product.name} images={detail.images} />
          <div className="pd-hero-copy">
            <span className="eyebrow section-kicker">{category.name}</span>
            <h1 id="product-title">{product.name}</h1>
            <p className="pd-lead">{detail.intro}</p>
            {productForm && <p className="pd-confirmed-form"><span>{productForm.name}</span><strong>{productForm.value}</strong></p>}
            <div className="pd-hero-actions"><ProductQuoteLink /><SiteLink className="text-link" href="#specifications">Specifications & Selection <span aria-hidden="true">↓</span></SiteLink></div>
            <p className="pd-hero-note">Choose a requirement below to include it in your inquiry.</p>
          </div>
        </section>

        <nav className="shell pd-section-nav" aria-label="Product page sections"><SiteLink href="#overview">Overview</SiteLink><SiteLink href="#specifications">Specifications & Selection</SiteLink><SiteLink href="#applications">Applications</SiteLink><SiteLink href="#packing">Packaging & Storage</SiteLink><SiteLink href="#quality">Quality & Documentation</SiteLink><SiteLink href="#faq">FAQ</SiteLink></nav>

        <section className="shell pd-overview section-space" id="overview"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">01 / Product information</span><h2>Product <em>Overview</em></h2></div><p>{detail.overview}</p></div><dl className="pd-known-facts">{detail.knownFacts.map((fact) => <div key={fact.name}><dt>{fact.name}</dt><dd>{fact.value}</dd></div>)}</dl><p className="pd-facts-note">Product identity and direction shown above. Lot specifications and the final declaration are confirmed with the proposed supply.</p></section>

        <section className="pd-options section-space" id="specifications"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">02 / Build your brief</span><h2>Specifications <em>& Selection</em></h2></div><p>{detail.positioning}</p></div><h3 className="pd-subheading" id="product-options">Your procurement requirements</h3><ProductInquiryPicker options={detail.forms} /><div className="pd-spec-heading"><h3 className="pd-subheading">Key points to confirm</h3><p>Share your targets. Measured values and acceptance criteria belong in the agreed product specification.</p></div><div className="pd-spec-grid">{detail.specification.map((item, index) => <article key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.name}</h3><p>{item.buyerCheck}</p></article>)}</div></div></section>

        <section className="pd-applications section-space" id="applications"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">03 / Intended use</span><h2>Application <em>Directions</em></h2></div><p>Use these starting points to describe your project. Review suitability and preparation against the actual product.</p></div><div className="pd-use-cards">{detail.applications.map((item, index) => <article key={item.name}><span>0{index + 1}</span><h3>{item.name}</h3><p>{item.note}</p></article>)}</div></div></section>

        <section className="shell pd-logistics section-space" id="packing"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">04 / Handling</span><h2>Packaging <em>& Storage</em></h2></div><p>Align the pack, storage instructions and handover requirements with the selected product.</p></div><div className="pd-logistics-grid">{detail.storage.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div></section>

        <section className="pd-documents section-space" id="quality"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">05 / Buyer checklist</span><h2>Quality <em>& Documentation</em></h2></div><p>Review the documents relevant to the product, supplying site, lot and destination market.</p></div><div className="pd-document-grid">{detail.documents.map((group, index) => <article key={group.group}><span className="pd-document-number">0{index + 1}</span><h3>{group.group}</h3><p>{group.note}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><p className="pd-document-note">Document topics for discussion; specific reports and certificate scope require confirmation.</p><SiteLink className="text-link" href={sitePath(`/quality?product=${product.id}#product-documents`)}>Explore Quality &amp; Compliance <span aria-hidden="true">↗</span></SiteLink></div></section>

        <section className="shell pd-faq section-space" id="faq"><div><span className="eyebrow section-kicker">06 / Buyer questions</span><h2>Frequently Asked <em>Questions</em></h2></div><div className="pd-faq-list">{detail.faq.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

        <section className="pd-related section-space"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">Explore more</span><h2>Related <em>Products</em></h2></div><SiteLink className="text-link" href={sitePath("/products")}>View all products <span aria-hidden="true">↗</span></SiteLink></div><div className="pd-related-grid">{related.map((item) => <SiteLink href={sitePath(`/products/${item.id}`)} key={item.id}><img src={sitePath(item.detail!.images.main)} alt={`Illustrative concept of ${item.name.toLowerCase()}`} width={1254} height={1254} loading="lazy" /><span className="mini-label">{categories.find((entry) => entry.id === item.categoryId)?.name}</span><strong>{item.name}</strong><span className="pd-related-action">View Product <span aria-hidden="true">↗</span></span></SiteLink>)}</div></div></section>

        <section className="pd-cta section-space"><div className="shell pd-cta-layout"><div><span className="eyebrow section-kicker">Start a sourcing conversation</span><h2>Discuss <em>Your Requirements</em></h2><p>Your product and selected requirement carry into the inquiry preview. Add your intended use, quantity, market and documentation questions there.</p></div><ProductQuoteLink /></div></section>
      </main>
    </ProductInquiryProvider>
    <SiteFooter />
  </>;
}
