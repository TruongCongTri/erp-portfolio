"use client";
import { useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

// Keeps the smooth-scroll limit and the scroll animations in step with the
// page height.
//
// Lenis caches how far the page can scroll. When the document grows after that
// measurement - machine-translated text on /en pages arriving as you scroll,
// late images, pinned sections - the wheel stops at the old limit while the
// scrollbar still drags further (it bypasses Lenis). Re-measuring on every
// height change keeps both in sync.
export default function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    let lastHeight = document.documentElement.scrollHeight;
    let timer;

    const sync = () => {
      const height = document.documentElement.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      lenis.resize();
      ScrollTrigger.refresh();
    };

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(sync, 250);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [lenis]);

  return null;
}
