# Huinong Food website rules

- Build this as an English B2B sourcing site. No cart, checkout, retail prices, fabricated reviews, or invented buyer history.
- Keep the public company name in `src/data/site.ts`. Confirm it against export documents before production use.
- Give every product a source URL or `null` and a verification state. A marketplace listing title establishes only a product direction; it does not verify ingredients, process, specifications, health claims, certifications, MOQ, packaging, or lead time.
- Keep single ingredients, blends, filled tea bags, and empty tea bags distinct. Never infer nuts or freeze drying from “Dry Fruits.” Merge repeated marketing listings for the same product direction.
- The five images in `public/images` are AI concept visuals from `huinong-website-images/huinong-images`. Use them for homepage/category preview only. Do not present them as SKU photos, factory evidence, certificates, packaging cases, or proof of supply for every pictured ingredient.
- Hide modules that require missing evidence, especially individual product cards and certificates. Use real in-page anchors until inner pages exist.
- Keep the inquiry form in preview mode until a real delivery channel is approved and implemented. Never claim a request was sent when it was not.
- Record source and missing-content changes in `docs/source-map.md` and `docs/missing-content.md` as content is verified.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
