"use client";
import "./RouteProgress.css";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { TRANSITION_START } from "@/hooks/useViewTransition";

// A bar across the top of the window, from the click to the new page being
// shown. Next has to fetch the route before the view transition can start, and
// without this that wait looks like nothing happened.
//
// It creeps towards 90% while the route loads, then completes and fades out
// once the pathname changes.
export default function RouteProgress() {
  const pathname = usePathname();
  const barRef = useRef(null);
  const timers = useRef([]);
  const running = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const start = () => {
      clearTimers();
      running.current = true;
      bar.classList.remove("done");
      bar.classList.add("running");
      bar.style.transform = "scaleX(0.05)";
      // Two steps rather than one long tween, so it keeps moving on a slow
      // route without ever reaching the end on its own.
      timers.current.push(
        setTimeout(() => {
          bar.style.transform = "scaleX(0.55)";
        }, 20),
        setTimeout(() => {
          bar.style.transform = "scaleX(0.9)";
        }, 420),
      );
    };

    window.addEventListener(TRANSITION_START, start);
    return () => {
      window.removeEventListener(TRANSITION_START, start);
      clearTimers();
    };
  }, []);

  // The new route is on screen: finish and get out of the way.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !running.current) return;

    clearTimers();
    running.current = false;
    bar.style.transform = "scaleX(1)";
    bar.classList.add("done");

    timers.current.push(
      setTimeout(() => {
        bar.classList.remove("running", "done");
        bar.style.transform = "scaleX(0)";
      }, 320),
    );
  }, [pathname]);

  return (
    <div className="route-progress" aria-hidden="true">
      <span className="route-progress-bar" ref={barRef} />
    </div>
  );
}
