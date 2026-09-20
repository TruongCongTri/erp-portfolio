import ConstructionView, { constructionMetadata } from "@/views/ConstructionView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return constructionMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <ConstructionView lang={(await params).locale} />;
}
