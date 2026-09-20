import ConstructionPricingView, { constructionPricingMetadata } from "@/views/ConstructionPricingView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return constructionPricingMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <ConstructionPricingView lang={(await params).locale} />;
}
