"use client";
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Desktop only: pins the HowWeWork header while the cards scroll past and
// highlights the milestone year matching the card in view.
export default function HowWeWorkMotion() {
  useEffect(() => {
    const container = document.querySelector(".how-we-work");
    const header = container?.querySelector(".how-we-work-header");
    const cards = container?.querySelector(".how-we-work-cards");
    if (!container || !header || !cards) return;

    const steps = container.querySelectorAll(".how-we-work-step");
    const setActiveStep = (activeIndex) => {
      steps.forEach((step, index) =>
        step.classList.toggle("active", index === activeIndex),
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

      const cardElements = cards.querySelectorAll(".how-we-work-card");

      cardElements.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              setActiveStep(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setActiveStep(index - 1);
            }
          },
        });
      });

      return () => setActiveStep(0);
    });

    return () => mm.revert();
  }, []);

  return null;
}
