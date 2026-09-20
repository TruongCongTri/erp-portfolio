import "./Orbit.css";

import Copy from "../Copy/Copy";
import OrbitMotion from "./OrbitMotion";

const CENTER = 50; // the SVG viewBox is 100 × 100

// Fewer items means bigger circles, a tighter ring and a smaller hub, so a
// three-node wheel is as balanced as a six-node one. Both scales add up to
// 0.5 so the outermost circle stops exactly at the edge of the square.
const scales = (count) =>
  count > 4
    ? { node: 0.25, radius: 0.38, hub: 0.3 }
    : { node: 0.3, radius: 0.35, hub: 0.26 };

const pad = (index) => String(index + 1).padStart(2, "0");

const spoke = (index, total, radius) => {
  const angle = ((index * (360 / total) - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * 100 * Math.cos(angle),
    y: CENTER + radius * 100 * Math.sin(angle),
  };
};

// A wheel of items pinned beside a column of cards: scrolling moves from one
// item to the next (the ring fills as it goes) and clicking an item on the
// wheel jumps to its card. Server component - OrbitMotion drives the scene.
//
// `items` feeds both halves: `nodeLabel` names the circle on the wheel and
// `renderItem` fills the card. `id` must be unique on the page.
const Orbit = ({
  id,
  label,
  intro,
  hint,
  hubLabel,
  hubImage = "/logos/chinhnam-logo-symbol.png",
  items,
  itemKey = (item, index) => index,
  nodeLabel,
  renderItem,
  footnote,
}) => {
  const step = 360 / items.length;
  const { node, radius, hub } = scales(items.length);

  return (
    <section className="orbit" id={id}>
      <div className="container">
        <div className="orbit-header">
          <Copy delay={0.1}>
            <p className="mono">{label}</p>
          </Copy>
          <Copy delay={0.15}>
            <h3>{intro}</h3>
          </Copy>
        </div>

        <div className="orbit-body">
          <div className="orbit-wheel-col">
            <div
              className="orbit-wheel"
              style={{
                "--node-scale": node,
                "--radius-scale": radius,
                "--hub-scale": hub,
              }}
            >
              <svg className="orbit-ring" viewBox="0 0 100 100" aria-hidden>
                {items.map((item, index) => {
                  const point = spoke(index, items.length, radius);
                  return (
                    <line
                      className="orbit-spoke"
                      key={itemKey(item, index)}
                      x1={CENTER}
                      y1={CENTER}
                      x2={point.x}
                      y2={point.y}
                    />
                  );
                })}
                <circle
                  className="orbit-ring-track"
                  cx={CENTER}
                  cy={CENTER}
                  r={radius * 100}
                  transform={`rotate(-90 ${CENTER} ${CENTER})`}
                />
                {/* Fills as the cards scroll past */}
                <circle
                  className="orbit-ring-progress"
                  cx={CENTER}
                  cy={CENTER}
                  r={radius * 100}
                  transform={`rotate(-90 ${CENTER} ${CENTER})`}
                />
              </svg>

              <div className="orbit-hub">
                <img src={hubImage} alt="" />
                <p className="mono">{hubLabel}</p>
              </div>

              {items.map((item, index) => (
                <button
                  type="button"
                  key={itemKey(item, index)}
                  data-index={index}
                  className={`orbit-node ${index === 0 ? "active" : ""}`}
                  style={{ "--a": `${index * step}deg` }}
                  aria-pressed={index === 0}
                >
                  <span className="orbit-node-index mono">{pad(index)}</span>
                  <span className="orbit-node-name">
                    {nodeLabel(item, index)}
                  </span>
                </button>
              ))}
            </div>
            <p className="mono orbit-hint">{hint}</p>
          </div>

          <div className="orbit-detail">
            {items.map((item, index) => (
              <article
                className={`orbit-card ${index === 0 ? "active" : ""}`}
                key={itemKey(item, index)}
              >
                <div className="orbit-card-index">
                  <h2>{pad(index)}</h2>
                </div>
                {renderItem(item, index)}
              </article>
            ))}
            {footnote && <p className="mono orbit-footnote">{footnote}</p>}
          </div>
        </div>
      </div>
      <OrbitMotion id={id} />
    </section>
  );
};

export default Orbit;
