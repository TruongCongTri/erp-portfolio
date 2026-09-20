import StudioV2View, { studioV2Metadata } from "@/views/StudioV2View";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return studioV2Metadata((await params).locale);
}

export default async function Page({ params }) {
  return <StudioV2View lang={(await params).locale} />;
}
