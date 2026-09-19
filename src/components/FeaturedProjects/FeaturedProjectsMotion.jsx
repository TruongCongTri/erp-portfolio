"use client";
import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Stacking-cards scroll effect for the server-rendered FeaturedProjects.
export default function FeaturedProjectsMotion() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const featuredProjectCards = gsap.utils.toArray(".featured-project-card");
      const isMobile = window.innerWidth <= 1000;

      featuredProjectCards.forEach((featuredProjectCard, index) => {
        if (index === featuredProjectCards.length - 1) return;

        const featuredProjectCardInner = featuredProjectCard.querySelector(
          ".featured-project-card-inner",
        );

        gsap.fromTo(
          featuredProjectCardInner,
          {
            y: "0%",
            z: 0,
            rotationX: 0,
          },
          {
            y: "-50%",
            z: -250,
            rotationX: 45,
            scrollTrigger: {
              trigger: featuredProjectCards[index + 1],
              start: isMobile ? "top 85%" : "top 100%",
              end: "top -75%",
              scrub: true,
              pin: featuredProjectCard,
              pinSpacing: false,
            },
          },
        );

        gsap.to(featuredProjectCardInner, {
          "--after-opacity": 1,
          scrollTrigger: {
            trigger: featuredProjectCards[index + 1],
            start: "top 75%",
            end: "top 0%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
