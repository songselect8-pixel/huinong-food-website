import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveals } from "@/components/scroll-reveals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sitePath } from "@/data/paths";
import { pageMetadata } from "@/data/metadata";
import { brand } from "@/data/site";
import "./private-label.css";

export const metadata: Metadata = pageMetadata("Private Label Tea & Fruit Solutions", `Explore ingredient sourcing, blend development and custom packaging discussions for tea and fruit projects with ${brand.businessName}.`);

const process = [
  {
    number: "01",
    title: "Ingredient Selection",
    detail: "Define the fruit, floral or tea direction and the information your team needs.",
  },
  {
    number: "02",
    title: "Blend Development",
    detail: "Discuss the intended blend profile and review ingredient choices together.",
  },
  {
    number: "03",
    title: "Packaging Solution",
    detail: "Explore a format that fits the product brief and target market.",
  },
  {
    number: "04",
    title: "Production Coordination",
    detail: "Align the agreed production path and responsibilities with the approved brief.",
  },
  {
    number: "05",
    title: "Quality Control",
    detail: "Align specifications, testing and documentation with the agreed scope.",
  },
] as const;

const packagingFormats = [
  { name: "Tea Bags", options: ["Pyramid Bags", "Filter Bags"] },
  { name: "Pouches", options: ["Kraft Pouch", "Aluminum Foil Pouch"] },
  { name: "Gift Packaging", options: ["Tea Boxes", "Gift Sets"] },
  { name: "Labels", options: ["Custom Labels"] },
] as const;

const packagingCustomization = [
  "Packaging Format",
  "Material Selection",
  "Label Design",
  "Artwork Support",
  "Pack Size",
] as const;

const customizationTopics = [
  { number: "01", name: "Ingredient Selection", detail: "Choose a product direction." },
  { number: "02", name: "Blend Ratio", detail: "Share your target profile." },
  { number: "03", name: "Cut Size", detail: "Define the format you need." },
  { number: "04", name: "Packaging Format", detail: "Discuss your presentation." },
  { number: "05", name: "Label Design", detail: "Bring your artwork brief." },
  { number: "06", name: "MOQ Requirements", detail: "Share your target order quantity." },
] as const;

const workflowSteps = [
  { name: "Customer Idea", icon: "M9 18h6m-5 3h4M12 2a7 7 0 0 0-4 12.8c.8.5 1.3 1.2 1.5 2.2h5c.2-1 .7-1.7 1.5-2.2A7 7 0 0 0 12 2Z" },
  { name: "Ingredient Discussion", icon: "M12 21V10m0 6c-5 0-8-2.5-8-7 5 0 8 2.5 8 7Zm0-3c0-5 3-8 8-8 0 5-3 8-8 8Z" },
  { name: "Sample Development", icon: "M8 3h8m-6 0v6l-4.8 8.2A2.5 2.5 0 0 0 7.4 21h9.2a2.5 2.5 0 0 0 2.2-3.8L14 9V3M8 15h8" },
  { name: "Packaging Confirmation", icon: "m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7m-9 4v10M7.5 5l9 4" },
  { name: "Production Coordination", icon: "M4 4h6v6H4zm10 0h6v6h-6zm-5 10h6v6H9zM7 10v2h5v2m5-4v2h-5" },
  { name: "Quality Review", icon: "m12 2-8 3v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Zm-3.5 10 2.5 2.5 4.5-5" },
] as const;

const projectConsiderations = [
  "MOQ Requirements",
  "Product Format",
  "Packaging Selection",
  "Market Requirements",
  "Timeline Planning",
] as const;

