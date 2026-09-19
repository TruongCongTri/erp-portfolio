"use client";
import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// NOTE: These values are interconnected - when speed changes, it affects when images finish their movement, which also affects the gap between images. When you change the number of items in Spotlight, you'll need to adjust these config settings together. Test different combinations until you find the right balance that looks good.
const config = {
  gap: 0.08,
  speed: 0.3,
  arcRadius: 500,
};

// Pinned scroll scene for the server-rendered Spotlight section.
export default function SpotlightMotion() {
  useEffect(() => {
    const spotlight = document.querySelector(".spotlight");
    if (!spotlight) return;

    const titlesContainer = spotlight.querySelector(".spotlight-titles");
    const titlesContainerElement = spotlight.querySelector(
      ".spotlight-titles-container",
    );
    const spotlightHeader = spotlight.querySelector(".spotlight-header");
    const bgImgWrapper = spotlight.querySelector(".spotlight-bg-img");
    const bgImg = bgImgWrapper?.querySelector("img");
    const introTextElements = spotlight.querySelectorAll(
      ".spotlight-intro-text",
    );
    const imageElements = Array.from(
      spotlight.querySelectorAll(".spotlight-img"),
    );
    const titleElements = spotlight.querySelectorAll(".spotlight-title");

    if (
      !titlesContainer ||
      !titlesContainerElement ||
      !spotlightHeader ||
      !bgImg ||
      titleElements.length === 0
    ) {
      return;
    }

    let currentActiveIndex = 0;

    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;
      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;
      return { x, y };
    }

    function getImgProgressState(index, overallProgress) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / config.speed;
    }

    const ctx = gsap.context(() => {
      imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

      ScrollTrigger.create({
        trigger: spotlight,
        start: "top top",
        end: `+=${window.innerHeight * 10}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= 0.2) {
            const animationProgress = progress / 0.2;

            const moveDistance = window.innerWidth * 0.6;
            gsap.set(introTextElements[0], {
              x: -animationProgress * moveDistance,
              opacity: 1,
            });
            gsap.set(introTextElements[1], {
              x: animationProgress * moveDistance,
              opacity: 1,
            });

            gsap.set(bgImgWrapper, {
              transform: `scale(${animationProgress})`,
            });
            gsap.set(bgImg, {
              transform: `scale(${1.5 - animationProgress * 0.5})`,
            });

            imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
            spotlightHeader.style.opacity = "0";
            gsap.set(titlesContainerElement, {
              "--before-opacity": "0",
              "--after-opacity": "0",
            });
          } else if (progress > 0.2 && progress <= 0.25) {
            gsap.set(bgImgWrapper, { transform: "scale(1)" });
            gsap.set(bgImg, { transform: "scale(1)" });

            gsap.set(introTextElements, { opacity: 0 });

            imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
            spotlightHeader.style.opacity = "1";
            gsap.set(titlesContainerElement, {
              "--before-opacity": "1",
              "--after-opacity": "1",
            });
          } else if (progress > 0.25 && progress <= 0.95) {
            gsap.set(bgImgWrapper, { transform: "scale(1)" });
            gsap.set(bgImg, { transform: "scale(1)" });

            gsap.set(introTextElements, { opacity: 0 });

            spotlightHeader.style.opacity = "1";
            gsap.set(titlesContainerElement, {
              "--before-opacity": "1",
              "--after-opacity": "1",
            });

            const switchProgress = (progress - 0.25) / 0.7;
            const viewportHeight = window.innerHeight;
            const titlesContainerHeight = titlesContainer.scrollHeight;
            const startPosition = viewportHeight;
            const targetPosition = -titlesContainerHeight;
            const totalDistance = startPosition - targetPosition;
            const currentY = startPosition - switchProgress * totalDistance;

            gsap.set(titlesContainer, {
              transform: `translateY(${currentY}px)`,
            });

            imageElements.forEach((img, index) => {
              const imageProgress = getImgProgressState(index, switchProgress);

              if (imageProgress < 0 || imageProgress > 1) {
                gsap.set(img, { opacity: 0 });
              } else {
                const pos = getBezierPosition(imageProgress);
                gsap.set(img, {
                  x: pos.x - 100,
                  y: pos.y - 75,
                  opacity: 1,
                });
              }
            });

            const viewportMiddle = viewportHeight / 2;
            let closestIndex = 0;
            let closestDistance = Infinity;

            titleElements.forEach((title, index) => {
              const titleRect = title.getBoundingClientRect();
              const titleCenter = titleRect.top + titleRect.height / 2;
              const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

              if (distanceFromCenter < closestDistance) {
                closestDistance = distanceFromCenter;
                closestIndex = index;
              }
            });

            if (closestIndex !== currentActiveIndex) {
              titleElements[currentActiveIndex].style.opacity = "0.35";
              titleElements[closestIndex].style.opacity = "1";
              bgImg.src = imageElements[closestIndex]
                .querySelector("img")
                .getAttribute("src");
              currentActiveIndex = closestIndex;
            }
          } else if (progress > 0.95) {
            spotlightHeader.style.opacity = "0";
            gsap.set(titlesContainerElement, {
              "--before-opacity": "0",
              "--after-opacity": "0",
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
