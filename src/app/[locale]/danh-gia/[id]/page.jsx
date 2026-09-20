import { ReviewDetailView, reviewMetadata, reviewParams } from "@/views/collections";
import { withLocales } from "@/i18n";

export const dynamicParams = false;

// Every item in every language: [{ locale, id }, …]
export const generateStaticParams = () => withLocales(reviewParams());

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  return reviewMetadata(locale, id);
}

export default async function Page({ params }) {
  const { locale, id } = await params;
  return <ReviewDetailView lang={locale} id={id} />;
}
