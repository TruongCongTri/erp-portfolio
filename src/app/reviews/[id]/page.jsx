import { notFound } from "next/navigation";

import DetailPage from "@/components/DetailPage/DetailPage";
import {
  getReviewById,
  reviewHref,
  reviews,
  toReviewDetail,
} from "@/data/reviews";
import { getNext, nextCta } from "@/lib/collections";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return reviews.map((review) => ({ id: String(review.id) }));
}

export async function generateMetadata({ params }) {
  const review = getReviewById((await params).id);
  if (!review) return {};

  return pageMetadata({
    title: `${review.title} - Đánh giá của ${review.name}`,
    description: review.review,
    path: reviewHref(review),
    image: review.image,
  });
}

const page = async ({ params }) => {
  const review = getReviewById((await params).id);
  if (!review) notFound();

  const next = getNext(reviews, review);

  return (
    <DetailPage
      detail={{
        ...toReviewDetail(review),
        cta: {
          ...nextCta(next, "Đánh giá tiếp theo", next.name),
          header: next.title,
        },
      }}
    />
  );
};

export default page;
