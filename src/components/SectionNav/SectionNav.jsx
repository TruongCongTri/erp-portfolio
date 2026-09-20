"use client";
import "./SectionNav.css";
import { useEffect, useRef, useState } from "react";

import { useLenis } from "lenis/react";
import { IoMdArrowForward } from "react-icons/io";

import TransitionLink from "../TransitionLink/TransitionLink";
import { useI18n } from "@/i18n/client";

// Where a section counts as "current": once its top passes this much of the
// viewport. Generous, so pinned scenes stay marked while they play.
const ACTIVE_LINE = 0.4;

/**
 * Floating table of contents, top left: one dash per section of the page, the
 * current one labelled, every label on hover. Clicking scrolls there.
 *
 * @param items [{ id, label }] sections on this page, in order
 * @param links [{ path, label }] related pages, listed by name only
 */
export default function SectionNav({ items = [], links = [] }) {
  const { t, href } = useI18n();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (items.length === 0) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVE_LINE;
      let current = items[0]?.id;
      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const goTo = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    // Clear of the top bar
    if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.6, offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <nav className="section-nav" aria-label={t.sectionNav.title}>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => goTo(e, item.id)}
              aria-current={active === item.id ? "true" : undefined}
            >
              <span className="section-nav-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="section-nav-dash" aria-hidden="true" />
              <span className="section-nav-label">{item.label}</span>
            </a>
          </li>
        ))}
      </ol>

      {links.length > 0 && (
        <>
          <p className="section-nav-more">{t.sectionNav.more}</p>
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <TransitionLink href={href(link.path)} className="section-nav-link">
                  <span className="section-nav-dash" aria-hidden="true" />
                  <span className="section-nav-label">{link.label}</span>
                  <span className="section-nav-arrow" aria-hidden="true">
                    <IoMdArrowForward />
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}
