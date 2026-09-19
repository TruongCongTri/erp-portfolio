"use client";
import "./ApplyFloatingButton.css";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import { IoMdArrowDown } from "react-icons/io";

// Floating pill next to the Menu button that scrolls to the apply form.
// Hidden while the form itself is on screen; slides up from below the
// viewport like GoToTop.
export default function ApplyFloatingButton({
  targetId = "apply",
  label = "Ứng tuyển",
}) {
  const ref = useRef(null);
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(scrollTimerRef.current), []);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const offset = parseFloat(getComputedStyle(el).bottom) || 0;
    gsap.to(el, {
      y: visible ? 0 : el.offsetHeight + offset,
      duration: 1,
      ease: "power4.out",
      overwrite: true,
    });
  }, [visible]);

  const handleClick = (e) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();

    // Loop the arrow animation until the scroll finishes.
    const SCROLL_DURATION = 3;
    const stopScrolling = () => {
      clearTimeout(scrollTimerRef.current);
      setScrolling(false);
    };
    setScrolling(true);
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(
      stopScrolling,
      SCROLL_DURATION * 1000 + 200,
    );

    if (lenis) {
      lenis.scrollTo(target, {
        duration: SCROLL_DURATION,
        onComplete: stopScrolling,
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
    history.replaceState(null, "", `#${targetId}`);
    setTimeout(() => {
      target
        .querySelector("input:not([type=hidden])")
        ?.focus({ preventScroll: true });
    }, SCROLL_DURATION * 1000);
  };

  return (
    <a
      ref={ref}
      href={`#${targetId}`}
      className={[
        "apply-fab",
        visible && "visible",
        scrolling && "scrolling",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
      inert={!visible}
    >
      <span className="apply-fab-icon" aria-hidden="true">
        <span className="apply-fab-arrow">
          <IoMdArrowDown />
        </span>
      </span>
      <span className="apply-fab-label">{label}</span>
    </a>
  );
}
