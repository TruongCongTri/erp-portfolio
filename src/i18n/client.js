"use client";
import { usePathname } from "next/navigation";

import { getDictionary, langFromPath, localizePath } from ".";

// Language, dictionary and a link helper for client components (the
// language comes from the URL, so it's also right on the first render).
export function useI18n() {
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  return {
    lang,
    t: getDictionary(lang),
    href: (path) => localizePath(lang, path),
  };
}
