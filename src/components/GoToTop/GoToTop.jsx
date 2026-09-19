"use client";
import "./GoToTop.css";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import { IoMdArrowUp } from "react-icons/io";

import AnimatedButton from "../AnimatedButton/AnimatedButton";

const SCROLL_DURATION = 2.5;

// Bottom-right mirror of the top bar's Reserve button: slides up from below
// once the visitor has scrolled away from the top, slides back down near it.
export default function GoToTop() {
  const ref = useRef(null);
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

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

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: SCROLL_DURATION });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="go-top" ref={ref} inert={!visible}>
      <AnimatedButton
        label="Go to top"
        animate={false}
        icon={<IoMdArrowUp />}
        onClick={scrollToTop}
      />
    </div>
  );
}
