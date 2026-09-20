import BlueprintsView, { blueprintsMetadata } from "@/views/BlueprintsView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return blueprintsMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <BlueprintsView lang={(await params).locale} />;
}
