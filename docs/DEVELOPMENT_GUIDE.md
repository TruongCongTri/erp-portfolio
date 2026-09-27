# Terrene — Development Guide

Handover guide for building new routes and components and for connecting the site to a backend API (works, reviews, job posts + applications, contact).
Copy-paste prompts for AI coding agents live in [AI_PROMPTS.md](./AI_PROMPTS.md).

Archived copy: https://claude.ai/code/artifact/23ec0c47-ddd4-479b-a216-7fb47d24ef01

---

## 1. Project overview

Terrene is the Chính Nam website: Next.js 15 (App Router) + React 19, built as a **static export** (`output: "export"` in `next.config.mjs`). There is no server at runtime, so every page, including every detail page, is generated at build time, and form "actions" run in the browser.

| Layer | Location | Role |
| --- | --- | --- |
| Route files | `src/app/[locale]/<slug>/page.jsx` | Thin: static params, metadata, render a View |
| Views | `src/views/*View.jsx`, `src/views/collections.jsx` | Page composition, metadata builders |
| Components | `src/components/<Name>/<Name>.jsx` + `.css` | UI blocks, one folder each |
| Data | `src/data/spaces.js`, `reviews.js`, `jobs.js` | Content arrays + `href`, `getById`, `toListItem`, `toDetail` adapters |
| Form actions | `src/app/actions/apply.js`, `contact.js` | Validate, deliver, return toast state |
| Shared libs | `src/lib/site.js`, `validation.js`, `collections.jsx`, `motion.js` | `pageMetadata`, validation, next-item CTA, GSAP helpers |
| i18n | `src/i18n/vi.json`, `en.json`, `index.js`, `client.js` | UI text per locale; `getDictionary`, `localizePath`, `useI18n` |

Conventions to keep:

- **Two locales, one tree.** Every page lives under `/[locale]` (`vi`, `en`). URLs are Vietnamese slugs (`/du-an`, `/danh-gia`, `/tuyen-dung`, `/lien-he`).
- **UI text is never hard-coded.** It comes from `getDictionary(lang)` on the server or `useI18n()` in client components. Content data (projects, jobs, reviews) stays Vietnamese and is machine-translated on `/en` pages; wrap it in `<DataText>`.
- **Server by default.** Add `"use client"` only to the smallest leaf that needs state, effects or GSAP.
- **Import alias** `@/` = `src/`.
- **"Works" = projects** in code: `spaces` data, `/du-an` route, `SpacesView` / `SpaceDetailView`.

---

## 2. Designing a new route

A route is three pieces: a thin `page.jsx`, a View that builds the page, and dictionary text in both locales. The example adds `/khuyen-mai` (Promotions).

1. **Pick the slug.** Vietnamese, lowercase, hyphenated, no diacritics (`/khuyen-mai`). The same slug serves both `/vi/khuyen-mai` and `/en/khuyen-mai`.
2. **Add dictionary text** to *both* `src/i18n/vi.json` and `src/i18n/en.json`:
    - `meta.promoTitle`, `meta.promoDescription` for SEO
    - `nav.promo` if it appears in menus
    - a page namespace, e.g. `"promo": { "titleLine1": "…", "intro": "…" }`
3. **Create the View** `src/views/PromoView.jsx`, exporting a metadata builder and the page component:

```jsx
import "@/styles/promo.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function promoMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.promoTitle,
    description: t.promoDescription,
    path: "/khuyen-mai",
  });
}

export default function PromoView({ lang }) {
  const t = getDictionary(lang).promo;
  return (
    <>
      <Nav />
      <div className="page promo">
        <section className="promo-hero">
          <div className="container">
            <Copy delay={0.85}>
              <h1>{t.titleLine1}</h1>
            </Copy>
          </div>
        </section>
      </div>
      <Footer lang={lang} />
    </>
  );
}
```

4. **Create the route file** `src/app/[locale]/khuyen-mai/page.jsx` (a copy of any existing one):

```jsx
import PromoView, { promoMetadata } from "@/views/PromoView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;
export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return promoMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <PromoView lang={(await params).locale} />;
}
```

