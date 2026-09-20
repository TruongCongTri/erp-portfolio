import "./TopBar.css";

import LocalizedLink from "../TransitionLink/LocalizedLink";
import ReserveButton from "./ReserveButton";
import LanguageSwitcher from "../Language/LanguageSwitcher";

// Server component; hide-on-scroll is handled by MotionRuntime.
const TopBar = () => {
  return (
    <header className="top-bar" data-hide-on-scroll>
      <div className="top-bar-logo">
        <LocalizedLink href="/" aria-label="Chính Nam">
          <img src="/logos/chinhnam-logo-symbol.png" alt="Chính Nam" />
        </LocalizedLink>
      </div>
      <div className="top-bar-cta">
        <LanguageSwitcher />
        <ReserveButton />
      </div>
    </header>
  );
};

export default TopBar;
