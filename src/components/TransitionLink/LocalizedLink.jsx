"use client";
import { useI18n } from "@/i18n/client";
import TransitionLink from "./TransitionLink";

// TransitionLink that prefixes the current language ("/" -> "/vi" or "/en").
// For server components that don't receive `lang`, e.g. the top bar.
export default function LocalizedLink({ href, ...props }) {
  const { href: localize } = useI18n();
  return <TransitionLink href={localize(href)} {...props} />;
}
