import DesignConsultView, { designMetadata } from "@/views/DesignConsultView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return designMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <DesignConsultView lang={(await params).locale} />;
}