5. **Detail route (optional)** `src/app/[locale]/khuyen-mai/[id]/page.jsx`: `generateStaticParams = () => withLocales(promoParams())`, where `promoParams()` returns `[{ id: "1" }, …]`. Call `notFound()` in the View when the id is missing. Follow the `du-an/[id]` pattern in `src/views/collections.jsx`.
6. **Page styles** go in `src/styles/promo.css`, imported at the top of the View. Use the `--base-*` tokens from `globals.css`; prefix classes with the page name.
7. **Link it.** Add `{ path: "/khuyen-mai", label: t.nav.promo }` to the link arrays in `Nav.jsx` and `Footer.jsx`. Those paths are localized for you; never write `/vi/` by hand.
8. **Sitemap.** Add `{ path: "/khuyen-mai", priority: 0.7, changeFrequency: "monthly" }` to `staticRoutes` in `src/app/sitemap.js` (and to `routes` in `src/lib/site.js`).
9. **Verify.** `npm run build`, then check that `out/vi/khuyen-mai.html` and `out/en/khuyen-mai.html` exist, the `<title>` is right, and the language switcher keeps you on the page.

Checklist: both JSON files updated · `dynamicParams = false` · metadata `path` is language-neutral · no hard-coded UI text · build passes.

---

## 3. Designing a new component

A component is one folder, `src/components/<Name>/`, holding `<Name>.jsx` and `<Name>.css`. Keep it a server component unless it needs state, effects or GSAP; then split off a small client part (see `FeaturedProjects.jsx` + `FeaturedProjectsMotion.jsx`, `ApplyForm.jsx` + `ApplicationForm.jsx`).

1. **Decide server or client.**
    - Static markup, text from props or the dictionary → server component; takes `lang` as a prop and uses `getDictionary(lang)`.
    - Needs `useState`, `useEffect`, refs, GSAP, or `window` → add `"use client"` at the top and read text with `useI18n()` from `@/i18n/client`.
2. **Create the folder and files** `src/components/PromoGrid/PromoGrid.jsx` + `PromoGrid.css`. Import the CSS in the component: `import "./PromoGrid.css";`.
3. **Define props from data, not layout.** Take plain objects (`items`, `title`) so the same component can be fed by local data today and API data later. Follow the list-item shape `{ id, href, image, date, name, subtitle, meta }` used by `ListingPage`.
4. **Write the markup.**

```jsx
import "./PromoGrid.css";

import Copy from "../Copy/Copy";
import DataText from "../Language/DataText";
// item.href is already localized ("/vi/...") by the data adapters, so use
// TransitionLink; LocalizedLink is for neutral paths like "/du-an".
import TransitionLink from "../TransitionLink/TransitionLink";

// Card grid for promotions. Card text is Vietnamese data, so it is marked
// translatable for the English pages.
export default function PromoGrid({ title, items }) {
  return (
    <section className="promo-grid">
      <div className="container">
        <Copy delay={0.1}>
          <h2>{title}</h2>
        </Copy>
        <ul className="promo-grid-list">
          {items.map((item) => (
            <li key={item.id} className="promo-grid-card">
              <TransitionLink href={item.href}>
                <img src={item.image} alt={item.name} />
                <DataText as="p">{item.name}</DataText>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

5. **Style it.** Scope every class under the root (`.promo-grid …`). Use `var(--base-100)` … `var(--base-500)` for colour and `rem` units. Add a `@media (max-width: 1000px)` block for mobile, matching other components.
6. **Animation.** For text reveals, wrap headings in `<Copy>`; `MotionRuntime` animates them globally. For custom GSAP, use a client `*Motion.jsx` sibling with `useGSAP` from `@gsap/react` and clean up ScrollTriggers on unmount.
7. **Text.** Fixed labels → dictionary keys in both `vi.json` and `en.json`. Content data → `<DataText>`. Brand names inside translated regions → `translate="no"`.
8. **Use it** in a View: `<PromoGrid title={t.promo.gridTitle} items={items} />`.
9. **Verify** on `/vi/…` and `/en/…`, desktop and ~390 px mobile, and after a client-side route change (GSAP must not leave stale pins).

---

## 4. API integration: works (projects)

Fetch works **at build time** and map each API record into the shape `src/data/spaces.js` already uses; the list, detail, metadata and sitemap code then barely changes. Because the site is a static export, new or edited works appear only after a rebuild, so have the CMS/backend trigger a deploy webhook on publish.

Endpoint names below (`GET /works`, …) are placeholders; replace them with the real backend contract.

### Step 0 — shared API client (do once, reused by every section)

1. Add env vars in `.env.local` and at the hosting provider:
    - `API_URL=https://api.example.com` — read at build time (server only)
    - `NEXT_PUBLIC_API_URL=https://api.example.com` — inlined into the browser bundle, used by form submits
2. Create `src/lib/api.js`:

