# Applications delivery — FRUNORIA

Review date: 2026-10-03. Local preview: `http://localhost:4173/applications/`.
Base rollback commit: `a66eb26`. Work branch: `codex/applications-pages`.

## Scope and status

**已完成开发 · 已检查功能 · 待视觉验收 · 待资料确认**.

The existing project had a three-tab Home application explorer and no Applications inner routes. This round adds one overview and four real detail pages, uses the current palette/fonts/container and connects Home/navigation/footer to the new routes. Home layout, imagery, product taxonomy/grid, product detail data, Private Label and Quality layouts were retained. The Home bakery label remains “Bakery & Food Ingredients”; its application CTA opens the bakery/fruit-preparations guide.

| Page | Path | Content / related products |
| --- | --- | --- |
| Overview | `/applications` | Compact hero, four large 2×2 scene cards, selection prompts, shared-inquiry handoff |
| Tea & Infusion Blends | `/applications/tea-infusion-blends` | Citrus, rose, raspberry leaf, the two existing blends and filled tea bags; seven products, separate directions rather than one invented formula |
| Beverage Garnishes | `/applications/beverage-garnishes` | Dried Lemon Slices and Dried Orange Slices only; slice form, size/integrity, composition, packing and service brief |
| Bakery & Fruit Preparations | `/applications/bakery-fruit-preparations` | IQF Frozen Raspberries and Blueberries; fruit form, processing-result evaluation, packing and cold-chain questions |
| Dairy & Frozen Desserts | `/applications/dairy-frozen-desserts` | The two frozen berries; prepared-fruit use, presentation/portioning, process and document questions; no assumed direct ready-to-eat suitability |

Each detail page has a separate hero, three ingredient-form discussions, existing-product links, four selection topics, packing/Quality/Private Label entries, four distinct FAQs and a short application brief. No additional food, recipe, finished dessert, syrup, sauce or bakery product was added to the catalogue.

## Nine final application images

Generated with the **OpenAI built-in imagegen tool**, one independent call per scene; no collage extraction, reuse or crop substitution. The exact final prompts, generated source paths, dimensions, hashes and two rejected attempts are in `docs/application-image-manifest.json`.

All files below are in `public/images/applications/v1/`. Originals are archived without modification in `assets/originals/applications-v1/`; format conversion to WebP used the already-installed `sharp` package, with no compositing, recolouring or image-content edits. No old image file was overwritten.

| File | Dimensions | Actual placement |
| --- | --- | --- |
| `overview-workbench.webp` | 1672×941 (~16:9) | Applications overview hero |
| `tea-infusion-card.webp` | 1448×1086 (4:3) | Tea overview entry |
| `tea-infusion-hero.webp` | 1536×1024 (3:2) | Tea detail hero |
| `beverage-garnishes-card.webp` | 1448×1086 (4:3) | Beverage overview entry |
| `beverage-garnishes-hero.webp` | 1536×1024 (3:2) | Beverage detail hero |
| `bakery-fruit-preparations-card.webp` | 1448×1086 (4:3) | Bakery overview entry |
| `bakery-fruit-preparations-hero.webp` | 1536×1024 (3:2) | Bakery detail hero |
| `dairy-frozen-desserts-card.webp` | 1448×1086 (4:3) | Dairy/frozen-dessert overview entry |
| `dairy-frozen-desserts-hero.webp` | 1536×1024 (3:2) | Dairy/frozen-dessert detail hero |

Food morphology, vessel structure, repetition and framing were visually reviewed. The first overview had a clipped loaf, and the first beverage detail had clipped vessels and less clear dried-citrus texture; these two were regenerated individually. Both rejected originals remain in `assets/originals/applications-v1/review-rejected/`. Seven successful scenes were retained.

All nine page images carry a web-text **Application Concept** label. Hero/card images use their own aspect ratio and contain sizing; the phone does not crop into the main scene. Related product cards deliberately retain the relevant product's own `/images/products/v2` main image.

