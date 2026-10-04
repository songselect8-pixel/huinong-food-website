// Sourcing discussion guides, not verified processing capabilities or ready-to-eat claims.
// Content is grounded in the current product briefs and the user's application scope.
export type ApplicationPage = {
  id: string; name: string; number: string; shortDescription: string; intro: string;
  direction: string; productIds: string[]; cardImage: string; heroImage: string;
  cardAlt: string; heroAlt: string;
  forms: {name: string; detail: string}[];
  checks: {name: string; detail: string}[];
  packaging: string; documents: string[]; suitability: string;
  faq: {question: string; answer: string}[];
};

export const applicationPages: ApplicationPage[] = [
  {
    id: "tea-infusion-blends", name: "Tea & Infusion Blends", number: "01",
    shortDescription: "Explore the ingredient forms behind loose infusions, botanical blends and filled tea-bag projects.",
    intro: "Start with the drinking experience and product format you have in mind. Discuss individual citrus and botanical ingredients, an existing blend direction or a filled tea-bag brief as distinct options.",
    direction: "Dried citrus · flowers & leaf · blends · tea bags",
    productIds: ["dried-lemon-slices", "dried-orange-slices", "dried-rose-flowers", "raspberry-leaf-tea", "chrysanthemum-honeysuckle-goji-blend", "lemon-passion-fruit-orange-infusion", "cassia-goji-chrysanthemum-tea-bags"],
    cardImage: "/images/applications/v1/tea-infusion-card.webp", heroImage: "/images/applications/v1/tea-infusion-hero.webp",
    cardAlt: "Application concept: brewed botanical tea beside separate dry rose, leaf and citrus ingredients",
    heroAlt: "Application concept: ceramic tasting cups, a brewing pitcher and a separate botanical preparation tray",
    forms: [
      {name: "Single ingredients", detail: "Discuss citrus slices, rose buds or raspberry leaf independently. Confirm the actual plant part and offered cut before building a blend brief."},
      {name: "Loose blend directions", detail: "Review the two existing fruit and botanical blend directions against their actual ingredient declarations. A pictured ingredient selection is not a confirmed recipe."},
      {name: "Filled tea-bag projects", detail: "Start with the existing Cassia, Goji & Chrysanthemum Tea Bags direction, or describe a separate development request. Check ingredient cut, fill and bag construction together."},
    ],
    checks: [
      {name: "Ingredient identity", detail: "Specify the ingredient, botanical identity and plant part. Keep raspberry leaf distinct from raspberry fruit and rose buds distinct from petals."},
      {name: "Cut & presentation", detail: "Describe whole pieces or a cut suitable for your proposed format. Agree how fines, stems and visible ingredient pieces will be assessed."},
      {name: "Blend brief", detail: "Provide the ingredients and flavour direction you want to discuss. Ratios and any formulation changes require review; they cannot be read from a concept image."},
      {name: "Preparation & destination", detail: "Share the intended preparation, loose or bagged format and target market so product suitability and documentation can be checked."},
    ],
    packaging: "Discuss bulk ingredient protection, loose-blend packing or a finished tea-bag project separately. Confirm pack material, unit weight, labelling and dry-storage instructions for the actual product.",
    documents: ["Botanical identity or full blend ingredient declaration", "Product specification and the actual lot's analytical scope", "Relevant bag-material, packaging and storage information"],
    suitability: "Ingredient identity, composition, cut and suitability for the proposed food use remain product-specific confirmation items.",
    faq: [
      {question: "Are all the ingredients shown supplied as one blend?", answer: "No. Citrus slices, rose flowers and raspberry leaf are separate product directions. The existing named blends and filled tea bags are also separate products. A new formula needs its own ingredient and development brief."},
      {question: "Can I discuss loose tea and a tea-bag format together?", answer: "Yes, describe both as project requirements. The offered cut, bag construction, fill and packing must be reviewed for each format; a loose ingredient does not automatically establish a finished-bag capability."},
      {question: "What should I provide for a blend discussion?", answer: "Share your intended product format, ingredient preferences, flavour direction, preparation method, target market and packaging questions. An exact ratio can be discussed when the actual ingredients and project scope are confirmed."},
      {question: "Which documents should I request first?", answer: "Start with ingredient or botanical identity and the product specification. Then identify the relevant testing scope, packing information and any bag-material questions for the product you select."},
    ],
  },
  {
    id: "beverage-garnishes", name: "Beverage Garnishes", number: "02",
    shortDescription: "Build a citrus garnish brief around slice appearance, integrity and practical beverage-service requirements.",
    intro: "Dried lemon and orange slices give buyers two distinct citrus directions to discuss. Define the look you need in the glass, then align the slice criteria, packing and service quantities with the offered product.",
    direction: "Dried lemon slices · dried orange slices",
    productIds: ["dried-lemon-slices", "dried-orange-slices"],
    cardImage: "/images/applications/v1/beverage-garnishes-card.webp", heroImage: "/images/applications/v1/beverage-garnishes-hero.webp",
    cardAlt: "Application concept: a non-alcoholic sparkling drink with a complete dried orange wheel",
    heroAlt: "Application concept: separate dried lemon and orange slices in a hospitality preparation tray beside a drink",
    forms: [
      {name: "Dried lemon slices", detail: "Review lemon's offered slice form and appearance for your drink presentation. Agree what counts as an acceptable complete slice."},
      {name: "Dried orange slices", detail: "Discuss orange slices as their own product, with an actual sample and separate appearance criteria. Do not substitute a lemon specification."},
      {name: "Service & portion brief", detail: "Describe how slices will be stored, taken from the pack and used by your team. Portion and pack requirements are discussion points, not fixed pack offers."},
    ],
    checks: [
      {name: "Slice size & thickness", detail: "State the target diameter, thickness and presentation you want to review. Confirm available ranges and the measurement method from actual product information."},
      {name: "Integrity & appearance", detail: "Agree on complete slices, breakage, rind and pulp appearance. Use an approved sample rather than a concept image as the acceptance reference."},
      {name: "Composition & process", detail: "Request the actual drying and ingredient/additive declaration. A dry citrus image does not establish an additive-free claim or a particular process."},
      {name: "Hospitality procurement", detail: "Describe outlet or preparation use, ordering quantities, pack opening frequency and handling needs. MOQ and delivery arrangements are confirmed for the project."},
    ],
    packaging: "Discuss packs that fit your storage and service routine, including slice protection, closure, unit weight and lot identification. Confirm dry-storage and handling guidance from the actual supply documentation.",
    documents: ["Slice specification and agreed appearance criteria", "Ingredient/additive declaration and relevant testing scope", "Packing, storage and lot-traceability information"],
    suitability: "Confirm the offered slices, composition and handling instructions for the intended beverage use. This guide does not cover raw frozen-berry consumption.",
    faq: [
      {question: "Are the lemon and orange slices interchangeable?", answer: "They are separate products. Appearance, slice criteria and the offered process should be reviewed independently, even when both are intended for the same drinks menu."},
      {question: "Can you guarantee a fixed diameter or unbroken slice percentage?", answer: "No fixed figure is stated here. Include your target size and integrity criteria in the brief so the actual product range, sampling method and proposed acceptance terms can be reviewed."},
      {question: "Do the pictures establish an additive-free product?", answer: "No. The images are application concepts. Composition and any additive or process claim must come from the actual ingredient declaration and product records."},
      {question: "How should I describe a hospitality packing request?", answer: "Share the proposed pack weight, closure, service pattern and need to protect complete slices. Packing availability, storage instructions and order arrangements are reviewed for the product and project."},
    ],
  },
  {
    id: "bakery-fruit-preparations", name: "Bakery & Fruit Preparations", number: "03",
    shortDescription: "Discuss frozen berry forms for baked products and prepared fruit fillings, with the finished result in view.",
    intro: "Start with the berry appearance and distribution you want after processing. Compare the frozen raspberry and blueberry product directions, then discuss the form, evaluation method, packing and delivery requirements for your process.",
    direction: "IQF frozen raspberries · IQF frozen blueberries",
    productIds: ["iqf-frozen-raspberries", "iqf-frozen-blueberries"],
    cardImage: "/images/applications/v1/bakery-fruit-preparations-card.webp", heroImage: "/images/applications/v1/bakery-fruit-preparations-hero.webp",
    cardAlt: "Application concept: a baked crumble slice with cooked berry filling visible in the cut face",
    heroAlt: "Application concept: prepared berry filling in a saucepan and finished pastries on a cooling rack",
    forms: [
      {name: "Raspberry form discussion", detail: "Describe whole fruit, a whole-and-broken requirement or a crumble brief. These are forms to confirm against the actual offered material, not an in-stock grade guarantee."},
      {name: "Blueberry identity & size", detail: "Confirm the berry identity, offered fruit form and size criteria. Match the product record to the sample rather than relying on a generic blueberry label."},
      {name: "Prepared filling brief", detail: "Explain the filling or baked product you will make and the role of the berries within it. The pictured pastries and prepared fillings are use concepts, not added catalogue products."},
    ],
    checks: [
      {name: "Fruit form & distribution", detail: "State where visible fruit pieces matter and whether broken material can fit the application. Define the inspection criteria for the proposed form."},
      {name: "Size & processing result", detail: "Discuss the target fruit size and the appearance required after your process. Agree a relevant evaluation with the proposed ingredient; no bake-performance guarantee is implied."},
      {name: "Sample evaluation", detail: "Identify which observations your team needs to review, such as fruit integrity, colour distribution or the finished cut face. Establish methods and acceptance criteria before ordering."},
      {name: "Delivery conditions", detail: "Confirm packing, frozen handling conditions, temperature records and handover responsibilities for the shipment and your receiving process."},
    ],
    packaging: "Describe bulk or portioning requirements and how the frozen material enters your preparation process. Confirm the offered pack, lot marking, storage instructions and temperature-record needs; no standard pack size or delivery temperature is invented here.",
    documents: ["Fruit identity, form and agreed product specification", "Lot-linked COA and the relevant analytical scope", "Traceability, packing and cold-chain handling records"],
    suitability: "The finished-food scenes show processed application concepts. Product suitability and processing requirements need review with the actual ingredient; the images do not establish ready-to-eat status.",
    faq: [
      {question: "Should I request whole or broken raspberries?", answer: "Describe the fruit visibility and distribution your recipe needs. Whole, whole-and-broken and crumble requirements can then be compared with the offered material and agreed inspection criteria. This page does not prescribe one grade for every bakery process."},
      {question: "Do you also sell the pastries or filling shown?", answer: "No. The related catalogue products here are IQF Frozen Raspberries and IQF Frozen Blueberries. The finished foods illustrate possible project discussions and are not additional products for sale."},
      {question: "Are fixed baking or preparation instructions supplied here?", answer: "No. Your process, product safety requirements and the actual ingredient need a specific review. No time, temperature, formulation ratio or finished-product performance is promised by this application guide."},
      {question: "Which delivery information is useful in an inquiry?", answer: "Provide the destination, intended pack or portioning approach, receiving needs and temperature-record questions. Storage, transport and handover conditions should be confirmed with the offered product and shipment arrangements."},
    ],
  },
  {
    id: "dairy-frozen-desserts", name: "Dairy & Frozen Desserts", number: "04",
    shortDescription: "Plan a berry ingredient brief for prepared fruit layers, pieces and frozen dessert concepts.",
    intro: "Discuss how prepared berry material will be used in your dairy or frozen dessert project. Start with the raspberry or blueberry ingredient, the desired fruit presentation and your preparation process before confirming suitability.",
    direction: "IQF frozen raspberries · IQF frozen blueberries",
    productIds: ["iqf-frozen-raspberries", "iqf-frozen-blueberries"],
    cardImage: "/images/applications/v1/dairy-frozen-desserts-card.webp", heroImage: "/images/applications/v1/dairy-frozen-desserts-hero.webp",
    cardAlt: "Application concept: frozen dessert scoops with prepared berry sauce ripples, without raw berry garnish",
    heroAlt: "Application concept: cultured dairy-style dessert cups with separate prepared raspberry and blueberry fruit layers",
    forms: [
      {name: "Fruit pieces", detail: "Describe the piece size and visible-fruit effect you need to assess after preparation. Confirm the offered berry form and your acceptance method."},
      {name: "Fruit preparation input", detail: "Explain whether the berries will enter your own fruit-layer, ripple or other preparation process. A finished sauce in the image does not mean a sauce is supplied."},
      {name: "Portioning & pack brief", detail: "Share how material is portioned into your process and the proposed pack format. Availability and handling arrangements need a product-specific discussion."},
    ],
    checks: [
      {name: "Intended use & process", detail: "Describe the finished dairy or frozen dessert and who prepares the fruit component. Confirm the appropriate processing and product suitability before use."},
      {name: "Fruit presentation", detail: "Identify the desired pieces, distribution and visual result. Any sample assessment should reflect your actual preparation and finished-product format."},
      {name: "Portion & packing needs", detail: "State the handling quantities, pack opening and portioning requirements you want to discuss. Do not assume an unconfirmed small-pack or prepared-fruit offer."},
      {name: "Document scope", detail: "Match the ingredient identity, lot evidence and relevant testing questions to the proposed use. A generic COA does not establish finished-dessert suitability."},
    ],
    packaging: "Review the frozen ingredient pack, lot references, portioning approach and receiving conditions. Agree the actual storage, preparation and handover requirements for your process instead of treating a dessert image as a ready-to-use product claim.",
    documents: ["Berry identity, form and product specification", "Relevant lot testing and intended-use review", "Packing, traceability and temperature-handling information"],
    suitability: "Suitability for ready-to-eat dairy or ice cream is not assumed. The actual ingredient, preparation method and supporting documents need confirmation for the project.",
    faq: [
      {question: "Can the frozen berries go straight into a ready-to-eat dessert?", answer: "That is not established by this page. Confirm the intended use, required preparation and relevant evidence for the actual product. The concept images show prepared fruit components, not instructions to use frozen berries directly from the pack."},
      {question: "Are fruit sauces, dairy products or ice cream also supplied?", answer: "This page links only to the existing frozen raspberry and blueberry ingredients. Sauces and desserts in the images are application concepts, not additional catalogue products or completed customer projects."},
      {question: "What should a portioning request include?", answer: "Describe the quantity handled at each preparation stage, the proposed pack format, opening routine and receiving constraints. Pack availability and handling instructions are confirmed separately for the actual supply."},
      {question: "Does a berry COA cover the finished dessert?", answer: "A COA covers the identified sample or lot and tests actually reported. It does not by itself confirm the suitability or safety of a finished dairy recipe, preparation process or retail pack."},
    ],
  },
];

export const applicationOverviewImage = "/images/applications/v1/overview-workbench.webp";

export function readApplicationRequest(search: URLSearchParams) {
  if (search.get("source") !== "application") return null;
  const application = applicationPages.find(item => item.id === search.get("application"));
  if (!application) return null;
  const requestedProduct = search.get("product");
  const productId = requestedProduct && application.productIds.includes(requestedProduct) ? requestedProduct : "";
  const clean = (name: string, max: number) => (search.get(name) ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
  return {
    application, productId, packaging: clean("packaging", 250), documents: clean("documents", 300),
    source: search.get("origin") === "overview" ? "/applications" : `/applications/${application.id}`,
  };
}
