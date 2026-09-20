import "./MapEmbed.css";

import { siteConfig } from "@/lib/site";

// Google map of the head office. Loads only when it scrolls into view, so it
// costs nothing on pages that are never scrolled to the bottom.
export default function MapEmbed({ title, className = "" }) {
  return (
    <div className={`map-embed ${className}`.trim()}>
      <iframe
        src={siteConfig.contact.mapEmbed}
        title={title}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
