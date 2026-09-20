import { ReviewsView, reviewsMetadata } from "@/views/collections";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return reviewsMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <ReviewsView lang={(await params).locale} />;
}
