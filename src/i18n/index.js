// Fixed UI text lives in vi.json / en.json and every page is generated once
// per language under /[locale]: "/vi/studio" and "/en/studio". "/" is a small
// page that forwards visitors to their language (src/app/page.js).
//
// Only project, job and review data (src/data) stays Vietnamese-only and is
// machine-translated on English pages (see components/Language).

import vi from "./vi.json";
import en from "./en.json";

export const LOCALES = ["vi", "en"];
export const DEFAULT_LOCALE = "vi";

const dictionaries = { vi, en };

export const getDictionary = (lang) => dictionaries[lang] ?? dictionaries.vi;

export const isLocale = (value) => LOCALES.includes(value);

// generateStaticParams for pages under /[locale]
export const localeParams = () => LOCALES.map((locale) => ({ locale }));

// Pairs each param set with every locale: [{ id }] -> [{ locale, id }, …]
export const withLocales = (params) =>
  LOCALES.flatMap((locale) => params.map((entry) => ({ locale, ...entry })));

// "/studio" -> "/vi/studio" | "/en/studio"
export function localizePath(lang, path = "/") {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// The language-neutral path: "/en/studio" -> "/studio"
export function neutralPath(path = "/") {
  const stripped = path.replace(/^\/(vi|en)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

// Works with clean URLs ("/en/studio") and static-host ones ("/en/studio.html").
export function langFromPath(pathname = "/") {
  const match = pathname.match(/^\/(vi|en)(\/|\.html$|$)/);
  return match ? match[1] : DEFAULT_LOCALE;
}

// The same page in the other language.
export function switchLocalePath(pathname = "/", lang) {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const rest = pathname.replace(/^\/(vi|en)(?=\/|\.html$|$)/, "");
  if (rest === "" || rest === "/") return `/${locale}`;
  // Static hosts may serve "/vi.html" for "/vi"
  if (rest === ".html") return `/${locale}.html`;
  return `/${locale}${rest}`;
}

// "Xin chào {name}" + { name: "An" } -> "Xin chào An"
export const format = (template, values = {}) =>
  template.replace(/\{(\w+)\}/g, (match, key) =>
    values[key] != null ? String(values[key]) : match,
  );
