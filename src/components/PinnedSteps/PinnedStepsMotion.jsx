"use client";
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Desktop only: pins the header while the cards scroll past it and highlights
// the pill matching the card in view - the same scene HowWeWork runs.
export default function PinnedStepsMotion({ id }) {
  useEffect(() => {
    const root = document.getElementById(id);
    const container = root?.querySelector(".pinned-steps");
    const header = container?.querySelector(".pinned-steps-header");
    const cards = container?.querySelector(".pinned-steps-cards");
    if (!container || !header || !cards) return;

    const pills = container.querySelectorAll(".pinned-steps-pill");
    const setActive = (activeIndex) => {
      pills.forEach((pill, index) =>
        pill.classList.toggle("active", index === activeIndex),
      );
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px)", () => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });

      const cardElements = cards.querySelectorAll(".pinned-steps-card");

      cardElements.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
          onLeave: () => {
            if (index < cardElements.length - 1) setActive(index + 1);
          },
          onLeaveBack: () => {
            if (index > 0) setActive(index - 1);
          },
        });
      });

      return () => setActive(0);
    });

    return () => mm.revert();
  }, [id]);

  return null;
}
