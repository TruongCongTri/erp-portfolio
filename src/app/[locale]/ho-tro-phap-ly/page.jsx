import LegalSupportView, { legalMetadata } from "@/views/LegalSupportView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return legalMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <LegalSupportView lang={(await params).locale} />;
}
