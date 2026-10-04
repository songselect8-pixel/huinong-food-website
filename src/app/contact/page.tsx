import SiteLink from "@/components/site-link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QuoteForm } from "@/components/quote-form";
import { siteIdentity } from "@/data/site";
import { sitePath } from "@/data/paths";
import { pageMetadata } from "@/data/metadata";
import "./contact.css";

export const metadata = pageMetadata("Start Your Sourcing Project", "Prepare a FRUNORIA product, private label or documentation inquiry. Review your product, application and market requirements in one preview.");

export default function ContactPage() {
  return <><SiteHeader /><main id="main" className="contact-page"><div className="shell ct-layout">
    <aside className="ct-intro"><span className="eyebrow">A clear brief. A useful beginning.</span><h1>Start Your<br /><em>Sourcing Project</em></h1><p className="ct-lead">Tell us what you are looking for, your intended application and destination market.</p><figure><img src={sitePath("/images/about-contact/v1/contact-project.webp")} width={1448} height={1086} alt="Illustrative sourcing brief concept with dried tea ingredients, a plain sample pouch and a blank notebook" fetchPriority="high" /><figcaption>Illustrative Concept</figcaption></figure><div className="ct-guide"><h2>Start with what you know.</h2><p>A product name, a planned use or a document question is enough to begin. You can review the brief before taking it further.</p><SiteLink href="/products" className="text-link">Browse products <span aria-hidden="true">↗</span></SiteLink><SiteLink href="/quality" className="text-link">Explore quality documents <span aria-hidden="true">↗</span></SiteLink></div>
      {(siteIdentity.email || siteIdentity.phone || siteIdentity.address) && <div className="ct-confirmed-contact"><h2>Contact details</h2>{siteIdentity.email && <a href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a>}{siteIdentity.phone && <a href={`tel:${siteIdentity.phone}`}>{siteIdentity.phone}</a>}{siteIdentity.address && <p>{siteIdentity.address}</p>}</div>}
    </aside>
    <section id="quote" className="ct-form-area" aria-label="Sourcing inquiry"><QuoteForm /></section>
  </div></main><SiteFooter /></>;
}
