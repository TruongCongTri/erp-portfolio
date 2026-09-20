import AllInOneView, { allInOneMetadata } from "@/views/AllInOneView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return allInOneMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <AllInOneView lang={(await params).locale} />;
}
