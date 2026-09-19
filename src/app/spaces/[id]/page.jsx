import { notFound } from "next/navigation";

import DetailPage from "@/components/DetailPage/DetailPage";
import { getSpaceById, spaceHref, spaces, toSpaceDetail } from "@/data/spaces";
import { getNext, nextCta } from "@/lib/collections";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return spaces.map((space) => ({ id: String(space.id) }));
}

export async function generateMetadata({ params }) {
  const space = getSpaceById((await params).id);
  if (!space) return {};

  return pageMetadata({
    title: space.name,
    description:
      space.detail?.summary ??
      `${space.name} - ${space.location}. Dự án thiết kế và thi công bởi Chính Nam.`,
    path: spaceHref(space),
    image: space.detail?.heroImage ?? space.image,
  });
}

const page = async ({ params }) => {
  const space = getSpaceById((await params).id);
  if (!space) notFound();

  const detail = toSpaceDetail(space);
  const next = getNext(spaces, space);

  return (
    <DetailPage
      detail={{
        ...detail,
        cta: detail.cta ?? nextCta(next, "Dự án tiếp theo", next.location),
      }}
    />
  );
};

export default page;
