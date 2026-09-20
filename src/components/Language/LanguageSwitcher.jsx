"use client";
import "./LanguageSwitcher.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useI18n } from "@/i18n/client";
import { switchLocalePath } from "@/i18n";
import { markSkipIntro } from "@/lib/i18n";

const OPTIONS = [
  { lang: "vi", label: "VI", title: "Tiếng Việt" },
  { lang: "en", label: "EN", title: "English" },
];

// VI / EN pill in the site's button style: the dark circle slides to the
// chosen language, then the same page loads in that language ("/vi/…" or
// "/en/…"). A full load resets the machine translation cleanly.
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { lang: currentLang, t } = useI18n();
  const [lang, setLang] = useState(currentLang);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Enable the sliding transition only after the initial state is shown.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const choose = (next) => {
    if (next === lang) return;
    setLang(next);
    const { search, hash } = window.location;
    const target = switchLocalePath(window.location.pathname || pathname, next);
    markSkipIntro();
    setTimeout(() => window.location.assign(target + search + hash), 450);
  };

  return (
    <div
      className={`lang-switch ${ready ? "ready" : ""}`}
      data-lang={lang}
      translate="no"
      role="group"
      aria-label={t.common.language}
    >
      <span className="lang-switch-indicator" aria-hidden="true" />
      {OPTIONS.map((option) => (
        <button
          key={option.lang}
          type="button"
          lang={option.lang}
          title={option.title}
          aria-pressed={lang === option.lang}
          onClick={() => choose(option.lang)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
