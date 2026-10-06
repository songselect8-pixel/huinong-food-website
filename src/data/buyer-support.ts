// Buyer evaluation prompts, not offered grades, measured specifications or validated processes.
export const productReview: Record<string, { checks: string[]; packing: string[] }> = {
  "dried-lemon-slices": {
    checks: ["Compare slice diameter, thickness and intact wheels against your presentation reference.", "Record rind colour, visible seeds and breakage in the actual sample.", "Evaluate aroma, flavour and appearance using your intended drink or recipe preparation."],
    packing: ["Specify inner-pack weight and how often packs will be opened for service or processing.", "Review inner food-contact material and outer protection for fragile slices; agree how delivery damage will be assessed.", "Match the lot code, ingredient declaration and storage instructions to the approved lemon specification. Confirm the documented shelf life before ordering."],
  },
  "dried-orange-slices": {
    checks: ["Compare whole wheels, rind thickness and colour variation with your chosen presentation.", "Record broken slices and how easily pieces can be separated from the pack.", "Review the orange flavour and appearance in your intended infusion or food preparation."],
    packing: ["State the desired unit weight, outer-carton arrangement and whole-slice presentation requirement.", "Review cushioning and handling protection with a packed sample, including how broken slices will be assessed.", "Obtain the offered orange product’s moisture-protection, storage and shelf-life instructions; link them to the pack and lot code."],
  },
  "iqf-frozen-raspberries": {
    checks: ["Define whole-fruit, whole-and-broken or broken-fruit needs and an agreed assessment method.", "Record clumping, loose fragments and visible condition at sample receipt.", "Assess colour, texture and fruit distribution after your intended preparation, using a documented trial method."],
    packing: ["Specify the requested pack weight, inner liner and outer carton, plus whether packs will feed a processing line or be portioned.", "Agree frozen storage and transport conditions, temperature-record needs and the receiving handover with the proposed supplier.", "Match product and lot identifiers to the packing list and specification. Record condition at receipt and the handling instructions for the actual product."],
  },
  "iqf-frozen-blueberries": {
    checks: ["Define the size range and whether uniform berries or a broader size mix suits your application.", "Review intact berries, clumping and visible stems or foreign material in the sample.", "Compare colour release, texture and distribution after your intended processing trial."],
    packing: ["Specify bulk or portioning requirements, desired pack weight and outer-carton handling needs.", "Agree frozen storage and transport conditions and which temperature records accompany the handover.", "Check lot identification, source identity and size description against the agreed specification; confirm documented shelf life and receiving instructions."],
  },
  "dried-rose-flowers": {
    checks: ["Confirm the botanical identity and bud material from documents before comparing appearance.", "Review intact buds, loose petals, stem content and colour variation against a sample reference.", "Record aroma and infusion appearance using your intended preparation method."],
    packing: ["Specify the requested pack weight and whether the buds need extra protection from crushing.", "Discuss food-contact inner packaging, moisture protection and clean handling for fragile botanical material.", "Keep botanical identity, plant part and lot reference aligned across the pack and product records; request storage and shelf-life instructions."],
  },
  "raspberry-leaf-tea": {
    checks: ["Match the declared botanical identity and leaf part to the proposed material.", "Compare leaf cut, stems and fine particles against your loose-infusion or filled-bag brief.", "Assess infusion appearance and filtration with the intended strainer or tea-bag format."],
    packing: ["State the proposed leaf cut and pack weight, including whether material is intended for further blending or bag filling.", "Review inner-pack protection and handling that limit moisture exposure and unwanted crumbling.", "Match the botanical identity, leaf format and lot reference to the specification; obtain the applicable storage and shelf-life information."],
  },
  "chrysanthemum-honeysuckle-goji-blend": {
    checks: ["Check the full ingredient declaration and the identity of each named botanical.", "Compare cut sizes and ingredient distribution across portions of the dry blend.", "Review the prepared infusion against your agreed flavour and appearance brief; record the formula version used."],
    packing: ["Clarify whether the inquiry is for a loose bulk blend or a separately evaluated packed format.", "Specify pack weight and portioning requirements so ingredient distribution and handling can be discussed.", "Match the final ingredient declaration and formula version to labels, lot records and storage instructions before approving a pack."],
  },
  "lemon-passion-fruit-orange-infusion": {
    checks: ["Identify the form of the passion-fruit component and the complete ingredient declaration.", "Compare citrus pieces and the consistency of ingredient distribution between sample portions.", "Prepare the infusion using the intended method and review flavour, appearance and any sediment against the brief."],
    packing: ["State whether the project needs a bulk infusion blend or an individually portioned format for feasibility review.", "Discuss unit weight and protection for citrus pieces, plus how the blend will be portioned and handled.", "Confirm the final ingredient and additive declarations, formula reference and storage instructions for the actual offered blend."],
  },
  "cassia-goji-chrysanthemum-tea-bags": {
    checks: ["Confirm the filled blend declaration, ingredient cut and requested amount per bag.", "Review bag material, seals, string or tag requirements and the behaviour of the bag during your preparation trial.", "Compare flavour, infusion appearance and escaped particles using the same preparation method for each sample."],
    packing: ["Specify bag count per unit, any individual envelope and outer carton; confirm the proposed bag and food-contact materials.", "Review a packing mock-up for label placement, ingredient information, lot marking and preparation wording.", "Obtain storage and shelf-life instructions for the finished filled product, rather than applying a raw-ingredient document to the complete pack."],
  },
};

