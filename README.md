# FRUNORIA website preview

English B2B ingredient sourcing website for the FRUNORIA brand. Built with Next.js, TypeScript and Tailwind CSS. FRUNORIA is a public-facing brand; its legal operator has not been confirmed for website publication.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. The homepage includes selectable application scenes, an editable packaging brief, expandable documentation topics and development-only Resources drafts. The inquiry form validates in the browser and previews details; it does not send data. Run `npm run typecheck` and `npm run build` before reviewing changes.

Product claims, sources and image limitations are tracked in local `docs/source-map.md` and `docs/missing-content.md`. These internal notes and local backups are excluded from the public repository.

## Public development preview

The GitHub Pages build is a development preview. Product and application imagery is illustrative, product specifications and certification scope require documentary confirmation, and the inquiry form only previews a draft. It does not send messages. Search indexing is disabled. Internal research, source images, backups and missing-content notes stay outside the public repository.

Pushes to `main` build and deploy the static site to GitHub Pages. The previous brand version remains in Git history. `NEXT_PUBLIC_BASE_PATH=/huinong-food-website` remains the technical repository URL path; local development keeps root paths. Do not set a canonical URL or social image URL until the official domain is confirmed.
