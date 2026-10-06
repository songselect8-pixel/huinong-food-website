import SiteLink from "@/components/site-link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { QuoteForm } from "@/components/quote-form";
import { sourcingQuestions } from "@/data/buyer-support";
import { siteIdentity } from "@/data/site";
import { sitePath } from "@/data/paths";
import { pageMetadata } from "@/data/metadata";
import "./contact.css";

export const metadata = pageMetadata("Start Your Sourcing Project", "Prepare a FRUNORIA product, private label or documentation inquiry. Review your product, application and market requirements in one preview.");

export default function ContactPage() {
  return <><SiteHeader /><main id="main" className="contact-page"><div className="shell ct-layout">
    <aside className="ct-intro"><span className="eyebrow">A clear brief. A useful beginning.</span><h1>Start Your<br /><em>Sourcing Project</em></h1><p className="ct-lead">Bring a product, sample, packaging or document request. Your selections stay together in one sourcing brief.</p><figure><img src={sitePath("/images/about-contact/v1/contact-project.webp")} width={1448} height={1086} alt="Illustrative sourcing brief concept with dried tea ingredients, a plain sample pouch and a blank notebook" fetchPriority="high" /><figcaption>Illustrative Concept</figcaption></figure><div className="ct-guide"><h2>Start with what you know.</h2><p>A product name and intended use are enough to start. Add quantity, pack format, target market or sample criteria when you have them. Review the result, then copy or download your draft for your team.</p><SiteLink href="/products" className="text-link">Browse products <span aria-hidden="true">↗</span></SiteLink><SiteLink href="/quality" className="text-link">Explore quality documents <span aria-hidden="true">↗</span></SiteLink></div>
      {(siteIdentity.email || siteIdentity.phone || siteIdentity.address) && <div className="ct-confirmed-contact"><h2>Contact details</h2>{siteIdentity.email && <a href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a>}{siteIdentity.phone && <a href={`tel:${siteIdentity.phone}`}>{siteIdentity.phone}</a>}{siteIdentity.address && <p>{siteIdentity.address}</p>}</div>}
    </aside>
    <section id="quote" className="ct-form-area" aria-label="Sourcing inquiry"><QuoteForm /></section>
  </div><section className="shell ct-faq" aria-labelledby="contact-questions"><div><span className="eyebrow">Preparing your request</span><h2 id="contact-questions">A Few Practical <em>Answers</em></h2><p>Use this brief for an initial discussion. Pricing, samples and order terms require a separate agreement.</p></div><div>{sourcingQuestions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section></main><SiteFooter /></>;
}
