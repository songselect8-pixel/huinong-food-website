export const company = {
  name: "Jiaxing Huinong Food Co., Ltd.",
  wordmark: "HUINONG FOOD",
  chineseName: "嘉兴汇农食品股份有限公司",
  storefront: "https://cnjxhn.en.alibaba.com/",
  email: null,
  phone: null,
  whatsapp: null,
  address: null,
} as const;

export const navigation = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/#applications" },
  { label: "Private Label", href: "/private-label" },
  { label: "Quality", href: "/#quality" },
  { label: "About", href: "/#about" },
  { label: "Resources", href: "/#resources" },
] as const;

export type Verification = "store-listing" | "store-category" | "provided-brief";

export type ProductDetail = {
  intro: string;
  positioning: string;
  images: { main: string; detail: string; application: string };
  forms: { name: string; note: string }[];
  specification: { name: string; buyerCheck: string }[];
  applications: { name: string; note: string }[];
  storage: string[];
  documents: { group: string; note: string; items: string[] }[];
  faq: { question: string; answer: string }[];
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  sourceUrl: string | null;
  verification: Verification;
  skuImage: string | null;
  conceptImage?: string;
  cardDescription?: string;
  specification: string | null;
  packaging: string | null;
  certifications: string | null;
  detail?: ProductDetail;
};

