import LocaleRedirect from "@/components/Language/LocaleRedirect";
import { siteConfig } from "@/lib/site";

// "/" is the language entry point: it forwards to /vi or /en. Search engines
// are pointed at the language versions through hreflang (x-default here).
export const metadata = {
  title: { absolute: `${siteConfig.name} - ${siteConfig.tagline}` },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: { vi: "/vi", en: "/en", "x-default": "/" },
  },
};

export default function Page() {
  return <LocaleRedirect />;
}
