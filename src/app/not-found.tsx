import SiteLink from "@/components/site-link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/data/metadata";
import { sitePath } from "@/data/paths";
import { brand } from "@/data/site";

export const metadata: Metadata = pageMetadata("Page Not Found", `Return to the ${brand.name} ingredient sourcing homepage.`);

export default function NotFound() {
  return <>
    <SiteHeader />
    <main className="shell not-found-page">
      <span className="eyebrow section-kicker">404 / Page not found</span>
      <h1>Let’s return to the right ingredients.</h1>
      <p>This page is not available. Explore {brand.name}’s product ranges or return to the homepage.</p>
      <SiteLink className="button button-dark" href={sitePath("/")}>Back to {brand.name} <span aria-hidden="true">↗</span></SiteLink>
    </main>
    <SiteFooter />
  </>;
}
