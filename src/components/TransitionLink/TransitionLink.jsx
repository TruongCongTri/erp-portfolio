"use client";
import { useViewTransition } from "@/hooks/useViewTransition";

// A real <a href> (crawlable, works without JS) that navigates with the
// site's view transition when clicked. Children can be server-rendered.
export default function TransitionLink({ href, children, ...props }) {
  const { navigateWithTransition, router } = useViewTransition();

  return (
    <a
      href={href}
      {...props}
      onMouseEnter={() => router.prefetch(href)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigateWithTransition(href);
      }}
    >
      {children}
    </a>
  );
}
