// Certification confirmation, evidence verification and file publication are independent.
// Owner attestation is recorded in docs/source-map.md; it does not identify FRUNORIA as holder.
export type Certification = {
  id: string; name: string; confirmation: "owner-attested" | "document-confirmed";
  verification: "pending" | "verified"; holder: string | null; siteScope: string | null;
  productCategories: string[]; validUntil: string | null; verifiedOn: string | null;
  file: { status: "not-supplied" | "on-file"; publicPermission: "unconfirmed" | "approved" | "restricted"; href: string | null };
};

export const certifications: Certification[] = ["HACCP", "ISO 22000", "BRCGS", "FSSC 22000"].map(name => ({
  id: name.toLowerCase().replaceAll(" ", "-"), name, confirmation: "owner-attested", verification: "pending",
  holder: null, siteScope: null, productCategories: [], validUntil: null, verifiedOn: null,
  file: {status: "not-supplied", publicPermission: "unconfirmed", href: null},
}));

export const documentTypes = [
  {id: "specification", name: "Product Specification", description: "Product form, agreed criteria and selection details."},
  {id: "ingredient", name: "Ingredient / Botanical Information", description: "Identity, plant part, composition and processing questions."},
  {id: "testing", name: "Testing Documentation", description: "COA, relevant analyses and the scope actually covered."},
  {id: "certification", name: "Certification Information", description: "Holder, production site, scope and validity review."},
  {id: "packaging", name: "Packaging / Storage Information", description: "Pack information, handling and storage conditions."},
] as const;

export const documentGroups = [
  {
    id: "frozen", name: "Frozen Berries", categoryIds: ["frozen-berries"],
    intro: "Connect fruit identity, lot evidence and temperature handling to the intended food application.",
    topics: [
      {title: "Fruit specification & traceability", type: "specification", includes: "Fruit identity and origin, whole or broken format, agreed size or integrity criteria, and lot references.", check: "Match the specification to the offered berry, sample and lot. Define the acceptance method rather than relying on a grade name.", request: "Select the raspberry or blueberry product and describe the form and use you need."},
      {title: "COA & relevant testing", type: "testing", includes: "Reported results for an identified sample or lot, with test methods, units and the panel actually performed.", check: "Review microbiology, residues and other relevant hazards for the intended use. Ask separately about virus-related controls or evidence where relevant; a COA is not an all-tests guarantee.", request: "Include your target market, processing use and required test scope."},
      {title: "Cold-chain & packaging records", type: "packaging", includes: "Pack specification, product handling instructions and relevant storage or transport temperature records.", check: "Match records to the shipment, time period and handover points. Confirm the agreed temperature conditions and who monitors each stage.", request: "Describe the pack, route and temperature-record questions for your project."},
    ],
  },
  {
    id: "dried", name: "Dried Fruits", categoryIds: ["dried-fruits"],
    intro: "Review the dried material, its processing declaration and the condition expected at delivery.",
    topics: [
      {title: "Slice specification & composition", type: "ingredient", includes: "Fruit identity, slice or piece format, process information and the actual ingredient/additive declaration.", check: "Confirm the drying process, cut, appearance and breakage criteria. Do not infer additive-free or freeze-dried status from an image.", request: "Choose lemon or orange and describe your presentation or ingredient brief."},
      {title: "COA & analytical scope", type: "testing", includes: "Available lot results and the agreed microbiology, pesticide-residue or other analytical topics.", check: "Check sample identity, methods, limits and any relevant additive information. An unlisted test is not established by a passing COA.", request: "Provide the destination and the specific parameters your team needs to review."},
      {title: "Dry storage & pack information", type: "packaging", includes: "Packing materials, pack weight, dry-storage instructions, lot marking and documented shelf-life information.", check: "Review protection against moisture and slice damage for the offered pack. Confirm actual storage and shelf-life evidence.", request: "Share your preferred pack and handling conditions; no standard pack or shelf life is assumed."},
    ],
  },
  {
    id: "botanical", name: "Botanical Ingredients & Tea Products", categoryIds: ["flowers-herbs", "fruit-tea-blends", "tea-bags"],
    intro: "Start with botanical identity or the full blend declaration, then check the intended ingredient or filled-bag format.",
    topics: [
      {title: "Botanical identity & blend declaration", type: "ingredient", includes: "Plant identity and part for single botanicals; the actual ingredient declaration and agreed formula for blends.", check: "Distinguish raspberry leaf from fruit, buds from petals, and loose blends from filled tea bags. Confirm botanical identity and ratios from records, not concept images.", request: "Choose the leaf, flower, blend or tea-bag product and describe the format you need."},
      {title: "COA & product-specific analyses", type: "testing", includes: "The reported lot data and relevant identity, microbiology, residue or heavy-metal analyses available for review.", check: "Check the methods, sample and plant-part or blend coverage. Do not assume a raw-ingredient report covers the complete finished blend or bagged product.", request: "State the product, target market, intended food use and requested analytical topics."},
      {title: "Packing, handling & lot records", type: "packaging", includes: "Dry-storage instructions, traceability and packing information; relevant bag-material information for filled tea bags.", check: "Match documents to the actual blend, bag construction and finished pack. Confirm the scope of food-contact material evidence.", request: "Include your loose-ingredient or filled-bag format and packaging questions."},
    ],
  },
];

type MarketSource = {label: string; url: string};
export type MarketGuide = {
  id: string; name: string; status: "source-reviewed" | "draft"; checkedOn: string | null;
  intro: string; legal: string; conditional: string; buyer: string; next: string;
  sources: MarketSource[];
};

