"use client";
import "./LocaleRedirect.css";
import { useEffect } from "react";

import { DEFAULT_LOCALE, LOCALES } from "@/i18n";

// The site lives under /vi and /en; "/" forwards to the visitor's language
// (Vietnamese unless their browser clearly prefers English) and offers both
// links for anyone without JavaScript.
export default function LocaleRedirect() {
  useEffect(() => {
    const preferred = (navigator.languages ?? [navigator.language ?? ""])
      .map((tag) => tag.toLowerCase().split("-")[0])
      .find((code) => LOCALES.includes(code));
    window.location.replace(`/${preferred ?? DEFAULT_LOCALE}`);
  }, []);

  return (
    <div className="locale-redirect">
      <p className="locale-redirect-brand">Chính Nam</p>
      <nav aria-label="Ngôn ngữ / Language">
        <a href="/vi" lang="vi">
          Tiếng Việt
        </a>
        <a href="/en" lang="en">
          English
        </a>
      </nav>
    </div>
  );
}