export const applicationTrials: Record<string, { intro: string; checks: string[] }> = {
  "tea-infusion-blends": {
    intro: "Compare candidate ingredients using one agreed preparation method. Keep the recipe and sample reference with your observations.",
    checks: ["Ingredient identity and cut suitability for loose tea or a filled bag", "Infusion colour, aroma and flavour against the project brief", "Fine particles, filtration and consistency between portions"],
  },
  "beverage-garnishes": {
    intro: "Review the dry slice and its appearance in your intended drink. Record the presentation and service conditions used for the comparison.",
    checks: ["Slice diameter, thickness and intact appearance in the chosen glass", "Colour, visible seeds and presentation after the planned service time", "Pack protection, handling breakage and ease of portioning"],
  },
  "bakery-fruit-preparations": {
    intro: "Evaluate the fruit after your intended processing trial. An attractive concept image does not establish how a supplied lot will perform.",
    checks: ["Whole or broken fruit requirements and distribution in the recipe", "Colour release, texture and appearance after preparation", "Pack opening, portioning and frozen receiving conditions"],
  },
  "dairy-frozen-desserts": {
    intro: "Define the preparation route before evaluating the finished concept. Agree product suitability and any processing responsibilities for the actual project.",
    checks: ["Desired fruit pieces, prepared fruit texture and portion size", "Colour distribution and texture in the finished trial", "Ingredient handling, preparation responsibility and relevant document scope"],
  },
};

export const sourcingQuestions = [
  { question: "What should I include in a first inquiry?", answer: "Start with the product, intended use and destination market. Add an estimated order quantity, preferred pack and the documents your team needs. Leave undecided items open; an initial brief does not need to be a finished specification." },
  { question: "How do I discuss a sample?", answer: "Use Discuss a Sample on a product page, or select Sample Discussion in the inquiry. Describe what you want to evaluate and the amount your trial needs. Sample availability, cost, delivery arrangements and any frozen handling requirements need agreement before dispatch." },
  { question: "Do I need to know the MOQ or delivery date first?", answer: "No. Share your trial or order quantity and proposed timing. Minimum quantities and timing must be checked for the ingredient, pack materials and project scope; this website does not set a fixed MOQ or lead time." },
  { question: "How should I request quality documents?", answer: "Select the product and document topics on Quality & Compliance. Include the target market and any buyer-specific checklist. The relevant product, lot, supplying site and permission to share each file need to be matched to your request." },
];