// Listing subjects establish product direction only. Marketing claims in them
// do not establish composition, process, certifications, or suitability.
export const products: Product[] = [
  {
    id: "dried-lemon-slices",
    name: "Dried Lemon Slices",
    categoryId: "dried-fruits",
    sourceUrl: "https://www.alibaba.com/product-detail/ISO-HACCP-Dried-Lemon-Slices-100_1601815043780.html",
    verification: "store-listing",
    skuImage: null,
    conceptImage: "/images/products/dried-lemon-slices-card.webp",
    cardDescription: "A dried citrus slice direction for ingredient and garnish sourcing briefs.",
    specification: null,
    packaging: null,
    certifications: null,
  },
  {
    id: "dried-orange-slices",
    name: "Dried Orange Slices",
    categoryId: "dried-fruits",
    sourceUrl: "https://www.alibaba.com/product-detail/Organic-Cocktail-Garnish-Natural-Edible-3_1601839223912.html",
    verification: "store-listing",
    skuImage: null,
    conceptImage: "/images/products/dried-orange-slices-card.webp",
    cardDescription: "Dried orange slices to discuss by cut, appearance and intended use.",
    specification: null,
    packaging: null,
    certifications: null,
  },
  {
    id: "dried-rose-flowers",
    name: "Dried Rose Flowers",
    categoryId: "flowers-herbs",
    sourceUrl: "https://www.alibaba.com/product-detail/100-Natural-No-Additives-Hand-Selected_1601811980304.html",
    verification: "store-listing",
    skuImage: null,
    conceptImage: "/images/products/dried-rose-flowers-card.webp",
    cardDescription: "A floral ingredient direction for botanical tea and blend projects.",
    specification: null,
    packaging: null,
    certifications: null,
  },
  {
    id: "chrysanthemum-honeysuckle-goji-blend",
    name: "Chrysanthemum, Honeysuckle & Goji Blend",
    categoryId: "fruit-tea-blends",
    sourceUrl: "https://www.alibaba.com/product-detail/Natural-Chrysanthemum-Honeysuckle-Goji-Berry-Blend_1601807220316.html",
    verification: "store-listing",
    skuImage: null,
    conceptImage: "/images/products/chrysanthemum-honeysuckle-goji-blend-card.webp",
    cardDescription: "A listed botanical blend direction; composition and ratio need confirmation.",
    specification: null,
    packaging: null,
    certifications: null,
  },
  {
    id: "lemon-passion-fruit-orange-infusion",
    name: "Lemon, Passion Fruit & Orange Infusion",
    categoryId: "fruit-tea-blends",
    sourceUrl: "https://www.alibaba.com/product-detail/Wholesale-Bulk-Supply-Vegan-Keto-Non_1601838400545.html",
    verification: "store-listing",
    skuImage: null,
    conceptImage: "/images/products/lemon-passion-fruit-orange-infusion-card.webp",
    cardDescription: "A fruit infusion direction for project-specific ingredient review.",
    specification: null,
    packaging: null,
    certifications: null,
  },
  {
    id: "cassia-goji-chrysanthemum-tea-bags",
    name: "Cassia, Goji & Chrysanthemum Tea Bags",
    categoryId: "tea-bags",
    sourceUrl: "https://www.alibaba.com/product-detail/Premium-High-Quality-Roasted-Cassia-Seed_1601838337283.html",
    verification: "store-listing",
    skuImage: null,
    conceptImage: "/images/products/cassia-goji-chrysanthemum-tea-bags-card.webp",
    cardDescription: "A filled tea-bag direction; contents and bag format need confirmation.",
    specification: null,
    packaging: null,
    certifications: null,
  },
  {
    id: "iqf-frozen-raspberries",
    name: "IQF Frozen Raspberries",
    categoryId: "frozen-berries",
    cardDescription: "A frozen raspberry direction for fruit-forward food projects.",
    sourceUrl: null,
    verification: "provided-brief",
    skuImage: null,
    specification: null,
    packaging: null,
    certifications: null,
    detail: {
      intro: "A frozen raspberry sourcing direction for buyers who need to define fruit integrity, processing use and a batch-specific acceptance standard before quotation.",
      positioning: "Whole, mixed and crumble formats are procurement requests. Availability and exact grade definitions must be confirmed for the project.",
      images: {
        main: "/images/products/iqf-frozen-raspberries-main.webp",
        detail: "/images/products/iqf-frozen-raspberries-detail.webp",
        application: "/images/products/iqf-frozen-raspberries-application.webp",
      },
      forms: [
        { name: "Whole", note: "Discuss the target proportion of intact berries and appearance needed for visible-fruit applications." },
        { name: "Whole & Broken", note: "Set an agreed whole-to-broken ratio for a use that can accept both fruit forms." },
        { name: "Crumble", note: "Discuss broken fruit for fillings or fruit preparations; food safety criteria still need their own review." },
      ],
      specification: [
        { name: "Variety & Origin", buyerCheck: "Confirm the actual variety, growing region and origin documentation for the proposed supply." },
        { name: "Size & Integrity", buyerCheck: "Define berry size, whole-fruit percentage and broken-fruit allowance using an agreed inspection method." },
        { name: "Colour", buyerCheck: "Agree on acceptable appearance and variation after frozen storage and processing." },
        { name: "Brix & pH / Acidity", buyerCheck: "Share the soluble-solids and acidity profile your formulation needs; measured values require a product sheet." },
        { name: "Drip Loss", buyerCheck: "If thaw performance matters, agree on a method and acceptable result before approving samples." },
        { name: "Foreign Matter & Clumping", buyerCheck: "Set defect and free-flowing requirements, including stem or leaf fragments and joined berries." },
        { name: "Packing & Storage", buyerCheck: "Confirm pack size, food-contact packaging, storage conditions and cold-chain handover points." },
      ],
      applications: [
        { name: "Bakery & Fillings", note: "Discuss whole-fruit visibility or a broken-fruit filling requirement." },
        { name: "Jam & Fruit Preparations", note: "Define the fruit texture, colour and solids profile needed for further processing." },
        { name: "Dairy & Frozen Desserts", note: "Review fruit integrity, formulation and processing suitability for the intended use." },
      ],
      storage: [
        "Specify frozen packing format, unit weight and pallet or shipping requirements in the brief.",
        "Agree on the storage and transport temperature specification, monitoring records and responsibility at handover.",
        "Frozen fruit is not a validated ready-to-eat claim; intended use and any treatment step need product-level review.",
      ],
      documents: [
        { group: "Market access / registration", note: "Check the destination market and intended use with the importer before deciding which official route applies.", items: ["Product classification and origin", "Importer or facility requirements, where applicable"] },
        { group: "Farm / processing system", note: "Confirm the actual supplying site and whether any system certificate covers frozen fruit and the relevant process.", items: ["Traceability and hygiene controls", "Applicable site or farm system scope"] },
        { group: "Batch / conditional files", note: "Request only the reports and shipping evidence needed for the agreed lot and market.", items: ["Batch COA and specification", "Pesticide residue and microbiology topics", "Virus prevention or testing evidence where risk or buyer requirements call for it", "Temperature, packing and shipment records"] },
      ],
      faq: [
        { question: "Can we request a whole-fruit target?", answer: "Yes. Share the intended use and your acceptance method. The achievable proportion must be confirmed against the proposed supply." },
        { question: "Does IQF mean the berries are ready to eat?", answer: "No. Processing and intended use need separate food safety review; the image does not establish ready-to-eat suitability." },
        { question: "Are fixed pack sizes or COA results available here?", answer: "This preview does not publish unverified sizes or results. Include your required pack and testing scope in the inquiry." },
      ],
    },
  },
  {
    id: "iqf-frozen-blueberries",
    name: "IQF Frozen Blueberries",
    categoryId: "frozen-berries",
    cardDescription: "A frozen blueberry direction with project-specific fruit identity and grade.",
    sourceUrl: null,
    verification: "provided-brief",
    skuImage: null,
    specification: null,
    packaging: null,
    certifications: null,
    detail: {
      intro: "A frozen blueberry sourcing direction built around clear fruit identity, size, integrity and the requirements of the finished food project.",
      positioning: "Wild blueberry, bilberry and cultivated or highbush blueberry are different identities to verify, not three confirmed supply lines.",
      images: {
        main: "/images/products/iqf-frozen-blueberries-main.webp",
        detail: "/images/products/iqf-frozen-blueberries-detail.webp",
        application: "/images/products/iqf-frozen-blueberries-application.webp",
      },
      forms: [
        { name: "Species / Variety to Confirm", note: "Identify the botanical and commercial supply type before comparing quotes or samples." },
        { name: "Whole Fruit Brief", note: "Define fruit integrity, size range and free-flowing behaviour for the intended process." },
        { name: "Processing Brief", note: "Describe the cooked fruit, filling or preparation outcome you need." },
      ],
      specification: [
        { name: "Species / Variety", buyerCheck: "Verify whether the offered fruit is bilberry, wild blueberry or cultivated blueberry; record the actual variety where relevant." },
        { name: "Origin", buyerCheck: "Check growing and processing origin against the proposed lot documents." },
        { name: "Berry Size", buyerCheck: "Agree on a useful range and measurement method; no fixed size grade is assumed." },
        { name: "Fruit Integrity", buyerCheck: "Define acceptable intact, split and damaged fruit for your process." },
        { name: "Stems & Leaves", buyerCheck: "Set a practical foreign-plant-material acceptance criterion." },
        { name: "Unripe / Damaged Fruit", buyerCheck: "Describe ripeness and visible defects that affect colour or processing." },
        { name: "Clumping", buyerCheck: "Agree on free-flowing performance and how joined fruit will be assessed." },
        { name: "Brix", buyerCheck: "Share the soluble-solids target needed for your formulation; batch values require verification." },
        { name: "Packing & Storage", buyerCheck: "Confirm food-contact pack, unit weight, frozen storage and shipping requirements." },
      ],
      applications: [
        { name: "Bakery & Fillings", note: "Discuss berry size and visual integrity for a finished baked product." },
        { name: "Jam & Fruit Preparations", note: "Align fruit identity, colour and soluble solids with the processing brief." },
        { name: "Dairy & Frozen Desserts", note: "Review the formulation, processing step and required defect limits." },
      ],
      storage: [
        "Frozen pack format and unit weight are selected against the project and actual supply.",
        "Agree on frozen storage, transport temperature records and handover requirements before shipment.",
        "Suitability for a ready-to-eat use is not inferred from the product name or concept photograph.",
      ],
      documents: [
        { group: "Market access / registration", note: "Confirm product identity, destination market and importer responsibilities before setting the document checklist.", items: ["Species, product classification and origin", "Applicable importer or facility pathway"] },
        { group: "Farm / processing system", note: "Match any system evidence to the real growing and processing sites and frozen-fruit scope.", items: ["Traceability and hygiene controls", "Relevant site or farm certification scope, if available"] },
        { group: "Batch / conditional files", note: "Align document requests with the agreed lot, risk review and buyer specification.", items: ["Batch COA and specification", "Pesticide residue and microbiology topics", "Virus-control evidence when risk or market requirements call for it", "Temperature, packing and shipping information"] },
      ],
      faq: [
        { question: "Are wild and cultivated blueberries interchangeable?", answer: "No. Species, variety and supply type affect the specification and must be verified before approval." },
        { question: "Is a particular berry size standard offered?", answer: "No fixed size is published in this preview. Share your preferred range and inspection method for confirmation." },
        { question: "Can this be used without further processing?", answer: "The intended use and food safety controls require product-specific review; the concept image does not establish ready-to-eat suitability." },
      ],
    },
  },
  {
    id: "raspberry-leaf-tea",
    name: "Raspberry Leaf Tea",
    categoryId: "flowers-herbs",
    cardDescription: "A leaf ingredient direction for loose infusions and botanical blends.",
    sourceUrl: null,
    verification: "provided-brief",
    skuImage: null,
    specification: null,
    packaging: null,
    certifications: null,
    detail: {
      intro: "A raspberry leaf herbal ingredient direction for buyers planning loose-leaf infusions or botanical blends. The plant identity and exact cut are confirmed against the proposed source.",
      positioning: "This is leaf material, not raspberry fruit tea. Powder and finished tea bags are separate project questions, not listed stock formats.",
      images: {
        main: "/images/products/raspberry-leaf-tea-main.webp",
        detail: "/images/products/raspberry-leaf-tea-detail.webp",
        application: "/images/products/raspberry-leaf-tea-application.webp",
      },
      forms: [
        { name: "Whole Leaf", note: "Discuss visible leaf integrity and the amount of stems or small fragments acceptable for your loose-leaf project." },
        { name: "Cut & Sifted", note: "Define the target cut and screening profile for a blend or a future tea-bag development brief." },
      ],
      specification: [
        { name: "Botanical Name", buyerCheck: "Confirm the actual Rubus species from supplier identity records; report examples are not a product identification." },
        { name: "Plant Part", buyerCheck: "Verify that the offered material is leaf and define any tolerated stem content." },
        { name: "Origin", buyerCheck: "Confirm growing and processing origin for the proposed material." },
        { name: "Whole Leaf / Cut & Sifted", buyerCheck: "Select the form needed by the project and verify actual availability." },
        { name: "Cut Size", buyerCheck: "Agree on sieve or cut-size criteria if a consistent blend or filling process is required." },
        { name: "Dust / Stem Content", buyerCheck: "Set acceptable fines and stem levels using a defined assessment method." },
        { name: "Moisture & Ash", buyerCheck: "Review measured moisture, total ash and, where relevant, acid-insoluble ash against the agreed specification." },
        { name: "Foreign Matter", buyerCheck: "Define plant and non-plant foreign-matter limits for the intended use." },
        { name: "Testing Scope", buyerCheck: "Discuss pesticide residues, heavy metals and microbiology for the target market and lot." },
      ],
      applications: [
        { name: "Botanical Blends", note: "Discuss the leaf identity, cut and inclusion in a proposed blend." },
        { name: "Loose-Leaf Infusions", note: "Review appearance and infusion-use requirements with the customer." },
        { name: "Tea-Bag Development", note: "A future filled-bag project can be discussed after leaf cut, product scope and packing feasibility are confirmed." },
      ],
      storage: [
        "Discuss a dry, protected ingredient pack suitable for the confirmed leaf form and quantity.",
        "Agree on moisture protection, handling and storage information before approving a lot.",
        "Finished tea bags, label work and market-specific food status need separate project confirmation.",
      ],
      documents: [
        { group: "Market access / registration", note: "Verify botanical identity, permitted use and importer responsibilities for the destination market.", items: ["Actual botanical name and plant part", "Market-specific product classification, where needed"] },
        { group: "Farm / processing system", note: "Check the actual leaf source and processing site before associating any system certificate with this product.", items: ["Origin and traceability", "Relevant cultivation or processing controls"] },
        { group: "Batch / conditional files", note: "Request lot-specific evidence according to the buyer specification and market.", items: ["Product specification and identity support", "Pesticide residue, heavy metal and microbiology topics", "Dry storage and packaging information", "Batch traceability and COA, where available"] },
      ],
      faq: [
        { question: "Which raspberry species is this leaf from?", answer: "The actual botanical name must be verified from the offered source. Different Rubus species should not be treated as interchangeable." },
        { question: "Do you list powder or finished tea bags?", answer: "No. This page covers leaf ingredient requests. Cut-and-sifted material or a filled-bag project can be discussed only after scope confirmation." },
        { question: "Are functional claims provided?", answer: "No. This page presents a herbal ingredient direction. Food status, product wording and any market claims require separate review." },
      ],
    },
  },
];

