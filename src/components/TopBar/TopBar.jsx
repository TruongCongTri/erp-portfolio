import "./TopBar.css";

import TransitionLink from "../TransitionLink/TransitionLink";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

// Server component; hide-on-scroll is handled by MotionRuntime.
const TopBar = () => {
  return (
    <header className="top-bar" data-hide-on-scroll>
      <div className="top-bar-logo">
        <TransitionLink href="/" aria-label="Chính Nam - Trang chủ">
          <img src="/logos/chinhnam-logo-symbol.png" alt="Chính Nam" />
        </TransitionLink>
      </div>
      <div className="top-bar-cta">
        <AnimatedButton label="Reserve" route="/connect" animate={false} />
      </div>
    </header>
  );
};

export default TopBar;
