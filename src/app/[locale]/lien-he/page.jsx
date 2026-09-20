import ConnectView, { connectMetadata } from "@/views/ConnectView";
import { localeParams } from "@/i18n";

export const dynamicParams = false;

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }) {
  return connectMetadata((await params).locale);
}

export default async function Page({ params }) {
  return <ConnectView lang={(await params).locale} />;
}
