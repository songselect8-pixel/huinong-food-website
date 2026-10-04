# Source map and verification status

Checked 2026-09-27. The project initially contained no product table or site code. The supplied `huinong-website-images/huinong-images/README.txt` and five WebP files were inspected. The Alibaba storefront and its category/product-list pages were retrieved directly; the browser search reader could not open the storefront root, so the direct page responses were used for this audit.

**Status meanings:** `store-listing` = a product direction appears in this company's own product list; `store-category` = category appears on the company's store; `provided-brief` = supplied by the user but no exact listing URL retained; `user-attested` = the company user directly confirmed a claim but its supporting documents have not been inspected; `concept-image` = illustrative image, not product evidence. None of these states independently verifies specifications, certifications or supply terms.

The initial 2026-09-28 brief listed HACCP, ISO 22000, BRCGS and FSSC 22000 as sourcing topics. A later 2026-09-28 user message explicitly confirmed the company holds all four and requested "Certified" badges in the development preview. This claim is `user-attested`: certificate copies, certified legal entity, facility/product scope and validity have not been inspected. Verify those before public release. The section's seal, report and folder symbols are original abstract UI graphics, not official certification marks or evidence.

The user supplied the revised homepage statement about reliable quality documents, testing reports and export requirements. Treat it as `provided-brief` positioning copy; verify actual support processes and document availability before production use.

The 2026-09-28 user brief supplied the `/private-label` page structure, five process headings, product and packaging directions, customization topics and hero/CTA copy. These are `provided-brief` project discussion topics. The page presents packaging and production as scope to confirm for each project; the brief alone does not verify every format, formula, production arrangement or labeling service.

A later 2026-09-28 user revision specified the page's B2B terminology: ingredient sourcing, blend development, custom packaging solutions, Production Coordination, Botanical Tea Blends, Tea Bags & Sachets, MOQ Requirements, named packaging subformats and a six-stage Private Label Workflow Example. These remain `provided-brief` directions. The workflow is explicitly illustrative, not a customer case; pyramid/filter bags, kraft/aluminum foil pouches, tea boxes, gift sets, label work, sampling and MOQ terms need product- and project-level confirmation before release.

The 2026-09-29 final page brief added Packaging Format, Material Selection, Label Design, Artwork Support and Pack Size as `provided-brief` customization discussion topics. It also added Project Considerations: MOQ Requirements, Product Format, Packaging Selection, Market Requirements and Timeline Planning. These are buyer-brief prompts, not confirmed material options, fixed MOQs, lead times or market approvals. The six workflow icons are original abstract line graphics, not factory or customer evidence.

## Company and categories

