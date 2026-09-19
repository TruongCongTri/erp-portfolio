import { notFound } from "next/navigation";

import DetailPage from "@/components/DetailPage/DetailPage";
import ApplyForm from "@/components/ApplyForm/ApplyForm";
import ApplyFloatingButton from "@/components/ApplyFloatingButton/ApplyFloatingButton";
import { getJobById, jobHref, jobs, toJobDetail } from "@/data/jobs";
import { getNext, JsonLd, nextCta } from "@/lib/collections";
import { pageMetadata, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((job) => ({ id: String(job.id) }));
}

export async function generateMetadata({ params }) {
  const job = getJobById((await params).id);
  if (!job) return {};

  return pageMetadata({
    title: `Tuyển dụng ${job.name}`,
    description:
      job.detail?.summary ??
      `Chính Nam tuyển ${job.quantity} ${job.name} tại ${job.location}. Ứng tuyển trực tuyến ngay.`,
    path: jobHref(job),
    image: job.detail?.heroImage ?? job.image,
  });
}

// Structured data for Google's job search results.
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

const page = async ({ params }) => {
  const job = getJobById((await params).id);
  if (!job) notFound();

  const detail = toJobDetail(job);
  const next = getNext(jobs, job);

  return (
    <DetailPage
      detail={{
        ...detail,
        cta: detail.cta ?? nextCta(next, "Vị trí tiếp theo", next.location),
      }}
    >
      {job.detail && <JsonLd data={jobPostingJsonLd(job)} />}
      <ApplyFloatingButton />
      <ApplyForm jobId={job.id} jobTitle={job.name} />
    </DetailPage>
  );
};

export default page;
