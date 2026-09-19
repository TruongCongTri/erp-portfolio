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
    { path: "/studio", priority: 0.8, changeFrequency: "monthly" },
    { path: "/spaces", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blueprints", priority: 0.8, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
    { path: "/hiring", priority: 0.7, changeFrequency: "weekly" },
    { path: "/connect", priority: 0.7, changeFrequency: "monthly" },
  ];

  // Dynamic detail routes for spaces/[id], hiring/[id], and reviews/[id]
  const detailRoutes = [
    ...spaces.map((space) => ({
      path: spaceHref(space),
      priority: 0.7,
      changeFrequency: "weekly",
    })),
    ...jobs.map((job) => ({
      path: jobHref(job),
      priority: 0.6,
      changeFrequency: "weekly",
    })),
    ...reviews.map((review) => ({
      path: reviewHref(review),
      priority: 0.5,
      changeFrequency: "monthly",
    })),
  ];

  return [...staticRoutes, ...detailRoutes].map(
    ({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );
}
