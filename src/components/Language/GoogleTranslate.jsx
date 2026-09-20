"use client";
import { useEffect } from "react";

import { isTranslatedPage, SOURCE_LANG } from "@/lib/i18n";

const SCRIPT_SRC =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

// Names Google must leave untouched (it drops the diacritics otherwise).
// Adjacent spaces are captured into the protected span because Google trims
// whitespace around untranslated spans ("Chính NamWe will...").
const PROTECTED = /(\s*(?:Chính Nam|CHÍNH NAM)\s*)/;

// Wrap protected names in <span translate="no"> inside plain text nodes.
function protectNames(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      PROTECTED.test(node.nodeValue) &&
      !node.parentElement?.closest(".notranslate, [translate='no'], script, style")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const parts = node.nodeValue.split(PROTECTED);
    const fragment = document.createDocumentFragment();
    parts.forEach((part, index) => {
      if (!part) return;
      if (index % 2 === 1) {
        const span = document.createElement("span");
        span.className = "notranslate";
        span.setAttribute("translate", "no");
        span.textContent = part;
        fragment.append(span);
      } else {
        fragment.append(part);
      }
    });
    node.replaceWith(fragment);
  });
}

// Loads Google Translate on English pages only. The page is translate="no"
// except the project/job/review data regions (translate="yes"), so only that
// Vietnamese data is translated; all of Google's UI is hidden in globals.css.
export default function GoogleTranslate() {
  useEffect(() => {
    if (!isTranslatedPage()) return;
    const html = document.documentElement;

    // Protect names now and in content added later (client navigation).
    protectNames(document.body);
    const names = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) protectNames(node);
        }),
      );
    });
    names.observe(document.body, { childList: true, subtree: true });

    // Show the page once the first translation pass has run.
    const observer = new MutationObserver(() => {
      if (html.classList.contains("translated-ltr")) {
        html.classList.remove("lang-pending");
        observer.disconnect();
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });

    if (!window.google?.translate && !document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: SOURCE_LANG, includedLanguages: "en", autoDisplay: false },
          "google_translate_element",
        );
      };
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      observer.disconnect();
      names.disconnect();
    };
  }, []);

  return <div id="google_translate_element" aria-hidden="true" />;
}
