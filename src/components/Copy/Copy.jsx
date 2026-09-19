import "./Copy.css";
import React from "react";

// Server component: renders the text as-is and marks it for the line-reveal
// animation run by MotionRuntime.
export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  preloaderDelay,
}) {
  const attrs = {
    "data-copy": animateOnScroll ? "scroll" : "load",
    "data-copy-delay": delay,
    ...(preloaderDelay != null && {
      "data-copy-preloader-delay": preloaderDelay,
    }),
  };

  // Ignore conditional `false`/`null` children so a single element is
  // animated directly instead of through a wrapper.
  const items = React.Children.toArray(children);

  if (items.length === 1 && React.isValidElement(items[0])) {
    return React.cloneElement(items[0], attrs);
  }

  return (
    <div data-copy-wrapper="true" {...attrs}>
      {items}
    </div>
  );
}
