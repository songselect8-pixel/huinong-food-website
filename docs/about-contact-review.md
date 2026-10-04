# About + Contact development review

Date: 2026-10-04. Branch: `codex/about-contact`. Rollback baseline: `9882151` on local `main`.

## Scope and status

- **已完成开发**: `/about`, `/contact`, three independent new images, canonical shared inquiry, navigation/Home/footer entry updates.
- **已检查功能**: 1440, 1920, 900 and 390 px layouts; four inquiry origins; all nine product IDs; validation, editing, preview, clearing, keyboard, mobile and reduced motion. See `about-contact-qa-results.json` and the final targeted check.
- **待视觉验收**: both page designs and the three concepts await user review.
- **待资料确认**: operator/brand/source relationships, approved contact channels and formal privacy information. Product specifications, certificate relationships and market evidence retain their previous pending states.

Home, Products, Private Label, Quality and Applications keep their approved visuals. Their links now use client navigation to preserve the in-memory draft. No old product or application images were regenerated or modified. No Resources articles were created.

## Pages

`/about` presents an editorial introduction, a separate full-width ingredient concept, a compact five-range directory, three project-discussion priorities and intended customer types. No history, facilities, client records, production figures or new certification claims are presented. All five range links use existing catalogue filters; raspberry leaf remains in the botanical category.

`/contact` places the brief and new concept beside the existing form, upgraded to three inquiry types. Name, Email and Message are required. Company and Country / Region are optional. The homepage uses the same component, validation and data model.

## Inquiry model and checks

| Origin | Carried information | Result |
| --- | --- | --- |
| Nine product details | Product name/ID, validated form, category and source | Checked for all nine; selection and return/re-entry checked |
| Private Label / homepage packaging planner | Inquiry type, direction, packaging, project requirements; editable quantity/unit/timing | Checked; homepage and Contact share the draft |
| Quality | Product, market, multiple document types, certification topic and source | Checked; invalid topics ignored, certification dependency clears |
| Applications | Application, optional related product, packaging/document notes and source | Checked; free-text notes passed in memory, not URLs |

New incoming sourcing information does not replace Name, Email, Company, Country or Message. A visible notice explains the update. Customers can edit or remove sourcing fields, clear the draft, inspect the full preview and return to edit. Re-entering the same product link preserves the edited brief. Switching product context clears obsolete product-specific requirements.

Contact information is held only by the root React provider. No localStorage, sessionStorage, form POST, delivery API, automated response or marketing integration is used. Normal client navigation and browser back retain the open-session draft. Reloading, closing the page or following a full-document/new-tab navigation starts a new in-memory session. This limitation is stated beside the form.

No personal fixture values appear in delivery screenshots. QA uses synthetic values; the result JSON reports outcomes only. URL parsing ignores personal field parameters and validates product, form, application, document and certification identifiers. Existing homepage query links remain supported.

## Images

All are new built-in imagegen photographs, individually generated and marked **Illustrative Concept** in webpage text. Natural colours are unchanged. Format conversion only; no crop, recolouring or compositing. Prompts, original paths, dimensions and hashes: `about-contact-image-manifest.json`.

| File under `public/images/about-contact/v1/` | Page / placement | Size |
| --- | --- | --- |
| `about-brand.webp` | About wide brand ingredient visual | 1672 × 941, approximately 16:9 |
| `about-selection.webp` | About project approach / ingredient selection | 1448 × 1086, 4:3 |
| `contact-project.webp` | Contact left sidebar | 1448 × 1086, 4:3 |

Original PNG copies remain in ignored `assets/originals/about-contact-v1/`. No original material was overwritten. These are not actual premises, client projects or supply-capability evidence.

## Browser/build findings

- `npm run typecheck`: passed.
- `npm run build`: passed, 24 static pages including the two new routes.
- `scripts/review-about-contact.js`: current canonical inquiry regression; passed with zero page errors, HTTP failures or mutating network requests. GET/HEAD navigation probes are read-only, not inquiry submissions.
- `scripts/review-inquiry-final.js`: targeted final check for retained fields across types, mobile preview/edit and the four application handoffs.
- Older review scripts record the earlier homepage-only form UI; their original results remain historical. The new canonical regression covers the changed inquiry contract.
- Next 16.3.6 static export on Windows wrote nested segment paths while its client requests dot-separated names. `scripts/normalize-static-segments.cjs` adds content-identical aliases after build; browser prefetch 404s are resolved without changing Next itself. On correctly flattened exports it is a no-op.

## Screenshot files

Under `output/playwright/about-contact/`:

- `about-desktop-full.png`, `about-desktop-top.png`
- `contact-desktop-full.png`, `contact-desktop-top.png`
- `about-mobile-full.png`, `about-mobile-top.png`
- `contact-mobile-full.png`, `contact-mobile-top.png`
- `contact-mobile-documents.png`, `contact-prefill-desktop.png`

Desktop captures: 1440 × 1000 viewport. Mobile captures: 390 × 844 viewport. Images/fonts loaded before capture; the new pages have no entrance animation that delays text visibility.

## Remaining confirmations

1. Actual website operator and its relationship to FRUNORIA, historical companies, suppliers and production locations.
2. Approved public email, phone, physical address, WhatsApp/social accounts and eventual domain. All currently unconfirmed channels remain hidden; no map or invented address is shown.
3. Formal privacy text and responsible entity. Any future delivery service, recipients/processors, retention, rights-contact route and consent requirements must match the implemented data handling before activation.
4. Previous product identity/specification, certificate holder/scope/file permission and target-market research backlogs remain open.

This round ends at About + Contact local delivery. No remote push, email integration or deployment.