// These are bounded sourcing checklists, not product clearance determinations.
// See docs/quality-source-review.md for checked scope, exclusions and inaccessible URLs.
export const marketGuides: MarketGuide[] = [
  {
    id: "eu", name: "European Union", status: "source-reviewed", checkedOn: "2026-10-03",
    intro: "Confirm the destination member state and the precise ingredient, origin and intended food use.",
    legal: "Imported food is subject to EU food controls and traceability requirements. Identify the commodity when reviewing applicable pesticide-residue limits; use the legal text to confirm the rule.",
    conditional: "Additional controls under Regulation (EU) 2019/1793 depend on the listed product, origin and hazard. Check the current entry before deciding whether official certificates, analyses or border procedures apply.",
    buyer: "Ask whether the buyer requires a particular audit scheme, residue panel or acceptance limit beyond the legal baseline.",
    next: "Product-specific entry status, botanical food-use classification and the final shipment checklist remain to be confirmed.",
    sources: [{label: "European Commission · Import controls", url: "https://food.ec.europa.eu/horizontal-topics/official-controls-and-enforcement/import-controls-food-and-feed-qas_en"}, {label: "European Commission · Pesticides database", url: "https://food.ec.europa.eu/plants/pesticides/eu-pesticides-database_en"}],
  },
  {
    id: "us", name: "United States", status: "source-reviewed", checkedOn: "2026-10-03",
    intro: "Identify the U.S. importer, supplying facility and the product's intended regulatory category.",
    legal: "Review applicable food-facility registration and Prior Notice requirements. Importers covered by FSVP must evaluate food hazards and verify their foreign suppliers.",
    conditional: "FSVP exemptions and modified requirements depend on the food and importer. A botanical sold as a dietary supplement follows a different review from a conventional food ingredient.",
    buyer: "Agree on supplier records, testing scope and audit evidence with the buyer. FDA registration is not an FDA approval of a product or shipment.",
    next: "Confirm importer responsibilities and the actual facility and product records. No registration or U.S. market authorization is claimed here.",
    sources: [{label: "FDA · Importing food products", url: "https://www.fda.gov/food/food-imports-exports/importing-food-products-united-states"}, {label: "FDA · FSVP requirements", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma/fsma-final-rule-foreign-supplier-verification-programs-fsvp-importers-food-humans-and-animals"}],
  },
  {
    id: "gb", name: "Great Britain", status: "source-reviewed", checkedOn: "2026-10-03",
    intro: "This guide concerns England, Scotland and Wales. Northern Ireland requires a separate route review.",
    legal: "First establish whether the exact food and origin fall within Great Britain's high-risk food of non-animal origin controls. The guide below covers that conditional import route.",
    conditional: "Where those controls apply, review IPAFFS pre-notification. Emergency-control listings can require official certificates and laboratory analyses. These requirements must not be assigned to every fruit or tea product automatically.",
    buyer: "Request the buyer's audit, testing and label checklist separately from the border-document requirements.",
    next: "The current commodity/origin entry, any botanical-use question and shipment documents need an importer-led check before dispatch.",
    sources: [{label: "GOV.UK · Non-EU imports / HRFNAO section", url: "https://www.gov.uk/guidance/importing-live-animals-or-animal-products-from-non-eu-countries#high-risk-food-and-feed-of-non-animal-origin-hrfnao"}],
  },
  {
    id: "ca", name: "Canada", status: "source-reviewed", checkedOn: "2026-10-03",
    intro: "Define the commodity, origin, destination and end use before building the import-document checklist.",
    legal: "Review the importer's applicable Safe Food for Canadians licensing, preventive-control, traceability and recall obligations.",
    conditional: "Use CFIA's AIRS with the actual commodity, origin, destination and end use to identify the relevant pathway. AIRS is a reference tool; requirements need checking against the applicable law and import date.",
    buyer: "Agree on product and supplier evidence supporting the buyer's preventive-control plan, plus any additional testing or packaging requirements.",
    next: "A commodity-specific AIRS result, ingredient-use review and importer confirmation are still needed for each project.",
    sources: [{label: "CFIA · General food import requirements", url: "https://inspection.canada.ca/en/importing-food-plants-animals/food-imports/general-requirements"}, {label: "CFIA · AIRS", url: "https://inspection.canada.ca/en/importing-food-plants-animals/airs"}],
  },
  {
    id: "jp", name: "Japan", status: "draft", checkedOn: null,
    intro: "Research draft from the existing market report. Current official requirements have not been rechecked for this page.",
    legal: "", conditional: "", buyer: "", next: "Confirm the exact ingredient and plant part, intended food use, importer pathway and current official sources before relying on a market checklist.", sources: [],
  },
];

export const requestMarkets = [...marketGuides.map(({id,name}) => ({id,name})), {id: "other", name: "Other market — discuss with us"}, {id: "undecided", name: "To be discussed"}];

export function readDocumentationRequest(search: URLSearchParams) {
  if (search.get("source") !== "quality") return null;
  const types = documentTypes.filter(type => search.getAll("document").includes(type.id));
  if (!types.length) return null;
  const market = requestMarkets.find(item => item.id === search.get("market"));
  const certificate = types.some(type => type.id === "certification") ? certifications.find(item => item.id === search.get("certification")) : undefined;
  return {types, market: market?.name ?? "To be discussed", certificate: certificate?.name};
}
