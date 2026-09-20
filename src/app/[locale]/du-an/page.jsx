import { SpacesView, spacesMetadata } from "@/views/collections";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return spacesMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <SpacesView lang={(await params).locale} />;
}