```js
// Thin fetch wrapper for the content API. Build-time reads use API_URL;
// browser submits (forms) use NEXT_PUBLIC_API_URL.
const BASE = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/json" },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    body, // FormData: the browser sets the multipart boundary
    headers: { Accept: "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
```

3. Fail the build on API errors (an error thrown in `generateStaticParams` stops `next build`), so a broken API never ships an empty site. If you prefer a soft fallback, catch and return the local array.

### Steps for works

1. **Add a mapper + loader** at the bottom of `src/data/spaces.js`. Keep `spaces` as the local fallback/seed.

```js
import { apiGet } from "@/lib/api";

// API record -> the local shape used by toSpaceListItem / toSpaceDetail.
const fromApi = (w) => ({
  id: w.id,
  categories: w.categories ?? [],
  image: w.coverImage,
  date: w.completedAt,
  name: w.title,
  location: w.location,
  clientImage: w.client?.avatar,
  clientName: w.client?.name,
  detail: w.detail, // same { heroImage, intro, meta, sections } structure
});

// One request per build worker, shared by params, metadata and views.
let cache;
export const loadSpaces = () =>
  (cache ??= apiGet("/works").then((list) => list.map(fromApi)));

export const loadSpaceById = async (id) =>
  (await loadSpaces()).find((s) => String(s.id) === String(id)) ?? null;
```

2. **Make the collection functions async** in `src/views/collections.jsx`: `SpacesView`, `spaceParams`, `spaceMetadata`, `SpaceDetailView` each `await loadSpaces()` / `loadSpaceById(id)` instead of the imported `spaces` / `getSpaceById`. `getNext(list, item)` keeps working because the cached list returns the same object references.
3. **Update the detail route** `src/app/[locale]/du-an/[id]/page.jsx`: `export const generateStaticParams = async () => withLocales(await spaceParams());`.
4. **Update the sitemap** `src/app/sitemap.js`: make `sitemap` `async` and use `await loadSpaces()`.
5. **Images.** If the API returns absolute image URLs on another domain, plain `<img>` tags already work (images are `unoptimized`). Keep hero images ≥ 1600 px wide.
6. **Verify.** `npm run build` → every id from the API has `out/vi/du-an/<id>.html` and `out/en/du-an/<id>.html`; open one and check title, hero, meta rows and the next-project CTA.

---

## 5. API integration: reviews

Reviews follow the works pattern (build-time fetch + mapper), with one extra consumer: the home page slider `ClientReviews` is a client component that imports the `reviews` array directly, so it must receive reviews as a prop instead.

1. **Mapper + loader** at the bottom of `src/data/reviews.js` (placeholder endpoint `GET /reviews`):

```js
import { apiGet } from "@/lib/api";

const fromApi = (r) => ({
  id: r.id,
  name: r.clientName,
  title: r.projectTitle,
  image: r.image,
  avatar: r.avatar,
  review: r.body,
});

let cache;
export const loadReviews = () =>
  (cache ??= apiGet("/reviews").then((list) => list.map(fromApi)));

export const loadReviewById = async (id) =>
  (await loadReviews()).find((r) => String(r.id) === String(id)) ?? null;
```

2. **Collections.** In `src/views/collections.jsx` make `ReviewsView`, `reviewParams`, `reviewMetadata`, `ReviewDetailView` async and use the loaders.
3. **Detail route** `src/app/[locale]/danh-gia/[id]/page.jsx`: `generateStaticParams = async () => withLocales(await reviewParams())`.
4. **Home slider.**
    - `src/views/HomeView.jsx`: make `HomeView` async, `const reviews = await loadReviews();`, render `<ClientReviews reviews={reviews} />`.
    - `src/components/ClientReviews/ClientReviews.jsx`: remove the `@/data/reviews` import, accept `({ reviews })`, and rename `clientReviewsContent` to `reviews` throughout. Guard `reviews.length === 0` (return `null`) so an empty API response does not crash the width maths.
5. **Sitemap.** Use `await loadReviews()` in `src/app/sitemap.js`.
6. **Verify.** The home slider shows every API review and animates between them; `/vi/danh-gia` lists them; each `/vi/danh-gia/<id>` builds; the English pages machine-translate the review text.

---

## 6. API integration: job posts + job submit

Job posts are read at build time like works; job applications are sent from the browser with `fetch` + `FormData` (multipart, CV attached), because `src/app/actions/apply.js` runs client-side in the static export (`"use server"` is commented out). Keep the returned state shape `{ status, message, errors, submittedAt }`: `useFormAction` and `FormToast` depend on it.

