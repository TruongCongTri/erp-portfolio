// Shared helpers for the client-side animation layer.

import { SplitText } from "gsap/SplitText";

import { isTranslatedPage } from "@/lib/i18n";

export async function waitForFonts() {
  try {
    await document.fonts.ready;
    document.fonts.check("16px Manrope");
    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

// Page intros (Revealer, Preloader) render only on the first visit and mark
// themselves with data-intro; entrance animations behind them declare a
// longer preloaderDelay to use while one is on screen.
export function isPreloaderActive() {
  return !!document.querySelector("[data-intro]");
}

export function resolveDelay(delay = 0, preloaderDelay) {
  if (preloaderDelay != null && preloaderDelay !== "" && isPreloaderActive()) {
    return parseFloat(preloaderDelay);
  }
  return parseFloat(delay) || 0;
}

// Line split for reveal animations (SplitText). Machine-translated data on
// English pages would reach Google Translate as sentence fragments, so there
// the whole text goes into one masked "line" instead; it is translated as a
// whole and animates the same way.
export function splitLines(element, options = {}) {
  const translated =
    isTranslatedPage() && element.closest('[translate="yes"]');
  if (!translated) return SplitText.create(element, options);

  const lineClass = (options.linesClass || "line").replace("++", "");
  const mask = document.createElement("div");
  mask.style.overflow = "clip";
  const line = document.createElement("div");
  line.className = lineClass;
  line.style.display = "block";
  line.append(...element.childNodes);
  mask.append(line);
  element.append(mask);

  return {
    lines: [line],
    words: [line],
    revert() {
      if (!mask.isConnected) return;
      element.append(...line.childNodes);
      mask.remove();
    },
  };
}
