"use client";
import "./FloatingAction.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import { IoMdArrowDown } from "react-icons/io";

import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { useI18n } from "@/i18n/client";

// Any form section hides the button while on screen; one with
// data-floating-cta="<label>" (FormSection's `floatingLabel`) also gets the
// "<label> ↓" action before it.
const FORM_SELECTOR = ".form-section";
const FORM_SCROLL_DURATION = 3;
const TOP_SCROLL_DURATION = 2.5;

// The one floating button, bottom-right (mirrors the top bar's Reserve).
// Pages with an opted-in form: "<label> ↓" before the form, hidden while it's
// on screen, "Go to top ↑" once it's passed. Other pages: "Go to top ↑" after
// scrolling ¾ of a screen (still hidden over any form).
export default function FloatingAction() {
  const pathname = usePathname();
  const { t } = useI18n();
  const lenis = useLenis();
  const ref = useRef(null);
  const formRef = useRef(null);
  const shownRef = useRef(false);
  const scrollTimerRef = useRef(null);
  // Freezes the shown action while a click-triggered scroll is running, so
  // "back to top" doesn't turn into "<label> ↓" as it passes the form.
  const lockedRef = useRef(false);

  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("top"); // what the scroll position asks for
  const [displayMode, setDisplayMode] = useState("top"); // what's rendered
  const [formLabel, setFormLabel] = useState("");
  const [scrolling, setScrolling] = useState(false);

  // Work out the wanted state from the scroll position.
  const update = useCallback(() => {
    if (lockedRef.current) return;
    const form = formRef.current;
    const vh = window.innerHeight;
    let formInView = false;
    let beforeForm = false;
    if (form) {
      const rect = form.getBoundingClientRect();
      formInView = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
      beforeForm = rect.top > 0;
    }

    if (form?.dataset.floatingCta && beforeForm) {
      setMode("form");
      setVisible(!formInView);
      return;
    }
    setMode("top");
    setVisible(!formInView && window.scrollY > vh * 0.75);
  }, []);

  // Re-detect the page's form on every navigation.
  useEffect(() => {
    formRef.current = document.querySelector(FORM_SELECTOR);
    setFormLabel(formRef.current?.dataset.floatingCta ?? "");
    update();
  }, [pathname, update]);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(scrollTimerRef.current);
    };
  }, [update]);

  // Slide in/out like the Reserve bar (from the bottom). When the action
  // changes while shown, slide out, swap, then slide back in.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const offscreen = el.offsetHeight + (parseFloat(getComputedStyle(el).bottom) || 0);
    const show = () =>
      gsap.to(el, { y: 0, duration: 1, ease: "power4.out", overwrite: true });

    if (visible && mode !== displayMode) {
      if (shownRef.current) {
        gsap.to(el, {
          y: offscreen,
          duration: 0.4,
          ease: "power3.in",
          overwrite: true,
          onComplete: () => {
            setDisplayMode(mode);
            show();
          },
        });
      } else {
        setDisplayMode(mode);
        show();
      }
    } else if (visible) {
      show();
    } else {
      gsap.to(el, { y: offscreen, duration: 1, ease: "power4.out", overwrite: true });
    }
    shownRef.current = visible;
  }, [visible, mode, displayMode]);

  const handleClick = () => {
    const toForm = displayMode === "form" && formRef.current;
    const duration = toForm ? FORM_SCROLL_DURATION : TOP_SCROLL_DURATION;

    // Loop the arrow animation until the scroll finishes.
    const stopScrolling = () => {
      clearTimeout(scrollTimerRef.current);
      lockedRef.current = false;
      setScrolling(false);
      update();
    };
    lockedRef.current = true;
    setScrolling(true);
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(stopScrolling, duration * 1000 + 200);

    const target = toForm ? formRef.current : 0;
    if (lenis) {
      lenis.scrollTo(target, { duration, onComplete: stopScrolling });
    } else if (toForm) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (toForm) {
      const form = formRef.current;
      setTimeout(() => {
        form
          .querySelector("input:not([type=hidden]):not([readonly]), textarea")
          ?.focus({ preventScroll: true });
      }, duration * 1000);
    }
  };

  const isForm = displayMode === "form";

  return (
    <div
      ref={ref}
      className={[
        "floating-action",
        isForm ? "to-form" : "to-top",
        scrolling && "scrolling",
      ]
        .filter(Boolean)
        .join(" ")}
      inert={!visible}
    >
      <AnimatedButton
        label={isForm ? formLabel : t.common.backToTop}
        animate={false}
        icon={
          <span className="floating-action-arrow">
            <IoMdArrowDown />
          </span>
        }
        onClick={handleClick}
      />
    </div>
  );
}
