"use client";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

// Drives an Orbit scene:
// - the items appear one by one, clockwise, when the wheel scrolls in;
// - desktop pins the wheel while the cards scroll past it, so scrolling down
//   or up walks through the items and the ring fills as it goes;
// - clicking an item on the wheel jumps straight to its card.
export default function OrbitMotion({ id }) {
  const lenis = useLenis();
  // Kept in a ref so the scene is built once, on mount, even though Lenis
  // only becomes available on a later render.
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    const section = document.getElementById(id);
    const body = section?.querySelector(".orbit-body");
    const wheelCol = section?.querySelector(".orbit-wheel-col");
    const list = section?.querySelector(".orbit-detail");
    if (!section || !body || !wheelCol || !list) return;

    const nodes = Array.from(section.querySelectorAll(".orbit-node"));
    const cards = Array.from(list.querySelectorAll(".orbit-card"));
    if (nodes.length === 0 || cards.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const setActive = (activeIndex) => {
      nodes.forEach((node, index) => {
        const isActive = index === activeIndex;
        node.classList.toggle("active", isActive);
        node.setAttribute("aria-pressed", String(isActive));
      });
      cards.forEach((card, index) =>
        card.classList.toggle("active", index === activeIndex),
      );
    };

    // Click is the shortcut; the scroll position still decides what is active.
    // The target is measured here, not handed to Lenis as an element: dragging
    // the scrollbar bypasses Lenis, and it would then aim from a stale
    // position and stop short.
    const scrollToCard = (card) => {
      const offset = Math.min(0, -(window.innerHeight - card.offsetHeight) / 2);
      const top = card.getBoundingClientRect().top + window.scrollY + offset;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(top, { duration: reduced ? 0 : 1.2 });
      } else {
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }
    };

    const handleClick = (event) => {
      const index = Number(event.currentTarget.dataset.index);
      setActive(index);
      scrollToCard(cards[index]);
    };

    nodes.forEach((node) => node.addEventListener("click", handleClick));

    const ctx = gsap.context(() => {
      const ring = section.querySelector(".orbit-ring-track");
      const progress = section.querySelector(".orbit-ring-progress");
      const spokes = section.querySelectorAll(".orbit-spoke");
      const hub = section.querySelector(".orbit-hub");

      const ringLength = ring?.getTotalLength?.() ?? 0;

      if (progress && ringLength) {
        gsap.set(progress, {
          strokeDasharray: ringLength,
          strokeDashoffset: reduced ? 0 : ringLength,
        });
      }

      if (reduced) return;

      gsap.set(nodes, { opacity: 0, scale: 0.4 });
      gsap.set(hub, { opacity: 0, scale: 0.85 });
      gsap.set(spokes, { opacity: 0 });

      // The ring is drawn clockwise from the top by unwinding its dash offset.
      if (ring && ringLength) {
        gsap.set(ring, {
          strokeDasharray: ringLength,
          strokeDashoffset: ringLength,
        });
      }

      const entrance = gsap.timeline({ paused: true });

      entrance
        .to(hub, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" })
        .to(
          ring,
          { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" },
          0,
        )
        .to(
          nodes,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 1.4 / nodes.length,
            ease: "back.out(1.6)",
          },
          0.2,
        )
        .to(
          spokes,
          { opacity: 1, duration: 0.5, stagger: 1.4 / nodes.length },
          0.2,
        );

      // Anchored on the wheel, not the section: the section is several screens
      // tall, so its own top passes long before the wheel is in view.
      ScrollTrigger.create({
        trigger: section.querySelector(".orbit-wheel"),
        start: "top 85%",
        once: true,
        onEnter: () => entrance.play(),
        onRefresh: (self) => {
          // Landing mid-section (a reload, a jump link) should not leave the
          // wheel hidden behind a trigger that will never fire again.
          if (self.progress > 0) entrance.progress(1).pause();
        },
      });

      // The section that follows reaches the wheel before the pin lets go, so
      // the wheel would be sliced by its top edge. It dissolves over that
      // handover instead, and fades back in on the way up.
      gsap.fromTo(
        wheelCol,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "bottom 75%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      // The brighter arc tracks how far through the items you have scrolled.
      if (progress && ringLength) {
        gsap.fromTo(
          progress,
          { strokeDashoffset: ringLength * (1 - 1 / cards.length) },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top center",
              end: "bottom center",
              scrub: 0.4,
            },
          },
        );
      }
    }, section);

    // Desktop only: the wheel stays put while the cards scroll by.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px)", () => {
      ScrollTrigger.create({
        trigger: body,
        start: "top top",
        endTrigger: list,
        // Released on the list's bottom reaching the middle of the screen, so
        // the wheel is still in place while the last card is being read.
        end: "bottom center",
        pin: wheelCol,
        pinSpacing: false,
      });
    });

    // One item is active from the moment its card reaches the middle of the
    // screen until the next one does - going down and coming back up.
    const triggers = cards.map((card, index) =>
      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
        onLeave: () => {
          if (index < cards.length - 1) setActive(index + 1);
        },
        onLeaveBack: () => {
          if (index > 0) setActive(index - 1);
        },
      }),
    );

    return () => {
      nodes.forEach((node) => node.removeEventListener("click", handleClick));
      triggers.forEach((trigger) => trigger.kill());
      mm.revert();
      ctx.revert();
    };
  }, [id]);

  return null;
}
