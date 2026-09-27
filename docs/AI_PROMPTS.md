# Terrene — AI Prompts

Copy a prompt into Claude Code (or any coding agent) from the repo root and fill in the `<…>` placeholders.
Each prompt points the agent at [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md), so keep that file up to date.

Archived copy: https://claude.ai/code/artifact/5cc2b85e-8f5e-4f9c-aa59-9f20181ff821
Development guide archive: https://claude.ai/code/artifact/23ec0c47-ddd4-479b-a216-7fb47d24ef01

| # | Task | Guide section |
| --- | --- | --- |
| 1 | New route | 2. Designing a new route |
| 2 | New component | 3. Designing a new component |
| 3 | Works API | 4. API integration: works |
| 4 | Reviews API | 5. API integration: reviews |
| 5 | Job posts + job submit API | 6. API integration: job posts + job submit |
| 6 | Contact submit API | 7. API integration: contact submit |

---

## 1. New route

```text
Read docs/DEVELOPMENT_GUIDE.md (section "Designing a new route") and follow it exactly.

Add a new page at /<slug> (e.g. /khuyen-mai) for both locales.
- Purpose: <one sentence on what the page is for>
- Sections, top to bottom: <hero with title + intro, card grid of X, CTA to /lien-he, ...>
- Needs a detail page /<slug>/[id]: <yes/no>
- Menu placement: <Nav main links / service links / footer only / none>

Requirements:
- Thin src/app/[locale]/<slug>/page.jsx with dynamicParams = false and generateStaticParams = localeParams.
- A View in src/views/<Name>View.jsx exporting <name>Metadata(lang) built with pageMetadata and a language-neutral path.
- All UI text in BOTH src/i18n/vi.json and src/i18n/en.json (Vietnamese is the source; write natural English).
- Page styles in src/styles/<slug>.css using the --base-* tokens; reuse Nav, Footer, Copy, CTAWindow where they fit.
- Add the route to Nav.jsx / Footer.jsx as requested, to staticRoutes in src/app/sitemap.js and to routes in src/lib/site.js.
- Run npm run build and confirm out/vi/<slug>.html and out/en/<slug>.html exist. Report anything you could not verify.
```

## 2. New component

```text
Read docs/DEVELOPMENT_GUIDE.md (section "Designing a new component") and follow it.

Create a component <Name> in src/components/<Name>/ (<Name>.jsx + <Name>.css).
- What it shows: <description; attach a screenshot or Figma link if available>
- Props: <e.g. title: string, items: [{ id, href, image, name, subtitle }]>
- Interaction/animation: <none / hover / GSAP scroll reveal / slider>
- Used on: <View file(s)>

Requirements:
- Server component by default; if it needs state, effects or GSAP, put only that part in a "use client" sibling (<Name>Motion.jsx), like FeaturedProjects.
- No hard-coded UI text: dictionary keys in vi.json and en.json; Vietnamese content data wrapped in <DataText>.
- Classes scoped under .<kebab-name>, colours from --base-* tokens, a max-width: 1000px mobile block.
- Use TransitionLink for already-localized hrefs and LocalizedLink for neutral paths.
- Wire it into <View> and verify on /vi and /en, desktop and ~390px wide, and after a client-side route change.
```

## 3. Works API

```text
Read docs/DEVELOPMENT_GUIDE.md (sections "Step 0 — shared API client" and "API integration: works").

Integrate the works (projects) API. The site is a static export, so fetch at BUILD time.
- Endpoint: GET <API_URL>/works  (detail: <GET /works/{id} or "included in list">)
- Sample response: <paste one JSON record>

Do:
1. Create src/lib/api.js (apiGet, apiPost) if it does not exist; read API_URL / NEXT_PUBLIC_API_URL.
2. In src/data/spaces.js add fromApi(record) mapping to the existing space shape, plus cached loadSpaces() and loadSpaceById(id). Keep the local spaces array as a seed.
3. Make SpacesView, spaceParams, spaceMetadata, SpaceDetailView in src/views/collections.jsx async and use the loaders.
4. Make generateStaticParams in src/app/[locale]/du-an/[id]/page.jsx async; make src/app/sitemap.js async and use loadSpaces().
5. Add .env.example with API_URL and NEXT_PUBLIC_API_URL.
6. Run npm run build and list which /du-an/<id> pages were generated. Show me the diff before committing.
```

## 4. Reviews API

```text
Read docs/DEVELOPMENT_GUIDE.md ("Step 0 — shared API client" and "API integration: reviews").

Integrate the reviews API at build time.
- Endpoint: GET <API_URL>/reviews
- Sample response: <paste one JSON record>

Do:
1. Reuse src/lib/api.js (create it per Step 0 if missing).
2. In src/data/reviews.js add fromApi -> { id, name, title, image, avatar, review }, cached loadReviews() and loadReviewById(id).
3. Make ReviewsView, reviewParams, reviewMetadata, ReviewDetailView async in src/views/collections.jsx; update src/app/[locale]/danh-gia/[id]/page.jsx and the sitemap.
4. HomeView: make it async, load reviews and pass them as a prop to <ClientReviews reviews={reviews} />. In ClientReviews.jsx remove the direct @/data/reviews import, use the prop, and return null when the list is empty.
5. Build and confirm the home slider, /vi/danh-gia and every /vi/danh-gia/<id> render.
```

## 5. Job posts + job submit API

```text
Read docs/DEVELOPMENT_GUIDE.md ("Step 0" and "API integration: job posts + job submit").

Part A — job posts (build time)
- Endpoint: GET <API_URL>/jobs ; sample record: <paste JSON>
- In src/data/jobs.js add fromApi, cached loadJobs() (drop jobs whose validThrough is past) and loadJobById(id).
- Make HiringView, jobParams, jobMetadata, JobDetailView async; update src/app/[locale]/tuyen-dung/[id]/page.jsx and the sitemap. Keep the JobPosting JSON-LD working.

Part B — application submit (runs in the browser)
- Endpoint: POST <API_URL>/jobs/{jobId}/applications (open application: POST <API_URL>/applications)
- Multipart fields: name, email, phone, profile, jobTitle, lang, cv (<= 5 MB, .pdf/.doc/.docx)
- Error response: 422 { errors: { field: message } }
- In src/app/actions/apply.js replace the TODO with a FormData POST via apiPost, after the existing validation. Keep the return shape { status, message, errors, submittedAt }. Map 422 field errors to inline errors; network/5xx -> t.sendFailed.
- Replace the synchronous getJobById use so it works with API data (the backend re-validates the job id).
- Add form.sendFailed to vi.json and en.json, and a hidden honeypot field to ApplicationForm.jsx.
- Test: valid 4 MB PDF, 6 MB file, wrong extension, API offline. Report results.
```

## 6. Contact submit API

```text
Read docs/DEVELOPMENT_GUIDE.md ("Step 0" and "API integration: contact submit").

Wire the contact form on /lien-he to the backend.
- Endpoint: POST <API_URL>/contact  (or a form service URL: <Formspree/Basin endpoint>)
- Fields: name, email, phone, subject, message, lang
- Error response: 422 { errors: { field: message } }

Do:
1. In src/app/actions/contact.js, after validation, POST the fields as FormData with apiPost. Keep the return shape used by useFormAction.
2. On failure return status "error" with t.sendFailed (add it to vi.json/en.json if missing) and any field errors from the API.
3. Add a hidden honeypot input to ContactForm.jsx and ignore submits where it is filled.
4. Do not change ContactForm's fields, validation or styling.
5. Test on /vi/lien-he and /en/lien-he: success toast + reset, short message error, API offline error.
```