export const categories = [
  {
    id: "dried-fruits",
    number: "01",
    name: "Dried Fruits & Slices",
    description: "Citrus and other dried fruit directions for ingredient sourcing.",
    image: "/images/02-dried-fruits.webp",
    imageAlt: "Illustrative composition of dried fruit slices on a warm stone surface",
    sourceUrl: "https://cnjxhn.en.alibaba.com/productgrouplist-969052928/Dried_Fruit_Slices.html",
    verification: "store-category" as Verification,
  },
  {
    id: "flowers-herbs",
    number: "02",
    name: "Flowers & Herbal Ingredients",
    description: "Floral and botanical ingredients for your sourcing brief.",
    image: "/images/03-flowers-herbs.webp",
    imageAlt: "Illustrative composition of dried flowers and botanical ingredients",
    sourceUrl: "https://cnjxhn.en.alibaba.com/productgrouplist-968606692/Dried_Flower_Tea.html",
    verification: "store-category" as Verification,
  },
  {
    id: "fruit-tea-blends",
    number: "03",
    name: "Fruit & Herbal Blends",
    description: "Fruit infusions and herbal combinations listed by the store.",
    image: "/images/04-fruit-tea-blends.webp",
    imageAlt: "Illustrative bowl of fruit and herbal tea blend ingredients",
    sourceUrl: "https://cnjxhn.en.alibaba.com/productgrouplist-968304721/Fruit_Infusion_Detox_Water.html",
    verification: "store-category" as Verification,
  },
  {
    id: "tea-bags",
    number: "04",
    name: "Tea Bags & Packed Teas",
    description: "Discuss the tea contents and packing format your project needs.",
    image: "/images/05-tea-bags.webp",
    imageAlt: "Illustrative tea bags, plain pouches and brewed tea for a packaging discussion",
    sourceUrl: "https://cnjxhn.en.alibaba.com/productgrouplist-969273622/Herbal_Tea_Bags_Tea_Blends.html",
    verification: "store-category" as Verification,
  },
  {
    id: "frozen-berries",
    number: "05",
    name: "Frozen Berries",
    description: "IQF berry ingredient directions with product-specific cold-chain and quality requirements.",
    image: "/images/products/frozen-berries-category.webp",
    imageAlt: "Illustrative composition of individually quick-frozen raspberries and blueberries",
    sourceUrl: null,
    verification: "provided-brief" as Verification,
  },
] as const;

export const applications = [
  {
    number: "01",
    name: "Tea & Infusion Blends",
    detail: "Start with floral ingredients or a listed herbal blend, then discuss the intended format.",
    productIds: ["dried-rose-flowers", "chrysanthemum-honeysuckle-goji-blend"],
    image: "/images/application-tea-infusion.webp",
    imageAlt: "Illustrative herbal tea infusion in a glass teapot with a few dried flowers",
  },
  {
    number: "02",
    name: "Beverage Garnishes",
    detail: "Explore dried lemon slices for a beverage brief; confirm the required cut and specification.",
    productIds: ["dried-lemon-slices"],
    image: "/images/application-beverage-garnish.webp",
    imageAlt: "Illustrative clear drinks garnished with dried citrus slices",
  },
  {
    number: "03",
    name: "Bakery & Food Ingredients",
    detail: "Tell us about your intended use so the relevant dried fruit specification can be reviewed.",
    productIds: ["dried-lemon-slices"],
    image: "/images/application-bakery-ingredients.webp",
    imageAlt: "Illustrative pastry preparation scene with dried citrus nearby",
  },
] as const;

export type Article = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
};

export const articles: Article[] = [];
