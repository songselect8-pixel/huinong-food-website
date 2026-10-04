import SiteLink from "@/components/site-link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QualityExplorer } from "@/components/quality-explorer";
import { pageMetadata } from "@/data/metadata";
import "./quality.css";

export const metadata: Metadata = pageMetadata("Quality & Compliance", "Review food safety certification records, product-specific documentation topics and market sourcing guides. Prepare a documentation inquiry with FRUNORIA.");

export default function QualityPage() {
  return <><SiteHeader /><main className="q-page" id="top"><header className="q-hero shell"><div><span className="eyebrow">FRUNORIA / Quality support</span><h1>Quality <em>& Compliance</em></h1><p>Clear documentation for informed sourcing.<br />Start with the product, check the scope, and tell us what your project needs.</p></div><SiteLink className="button button-dark" href="#documentation-requests">Request Documentation <span aria-hidden="true">↓</span></SiteLink></header><nav className="q-section-nav shell" aria-label="Quality page sections"><SiteLink href="#certifications">Certifications</SiteLink><SiteLink href="#product-documents">Product documents</SiteLink><SiteLink href="#markets">Target markets</SiteLink><SiteLink href="#documentation-requests">Documentation requests</SiteLink></nav><QualityExplorer /></main><SiteFooter /></>;
}
