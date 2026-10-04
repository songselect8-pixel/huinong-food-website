import SiteLink from "@/components/site-link";
import { ApplicationExplorer } from "@/components/application-explorer";
import { PackagingPlanner } from "@/components/packaging-planner";
import { QualityDetails } from "@/components/quality-details";
import { QuoteForm } from "@/components/quote-form";
import { ScrollReveals } from "@/components/scroll-reveals";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand, categories } from "@/data/site";
import { getGuides } from "@/data/guides";
import { guideImage } from "@/data/guide-types";
import { sitePath } from "@/data/paths";

const qualitySupportTopics = [
  {
    kind: "systems",
    title: "Food Safety Systems",
    description: "Review certification documents against the actual holder, product and process scope.",
    listLabel: "Systems to verify",
    items: ["HACCP", "ISO 22000", "BRCGS", "FSSC 22000"],
  },
  {
    kind: "testing",
    title: "Product Testing",
    description: "Tell us which analyses matter for your ingredient and destination market.",
    listLabel: "Reports to discuss",
    items: ["COA", "Microbiology Testing", "Pesticide Residue Testing", "Heavy Metal Analysis"],
  },
  {
    kind: "export",
    title: "Export Documentation",
    description: "Share your document checklist so availability can be checked for your project.",
    listLabel: "Documents to review",
    items: ["Specification Sheet", "Ingredient Information", "Packaging Information", "Market Documentation"],
  },
] as const;

function SupportIcon({ kind }: { kind: "systems" | "testing" | "export" }) {
  if (kind === "systems") return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="19" />
      <path d="M24 13.5 33 17v7c0 6-3.4 10.1-9 12.9-5.6-2.8-9-6.9-9-12.9v-7l9-3.5Z" />
      <path d="m19.8 24 3.1 3.1 5.8-6.1" />
    </svg>
  );
  if (kind === "testing") return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 7h18l7 7v27H13zM31 7v7h7M19 20h12M19 25h8M19 30h5" />
      <circle cx="32" cy="32" r="5" />
      <path d="m36 36 5 5" />
    </svg>
  );
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 15h13l4 4h15v22H8zM8 15v-5h16l4 5" />
      <circle cx="27" cy="29" r="7" />
      <path d="M20 29h14M27 22c-3 4-3 10 0 14M27 22c3 4 3 10 0 14" />
    </svg>
  );
}

