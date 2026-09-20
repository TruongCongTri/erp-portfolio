"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { resolveDelay, splitLines, waitForFonts } from "@/lib/motion";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Line-by-line text reveal for elements rendered by <Copy>.
function initCopy(splits) {
  document.querySelectorAll("[data-copy]").forEach((container) => {
    const elements = container.hasAttribute("data-copy-wrapper")
      ? Array.from(container.children)
      : [container];
    const lines = [];

    elements.forEach((element) => {
      const split = splitLines(element, {
        type: "lines",
        mask: "lines",
        linesClass: "line++",
        lineThreshold: 0.1,
      });
      splits.push(split);

      const textIndent = window.getComputedStyle(element).textIndent;
      if (textIndent && textIndent !== "0px") {
        if (split.lines.length > 0) {
          split.lines[0].style.paddingLeft = textIndent;
        }
        element.style.textIndent = "0";
      }

      lines.push(...split.lines);
    });

    gsap.set(lines, { y: "100%" });

    const animation = {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: resolveDelay(
        container.dataset.copyDelay,
        container.dataset.copyPreloaderDelay,
      ),
    };

    if (container.dataset.copy === "scroll") {
      animation.scrollTrigger = {
        trigger: container,
        start: "top 90%",
        once: true,
      };
    }

    gsap.to(lines, animation);
  });
}

// Staggered slide-in of a group's items, e.g.
// <div data-reveal=".tag" data-reveal-start="top 75%">.
function initReveal() {
  document.querySelectorAll("[data-reveal]").forEach((group) => {
    const items = group.querySelectorAll(group.dataset.reveal);
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, x: -40 });

    ScrollTrigger.create({
      trigger: group,
      start: group.dataset.revealStart || "top 90%",
      once: true,
      animation: gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: parseFloat(group.dataset.revealDuration || 0.8),
        stagger: parseFloat(group.dataset.revealStagger || 0.1),
        ease: group.dataset.revealEase || "power3.out",
      }),
    });
  });
}

// Cards that scale up into place: the first on load, the rest on scroll.
function initRevealCards() {
  document.querySelectorAll("[data-reveal-cards]").forEach((list) => {
    const cards = list.querySelectorAll(list.dataset.revealCards);

    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, scale: 0.75, y: 150 });

      const show = (delay = 0) =>
        gsap.to(card, {
          duration: 0.75,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          delay,
        });

      if (index === 0) {
        show(1.4);
      } else {
        ScrollTrigger.create({
          trigger: card,
          start: "top 100%",
          once: true,
          onEnter: () => show(),
        });
      }
    });
  });
}

// Hides `[data-hide-on-scroll]` when scrolling down, shows it scrolling up.
function initHideOnScroll() {
  const bar = document.querySelector("[data-hide-on-scroll]");
  if (!bar) return () => {};

  let lastScrollY = window.scrollY;
  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;
    ticking = true;

    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      gsap.to(bar, { y: -bar.offsetHeight, duration: 1, ease: "power4.out" });
    } else if (currentScrollY < lastScrollY) {
      gsap.to(bar, { y: 0, duration: 1, ease: "power4.out" });
    }
    lastScrollY = currentScrollY;

    setTimeout(() => {
      ticking = false;
    }, 100);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

// Single client entry point for all declarative, non-interactive animations.
// Components stay server-rendered and only carry data-* attributes.
export default function MotionRuntime() {
  const pathname = usePathname();

  useEffect(() => initHideOnScroll(), []);

  useEffect(() => {
    const bar = document.querySelector("[data-hide-on-scroll]");
    if (bar) gsap.set(bar, { y: 0 });

    let cancelled = false;
    const splits = [];
    const ctx = gsap.context(() => {});

    (async () => {
      await waitForFonts();
      if (cancelled) return;

      ctx.add(() => {
        initCopy(splits);
        initReveal();
        initRevealCards();
      });
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx.revert();
      splits.forEach((split) => split.revert());
    };
  }, [pathname]);

  return null;
}