## Content basis and evidence boundaries

The explicit user brief and existing `src/data/site.ts` / `src/data/additional-product-details.ts` product records are the content basis. This round adds procurement questions and uses already documented distinctions; it adds no numerical technical standard or current regulatory conclusion that requires a new legal-source claim. The prior dated Quality research remains in `docs/quality-source-review.md` without changing its status.

The pages do not establish formulas, exact ratios, validated processes, shelf life, MOQ, lead times, market access, health effects or finished-dessert suitability. Photos are generated use concepts, not actual lot photos or client projects. Certificate confirmation, holder/scope verification, file possession and publication permission remain separately maintained by Quality.

## Actual functional and responsive checks

`scripts/review-applications.js` ran in a real Chromium browser against the local exported site. Checked 1440×1000 desktop, 1920px, 900px and 390px widths:

- Overview: four 2×2 cards, image/title/Explore Application routes, section anchors and native required application selection.
- Details: all seven requested sections, three form discussions, four selection topics, four expandable/collapsible FAQs, separate descriptions and four distinct hero images.
- Related products: all nine unique existing product detail routes reached, with matching image/title/button links; beverage excludes berries, both frozen applications link only to the two berries.
- Quality: each detail link opens `/quality`; no unsupported download links appear.
- Inquiry: four detail-page briefs and an overview brief preserve application, optional selected product, source path and packaging/document requirements. Optional fields survive collapse/reopen. Choosing another application clears an incompatible product. No product selection uses the existing “Not sure yet” option.
- Validation: only known application/product relationships accepted; free text length-limited and rendered as text; unknown IDs ignored. Existing inquiry removal clears added packing/documents. Preview explicitly says the request has not been sent.
- Mobile: navigation, related entries, FAQs, product select, optional fields and inquiry handoff work by click; no horizontal overflow at checked widths; scene images remain undistorted and uncropped.
- Text: no sustained opacity loss or clipping; reduced-motion browsing and FAQ work. No new animation library or compulsory entrance animation.

The existing Quality and nine-product browser scripts were rerun after the inquiry update. Build/typecheck and exact results are recorded in the machine-readable `applications-qa-results.json` and regression files. The old 27 product images and five category images still match their original manifest hashes; the nine new application hashes are distinct. `applications-image-audit.json` records the file audit.

## Screenshot files

Captured at 100% browser scale after fonts, images and transitions settled. Full pages are supplemented with readable hero/selection/inquiry views in the same folder.

| View | File |
| --- | --- |
| Overview, complete desktop | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/applications-desktop-full.png` |
| Tea detail, complete desktop | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/tea-infusion-blends-desktop-full.png` |
| Beverage detail, complete desktop | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/beverage-garnishes-desktop-full.png` |
| Bakery detail, complete desktop | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/bakery-fruit-preparations-desktop-full.png` |
| Dairy detail, complete desktop | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/dairy-frozen-desserts-desktop-full.png` |
| Overview, mobile | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/applications-mobile-full.png` |
| Tea detail, mobile | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/tea-infusion-blends-mobile-full.png` |
| Bakery detail, mobile | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/bakery-fruit-preparations-mobile-full.png` |
| Application inquiry handoff | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/application-inquiry-prefill-desktop.png` |
| Previous Quality desktop preserved | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/quality-previous-desktop-full.png` |
| Previous Quality mobile preserved | `C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-applications/quality-previous-mobile-full.png` |

## Pending and stop point

Visual acceptance of these pages and concepts is pending the user's review. Actual ingredient identity, permitted/intended uses, offered forms, packing, processing/suitability guidance and corresponding document evidence remain pending supplier/project confirmation. The certificate, specification and market review backlog is unchanged.

See `docs/site-roadmap.md` for the separate development / checks / visual / evidence columns. Stop after Applications delivery. About, Contact and Resources are not developed in this round. No email integration, remote push or deployment.
