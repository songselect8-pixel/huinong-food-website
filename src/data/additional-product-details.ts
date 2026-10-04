import type { ProductDetail } from "./site";

// Content describes the confirmed product direction and questions for a sourcing
// brief. It does not establish batch values, processing claims or stock formats.
export const additionalProductDetails: Record<string, ProductDetail> = {
  "dried-lemon-slices": {
    intro: "Dried lemon slices for citrus ingredient, infusion and garnish sourcing. Start with the slice appearance and intended use, then agree on the specification for your project.",
    overview: "This direction covers dried lemon in slice form. For a visible garnish, the shape and proportion of complete slices matter; for an ingredient brief, cut consistency and the intended preparation become part of the discussion. Drying method, composition and lot values are checked against the offered product.",
    knownFacts: [{ name: "Ingredient", value: "Lemon" }, { name: "Product form", value: "Dried slices" }, { name: "Range", value: "Dried Fruits & Slices" }],
    positioning: "Dried slices are the listed form. The following choices describe your intended use, rather than additional confirmed grades.",
    images: { main: "/images/products/v2/dried-lemon-slices-main.webp", detail: "/images/products/v2/dried-lemon-slices-detail.webp", application: "/images/products/v2/dried-lemon-slices-application.webp" },
    forms: [{ name: "Garnish Brief", note: "Describe the visible slice size, shape and appearance your beverage presentation needs." }, { name: "Infusion Brief", note: "Share the planned preparation and whether slices will be used alone or in a blend." }, { name: "Food Ingredient Brief", note: "Describe your recipe and any handling or cut requirements for review." }],
    specification: [
      { name: "Slice Dimensions", buyerCheck: "Request the diameter and thickness range useful for your process, with a sample or drawing if needed." },
      { name: "Appearance & Integrity", buyerCheck: "Agree on rind colour, pulp appearance, seed presence and the allowance for broken slices." },
      { name: "Composition & Process", buyerCheck: "Confirm the ingredient declaration, any added ingredients and the actual drying process." },
      { name: "Moisture & Condition", buyerCheck: "Ask for the moisture specification and the assessment of texture or stickiness relevant to your use." },
      { name: "Sensory & Preparation", buyerCheck: "Evaluate the supplied sample using your intended preparation; record flavour and appearance expectations." },
      { name: "Quantity & Packing", buyerCheck: "Share your quantity, pack size and delivery market so supply and packaging can be confirmed." }
    ],
    applications: [{ name: "Beverage Garnishes", note: "Review intact slices and visual consistency for the planned drink presentation." }, { name: "Infusion Blends", note: "Discuss the lemon component and its preparation within your formulation." }, { name: "Bakery & Food Ingredients", note: "Use a project sample to check suitability for your recipe and handling process." }],
    storage: ["Discuss food-contact inner packaging and outer protection that limit slice damage during handling.", "Confirm the supplied product's dry-storage instructions and moisture protection before ordering.", "Agree on pack weight, lot identification and the documented shelf life for the actual product."],
    documents: [
      { group: "Product identity", note: "Check the proposed lemon product before sample approval.", items: ["Ingredient declaration and drying-process information", "Origin and product specification"] },
      { group: "Quality review", note: "Choose the evidence needed for the intended use and destination.", items: ["Microbiology and pesticide-residue test scope", "Relevant contaminant or additive information"] },
      { group: "Packing & traceability", note: "Match the documents to the proposed lot and packaging.", items: ["Packing and storage information", "Lot identification and applicable COA"] }
    ],
    faq: [{ question: "Can I specify the slice size?", answer: "Yes. Include a preferred diameter, thickness and appearance reference in your brief. Availability and tolerances are confirmed for the proposed supply." }, { question: "Are these freeze-dried or sweetened?", answer: "The confirmed direction is dried lemon slices. The drying method and any added ingredients must be checked in the offered product's declaration." }, { question: "Can the slices be used as a garnish?", answer: "Garnish sourcing is a discussion direction. Review the actual product's food-use suitability, preparation instructions and appearance before approval." }]
  },
  "dried-orange-slices": {
    intro: "Dried orange slices for food, beverage and infusion projects, with the cut, rind appearance and packing brief defined around your intended use.",
    overview: "Orange slice sourcing begins with the appearance and format needed in the finished product. A garnish brief may prioritise complete wheels, while an ingredient project may focus on cut consistency and preparation. Confirm the orange identity, declaration and drying process against the proposed material.",
    knownFacts: [{ name: "Ingredient", value: "Orange" }, { name: "Product form", value: "Dried slices" }, { name: "Range", value: "Dried Fruits & Slices" }],
    positioning: "The listed product is dried orange in slice form. Select a use below to guide the discussion; fixed grades and dimensions are not assumed.",
    images: { main: "/images/products/v2/dried-orange-slices-main.webp", detail: "/images/products/v2/dried-orange-slices-detail.webp", application: "/images/products/v2/dried-orange-slices-application.webp" },
    forms: [{ name: "Whole-Slice Presentation", note: "Discuss complete wheels, visual consistency and acceptable breakage." }, { name: "Infusion Ingredient", note: "Describe the intended drink or blend and sample evaluation method." }, { name: "Bakery Ingredient", note: "Share the recipe and presentation requirements for a suitability review." }],
    specification: [
      { name: "Orange Identity", buyerCheck: "Confirm the orange type and origin recorded for the proposed material." },
      { name: "Diameter & Thickness", buyerCheck: "Define useful slice dimensions and variation for your presentation or processing line." },
      { name: "Rind & Pulp Appearance", buyerCheck: "Agree on colour variation, seed presence and visible drying marks using an actual sample." },
      { name: "Whole / Broken Slices", buyerCheck: "Set the required slice integrity and a practical breakage acceptance method." },
      { name: "Declaration & Moisture", buyerCheck: "Review composition, processing information and the documented moisture specification." },
      { name: "Packing Brief", buyerCheck: "Specify the quantity, pack weight and protection needed for fragile slices." }
    ],
    applications: [{ name: "Drink Presentation", note: "Discuss dried orange wheels for a beverage garnish brief." }, { name: "Fruit Infusions", note: "Review the orange component within a proposed infusion or blended product." }, { name: "Bakery Concepts", note: "Evaluate appearance and preparation fit in your intended baked-product project." }],
    storage: ["Agree on an inner pack and outer carton that protect the selected slice format.", "Review moisture protection and the supplier's dry-storage instructions for the actual material.", "Confirm lot marking, pack weight and documented shelf-life information rather than assuming a standard period."],
    documents: [
      { group: "Composition & origin", note: "Confirm exactly which orange material is being offered.", items: ["Ingredient and processing information", "Origin and slice specification"] },
      { group: "Testing scope", note: "Agree on the checks required for the buyer's product and market.", items: ["Microbiology and pesticide-residue topics", "Relevant additive and contaminant review"] },
      { group: "Product handling", note: "Review the pack and lot information with the sample.", items: ["Packaging and storage specification", "Batch traceability and relevant reports"] }
    ],
    faq: [{ question: "Can I request complete orange wheels?", answer: "Yes. Share the intended presentation and your acceptance criteria for whole slices and breakage. The offered grade needs confirmation." }, { question: "Is the product organic or free from additives?", answer: "Those claims are not established by this page. Review the actual declaration and applicable evidence before using any claim." }, { question: "Is a standard pack size listed?", answer: "No fixed pack size is confirmed here. Include your preferred format and unit weight so the packaging brief can be reviewed." }]
  },
  "dried-rose-flowers": {
    intro: "Dried rose flower buds for botanical ingredient and infusion projects. Discuss bud appearance, flower identity and the information needed for your sourcing brief.",
    overview: "This product direction focuses on dried rose buds. Bud shape, colour variation, loose petals and stem content can all matter when selecting material for a botanical blend or loose infusion. The actual flower identity and food-use requirements are reviewed for the proposed source and destination.",
    knownFacts: [{ name: "Ingredient", value: "Rose flowers" }, { name: "Product form", value: "Dried flower buds" }, { name: "Range", value: "Flowers & Herbal Ingredients" }],
    positioning: "Dried buds are the product direction shown. Petal-only material, powder or finished bags would require a separate scope confirmation.",
    images: { main: "/images/products/v2/dried-rose-flowers-main.webp", detail: "/images/products/v2/dried-rose-flowers-detail.webp", application: "/images/products/v2/dried-rose-flowers-application.webp" },
    forms: [{ name: "Bud Appearance Brief", note: "Describe the size, colour and intact-bud proportion you would like reviewed." }, { name: "Loose Infusion Brief", note: "Share the intended preparation and the presentation expected in your product." }, { name: "Botanical Blend Brief", note: "Discuss the role of rose buds in a proposed blend without assuming a fixed recipe." }],
    specification: [
      { name: "Flower Identity", buyerCheck: "Confirm botanical identity, plant part and origin with the source records." },
      { name: "Bud Size & Integrity", buyerCheck: "Agree on the useful bud size and acceptable loose petals or broken buds." },
      { name: "Colour & Aroma", buyerCheck: "Review actual sample variation and set an agreed sensory reference." },
      { name: "Stem & Foreign Matter", buyerCheck: "Define acceptable stem content and foreign-material criteria." },
      { name: "Drying & Moisture", buyerCheck: "Review the drying information and measured moisture specification for the proposed lot." },
      { name: "Use & Market", buyerCheck: "Confirm the intended food use and the identity, testing and labelling information needed by the buyer." }
    ],
    applications: [{ name: "Loose Botanical Infusions", note: "Discuss the bud presentation and the customer's preparation brief." }, { name: "Floral Blends", note: "Review rose buds as one component of a proposed botanical blend." }, { name: "Tea Product Development", note: "Confirm ingredient identity and cut requirements before any new packed-tea project." }],
    storage: ["Discuss packaging that protects fragile buds from crushing and unnecessary handling.", "Confirm dry-storage conditions, moisture protection and handling instructions for the offered material.", "Agree on pack weight, traceability and the documented shelf life; no fixed period is assumed."],
    documents: [
      { group: "Botanical identity", note: "Use source documents to establish the flower material.", items: ["Botanical identity, plant part and origin", "Product specification and ingredient declaration"] },
      { group: "Quality topics", note: "Select the testing scope for the intended infusion or blend.", items: ["Microbiology, pesticide residue and heavy-metal topics", "Moisture and foreign-matter criteria"] },
      { group: "Supply records", note: "Check the actual source, lot and pack.", items: ["Traceability and applicable reports", "Packaging and dry-storage information"] }
    ],
    faq: [{ question: "Does this page cover rose petals or rose buds?", answer: "This product direction is dried rose buds. Petal-only material and other forms require a separate inquiry and confirmation." }, { question: "Is one rose species guaranteed?", answer: "The botanical identity must be confirmed for the offered source. The image is illustrative and cannot establish a species or grade." }, { question: "Are health claims included?", answer: "No health or therapeutic claim is made. Discuss this as a food ingredient and review the relevant market requirements." }]
  },
  "chrysanthemum-honeysuckle-goji-blend": {
    intro: "A chrysanthemum, honeysuckle and goji blend direction for botanical infusion sourcing, with the declaration, balance and cut profile reviewed against your project.",
    overview: "The named blend combines chrysanthemum, honeysuckle and goji as a sourcing direction. Its exact declaration, ingredient forms and proportions must be confirmed from the proposed formula. A sample review should consider both the dry blend and the customer's intended infusion preparation.",
    knownFacts: [{ name: "Named ingredients", value: "Chrysanthemum, honeysuckle & goji" }, { name: "Product direction", value: "Botanical blend" }, { name: "Format shown", value: "Loose ingredients" }],
    positioning: "The ingredient names establish the blend direction. Ratios, additional ingredients and packed formats require a confirmed formula and project brief.",
    images: { main: "/images/products/v2/chrysanthemum-honeysuckle-goji-blend-main.webp", detail: "/images/products/v2/chrysanthemum-honeysuckle-goji-blend-detail.webp", application: "/images/products/v2/chrysanthemum-honeysuckle-goji-blend-application.webp" },
    forms: [{ name: "Existing Blend Review", note: "Request the actual declaration and sample for this named blend direction." }, { name: "Blend Development Brief", note: "Describe the intended balance and appearance for a feasibility discussion." }, { name: "Packing Discussion", note: "Share the unit format and presentation after the blend itself is defined." }],
    specification: [
      { name: "Ingredient Declaration", buyerCheck: "Confirm each ingredient's identity, plant part and whether any other components are included." },
      { name: "Blend Ratio", buyerCheck: "Agree on the actual formula in writing; ingredient proportions cannot be inferred from the image." },
      { name: "Ingredient Form", buyerCheck: "Define flower integrity, honeysuckle form and goji cut or whole-fruit requirements." },
      { name: "Blend Consistency", buyerCheck: "Discuss mixing consistency and the sample method used to assess the supplied blend." },
      { name: "Infusion Evaluation", buyerCheck: "Use a shared preparation method to compare appearance, aroma and flavour of the actual sample." },
      { name: "Packing & Quantity", buyerCheck: "Specify the target pack, quantity and market after the formula brief is agreed." }
    ],
    applications: [{ name: "Loose Infusions", note: "Evaluate the proposed blend using the customer's intended preparation." }, { name: "Botanical Tea Projects", note: "Discuss the declaration and blend profile for a planned tea product." }, { name: "Packed Blend Development", note: "Review filling and packing feasibility separately from the ingredient formula." }],
    storage: ["Select a dry-ingredient pack that protects the different flower and fruit components.", "Confirm moisture protection and storage instructions for the complete blend, rather than assuming each component has identical handling needs.", "Review the approved declaration, lot identification and shelf-life evidence for the final blended product."],
    documents: [
      { group: "Formula information", note: "Establish the blend before discussing final packaging.", items: ["Complete ingredient declaration", "Confirmed ratio and component specifications"] },
      { group: "Quality review", note: "Define checks for the complete product and its intended market.", items: ["Relevant microbiology, residue and contaminant topics", "Actual sample and sensory evaluation record"] },
      { group: "Finished blend records", note: "Match the documents to the agreed blend and lot.", items: ["Blend traceability and relevant COA", "Packaging, storage and label information"] }
    ],
    faq: [{ question: "Is the ratio in the image the supplied recipe?", answer: "No. The generated image shows the ingredient direction. The actual declaration and ratio must be confirmed in the agreed formula." }, { question: "Can a different balance be discussed?", answer: "Yes. Share the desired profile for a development discussion. Feasibility, sample scope and ordering conditions require confirmation." }, { question: "Does this include finished tea bags?", answer: "This page describes a loose blend direction. Filled bags or another packed format require a separate development and packaging review." }]
  },
  "lemon-passion-fruit-orange-infusion": {
    intro: "A lemon, passion fruit and orange infusion direction for fruit-tea projects, with ingredient forms, the final declaration and packing reviewed together.",
    overview: "This fruit infusion direction brings together the named citrus and passion-fruit components. The exact passion-fruit form, citrus cut and any additional ingredients are part of the formula review. Product selection should compare the proposed dry mix and the prepared infusion using an agreed method.",
    knownFacts: [{ name: "Named ingredients", value: "Lemon, passion fruit & orange" }, { name: "Product direction", value: "Fruit infusion blend" }, { name: "Range", value: "Fruit & Herbal Blends" }],
    positioning: "The fruit names define the sourcing direction. The actual fruit forms, formula and ratios must be checked; the concept image is not a recipe.",
    images: { main: "/images/products/v2/lemon-passion-fruit-orange-infusion-main.webp", detail: "/images/products/v2/lemon-passion-fruit-orange-infusion-detail.webp", application: "/images/products/v2/lemon-passion-fruit-orange-infusion-application.webp" },
    forms: [{ name: "Fruit Infusion Review", note: "Request the declaration and actual sample for the named fruit combination." }, { name: "Fruit Form Discussion", note: "Clarify citrus cut and the passion-fruit ingredient form needed for your process." }, { name: "Brand Packing Brief", note: "Discuss portioning and labels after the ingredient specification is reviewed." }],
    specification: [
      { name: "Complete Declaration", buyerCheck: "Confirm all fruit components and any added flavouring, sweetener or other ingredient." },
      { name: "Passion-Fruit Form", buyerCheck: "Identify the actual supplied form and its composition rather than relying on the concept photograph." },
      { name: "Citrus Cut", buyerCheck: "Define the lemon and orange slice or piece format and acceptable variation." },
      { name: "Formula & Ratio", buyerCheck: "Review the proposed recipe and record any agreed ratio in the product specification." },
      { name: "Infusion Profile", buyerCheck: "Compare the sample's taste, aroma and appearance using the same preparation method." },
      { name: "Pack & Portion", buyerCheck: "Describe the intended serving format, pack weight and order quantity for confirmation." }
    ],
    applications: [{ name: "Fruit Infusions", note: "Discuss the intended preparation and desired fruit profile." }, { name: "Tea & Beverage Development", note: "Evaluate the actual blend within the customer's product brief." }, { name: "Portioned Fruit Blends", note: "Review component size and packing feasibility for a proposed portion format." }],
    storage: ["Review packaging against the actual dried-fruit forms and their handling requirements.", "Confirm moisture protection, closure and storage instructions for the proposed finished blend.", "Agree on declaration, portion information and lot marking before finalising the label or pack."],
    documents: [
      { group: "Fruit & formula", note: "Confirm exactly what each named fruit contributes.", items: ["Ingredient declaration and component forms", "Formula, ratio and product specification"] },
      { group: "Sample & quality", note: "Align evaluation with the buyer's drink or tea project.", items: ["Sample preparation and sensory reference", "Relevant microbiology, residue and additive review"] },
      { group: "Packing & market", note: "Set the checklist for the final blend and destination.", items: ["Label and packaging information", "Storage, traceability and applicable lot reports"] }
    ],
    faq: [{ question: "Is the passion fruit supplied as slices?", answer: "The exact passion-fruit form has not been established by this page. Confirm the actual ingredient and its declaration before approving the blend." }, { question: "Is the blend sweetened or flavoured?", answer: "Check the complete proposed declaration. This preview does not assume an additive-free, sweetened or flavoured recipe." }, { question: "Can the blend be portion-packed?", answer: "Include the desired pack and portion in your brief. Ingredient size, filling suitability and availability need project confirmation." }]
  },
  "cassia-goji-chrysanthemum-tea-bags": {
    intro: "Filled tea bags featuring the cassia, goji and chrysanthemum blend direction, with the contents, bag format and label information reviewed for the project.",
    overview: "This direction is a filled tea-bag product, rather than an empty bag or loose ingredient listing. The exact cassia identity and process, full blend declaration and fill specification must be confirmed together. Bag material, seals and outer packing are separate parts of the development brief.",
    knownFacts: [{ name: "Named blend", value: "Cassia, goji & chrysanthemum" }, { name: "Product form", value: "Filled tea bags" }, { name: "Range", value: "Tea Bags & Packed Teas" }],
    positioning: "Filled bags are the product direction. Bag shape, material, fill weight and formula are project details that require confirmation.",
    images: { main: "/images/products/v2/cassia-goji-chrysanthemum-tea-bags-main.webp", detail: "/images/products/v2/cassia-goji-chrysanthemum-tea-bags-detail.webp", application: "/images/products/v2/cassia-goji-chrysanthemum-tea-bags-application.webp" },
    forms: [{ name: "Filled-Bag Review", note: "Review the proposed contents, fill and bag construction together." }, { name: "Blend & Cut Brief", note: "Discuss ingredient form, cut and formula for the intended filling process." }, { name: "Outer-Pack Brief", note: "Share the required presentation, label and pack quantity for feasibility review." }],
    specification: [
      { name: "Ingredient Identity", buyerCheck: "Confirm the actual cassia material, plant part and process alongside goji and chrysanthemum details." },
      { name: "Formula & Ratio", buyerCheck: "Check the full declaration and agreed ingredient proportions; the illustration does not establish a recipe." },
      { name: "Cut & Fill", buyerCheck: "Set the ingredient cut and requested fill weight with a sample evaluation method." },
      { name: "Bag Construction", buyerCheck: "Confirm bag shape, food-contact material, seal and any string or tag requirements." },
      { name: "Infusion Performance", buyerCheck: "Review the filled bag using an agreed preparation method, including leakage and sensory checks." },
      { name: "Labels & Outer Pack", buyerCheck: "Define pack count, artwork, target market and required product information for review." }
    ],
    applications: [{ name: "Bagged Botanical Infusions", note: "Review the complete filled bag using the customer's preparation brief." }, { name: "Branded Tea Projects", note: "Discuss formula, bag construction and label information as one project." }, { name: "Portioned Tea Service", note: "Clarify the intended serving presentation and outer packaging requirements." }],
    storage: ["Discuss whether individual protection and an outer pack are required for the selected bag and blend.", "Confirm the finished product's moisture protection, storage instructions and documented shelf life.", "Check lot marking, ingredient declaration and preparation wording before approving any printed packaging."],
    documents: [
      { group: "Blend specification", note: "Confirm the contents independently of the bag format.", items: ["Ingredient identity, process and declaration", "Formula, cut and fill specification"] },
      { group: "Bag & quality review", note: "Match evidence to the actual filled product and food-contact materials.", items: ["Relevant food-contact material information", "Agreed testing and infusion-performance topics"] },
      { group: "Finished pack", note: "Review the final label and lot information for the destination.", items: ["Artwork and product-information checklist", "Packaging, storage and traceability documents"] }
    ],
    faq: [{ question: "Are these filled bags or empty tea bags?", answer: "This page covers a filled tea-bag direction featuring cassia, goji and chrysanthemum. Empty filter bags are not the product described here." }, { question: "Are pyramid bags or a specific material confirmed?", answer: "No specific bag shape or material is promised by this page. The concept image is illustrative; confirm the actual food-contact material and construction in the specification." }, { question: "Can the outer packaging use our artwork?", answer: "Artwork and labelling can be discussed as project requirements. Packing feasibility, scope and ordering conditions must be confirmed before approval." }]
  }
};
