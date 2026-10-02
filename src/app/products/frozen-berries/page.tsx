import type { Metadata } from "next";
import { ScrollReveals } from "@/components/scroll-reveals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/data/site";
import { sitePath } from "@/data/paths";

export const metadata: Metadata = {
  title: "Frozen Berries | Huinong Food",
  description: "Explore IQF frozen raspberry and blueberry ingredient directions, buyer specifications and cold-chain questions.",
};

const berries = products.filter((product) => product.categoryId === "frozen-berries" && product.detail);

export default function FrozenBerriesPage() {
  return <>
    <SiteHeader />
    <main className="frozen-page" id="top">
      <section className="shell frozen-hero">
        <div>
          <a className="pd-breadcrumb" href={sitePath("/products")}>Products <span aria-hidden="true">/</span> Frozen Berries</a>
          <span className="eyebrow section-kicker">A focused frozen fruit brief</span>
          <h1>Frozen Berries <em>for food projects.</em></h1>
          <p>Start with the berry identity and intended use, then define the fruit quality, packing and cold-chain evidence your team needs.</p>
          <a className="button button-dark" href="#frozen-products">Explore the range <span aria-hidden="true">↓</span></a>
        </div>
        <div className="frozen-hero-visual" aria-label="Illustrative images of frozen raspberries and blueberries">
          {berries.map((product) => <img src={sitePath(product.detail!.images.main)} alt={`Illustrative ${product.name.toLowerCase()}`} width={1254} height={1254} key={product.id} />)}
        </div>
      </section>
      <section className="shell frozen-range section-space" id="frozen-products">
        <div className="pd-section-heading"><div><span className="eyebrow section-kicker">01 / Explore products</span><h2>Choose the berry <em>brief.</em></h2></div><p>These are product development directions. Identity, grade, availability and batch values need supplier confirmation.</p></div>
        <div className="frozen-product-grid">
          {berries.map((product) => <article className="frozen-product-card" key={product.id}>
            <a href={sitePath(`/products/${product.id}`)}><img src={sitePath(product.detail!.images.main)} alt={`Illustrative ${product.name.toLowerCase()} product concept`} width={1254} height={1254} loading="lazy" /></a>
            <div><span className="mini-label">IQF / Frozen berries</span><h3>{product.name}</h3><p>{product.detail!.intro}</p><a className="text-link" href={sitePath(`/products/${product.id}`)}>View sourcing details <span aria-hidden="true">↗</span></a></div>
          </article>)}
        </div>
      </section>
      <section className="frozen-checks section-space"><div className="shell"><div className="pd-section-heading"><div><span className="eyebrow section-kicker">02 / Buyer checks</span><h2>Define what <em>matters first.</em></h2></div><p>A useful quote begins with an accepted fruit identity, quality standard and handling plan.</p></div><div className="frozen-check-grid"><article><span>01</span><h3>Fruit identity</h3><p>Confirm species or variety, origin and the difference between whole, broken or processing forms.</p></article><article><span>02</span><h3>Product specification</h3><p>Agree on size, integrity, defects, Brix or acidity where relevant, using a shared inspection method.</p></article><article><span>03</span><h3>Cold-chain brief</h3><p>Set packing, storage, shipment monitoring and responsibility at handover for the proposed lot.</p></article></div></div></section>
      <section className="shell frozen-end section-space"><h2>Ready to discuss frozen berries?</h2><p>Include the berry, intended application, destination market, requested form and cold-chain requirements.</p><a className="button button-dark" href={sitePath("/?category=frozen-berries#quote")}>Start a frozen berry brief <span aria-hidden="true">↗</span></a></section>
    </main><SiteFooter /><ScrollReveals />
  </>;
}
