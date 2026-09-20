import { SpaceDetailView, spaceMetadata, spaceParams } from "@/views/collections";
import { withLocales } from "@/i18n";

export const dynamicParams = false;

// Every item in every language: [{ locale, id }, …]
export const generateStaticParams = () => withLocales(spaceParams());

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  return spaceMetadata(locale, id);
}

export default async function Page({ params }) {
  const { locale, id } = await params;
  return <SpaceDetailView lang={locale} id={id} />;
}
