"use client";
import { useTransitionRouter } from "next-view-transitions";

// Fired the moment a navigation is asked for - before Next has fetched the
// destination - so the page can show that something is happening. RouteProgress
// listens for it.
export const TRANSITION_START = "page-transition-start";

// The old page falls away while the new one opens through it. The route has
// already loaded by the time this runs - RouteProgress covers that wait.
const OUT_MS = 1000;
const IN_MS = 1000;
const EASE = "cubic-bezier(0.83, 0, 0.17, 1)";

export const useViewTransition = () => {
  const router = useTransitionRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.86)" },
      ],
      {
        duration: OUT_MS,
        easing: EASE,
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      },
    );

    document.documentElement.animate(
      [
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(75% at 50% 50%)" },
      ],
      {
        duration: IN_MS,
        easing: EASE,
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  const navigateWithTransition = (href, options = {}) => {
    const currentPath = window.location.pathname.replace(/\.html$/, "");
    if (currentPath === href) return;

    // Immediately, so the click is acknowledged even while the route loads.
    window.dispatchEvent(new CustomEvent(TRANSITION_START, { detail: href }));

    router.push(href, {
      onTransitionReady: slideInOut,
      ...options,
    });
  };

  return { navigateWithTransition, router };
};
