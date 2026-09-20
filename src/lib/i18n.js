// Machine translation of Vietnamese data on English pages.
//
// Fixed UI text comes from src/i18n/{vi,en}.json. On "/en/…" pages (every
// page is generated under /vi and /en) the
// document is marked translate="no" and only project / job / review data is
// wrapped in translate="yes" (see DataText and the data components); Google
// Translate then translates just those regions.

export const SOURCE_LANG = "vi";

const COOKIE = "googtrans";
const SKIP_INTRO_KEY = "skip-intro";

// Runs as an inline <head> script before the page renders (see layout.js).
export const LANG_BOOT_SCRIPT = `(function () {
  try {
    var html = document.documentElement;
    try {
      if (sessionStorage.getItem("${SKIP_INTRO_KEY}")) {
        sessionStorage.removeItem("${SKIP_INTRO_KEY}");
        html.classList.add("skip-intro");
      }
    } catch (e) {}
    var expired = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    if (!/^\\/en(\\/|\\.html$|$)/.test(location.pathname)) {
      // Vietnamese page: make sure no translation is applied.
      document.cookie = "${COOKIE}" + expired;
      document.cookie = "${COOKIE}" + expired + "; domain=" + location.hostname;
      return;
    }
    html.lang = "en";
    html.setAttribute("translate", "no");
    html.classList.add("lang-en", "lang-pending");
    document.cookie = "${COOKIE}=/${SOURCE_LANG}/en; path=/";
    // Google Translate swaps text nodes for <font> wrappers; without this
    // guard React throws when it later removes or inserts around them.
    var removeChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) return child;
      return removeChild.apply(this, arguments);
    };
    var insertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (node, ref) {
      if (ref && ref.parentNode !== this) return node;
      return insertBefore.apply(this, arguments);
    };
    // Never keep data hidden if the translator is slow or blocked.
    setTimeout(function () { html.classList.remove("lang-pending"); }, 4000);
  } catch (e) {}
})();`;

// True on English pages, where data regions are machine-translated.
export const isTranslatedPage = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("lang-en");

// Language switches reload into the other locale; don't replay the intro.
export function markSkipIntro() {
  try {
    sessionStorage.setItem(SKIP_INTRO_KEY, "1");
  } catch {}
}