export default function PrivateLabelPage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="pl-page">
        <section className="pl-hero shell" aria-labelledby="pl-hero-title">
          <div className="pl-hero-copy">
            <span className="eyebrow"><span className="eyebrow-line" /> For ambitious food &amp; tea brands</span>
            <h1 id="pl-hero-title">Private Label <em>Tea &amp; Fruit</em> Solutions</h1>
            <p>From ingredient sourcing and blend development to custom packaging solutions, we help brands move tea and fruit ideas toward finished products.</p>
            <div className="pl-hero-actions">
              <a className="button button-dark" href={sitePath("/#quote")}>Start Your Project <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#process">Explore the process <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="pl-hero-media">
            <Image
              src={sitePath("/images/private-label-hero.webp")}
              alt="Illustrative private label concept with herbal infusion, dried fruit, tea bags and blank packaging"
              width={1536}
              height={1024}
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <figcaption>Private Label Product Development Concept</figcaption>
          </figure>
        </section>

        <div className="shell pl-hero-footnote" aria-label="Project areas">
          <span>01 / Ingredients</span>
          <span>02 / Product direction</span>
          <span>03 / Packaging discussion</span>
        </div>

        <section className="pl-process section-space" id="process" aria-labelledby="pl-process-title">
          <div className="shell">
            <div className="pl-section-heading" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">A clear path for your brief</span>
                <h2 id="pl-process-title">From Ingredients to <em>Finished Products</em></h2>
              </div>
              <p>A practical sequence for aligning ingredients, format, production and quality requirements.</p>
            </div>
            <ol className="pl-process-list" data-reveal="">
              {process.map((step) => (
                <li key={step.number}>
                  <span className="pl-process-marker" aria-hidden="true">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pl-solutions section-space" id="solutions" aria-labelledby="pl-solutions-title">
          <div className="shell">
            <div className="pl-section-heading" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">Product directions</span>
                <h2 id="pl-solutions-title">Built around <em>your brief.</em></h2>
              </div>
              <p>Start with a format or an ingredient idea. We can discuss the specification and project scope from there.</p>
            </div>
            <div className="pl-solution-grid" data-reveal="">
              <article className="pl-solution-card pl-solution-fruit">
                <div className="pl-solution-media">
                  <Image src={sitePath("/images/private-label-ingredients.webp")} alt="Illustrative dried fruit and flower blend concept" width={1536} height={1024} unoptimized sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
                <div className="pl-solution-copy">
                  <span className="mini-label">01 / Fruit &amp; botanical</span>
                  <h3>Fruit Infusion Blends</h3>
                  <p>Explore a fruit-led infusion direction for your product brief.</p>
                </div>
              </article>
              <article className="pl-solution-card pl-solution-herbal">
                <div className="pl-solution-copy">
                  <span className="mini-label">02 / Botanical</span>
                  <h3>Botanical Tea Blends</h3>
                  <p>Discuss floral and herbal ingredient combinations.</p>
                  <span className="pl-solution-glyph" aria-hidden="true">✳</span>
                </div>
              </article>
              <article className="pl-solution-card pl-solution-tea">
                <div className="pl-solution-media">
                  <Image src={sitePath("/images/private-label-tea-bags.webp")} alt="Illustrative tea bag and brewed infusion concept" width={1536} height={1024} unoptimized sizes="(max-width: 760px) 100vw, 35vw" />
                </div>
                <div className="pl-solution-copy">
                  <span className="mini-label">03 / Filled format</span>
                  <h3>Tea Bags &amp; Sachets</h3>
                  <p>Define the filled tea contents, sachet format and packing requirements.</p>
                </div>
              </article>
              <article className="pl-solution-card pl-solution-garnish">
                <div className="pl-solution-media">
                  <Image src={sitePath("/images/application-beverage-garnish.webp")} alt="Illustrative beverage with dried citrus garnish" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 35vw" />
                </div>
                <div className="pl-solution-copy">
                  <span className="mini-label">04 / Dried fruit</span>
                  <h3>Dried Fruit Garnishes</h3>
                  <p>Review the fruit, cut and intended beverage use.</p>
                </div>
              </article>
              <article className="pl-solution-card pl-solution-pack">
                <div className="pl-solution-copy">
                  <span className="mini-label">05 / Presentation</span>
                  <h3>Custom Packaging</h3>
                  <p>Bring a packaging brief so the available formats can be confirmed.</p>
                  <a className="text-link" href="#packaging">See packaging directions <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            </div>
            <p className="pl-concept-note">Images are illustrative concepts, not individual product or packaging photographs.</p>
          </div>
        </section>

        <section className="pl-packaging section-space" id="packaging" aria-labelledby="pl-packaging-title">
          <div className="shell pl-packaging-layout">
            <figure className="pl-packaging-media" data-reveal="">
              <Image src={sitePath("/images/private-label-packaging.webp")} alt="Illustrative blank pouches, box and labels for packaging discussion" width={1536} height={1024} unoptimized sizes="(max-width: 900px) 100vw, 52vw" />
              <figcaption>Illustrative formats · final options reviewed by project</figcaption>
            </figure>
            <div className="pl-packaging-copy" data-reveal="">
              <span className="eyebrow section-kicker">Packaging directions</span>
              <h2 id="pl-packaging-title">Presentation starts with <em>the right format.</em></h2>
              <p>Tell us how your product should be packed and presented. Format availability is confirmed against the product and project requirements.</p>
              <ul className="pl-format-list">
                {packagingFormats.map((format, index) => (
                  <li key={format.name}>
                    <span className="pl-format-number">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{format.name}</strong>
                      <span className="pl-format-options">{format.options.join(" · ")}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="shell pl-packaging-custom" data-reveal="">
            <h3>Customization Options</h3>
            <ul>
              {packagingCustomization.map((option) => <li key={option}>{option}</li>)}
            </ul>
          </div>
          <aside className="shell pl-frozen-brief" aria-label="Frozen berry packaging discussion">
            <div><span className="eyebrow section-kicker">A separate frozen product brief</span><h3>Frozen berry packaging &amp; cold-chain requirements</h3><p>Frozen berries need their own packaging, storage and delivery discussion. Share the proposed berry, pack format, destination and temperature-record requirements so availability and project scope can be checked.</p></div>
            <a className="text-link" href={sitePath("/products/frozen-berries")}>Explore Frozen Berries <span aria-hidden="true">↗</span></a>
          </aside>
        </section>

        <section className="pl-custom section-space" id="customization" aria-labelledby="pl-custom-title">
          <div className="shell pl-custom-layout">
            <div className="pl-custom-intro" data-reveal="">
              <span className="eyebrow section-kicker">Make the brief your own</span>
              <h2 id="pl-custom-title">The details that shape <em>your product.</em></h2>
              <p>Share what you already know. The remaining details can be explored together during the sourcing discussion.</p>
              <a className="text-link" href={sitePath("/#private-label")}>Build a short brief <span aria-hidden="true">↗</span></a>
            </div>
            <ul className="pl-custom-list" data-reveal="">
              {customizationTopics.map((topic) => (
                <li key={topic.number}>
                  <span className="pl-custom-number">{topic.number}</span>
                  <strong>{topic.name}</strong>
                  <span className="pl-custom-detail">{topic.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pl-workflow section-space" id="workflow" aria-labelledby="pl-workflow-title">
          <div className="shell">
            <div className="pl-section-heading" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">Illustrative project path</span>
                <h2 id="pl-workflow-title">Private Label <em>Workflow Example</em></h2>
              </div>
              <p>From the first idea to a quality review, each stage helps define the next project decision.</p>
            </div>
            <ol className="pl-workflow-list" data-reveal="">
              {workflowSteps.map((step, index) => (
                <li key={step.name}>
                  <div className="pl-workflow-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                      <path d={step.icon} />
                    </svg>
                  </div>
                  <strong>{step.name}</strong>
                </li>
              ))}
            </ol>
            <p className="pl-workflow-note">The exact workflow is confirmed for each product and project.</p>
            <div className="pl-considerations" data-reveal="">
              <h3>Project Considerations</h3>
              <ul>
                {projectConsiderations.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="pl-quality section-space" id="quality-support" aria-labelledby="pl-quality-title">
          <div className="shell pl-quality-layout" data-reveal="">
            <div className="pl-quality-symbol" aria-hidden="true">
              <span className="pl-quality-page pl-quality-page-back" />
              <span className="pl-quality-page pl-quality-page-front"><i /><i /><i /><b>✓</b></span>
            </div>
            <div>
              <span className="eyebrow">Quality support</span>
              <h2 id="pl-quality-title">Confidence in every <em>sourcing decision.</em></h2>
              <p>Discuss product specifications, testing reports and the documentation required for your market and project.</p>
            </div>
            <a className="button button-outline" href={sitePath("/#quality")}>Explore Quality &amp; Compliance <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="pl-cta section-space" id="start-project" aria-labelledby="pl-cta-title">
          <div className="shell pl-cta-layout" data-reveal="">
            <div>
              <span className="eyebrow section-kicker">Your next product starts with a brief</span>
              <h2 id="pl-cta-title">Ready to Develop <em>Your Product?</em></h2>
              <p>Tell us the product direction, format and market you have in mind. We will start with the details that matter to your team.</p>
            </div>
            <a className="button button-dark" href={sitePath("/#quote")}>Start Your Project <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
