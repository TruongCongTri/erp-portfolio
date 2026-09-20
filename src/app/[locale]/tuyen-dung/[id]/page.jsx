import { JobDetailView, jobMetadata, jobParams } from "@/views/collections";
import { withLocales } from "@/i18n";

export const dynamicParams = false;

// Every item in every language: [{ locale, id }, …]
export const generateStaticParams = () => withLocales(jobParams());

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  return jobMetadata(locale, id);
}

export default async function Page({ params }) {
  const { locale, id } = await params;
  return <JobDetailView lang={locale} id={id} />;
}
