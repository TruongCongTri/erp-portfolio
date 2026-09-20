// import { routes, siteConfig } from "@/lib/site";
// import { spaces, spaceHref } from "@/data/spaces";
// import { jobs, jobHref } from "@/data/jobs";
// import { reviews, reviewHref } from "@/data/reviews";

// const detailRoutes = [
//   ...spaces.map((space) => ({ path: spaceHref(space), priority: 0.7 })),
//   ...jobs.map((job) => ({ path: jobHref(job), priority: 0.6 })),
//   ...reviews.map((review) => ({ path: reviewHref(review), priority: 0.5 })),
// ];

// export default function sitemap() {
//   const lastModified = new Date();
//   return [...routes, ...detailRoutes].map(({ path, priority }) => ({
//     url: `${siteConfig.url}${path === "/" ? "" : path}`,
//     lastModified,
//     changeFrequency: "monthly",
//     priority,
//   }));
// }
import { localizePath, neutralPath } from "@/i18n";
import { siteConfig } from "@/lib/site";
import { spaces, spaceHref } from "@/data/spaces";
import { jobs, jobHref } from "@/data/jobs";
import { reviews, reviewHref } from "@/data/reviews";

// Required by Next.js when building with output: 'export'
export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = siteConfig?.url?.replace(/\/$/, "") || "";
  const lastModified = new Date();

  // All static routes from src/app
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/gioi-thieu", priority: 0.8, changeFrequency: "monthly" },
    { path: "/du-an", priority: 0.8, changeFrequency: "weekly" },
    { path: "/thu-vien", priority: 0.8, changeFrequency: "monthly" },
    { path: "/danh-gia", priority: 0.7, changeFrequency: "weekly" },
    { path: "/tuyen-dung", priority: 0.7, changeFrequency: "weekly" },
    { path: "/lien-he", priority: 0.7, changeFrequency: "monthly" },
  ];

  // Dynamic detail routes for spaces/[id], hiring/[id], and reviews/[id]
  const detailRoutes = [
    ...spaces.map((space) => ({
      path: neutralPath(spaceHref(space)),
      priority: 0.7,
      changeFrequency: "weekly",
    })),
    ...jobs.map((job) => ({
      path: neutralPath(jobHref(job)),
      priority: 0.6,
      changeFrequency: "weekly",
    })),
    ...reviews.map((review) => ({
      path: neutralPath(reviewHref(review)),
      priority: 0.5,
      changeFrequency: "monthly",
    })),
  ];

  // Every page exists under both locales ("/vi/…" and "/en/…"); each entry
  // lists both so search engines can pair them (hreflang).
  const withLanguages = (path) => ({
    vi: `${baseUrl}${localizePath("vi", path || "/")}`,
    en: `${baseUrl}${localizePath("en", path || "/")}`,
    "x-default": `${baseUrl}/`,
  });

  return [...staticRoutes, ...detailRoutes].flatMap(
    ({ path, priority, changeFrequency }) =>
      ["vi", "en"].map((lang) => ({
        url: withLanguages(path)[lang],
        lastModified,
        changeFrequency,
        priority: lang === "vi" ? priority : Math.round(priority * 9) / 10,
        alternates: { languages: withLanguages(path) },
      })),
  );
}