export default function HomePage() {
  const guides = getGuides();
  const homeGuides = ["frozen-vs-freeze-dried-berries", "private-label-tea-packaging", "ingredient-sourcing-inquiry"].map(slug => guides.find(guide => guide.slug === slug)).filter(guide => guide !== undefined);
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-media">
            <img
              src={sitePath("/images/home-berries-citrus-hero.webp")}
              alt="Illustrative composition of frozen raspberries and blueberries beside dried lemon and orange slices with a few dried flowers"
              width={1536}
              height={1024}
              loading="eager"
              fetchPriority="high"
            />
            <span className="hero-image-note">Illustrative ingredient concept</span>
          </div>
          <div className="hero-copy">
            <svg className="hero-sprig" viewBox="0 0 220 240" fill="none" aria-hidden="true">
              <path className="hero-sprig-stem" d="M48 222c47-53 84-105 112-194" />
              <path d="M107 146c-28-4-45-24-51-52 29 1 46 17 51 52Zm21-39c-1-31 15-52 45-63-2 31-17 52-45 63Zm-46 72c-26-1-44-13-54-37 26-3 44 9 54 37Zm65-98c-1-25 9-42 33-54 2 25-9 43-33 54Z" />
            </svg>
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> Frozen berries · Dried fruits · Botanicals · Tea</span>
            <h1 id="hero-title">Fruit <em>&amp;</em> Botanical Ingredients for Your Business</h1>
            <p>Explore frozen berries, dried fruits, floral ingredients and tea blends for your next sourcing project.</p>
            <div className="hero-actions">
              <SiteLink className="button button-dark" href="#quote">Request a Quote <span aria-hidden="true">↗</span></SiteLink>
              <SiteLink className="text-link" href="#products">Explore Products <span aria-hidden="true">↗</span></SiteLink>
            </div>
          </div>
        </section>

        <div className="shell hero-underbar">
          <span>Ingredient directions for considered sourcing</span>
          <SiteLink href="#products">Discover the range <span aria-hidden="true">↓</span></SiteLink>
        </div>

        <section className="product-section section-space" id="products" aria-labelledby="products-title">
          <div className="shell">
            <div className="section-intro" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">01 / Product ranges</span>
                <h2 id="products-title">Explore our product ranges.</h2>
              </div>
              <p>From dried botanicals to frozen berries, choose a range and tell us the product, format and application your project needs.</p>
            </div>

            <div className="category-grid" data-reveal="">
              {categories.map((category) => (
                <SiteLink className={`category-card ${category.id === "frozen-berries" ? "category-card-frozen" : ""}`} href={sitePath(`/products?category=${category.id}`)} key={category.id} aria-label={`Explore ${category.name}`}>
                  <div className="category-media">
                    <img
                      src={sitePath(category.image)}
                      alt={category.imageAlt}
                      width={1448}
                      height={1086}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="category-copy">
                    <span className="category-number">{category.number} / 05 <span>Ingredient range</span></span>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="category-action">Explore range <span aria-hidden="true">↗</span></span>
                  </div>
                </SiteLink>
              ))}
            </div>
            <p className="image-disclaimer">Category images are illustrative in this development preview. Confirm specific ingredients and formats before ordering.</p>
          </div>
        </section>

        <section className="applications-section section-space" id="applications" aria-labelledby="applications-title">
          <div className="shell">
            <div className="applications-heading" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">02 / Applications</span>
                <h2 id="applications-title">Explore by the way you&apos;ll use it.</h2>
              </div>
              <p>Choose an application to see a relevant product direction and a visual concept. Suitability and specifications remain product specific.</p>
            </div>
            <ApplicationExplorer />
            <div className="application-more">
              <span className="mini-label">More ingredient directions</span>
              <p>For baked goods, fruit preparations and dairy or frozen dessert projects, explore <SiteLink href={sitePath("/products/frozen-berries")}>Frozen Berries</SiteLink>. For botanical blends or loose-leaf infusions, explore <SiteLink href={sitePath("/products/raspberry-leaf-tea")}>Raspberry Leaf Tea</SiteLink>. Suitability is reviewed by product and use.</p>
            </div>
          </div>
        </section>

        <section className="support-section" id="quality-support" aria-labelledby="support-title">
          <div className="shell">
            <div className="support-heading" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">03 / Quality support</span>
                <h2 id="support-title">Quality &amp; Global Supply Support</h2>
              </div>
              <div className="support-heading-copy">
                <p className="support-tagline">Quality documents for every sourcing decision.</p>
                <p>From product specifications to testing documents, we help buyers understand the documentation and quality support needed for different markets and projects.</p>
              </div>
            </div>
            <div className="support-grid" data-reveal="">
              {qualitySupportTopics.map((topic, index) => (
                <article className={`support-card support-card-${topic.kind}`} key={topic.title}>
                  <div className="support-card-visual">
                    <span className="support-icon"><SupportIcon kind={topic.kind} /></span>
                    <span className="support-card-number">0{index + 1} / 03</span>
                  </div>
                  <div className="support-card-copy">
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </div>
                  <div className="support-items">
                    <span className="support-list-label">{topic.listLabel}</span>
                    <ul>
                      {topic.items.map((item) => (
                        <li key={item}>
                          <span className="support-item-icon"><SupportIcon kind={topic.kind} /></span>
                          {topic.kind === "systems"
                            ? <span className="support-cert-name"><strong>{item}</strong>{" "}<small>Scope to verify</small></span>
                            : <span>{item}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="support-footer">
              <p className="support-assurance">Supporting global buyers with reliable quality documents, testing reports and export requirements.</p>
              <SiteLink className="button button-outline support-cta" href={sitePath("/quality")}>Explore Quality &amp; Compliance <span aria-hidden="true">↗</span></SiteLink>
            </div>
          </div>
        </section>

        <section className="brief-section section-space" id="private-label" aria-labelledby="brief-title">
          <div className="shell">
            <div className="packaging-heading" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">04 / Packaging &amp; projects</span>
                <h2 id="brief-title">Discuss Your Packaging Requirements</h2>
              </div>
              <p>Build a short brief in three steps. Your notes can be added to the inquiry form and changed at any time.</p>
            </div>
            <PackagingPlanner />
          </div>
        </section>

        <section className="quality-section" id="quality" aria-labelledby="quality-title">
          <div className="shell quality-layout">
            <div className="quality-intro" data-reveal="">
              <span className="eyebrow quality-kicker">05 / Specifications &amp; quality</span>
              <h2 id="quality-title">Product Specifications &amp; Documentation</h2>
              <p>Start with the information your team needs. We will confirm which details and documents are available for the product and market in question.</p>
              <SiteLink className="text-link text-link-light" href={sitePath("/quality")}>Explore Quality &amp; Compliance <span aria-hidden="true">↗</span></SiteLink>
            </div>
            <QualityDetails />
          </div>
        </section>

        <section className="about-section section-space" id="about" aria-labelledby="about-title">
          <div className="shell about-layout" data-reveal="">
            <div className="about-heading">
              <span className="eyebrow section-kicker">06 / About {brand.name}</span>
              <h2 id="about-title">Meet {brand.name}</h2>
              <div className="about-rule" aria-hidden="true" />
            </div>
            <div className="about-copy">
              <p><strong>{brand.name}</strong> brings together frozen berries, dried fruits, botanical ingredients and tea solutions for food and beverage businesses. Share the product, format and market you have in mind so we can review the right sourcing information for your project.</p>
              <div className="about-actions">
                <SiteLink className="button button-outline" href={sitePath("/about")}>About Us <span aria-hidden="true">↗</span></SiteLink>

              </div>
            </div>
          </div>
        </section>

        <section className="resources-section section-space" id="resources" aria-labelledby="resources-title">
          <div className="shell">
            <div className="resources-heading" data-reveal="">
              <div>
                <span className="eyebrow section-kicker">07 / Resources</span>
                <h2 id="resources-title">Insights &amp; Buying Guides</h2>
              </div>
              <p>Practical guides to ingredient selection, packaging and sourcing documentation. <SiteLink className="text-link" href="/resources">Explore buying guides ↗</SiteLink></p>
            </div>
            <div className="resource-grid" data-reveal="">
              {homeGuides.map((guide) => (
                <article className="resource-card" key={guide.title}>
                  <SiteLink className="resource-media" href={`/resources/${guide.slug}`} aria-label={`Read Guide: ${guide.title}`}>
                    <img src={sitePath(guideImage(guide.slug,"cover"))} alt={guide.coverAlt} width={1672} height={941} loading="lazy" decoding="async" />
                    <span className="resource-concept-label">Illustrative Concept</span>
                  </SiteLink>
                  <div className="resource-copy">
                    {guide.status === "draft" && <span className="draft-chip">Development draft · not published</span>}
                    <h3><SiteLink href={`/resources/${guide.slug}`}>{guide.title}</SiteLink></h3>
                    <p>{guide.summary}</p>
                    <SiteLink className="text-link" href={`/resources/${guide.slug}`}>Read Guide <span aria-hidden="true">↗</span></SiteLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section section-space" id="quote" aria-labelledby="quote-title">
          <div className="shell quote-layout">
            <div className="quote-intro" data-reveal="">
              <span className="eyebrow section-kicker">08 / Start a conversation</span>
              <h2 id="quote-title">Tell us what you&apos;re looking for.</h2>
              <p>Ingredient, intended use, packing idea or document request — share the starting point for your sourcing project.</p>
              <figure className="quote-detail-image">
                <img src={sitePath("/images/application-beverage-garnish.webp")} alt="Illustrative dried citrus garnish in a clear drink" width={1536} height={1024} loading="lazy" decoding="async" />
                <figcaption>Illustrative serving concept</figcaption>
              </figure>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