| Item | Source | Status / limit |
| --- | --- | --- |
| English company name and main categories: Herbal Tea, Flavor Tea, Flower Tea, Tea Bag, Dry Fruits | [Storefront](https://cnjxhn.en.alibaba.com/) | Storefront visible; legal export name still unverified |
| Dried fruit slices | [Store group](https://cnjxhn.en.alibaba.com/productgrouplist-969052928/Dried_Fruit_Slices.html) | `store-category` |
| Dried flower tea | [Store group](https://cnjxhn.en.alibaba.com/productgrouplist-968606692/Dried_Flower_Tea.html) | `store-category` |
| Herbal tea bags and tea blends | [Store group](https://cnjxhn.en.alibaba.com/productgrouplist-969273622/Herbal_Tea_Bags_Tea_Blends.html) | `store-category`; filled tea bag direction only; empty bags unverified |
| Fruit infusion | [Store group](https://cnjxhn.en.alibaba.com/productgrouplist-968304721/Fruit_Infusion_Detox_Water.html) | `store-category`; no detox/health claim adopted |
| Baking and beverage ingredients | [Store group](https://cnjxhn.en.alibaba.com/productgrouplist-968625802/Baking_Beverage_Ingredients.html) | `store-category`; suitability still product-specific |

## Canonical product directions

Marketing titles from the store have been shortened. Repeated marketing listings are grouped by ingredient direction rather than multiplied into product pages.

| Direction | Source | Status / limit |
| --- | --- | --- |
| Dried Lemon Slices | [Store listing](https://www.alibaba.com/product-detail/ISO-HACCP-Dried-Lemon-Slices-100_1601815043780.html) | `store-listing`; no certification, process or pack claim adopted |
| Dried Orange Slices | [Store listing](https://www.alibaba.com/product-detail/Organic-Cocktail-Garnish-Natural-Edible-3_1601839223912.html) | `store-listing`; process, thickness and certification claims unverified |
| Dried Rose Flowers | [Store listing](https://www.alibaba.com/product-detail/100-Natural-No-Additives-Hand-Selected_1601811980304.html) | `store-listing`; single floral ingredient, no health claim |
| Chrysanthemum, Honeysuckle & Goji Blend | [Store listing](https://www.alibaba.com/product-detail/Natural-Chrysanthemum-Honeysuckle-Goji-Berry-Blend_1601807220316.html) | `store-listing`; recipe, proportions and format unverified |
| Lemon, Passion Fruit & Orange Infusion | [Store listing](https://www.alibaba.com/product-detail/Wholesale-Bulk-Supply-Vegan-Keto-Non_1601838400545.html) | `store-listing`; exact contents, ratios and claims unverified |
| Cassia, Goji & Chrysanthemum Tea Bags | [Store listing](https://www.alibaba.com/product-detail/Premium-High-Quality-Roasted-Cassia-Seed_1601838337283.html) | `store-listing`; filled tea bag direction; bag type, material and contents unverified |

The store also lists pineapple, apple, papaya, grapefruit, jasmine and other products. They were not added to the homepage merely because the supplied concept images depict some of them. Any future range expansion needs separate content and SKU review. Long listing titles also contain unsupported claims such as Organic, Sugar-Free, HACCP, wellness and detox; these were excluded from public copy.

## Images

| File | Source / usage | Status / limit |
| --- | --- | --- |
| `public/images/01-home-hero.webp` | Supplied `huinong-images` folder; former homepage hero retained for rollback | `concept-image`; not a SKU photo |
| `public/images/home-berries-citrus-hero.webp` | Built-in image tool, 2026-10-03; homepage right-side hero concept; PNG converted to WebP without cropping | `concept-image`; berries and dry ingredients are shown separately; not a SKU, batch or supply-lot photo |
| `public/images/02-dried-fruits.webp` | Supplied folder; dried fruit category | `concept-image`; pineapple, apple and kiwi depiction does not establish supply |
| `public/images/03-flowers-herbs.webp` | Supplied folder; flower/herb category | `concept-image`; depicted mix is not a verified formula |
| `public/images/04-fruit-tea-blends.webp` | Supplied folder; blend category | `concept-image`; composition is illustrative |
| `public/images/05-tea-bags.webp` | Supplied folder; tea bag category | `concept-image`; bags and packs do not prove material or packing capability |
| `public/images/application-tea-infusion.webp` | Generated for this preview; tea/infusion application selector | `concept-image`; no product or preparation claim |
| `public/images/application-beverage-garnish.webp` | Generated for this preview; beverage application selector and inquiry detail | `concept-image`; garnish suitability is product-specific |
| `public/images/application-bakery-ingredients.webp` | Generated for this preview; bakery application selector and unpublished draft card | `concept-image`; not proof of a supplied cut or tested recipe |
| `public/images/private-label-hero.webp` | Generated for `/private-label` hero; herbal infusion, dried fruit, tea bags and blank packs | `concept-image`; not a product or packaging case |
| `public/images/private-label-ingredients.webp` | Generated for fruit infusion direction | `concept-image`; depicted ingredient mix is not a verified formula |
| `public/images/private-label-tea-bags.webp` | Generated for tea bag direction | `concept-image`; bag contents and material are illustrative |
| `public/images/private-label-packaging.webp` | Generated for packaging discussion | `concept-image`; mockups do not verify format availability or labeling capability |

Original supplied files remain in `huinong-website-images/huinong-images`. Generated PNG originals are in `C:\Users\XuWanPi\.codex\generated_images\01a0e2a5-ceeb-78a3-a1d8-bce77c95dd44`. Website WebP copies are in `public/images`.

## Frozen berries and raspberry leaf expansion (2026-10-02)

The user supplied `中国冷冻树莓_冷冻蓝莓_树莓叶茶_2025全球市场与国别认证深度报告.html` as research and content-planning input and explicitly requested three product directions. It is **not** evidence that Huinong stocks those products, holds a product-specific certificate, has a defined origin/grade, or has entered any destination market. The three canonical records in `src/data/site.ts` therefore have `sourceUrl: null`, `verification: provided-brief`, `skuImage: null`, and no published numeric specification, pack size, MOQ, lead time or certificate assignment. Their English pages are development-preview buyer briefs pending supplier confirmation.

| Direction | Category | Source / status | Identity boundary |
| --- | --- | --- | --- |
| IQF Frozen Raspberries | Frozen Berries | User request + supplied research report; `provided-brief` | Whole, Whole & Broken and Crumble are inquiry forms to confirm, not in-stock grades. Frozen is distinct from dried and freeze-dried. |
| IQF Frozen Blueberries | Frozen Berries | User request + supplied research report; `provided-brief` | Bilberry, wild blueberry and cultivated/highbush blueberry are identity checks, not three claimed supply lines. |
| Raspberry Leaf Tea | Flowers & Herbal Ingredients | User request + supplied research report; `provided-brief` | Leaf ingredient only; actual Rubus species, whole/cut form, finished tea-bag scope and food status require verification. It is not raspberry fruit tea. |

The report's berry size examples, market figures, HS proxy data and 2025 country matrix remain internal research. No country-specific current legal requirement is published on these pages; if later added, verify the applicable official source and record the access date. The report's M (mandatory), C (conditional) and B (buyer/channel) categories remain distinct in the internal brief. The product pages use the corresponding separation of market access/registration, farm or processing system scope, and batch/conditional documents. This is a checklist, not a claim of available documents. The company's user-attested homepage badges have **not** been applied to these products or supplying facilities.

Nine separate generated PNG originals are saved in `assets/originals/product-concepts/`; same-name WebP copies are in `public/images/products/`. The `-main` images are 1254×1254 (1:1); `-detail` and `-application` images are 1448×1086 (4:3). WebP conversion used the project's installed `sharp` dependency without cropping, compositing or colour changes.

| Product | Main image | Detail image | Application image |
| --- | --- | --- | --- |
| IQF Frozen Raspberries | `iqf-frozen-raspberries-main` | `iqf-frozen-raspberries-detail` | `iqf-frozen-raspberries-application` |
| IQF Frozen Blueberries | `iqf-frozen-blueberries-main` | `iqf-frozen-blueberries-detail` | `iqf-frozen-blueberries-application` |
| Raspberry Leaf Tea | `raspberry-leaf-tea-main` | `raspberry-leaf-tea-detail` | `raspberry-leaf-tea-application` |

All nine are AI-generated illustrative concepts, not actual lot photos, botanical identification evidence, finished product validation or proof of packaging/cold-chain capability. The application pictures depict finished use concepts and do not establish ready-to-eat suitability. Before publication, compare imagery against verified product samples and approved use guidance.

## Product-range visual unification (2026-10-02)

The five home range cards now use the same image-led layout. Four retain their supplied homepage/category concepts; Frozen Berries uses the new mixed raspberry-and-blueberry category concept below. The Products overview groups nine records by the same five ranges. Its six store-listing directions use individual **AI concept visuals**, not SKU photographs. Each listing still has its original `sourceUrl`, `verification: store-listing` and `skuImage: null`. The three newer records still have `verification: provided-brief` and `skuImage: null`.

| New preview asset | Use / limit |
| --- | --- |
| `public/images/products/dried-lemon-slices-card.webp` | Illustrative Dried Lemon Slices card; actual cut, process and lot unverified |
| `public/images/products/dried-orange-slices-card.webp` | Illustrative Dried Orange Slices card; actual cut, process and lot unverified |
| `public/images/products/dried-rose-flowers-card.webp` | Illustrative Dried Rose Flowers card; actual identity and lot unverified |
| `public/images/products/chrysanthemum-honeysuckle-goji-blend-card.webp` | Illustrative blend card; recipe, ratio and supply form unverified |
| `public/images/products/lemon-passion-fruit-orange-infusion-card.webp` | Illustrative infusion card; composition and ratio unverified |
| `public/images/products/cassia-goji-chrysanthemum-tea-bags-card.webp` | Illustrative filled-bag card; contents, material, format and lot unverified |
| `public/images/products/frozen-berries-category.webp` | Illustrative home Frozen Berries category; depicts both requested berry directions, not a product lot or grade |

The seven generated PNG originals are in `assets/originals/product-concepts/`; WebP conversion used installed `sharp` without cropping or recolouring. Prompt set and intended limitations are recorded in `docs/product-image-prompts.md`. Before publication, replace or explicitly approve each concept against real product and category evidence.

## Brand update — 2026-10-02

The user confirmed **FRUNORIA** as the new public brand, **FRUNORIA Ingredients** as an acceptable business label, and **FRUIT & BOTANICAL INGREDIENTS** as the wordmark descriptor. This does not establish the legal operator, a corporate rename, certificate ownership, or a relationship to the historical Alibaba storefront. The storefront URL remains as a source reference only and its promotional footer entry is hidden. FRUNORIA domain and contact channels remain unconfirmed. The quality card names HACCP, ISO 22000, BRCGS and FSSC 22000 as systems to verify by actual holder, site, product and process scope.

## Nine-product detail library — 2026-10-03

The user's latest brief authorizes complete local-preview detail pages and three new independently generated concept views for each of the nine existing products. The six older listing directions now have tailored detail records in `src/data/additional-product-details.ts`; the three existing detail records in `src/data/site.ts` were retained and expanded. Listing source URLs and verification states are unchanged. Product identity/form is separated from procurement targets. No numerical specification, exact formula, certification ownership, MOQ or lead-time claim was added.

27 product concepts are wired through `public/images/products/v2/`; five additional category concepts are wired through `public/images/categories/v2/`. `docs/product-image-manifest.json` records exact prompts, original paths, final WebP paths, dimensions and hashes. Final PNGs are archived separately in `assets/originals/product-library-v2/`. All prior imagery remains available for rollback. Category images are not used as SKU images; `skuImage` remains null throughout.

The cassia tea-bag concept images were corrected using imagegen with a botanical morphology reference (Kew POWO, Senna obtusifolia general information). This is a visual plausibility reference only; it does not identify the actual supplied cassia species or establish a product specification. User-described product forms and applications remain subject to source/lot review.

`docs/product-library-review.md` contains the nine route and image mappings and screenshot links. `docs/product-library-qa-results.json` records actual browser checks. This round remains local development preview, with no email delivery or deployment.


## Quality & Compliance inner page — 2026-10-03

The canonical `/quality` route now contains certification record review, product-type document topics, target-market tabs and an existing-inquiry handoff. HACCP, ISO 22000, BRCGS and FSSC 22000 retain their prior owner-attested provenance; holder, site/product/process scope, validity and brand relationship remain unverified. Certification status, verification and file/publication permission are stored independently in `src/data/quality.ts`. No fake file, certificate graphic or download was created.

The existing 2025 research report was read as a starting point. EU, US, Great Britain and Canada have limited official-source topic reviews dated 2026-10-03; Japan stays an unverified draft. Current commodity/origin/use applicability is still pending. `docs/quality-source-review.md` records the exact sources, inaccessible pages, checked boundaries and outstanding checks. This supplements the historical report notes above; it does not turn them into present-day legal conclusions.

Product, document types, target market, optional certification topic and `/quality` source are carried to the existing inquiry preview. All nine prior detail pages and 27 product concepts were rechecked, without replacing images. See `docs/quality-review.md` and `docs/site-roadmap.md`; later stages have only been recorded, not implemented.

## Applications guides and independent scene imagery — 2026-10-03

The user explicitly authorized `/applications` plus tea/infusion, dried-citrus garnish, bakery/fruit-preparation and dairy/frozen-dessert guides. Content uses the existing nine product briefs as procurement discussion directions, with no added technical values or verified-use claims. The two berry applications show prepared/cooked fruit concepts and do not establish ready-to-eat suitability. Finished pastries, sauces and desserts are not added sale products.

Nine independent images are in `public/images/applications/v1/`: one overview, four entry scenes and four distinct detail heroes. They were generated with the built-in imagegen tool; exact prompts/provenance and two individually rejected/regenerated attempts are recorded in `docs/application-image-manifest.json`. Every scene is marked Application Concept in webpage text. Product identification cards reuse only each related product's own approved development main image; none of the 27 product concepts, Home or Private Label scenes is presented as a new application image.

The new guides link to the current product and Quality pages. Application, selected product, source and optional packaging/document requests pass into the existing inquiry preview. No changes were made to product verification, certificate ownership/file/publication states or the dated Quality market research. See `docs/applications-review.md` and the updated roadmap for separate implementation, functional, visual and evidence status.
