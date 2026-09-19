import ListingPage from "@/components/ListingPage/ListingPage";
import { reviews, reviewsListing, toReviewListItem } from "@/data/reviews";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Đánh giá khách hàng",
  description:
    "Cảm nhận của khách hàng về các công trình do Chính Nam thiết kế và thi công.",
  path: "/reviews",
});

const page = () => {
  return (
    <ListingPage {...reviewsListing} items={reviews.map(toReviewListItem)} />
  );
};

export default page;
