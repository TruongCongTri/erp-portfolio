"use client";
import "./AnimatedButton.css";
import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { resolveDelay, splitLines, waitForFonts } from "@/lib/motion";

import { IoMdArrowForward } from "react-icons/io";

gsap.registerPlugin(SplitText, ScrollTrigger);

const AnimatedButton = ({
  label,
  route,
  animate = true,
  animateOnScroll = true,
  delay = 0,
  preloaderDelay,
  type = "button",
  disabled = false,
  onClick,
  icon,
}) => {
  const { navigateWithTransition, router } = useViewTransition();
  const buttonRef = useRef(null);
  const circleRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const splitRef = useRef(null);

  useGSAP(
    () => {
      if (!buttonRef.current || !textRef.current) return;

      if (!animate) {
        gsap.set(buttonRef.current, { scale: 1 });
        gsap.set(circleRef.current, { scale: 1, opacity: 1 });
        gsap.set(iconRef.current, { opacity: 1, x: 0 });
        return;
      }

      const initializeAnimation = async () => {
        await waitForFonts();

        const split = splitLines(textRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
          lineThreshold: 0.1,
        });
        splitRef.current = split;

        gsap.set(buttonRef.current, { scale: 0, transformOrigin: "center" });
        gsap.set(circleRef.current, {
          scale: 0,
          transformOrigin: "center",
          opacity: 0,
        });
        gsap.set(iconRef.current, { opacity: 0, x: -20 });
        gsap.set(split.lines, { y: "100%", opacity: 0 });

        const tl = gsap.timeline({
          delay: resolveDelay(delay, preloaderDelay),
        });

        tl.to(buttonRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });

        tl.to(
          circleRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "+0.25"
        );

        tl.to(
          iconRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-0.25"
        );

        tl.to(
          split.lines,
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.2"
        );

        if (animateOnScroll) {
          ScrollTrigger.create({
            trigger: buttonRef.current,
            start: "top 90%",
            once: true,
            animation: tl,
          });
        }
      };

      initializeAnimation();

      return () => {
        if (splitRef.current) {
          splitRef.current.revert();
        }
      };
    },
    { scope: buttonRef, dependencies: [animate, animateOnScroll, delay, preloaderDelay] }
  );

  const buttonContent = (
    <>
      <span className="circle" ref={circleRef} aria-hidden="true"></span>
      <div className="icon" ref={iconRef}>
        {icon ?? <IoMdArrowForward />}
      </div>
      {/* keyed so a label change replaces the node (Google Translate
          would otherwise keep showing the old translated text) */}
      <span className="button-text" ref={textRef} key={label}>
        {label}
      </span>
    </>
  );

  if (route) {
    return (
      <a
        href={route}
        className="btn"
        ref={buttonRef}
        onMouseEnter={() => router.prefetch(route)}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          navigateWithTransition(route);
        }}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      className="btn"
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-busy={disabled || undefined}
    >
      {buttonContent}
    </button>
  );
};

export default AnimatedButton;
