# FRUNORIA website rules

- Build this as an English B2B sourcing site. No cart, checkout, retail prices, fabricated reviews, or invented buyer history.
- Use FRUNORIA as the public brand and FRUIT & BOTANICAL INGREDIENTS as the wordmark descriptor. Keep brand, contact channels, domain and legal operator separate in `src/data/site.ts`; do not invent a FRUNORIA legal company name or imply a relationship to historical suppliers without evidence.
- Preserve the wine #8F2D4F, blueberry #2C3F60, warm white #FBF9F5, blush #F5E9EE and ice #EDF2F8 interface palette for new pages.
- Keep the legacy marketplace URL as a historical source reference, not a FRUNORIA storefront link. Do not attribute a supplier's certificates to FRUNORIA without checking the holder, site, product and process scope.
- Give every product a source URL or `null` and a verification state. A marketplace listing title establishes only a product direction; it does not verify ingredients, process, specifications, health claims, certifications, MOQ, packaging, or lead time.
- Keep single ingredients, blends, filled tea bags, and empty tea bags distinct. Never infer nuts or freeze drying from “Dry Fruits.” Merge repeated marketing listings for the same product direction.
- The five images in `public/images` are AI concept visuals from `huinong-website-images/huinong-images`. Use them for homepage/category preview only. Do not present them as SKU photos, factory evidence, certificates, packaging cases, or proof of supply for every pictured ingredient.
- The current nine-product library uses 27 new AI concepts in `public/images/products/v2`, with five separate range concepts in `public/images/categories/v2`. Keep product, detail and application views distinct and visibly illustrative. See `docs/product-image-manifest.json` for generation prompts and provenance. These are approved for local development preview, not verified lot photographs; `skuImage` remains `null`.
- Hide modules that require missing evidence, especially individual product cards and certificates. Use real in-page anchors until inner pages exist.
- Keep the inquiry form in preview mode until a real delivery channel is approved and implemented. Never claim a request was sent when it was not.
- Record source and missing-content changes in `docs/source-map.md` and `docs/missing-content.md` as content is verified.
- Preserve the approved Home, Products and Private Label designs; do not repeatedly redesign their palette, width or structure without a new request.
- Never invent product values, certifications, reports, company history or contact details. Keep certificate ownership/verification separate from file-upload and public-access status; market rules need dated official sources.
- Generate new visuals independently by product or purpose. A product's own main image may be shared by its listing card and detail hero; do not reuse it for another product or as an application/article cover.
- Each development round includes actual browser and interaction checks. Follow `docs/site-roadmap.md`; keep unfinished research marked as pending confirmation. Inquiry stays in preview mode: no email integration, deployment or publication without explicit authorization.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
