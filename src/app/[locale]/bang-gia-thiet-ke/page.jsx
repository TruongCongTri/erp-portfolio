import DesignPricingView, {
  designPricingMetadata,
} from "@/views/DesignPricingView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return designPricingMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <DesignPricingView lang={(await params).locale} />;
}
