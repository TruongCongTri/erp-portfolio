import "./Spotlight.css";

import SpotlightMotion from "./SpotlightMotion";
import { getDictionary } from "@/i18n";

const spotlightImages = Array.from(
  { length: 10 },
  (_, index) => `/spotlight/spotlight-img-${index + 1}.jpg`,
);

// Server component; the pinned scroll scene is driven by SpotlightMotion.
// NOTE: when changing the number of items, retune the config in SpotlightMotion.
const Spotlight = ({ lang = "vi" }) => {
  const t = getDictionary(lang).spotlight;
  const spotlightItems = t.items.map((name, index) => ({
    name,
    img: spotlightImages[index],
  }));

  return (
    <section className="spotlight">
      <div className="spotlight-inner">
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text">
            <p>{t.introLeft}</p>
          </div>
          <div className="spotlight-intro-text">
            <p>{t.introRight}</p>
          </div>
        </div>
        <div className="spotlight-bg-img">
          <img src={spotlightItems[0].img} alt="" loading="lazy" />
        </div>
      </div>
      <div className="spotlight-titles-container">
        <div className="spotlight-titles">
          {spotlightItems.map((item, index) => (
            <h2
              className="spotlight-title"
              key={item.name}
              style={index === 0 ? { opacity: 1 } : undefined}
            >
              {item.name}
            </h2>
          ))}
        </div>
      </div>
      <div className="spotlight-images">
        {spotlightItems.map((item) => (
          <div className="spotlight-img" key={item.name}>
            <img src={item.img} alt={item.name} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="spotlight-header">
        <p>{t.header}</p>
      </div>
      <div className="spotlight-outline"></div>
      <SpotlightMotion />
    </section>
  );
};

export default Spotlight;
