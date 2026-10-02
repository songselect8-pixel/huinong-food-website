import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product-browser";
import { ScrollReveals } from "@/components/scroll-reveals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sitePath } from "@/data/paths";
import { pageMetadata } from "@/data/metadata";
import { brand } from "@/data/site";

export const metadata: Metadata = pageMetadata("Products & Ingredient Directions", `Explore dried fruits, botanical ingredients, tea directions and frozen berry sourcing briefs from ${brand.businessName}.`);

export default function ProductsPage() {
  return <>
    <SiteHeader />
    <main className="catalog-page" id="top">
      <section className="shell catalog-hero">
        <span className="eyebrow section-kicker">Product ranges / sourcing directions</span>
        <h1>Find the ingredient for <em>your next brief.</em></h1>
        <p>Browse product directions and tell us the format, application and documentation your team needs. Specifications and supply terms are confirmed by project.</p>
      </section>
      <section className="shell catalog-main" aria-label="Products and category filters"><ProductBrowser /></section>
      <section className="catalog-end"><div className="shell"><h2>Need a more specific starting point?</h2><p>Share your use, target market and requested form. We can review the product direction with you.</p><a className="button button-dark" href={sitePath("/#quote")}>Start an inquiry <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <SiteFooter /><ScrollReveals />
  </>;
}
