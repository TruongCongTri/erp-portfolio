"use client";
import "@/styles/preloader.css";
import { useEffect, useState } from "react";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

let isInitialLoad = true;
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

// Plays once per full page load. Entrance animations elsewhere on the page
// detect `.loader` and use their `preloaderDelay` while it is showing.
export default function Preloader() {
  const [showPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);
      const counts = document.querySelectorAll(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit .h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1,
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-100%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1,
          );
        }
      });

      tl.to(".spinner", {
        opacity: 0,
        duration: 0.3,
      });

      tl.to(
        ".word .h1",
        {
          y: "0%",
          duration: 1,
        },
        "<",
      );

      tl.to(".divider", {
        scaleY: "100%",
        duration: 1,
        onComplete: () =>
          gsap.to(".divider", { opacity: 0, duration: 0.3, delay: 0.3 }),
      });

      tl.to("#word-1 .h1", {
        y: "100%",
        duration: 1,
        delay: 0.3,
      });

      tl.to(
        "#word-2 .h1",
        {
          y: "-100%",
          duration: 1,
        },
        "<",
      );

      tl.to(
        ".block",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          delay: 0.75,
          onStart: () => {
            gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" });
          },
          onComplete: () => {
            gsap.set(".loader", { pointerEvents: "none" });
            setLoaderAnimating(false);
          },
        },
        "<",
      );
    }
  }, [showPreloader]);

  if (!showPreloader) return null;

  // The loader is purely decorative: its text is hidden from crawlers and
  // assistive tech so the page's first heading is the real hero heading.
  return (
    <div className="loader" aria-hidden="true" data-intro>
      <div className="overlay">
        <div className="block"></div>
        <div className="block"></div>
      </div>
      <div className="intro-logo">
        <div className="word" id="word-1">
          <div className="h1">
            <span>Chính</span>
          </div>
        </div>
        <div className="word" id="word-2">
          <div className="h1">Nam</div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      <div className="counter">
        {[
          ["0", "0"],
          ["2", "7"],
          ["6", "5"],
          ["9", "8"],
          ["9", "9"],
        ].map((digits, i) => (
          <div className="count" key={i}>
            {digits.map((d, j) => (
              <div className="digit" key={j}>
                <div className="h1">{d}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
