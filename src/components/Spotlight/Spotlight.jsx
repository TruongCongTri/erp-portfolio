import "./Spotlight.css";

import SpotlightMotion from "./SpotlightMotion";

const spotlightItems = [
  { name: "Courtyard Stillness", img: "/spotlight/spotlight-img-1.jpg" },
  { name: "Blue Horizon", img: "/spotlight/spotlight-img-2.jpg" },
  { name: "Stone Quiet", img: "/spotlight/spotlight-img-3.jpg" },
  { name: "Amber Niche", img: "/spotlight/spotlight-img-4.jpg" },
  { name: "Earthen Shelf", img: "/spotlight/spotlight-img-5.jpg" },
  { name: "Reflective White", img: "/spotlight/spotlight-img-6.jpg" },
  { name: "Desert Edge", img: "/spotlight/spotlight-img-7.jpg" },
  { name: "Soft Passage", img: "/spotlight/spotlight-img-8.jpg" },
  { name: "Water Column", img: "/spotlight/spotlight-img-9.jpg" },
  { name: "Golden Retreat", img: "/spotlight/spotlight-img-10.jpg" },
];

// Server component; the pinned scroll scene is driven by SpotlightMotion.
// NOTE: when changing the number of items, retune the config in SpotlightMotion.
const Spotlight = () => {
  return (
    <section className="spotlight">
      <div className="spotlight-inner">
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text">
            <p>Beneath</p>
          </div>
          <div className="spotlight-intro-text">
            <p>Beyond</p>
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
        <p>Discover</p>
      </div>
      <div className="spotlight-outline"></div>
      <SpotlightMotion />
    </section>
  );
};

export default Spotlight;
