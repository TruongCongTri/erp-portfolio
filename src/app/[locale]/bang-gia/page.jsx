import PricingView, { pricingMetadata } from "@/views/PricingView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return pricingMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <PricingView lang={(await params).locale} />;
}
