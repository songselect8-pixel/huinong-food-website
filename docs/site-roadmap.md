# FRUNORIA site roadmap

Updated: 2026-10-04. This is the current development sequence; older design notes remain historical records.

## Fixed boundaries

Keep FRUNORIA, the wine / blueberry / warm-white / blush / ice palette, approved Home and Private Label structure, the Products grid and existing URLs. Develop in the current project. Inquiry remains a local preview. This Resources round is local-only: no email integration, remote push, publication or deployment. The deployment workflow remains manual-only.

Status vocabulary: **未开始**, **开发中**, **已完成开发**, **已检查功能**, **待视觉验收**, **待资料确认**. Code completion, actual interaction checks, visual acceptance and evidence verification are separate. A working page does not verify business claims or authorize publication.

| Order | Stage | Development | Functional checks | Visual acceptance | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Product details and new imagery | 已完成开发 — nine routes, 27 product and five range concepts | 已检查功能 — nine galleries, catalogue and quote handoff; regression checked this round | 待视觉验收 — retain prior review artifacts | 待资料确认 — actual identity, specifications, handling, lot imagery and supporting records |
| 2 | Quality & Compliance | 已完成开发 — one canonical `/quality` | 已检查功能 — document/market tabs, requests and shared inquiry; regression checked this round | 待视觉验收 — previous complete desktop/mobile screenshots preserved | 待资料确认 — certificate holder/scope/validity/permissions, actual reports and project-specific market pathway |
| 3 | Applications | 已完成开发 — overview, four detail routes, nine independent application concepts | 已检查功能 — links, FAQs, product selection, optional requirements and inquiry; desktop/mobile and reduced motion | 待视觉验收 — screenshots in the Applications delivery | 待资料确认 — actual-use suitability, processing, packing and supporting document scope |
| 4 | About and Contact / Inquiry | 已完成开发 — /about, /contact, three new concepts and one shared in-memory inquiry | 已检查功能 — four source flows, all nine product prefills, validation, preview/edit, desktop/mobile and reduced motion | 待视觉验收 — complete desktop/mobile screenshots prepared | 待资料确认 — legal operator and brand/source relationship; approved contact channels; formal privacy terms and any future delivery channel |
| 5 | Resources and buying guides | 已完成开发 — /resources + six full drafts, 12 independent images, shared inquiry and draft-export gate | 已检查功能 — search/category/reset, six routes, TOC, links, inquiry, template copy, mobile and reduced motion; production leakage audit | 待视觉验收 — list desktop/mobile, two full guides, Home entries | 待内容审核 / 待资料确认 — source review recorded; actual specifications, packaging and certificate relationships unchanged; 未授权发布 |
| 6 | Whole-site acceptance and launch preparation | 未开始 | 未开始 | 未开始 | 待资料确认 — page acceptance, legal/privacy, verified claims, domain/contacts and explicit launch authorization |

## Applications: delivered for review

Routes: `/applications`, `/applications/tea-infusion-blends`, `/applications/beverage-garnishes`, `/applications/bakery-fruit-preparations`, `/applications/dairy-frozen-desserts`.

Each detail has distinct ingredient forms, existing product links, procurement considerations, packing/quality links, four FAQs and an application-aware inquiry brief. Nine original scenes are separate from all product, Home and Private Label imagery; related product cards use the approved product main images for identification only. See `docs/applications-review.md` and the image manifest.

Actual use suitability and preparation guidance still require evidence. Neither an application scene nor a completed UI verifies ready-to-eat suitability, a formula, processing capability or certificate coverage.

## Resources: six complete local drafts

| Guide | Path below /resources | Words | Category |
| --- | --- | ---: | --- |
| Frozen vs. Freeze-Dried Berries: A Buyer’s Guide | /frozen-vs-freeze-dried-berries | 1055 | Ingredient Guides |
| IQF Raspberry Grades: Whole, Whole & Broken, and Crumble | /iqf-raspberry-grades | 1065 | Ingredient Guides |
| How to Specify IQF Frozen Blueberries for a Bulk Order | /specifying-iqf-frozen-blueberries | 1090 | Ingredient Guides |
| Raspberry Leaf Tea: Botanical Identity, Cut Size and Sourcing Questions | /raspberry-leaf-tea-sourcing | 1149 | Ingredient Guides |
| Private Label Tea & Dried Fruit Packaging: A Buyer’s Planning Guide | /private-label-tea-packaging | 1077 | Private Label & Packaging |
| What to Include in a Fruit & Botanical Ingredient Sourcing Inquiry | /ingredient-sourcing-inquiry | 1238 | Sourcing & Documentation |

All six: development complete; functionality checked; visual acceptance pending; editorial/technical review pending; publication not authorized. Author/reviewer/published date remain null. Word counts include lead, body headings, tables/checklists and editable template, excluding references/navigation/URLs. Evidence and outstanding questions: `resources-content-review.json`, `resources-source-review.md`. Images: `resource-image-manifest.json`.

Default production export omits every unapproved article's body, title, route and images. The local preview is explicitly built to `out-preview` and served only on 127.0.0.1. No new product, company history, contact channel or certificate ownership claim was added. No public content API or formal sitemap exists; domain-dependent indexing checks remain future work.

## Stop point

This round ends after Resources and six complete drafts are delivered for review. Stop before whole-site acceptance or launch preparation. Keep pending content, certificate, specification and market evidence separate from completed development. Do not publish, push or deploy.

## About + Contact delivery — 2026-10-04

About provides the five product directions, three project-discussion priorities and intended customer types. Contact and the homepage share one form with Product Inquiry, Private Label Project and Quality Documents modes. Only Name, Email and Message are required. A root in-memory draft preserves contact/message content during client navigation while incoming sourcing contexts are separately validated and editable. No personal data is stored in URLs or persistent browser storage; preview sends nothing. Refresh clears the draft.

Three new independent Illustrative Concepts are recorded in `docs/about-contact-image-manifest.json`. See `docs/about-contact-review.md` and `docs/about-contact-qa-results.json` for the current checks and screenshots. Original product/application imagery and Quality evidence statuses are unchanged.
