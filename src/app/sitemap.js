import { routes, siteConfig } from "@/lib/site";
import { spaces, spaceHref } from "@/data/spaces";
import { jobs, jobHref } from "@/data/jobs";
import { reviews, reviewHref } from "@/data/reviews";

const detailRoutes = [
  ...spaces.map((space) => ({ path: spaceHref(space), priority: 0.7 })),
  ...jobs.map((job) => ({ path: jobHref(job), priority: 0.6 })),
  ...reviews.map((review) => ({ path: reviewHref(review), priority: 0.5 })),
];

export default function sitemap() {
  const lastModified = new Date();
  return [...routes, ...detailRoutes].map(({ path, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