### Job posts (read)

1. **Mapper + loader** in `src/data/jobs.js` (placeholder `GET /jobs`), same as works: `fromApi` maps to `{ id, categories, image, date, name, location, quantity, validThrough, detail }`, then `loadJobs()` and `loadJobById(id)`.
2. **Collections.** Make `HiringView`, `jobParams`, `jobMetadata`, `JobDetailView` async in `src/views/collections.jsx`. `jobPostingJsonLd(job)` needs no change if `detail` keeps the same structure.
3. **Route** `src/app/[locale]/tuyen-dung/[id]/page.jsx`: `generateStaticParams = async () => withLocales(await jobParams())`.
4. **Expired jobs.** Filter out jobs whose `validThrough` is in the past inside `loadJobs()` so they neither list nor build.

### Job submit (write)

1. **Backend contract** (confirm with the backend): `POST /jobs/{jobId}/applications` for a specific job, `POST /applications` for an open application. Multipart fields: `name`, `email`, `phone`, `profile`, `jobTitle`, `lang`, `cv` (≤ 5 MB, `.pdf/.doc/.docx`). Response `200 { ok: true }` or `422 { errors: { field: message } }`. CORS must allow the site origin.
2. **Replace the TODO** in `src/app/actions/apply.js` after validation:

```js
import { apiPost } from "@/lib/api";

// ...after `if (Object.keys(errors).length > 0) { ... }`
const body = new FormData();
for (const key of ["name", "email", "phone", "profile", "jobTitle", "lang"]) {
  body.append(key, values[key] ?? "");
}
body.append("cv", values.cv);

const path = values.jobId ? `/jobs/${values.jobId}/applications` : "/applications";
let result;
try {
  result = await apiPost(path, body);
} catch {
  result = { ok: false, status: 0, data: {} };
}
if (!result.ok) {
  return {
    status: "error",
    message: t.sendFailed,
    errors: result.data.errors ?? {},
    submittedAt: Date.now(),
  };
}
```

3. **Job lookup.** `getJobById` is synchronous and is used to fix `jobTitle` from trusted data. With API jobs, pass `jobTitle` from the page (already rendered from build data) or keep the job list loaded client-side; the backend must re-check the job id anyway.
4. **Dictionary.** Add `form.sendFailed` to `vi.json` ("Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.") and `en.json` ("Something went wrong. Please try again later.").
5. **Spam.** Add a hidden honeypot input (e.g. `name="website"`) to `ApplicationForm.jsx`; drop the submit silently when it is filled. Consider Cloudflare Turnstile or reCAPTCHA if the backend supports it.
6. **Verify.** Submit with a 4 MB PDF (success toast, form resets), a 6 MB file (inline CV error, no request), and with the API offline (error toast, typed values kept). Check the Network tab: one multipart `POST` with the correct fields.

---

## 7. API integration: contact submit

The contact form (`ContactForm.jsx` on `/lien-he`) already validates on the client and calls `submitContact` in `src/app/actions/contact.js`; only the delivery step is missing. Add one `POST` there and keep the return shape.

1. **Backend contract** (confirm): `POST /contact`, fields `name`, `email`, `phone`, `subject`, `message`, `lang`; response `200` or `422 { errors }`. JSON or multipart both work; multipart keeps it identical to the apply form.
2. **Replace the TODO** in `src/app/actions/contact.js`:

```js
import { apiPost } from "@/lib/api";

// ...after the validation early return
const body = new FormData();
for (const key of ["name", "email", "phone", "subject", "message", "lang"]) {
  body.append(key, values[key] ?? "");
}

let result;
try {
  result = await apiPost("/contact", body);
} catch {
  result = { ok: false, status: 0, data: {} };
}
if (!result.ok) {
  return {
    status: "error",
    message: t.sendFailed,
    errors: result.data.errors ?? {},
    submittedAt: Date.now(),
  };
}
```

3. **Dictionary.** Reuse `form.sendFailed` from the job-submit step.
4. **No backend yet?** A form service (Formspree, Basin, Getform) works as a drop-in: set the endpoint as `NEXT_PUBLIC_CONTACT_ENDPOINT` and post the same `FormData` to it with `Accept: application/json`.
5. **Spam.** Same honeypot as the apply form; rate-limit on the backend.
6. **Verify.** Valid submit → success toast with the visitor's name, form resets; message under 10 characters → inline error, no request; API down → error toast, text kept. Test on `/vi/lien-he` and `/en/lien-he` to confirm localized messages.
