import { HiringView, hiringMetadata } from "@/views/collections";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return hiringMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <HiringView lang={(await params).locale} />;
}
