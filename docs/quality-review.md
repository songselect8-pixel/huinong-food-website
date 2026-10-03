# Quality & Compliance delivery review

Date: 2026-10-03. Local development preview: `http://localhost:4173/quality/`.

## Scope and rollback

Work is on `feature/quality-compliance`, based on `8d31aea`. The preceding product-library implementation is preserved. No image generation, email integration, remote push or deployment took place in this round. Home and Private Label changes are limited to links pointing to the new canonical Quality page; product pages gain one contextual Quality link.

## Previous-round gate

Before Quality implementation, the nine detail routes were rebuilt and checked in a real browser. Each contains its tailored overview, selection information, applications, packing/storage, documentation, FAQ, related products and three distinct gallery views. Product image, name and button lead to the same real detail page. Selected product/form/source enter the inquiry preview.

All **27** files in `public/images/products/v2` match the image manifest hashes; **27 unique hashes**, no missing/mismatched image. The five independent range concepts and approved hero remain intact. No completed image was regenerated. Company specifications and actual-lot photographs remain pending evidence, not a missing UI task.

After integrating Quality inquiry prefill, `scripts/review-product-library.js` was rerun: all nine detail pages, gallery switches, selection/deselection, three synchronized quote links, catalogue combined search/filter/reset and preview status passed with zero page errors. The script now distinguishes quote links from contextual Quality links.

## Quality page

- One `/quality` route: header/footer, both homepage quality entries, Private Label and all nine product pages point here.
- Four owner-attested certification records, with independent verification and file/publication states. Holder/scope/category/validity/review/access fields expand. No fabricated certificate and **zero download links**.
- Three product-document groups, each with three expandable topics: what the document contains, what to check and how to request it.
- Five market tabs: EU, US, Great Britain and Canada have dated official-source topic reviews; Japan is an explicitly unverified draft. Commodity-specific clearance is not asserted. See `quality-source-review.md`.
- Five document choices, product, target market and optional selected certification topic feed the existing inquiry. The closing CTA submits the same selection form; there is no duplicate contact form.

## Actual checks

`npm run typecheck` and `npm run build` passed. Browser automation used the exported site and the installed Playwright CLI, with desktop viewport 1440×1000 plus 1920px, 900px and 390px responsive checks.

`scripts/review-quality.js` checked:

- Product and market tabs by click and Arrow/Home/End keys; inactive panels inert; stable panel height.
- All certification detail fields and request actions, all product-document expand/collapse controls.
- Product/document required selection, all five document types together, EU/US/GB/Canada handoffs and individual certificate topic preservation.
- Existing inquiry product/category/document/market/source prefill; editable optional fields, removal and preview feedback explicitly saying not sent.
- Incoming detail-page context; group-specific request clears an incompatible product; unknown query values ignored and repeated document types deduplicated.
- Shared navigation and page entries; mobile navigation and mobile request-to-inquiry interaction.
- No horizontal overflow at checked widths; visible text at normal opacity; reduced-motion content and interaction.
- Private Label still has one six-step workflow; its title is neither faded nor clipped after entry animation.
- No browser page errors and no unsupported download button.

Browser QA found and fixed one issue: Tailwind's important `[hidden]` rule removed inactive panels from layout, causing market tabs to change page height. The component now uses visibility with `aria-hidden` and `inert`, preserving the tallest panel's space while keeping inactive content out of interaction and accessibility navigation. No global style override or animation library was added.

Machine-readable Quality results: `quality-qa-results.json`. Product regression results: `quality-product-regression-results.json`.

## Actual screenshots

Captured at browser 100% scale with fonts/images ready and settled transitions. Files are local review artifacts, not public-site assets.

- [Desktop, complete page](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-desktop-full.png)
- [Desktop, title and certifications](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-desktop-top.png)
- [Desktop, product documentation](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-desktop-documents.png)
- [Desktop, market guide](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-desktop-markets.png)
- [Desktop, request selector](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-desktop-request.png)
- [Inquiry prefill](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-inquiry-prefill.png)
- [Mobile, complete page](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-mobile-full.png)
- [Mobile, title](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-mobile-top.png)
- [Mobile, documentation](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-mobile-documents.png)
- [Mobile, request](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-mobile-request.png)
- [Mobile, inquiry prefill](C:/Users/XuWanPi/Pictures/Screenshots/FRUNORIA-quality/quality-mobile-prefill.png)

## Evidence still pending

1. HACCP / ISO 22000 / BRCGS / FSSC 22000: actual holder, production site and product/process scope, validity and issuer verification, FRUNORIA relationship, original copies and sharing permission.
2. Product records: actual specifications, botanical/ingredient declarations, lot-linked COAs and test scope; traceability, packaging/storage and cold-chain evidence where relevant.
3. Market records: product/origin/intended-use/importer mapping, current conditional listings and commodity-specific requirements. Japan and other unreviewed report markets remain drafts.

The working page is **已检查**; the above evidence stays **待资料确认**. Applications, About/Contact, Resources and launch preparation are recorded in `site-roadmap.md` and have not been advanced. Stop for user page acceptance.
