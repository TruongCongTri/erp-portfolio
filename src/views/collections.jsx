// List and detail views for projects (/du-an), jobs (/tuyen-dung) and
// reviews (/danh-gia), shared by the Vietnamese and English routes. Page chrome comes
// from the dictionaries; item content is Vietnamese data (machine-translated
// on English pages, see ListingPage / DetailPage).

import { notFound } from "next/navigation";

import ListingPage from "@/components/ListingPage/ListingPage";
import DetailPage from "@/components/DetailPage/DetailPage";
import ApplyForm from "@/components/ApplyForm/ApplyForm";
import { format, getDictionary, neutralPath } from "@/i18n";
import { getNext, JsonLd, nextCta } from "@/lib/collections";
import { pageMetadata, siteConfig } from "@/lib/site";
import {
  getSpaceById,
  spaceHref,
  spaces,
  toSpaceDetail,
  toSpaceListItem,
} from "@/data/spaces";
import { getJobById, jobHref, jobs, toJobDetail, toJobListItem } from "@/data/jobs";
import {
  getReviewById,
  reviewHref,
  reviews,
  toReviewDetail,
  toReviewListItem,
} from "@/data/reviews";

// ---------------------------------------------------------------- projects

export const spacesMetadata = (lang) => {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.spacesTitle,
    description: t.spacesDescription,
    path: "/du-an",
  });
};

export function SpacesView({ lang }) {
  const t = getDictionary(lang).listing.spaces;
  return (
    <ListingPage
      lang={lang}
      title={t.title}
      filters={t.filters}
      items={spaces.map((space) => toSpaceListItem(space, lang))}
    />
  );
}

export const spaceParams = () => spaces.map((space) => ({ id: String(space.id) }));

export function spaceMetadata(lang, id) {
  const space = getSpaceById(id);
  if (!space) return {};
  const t = getDictionary(lang).meta;
  const fallback = format(t.spaceDescription, space);
  return pageMetadata({
    lang,
    title: space.name,
    description: lang === "vi" ? space.detail?.summary ?? fallback : fallback,
    path: neutralPath(spaceHref(space)),
    image: space.detail?.heroImage ?? space.image,
  });
}

export function SpaceDetailView({ lang, id }) {
  const space = getSpaceById(id);
  if (!space) notFound();
  const t = getDictionary(lang).detail;
  const detail = toSpaceDetail(space, lang);
  const next = getNext(spaces, space);

  return (
    <DetailPage
      lang={lang}
      detail={{
        ...detail,
        cta: detail.cta ?? nextCta(next, t.nextProject, next.location),
      }}
    />
  );
}

// ---------------------------------------------------------------- jobs

export const hiringMetadata = (lang) => {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.hiringTitle,
    description: t.hiringDescription,
    path: "/tuyen-dung",
  });
};

export function HiringView({ lang }) {
  const t = getDictionary(lang).listing.jobs;
  return (
    <ListingPage
      lang={lang}
      kicker={t.kicker}
      title={t.title}
      filters={t.filters}
      items={jobs.map((job) => toJobListItem(job, lang))}
    >
      <ApplyForm lang={lang} />
    </ListingPage>
  );
}

export const jobParams = () => jobs.map((job) => ({ id: String(job.id) }));

export function jobMetadata(lang, id) {
  const job = getJobById(id);
  if (!job) return {};
  const t = getDictionary(lang).meta;
  const fallback = format(t.jobDescription, job);
  return pageMetadata({
    lang,
    title: format(t.jobTitle, job),
    description: lang === "vi" ? job.detail?.summary ?? fallback : fallback,
    path: neutralPath(jobHref(job)),
    image: job.detail?.heroImage ?? job.image,
  });
}

// Structured data for Google's job search results (Vietnamese job data).
function jobPostingJsonLd(job) {
  const detail = job.detail;
  const description = [
    detail.intro?.text,
    ...(detail.sections ?? []).flatMap((section) =>
      section.blocks.flatMap((block) =>
        (block.paragraphs ?? []).map((text) => `${block.label} ${text}`),
      ),
    ),
  ]
    .filter(Boolean)
    .map((text) => `<p>${text}</p>`)
    .join("");

  const datePosted = new Date(job.date);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.name,
    description,
    ...(!Number.isNaN(datePosted.getTime()) && {
      datePosted: datePosted.toISOString().slice(0, 10),
    }),
    ...(job.validThrough && { validThrough: job.validThrough }),
    employmentType: "FULL_TIME",
    totalJobOpenings: Number(job.quantity) || undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo}`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: detail.location ?? job.location,
        addressCountry: "VN",
      },
    },
    url: `${siteConfig.url}${jobHref(job)}`,
  };
}

export function JobDetailView({ lang, id }) {
  const job = getJobById(id);
  if (!job) notFound();
  const t = getDictionary(lang).detail;
  const detail = toJobDetail(job, lang);
  const next = getNext(jobs, job);

  return (
    <DetailPage
      lang={lang}
      detail={{
        ...detail,
        cta: detail.cta ?? nextCta(next, t.nextJob, next.location),
      }}
    >
      {job.detail && lang === "vi" && <JsonLd data={jobPostingJsonLd(job)} />}
      <ApplyForm lang={lang} jobId={job.id} jobTitle={job.name} />
    </DetailPage>
  );
}

// ---------------------------------------------------------------- reviews

export const reviewsMetadata = (lang) => {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.reviewsTitle,
    description: t.reviewsDescription,
    path: "/danh-gia",
  });
};

export function ReviewsView({ lang }) {
  const t = getDictionary(lang).listing.reviews;
  return (
    <ListingPage
      lang={lang}
      kicker={t.kicker}
      title={t.title}
      items={reviews.map((review) => toReviewListItem(review, lang))}
    />
  );
}

export const reviewParams = () => reviews.map((review) => ({ id: String(review.id) }));

export function reviewMetadata(lang, id) {
  const review = getReviewById(id);
  if (!review) return {};
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: format(t.reviewTitle, review),
    description: lang === "vi" ? review.review : format(t.reviewDescription, review),
    path: neutralPath(reviewHref(review)),
    image: review.image,
  });
}

export function ReviewDetailView({ lang, id }) {
  const review = getReviewById(id);
  if (!review) notFound();
  const t = getDictionary(lang).detail;
  const next = getNext(reviews, review);

  return (
    <DetailPage
      lang={lang}
      detail={{
        ...toReviewDetail(review, lang),
        cta: {
          ...nextCta(next, t.nextReview, next.name),
          header: next.title,
        },
      }}
    />
  );
}
