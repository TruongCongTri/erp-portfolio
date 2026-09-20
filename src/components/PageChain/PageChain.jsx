"use client";
import "./PageChain.css";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

import TransitionLink from "../TransitionLink/TransitionLink";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useI18n } from "@/i18n/client";

gsap.registerPlugin(ScrollTrigger);

// How much scrolling past the end of the page opens the next one: a few
// turns of the wheel, or one deliberate swipe. A finger covers far less
// ground than a wheel, so touch has its own distance.
const TRAVEL = { wheel: 420, touch: 460 };
const STEP_CAP = 160;
const DECAY_AFTER = 220;
const COOLDOWN = 1200;

// Where the browser should land when a page is opened by this gesture.
const ENTER_KEY = "page-chain-enter";

// Chains two routes into one continuous scroll: keep scrolling past the end of
// the page (or back past the top) and a veil rises while a ring fills; fill it
// and the next page opens with the site's view transition. There is no button
// - scrolling is the whole interaction - so the only other way through is the
// link for keyboards and crawlers, which stays off screen until it is focused.
export default function PageChain({
  direction = "next", // "next" reads at the bottom, "prev" at the top
  path,
  label,
  title,
  hint,
}) {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const { href: localize } = useI18n();
  const { navigateWithTransition, router } = useViewTransition();
  const target = localize(path);
  const targetRef = useRef(target);
  targetRef.current = target;

  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const veilRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const veil = veilRef.current;
    const ring = ringRef.current;
    if (!panel || !veil || !ring) return;

    router.prefetch(targetRef.current);

    // Pull-to-refresh and rubber banding would eat the gesture at the edges.
    const root = document.documentElement;
    const previousOverscroll = root.style.overscrollBehaviorY;
    root.style.overscrollBehaviorY = "contain";

    // Arriving from the page on the other side of this link: pick up the
    // scroll where it left off instead of jumping to the top.
    let readyAt = performance.now() + COOLDOWN;
    let entered = null;
    try {
      entered = sessionStorage.getItem(ENTER_KEY);
      sessionStorage.removeItem(ENTER_KEY);
    } catch {
      entered = null;
    }

    // Which edge this page should open on, if the chain is what opened it.
    // Coming back opens the previous page at its end; going on opens the next
    // one at its start, and holding that start matters because the visitor is
    // usually still scrolling when the page changes.
    const landing =
      entered === "bottom" && direction === "next"
        ? "bottom"
        : entered === "top" && direction === "prev"
          ? "top"
          : null;

    // The page is still growing on arrival - images, pinned scenes - so the
    // bottom keeps moving. Follow the edge until the height settles, and let
    // go the moment the visitor scrolls for themselves.
    let stopSettling = () => {};

    if (landing) {
      const pin = () => {
        const edge =
          landing === "bottom" ? document.documentElement.scrollHeight : 0;
        lenisRef.current?.scrollTo(edge, { immediate: true });
        window.scrollTo(0, edge);
      };

      let observer;
      let settleTimer;
      let settleTicker;
      // The visitor is usually still flicking the wheel when the new page
      // mounts, so their leftover momentum must not count as "they took over".
      // The top needs holding only for that; the bottom keeps moving while
      // the page grows, so it is held longer.
      const grace = landing === "bottom" ? 700 : 450;
      const graceUntil = performance.now() + grace;

      const onUserInput = () => {
        if (performance.now() < graceUntil) return;
        stopSettling();
      };

      stopSettling = () => {
        observer?.disconnect();
        clearInterval(settleTicker);
        clearTimeout(settleTimer);
        window.removeEventListener("wheel", onUserInput);
        window.removeEventListener("touchstart", onUserInput);
        readyAt = Math.min(readyAt, performance.now() + 400);
      };

      requestAnimationFrame(() => {
        pin();
        ScrollTrigger.refresh();
        observer = new ResizeObserver(() => {
          pin();
          ScrollTrigger.refresh();
        });
        observer.observe(document.body);
        // A belt-and-braces re-pin: not every growth shows up as a body resize
        // (late images inside pinned scenes, fonts, refreshed triggers).
        settleTicker = setInterval(pin, 150);
        settleTimer = setTimeout(stopSettling, landing === "bottom" ? 1800 : 900);
      });

      window.addEventListener("wheel", onUserInput, { passive: true });
      window.addEventListener("touchstart", onUserInput, { passive: true });
    }

    const length = ring.getTotalLength();
    gsap.set(ring, { strokeDasharray: length, strokeDashoffset: length });

    const state = { progress: 0 };
    let firing = false;
    let decayTimer;
    let decayTween;
    // The hint only invites you at an edge you have actually scrolled away
    // from, so landing on a page does not immediately suggest leaving it.
    let hasLeftEdge = false;

    const atEdge = () => {
      if (direction === "prev") return window.scrollY <= 4;
      const doc = document.documentElement;
      return window.scrollY + window.innerHeight >= doc.scrollHeight - 4;
    };

    const render = () => {
      const { progress } = state;
      gsap.set(ring, { strokeDashoffset: length * (1 - progress) });
      gsap.set(veil, { opacity: progress, scaleY: 0.25 + progress * 0.75 });
      panel.classList.toggle(
        "visible",
        progress > 0.02 || (hasLeftEdge && atEdge() && !firing),
      );
      panel.classList.toggle("pushing", progress > 0.02);
    };

    const decay = () => {
      clearTimeout(decayTimer);
      decayTimer = setTimeout(() => {
        decayTween = gsap.to(state, {
          progress: 0,
          duration: 0.4,
          ease: "power2.out",
          onUpdate: render,
        });
      }, DECAY_AFTER);
    };

    const fire = () => {
      firing = true;
      clearTimeout(decayTimer);
      decayTween?.kill();
      panel.classList.add("firing");
      gsap.to(veil, { opacity: 1, scaleY: 1, duration: 0.25 });
      try {
        // The page we are leaving is below the one we are opening, so that
        // page should open at its end.
        sessionStorage.setItem(
          ENTER_KEY,
          direction === "prev" ? "bottom" : "top",
        );
      } catch {
        /* private mode: the next page just opens at the top */
      }
      gsap.delayedCall(0.25, () => navigateWithTransition(targetRef.current));
    };

    // One push of the scroll, whatever produced it.
    const push = (delta, source) => {
      if (firing || performance.now() < readyAt) return;

      const pushing = direction === "prev" ? delta < 0 : delta > 0;
      if (!pushing || !atEdge()) {
        if (state.progress > 0) decay();
        return;
      }

      decayTween?.kill();
      clearTimeout(decayTimer);
      state.progress = Math.min(
        1,
        state.progress + Math.min(Math.abs(delta), STEP_CAP) / TRAVEL[source],
      );
      render();

      if (state.progress >= 1) fire();
      else decay();
    };

    const onWheel = (event) => push(event.deltaY, "wheel");

    let touchY = null;
    const onTouchStart = (event) => {
      touchY = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event) => {
      const y = event.touches[0]?.clientY;
      if (touchY === null || y == null) return;
      const delta = touchY - y; // dragging the finger up scrolls down
      touchY = y;
      push(delta, "touch");
    };
    const onTouchEnd = () => {
      touchY = null;
      if (state.progress > 0) decay();
    };

    // Tracks whether the hint should be offered at this edge.
    let scrollQueued = false;
    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        if (firing) return;
        if (!atEdge()) hasLeftEdge = true;
        render();
      });
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(decayTimer);
      decayTween?.kill();
      gsap.killTweensOf(state);
      stopSettling();
      root.style.overscrollBehaviorY = previousOverscroll;
    };
  }, [direction, router, navigateWithTransition]);

  return (
    <div className={`page-chain page-chain-${direction}`} ref={rootRef}>
      {/* Off screen until tabbed to: the gesture cannot be reached by keyboard
          and crawlers still need an <a href> between the two pages. */}
      <TransitionLink href={target} className="page-chain-jump">
        {label} — {title}
      </TransitionLink>

      <div className="page-chain-veil" ref={veilRef} aria-hidden="true" />

      <div className="page-chain-panel" ref={panelRef} aria-hidden="true">
        <div className="page-chain-ring">
          <svg viewBox="0 0 40 40">
            <circle className="page-chain-ring-track" cx="20" cy="20" r="18" />
            <circle
              className="page-chain-ring-progress"
              cx="20"
              cy="20"
              r="18"
              transform="rotate(-90 20 20)"
              ref={ringRef}
            />
          </svg>
          <span className="page-chain-ring-arrow">
            {direction === "prev" ? "↑" : "↓"}
          </span>
        </div>
        <div className="page-chain-panel-copy">
          <p className="page-chain-panel-title">
            <span className="mono">{label}</span> {title}
          </p>
          <p className="mono page-chain-panel-hint">{hint}</p>
        </div>
      </div>
    </div>
  );
}
