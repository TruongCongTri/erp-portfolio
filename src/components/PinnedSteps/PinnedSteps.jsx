import "./PinnedSteps.css";

import Copy from "../Copy/Copy";
import PinnedStepsMotion from "./PinnedStepsMotion";

const pad = (index) => String(index + 1).padStart(2, "0");

// The HowWeWork scene, as a component: a header and a row of numbered pills
// pinned on the left while the cards scroll past on the right, the pill for
// the card in view expanding to carry its label. `renderItem` fills the cards,
// so only the content differs between the pages that use it. `id` must be
// unique on the page - PinnedStepsMotion scopes itself to it.
const PinnedSteps = ({
  id,
  className = "",
  label,
  intro,
  pillLabel,
  items,
  itemKey = (item, index) => index,
  pillValue = (item, index) => pad(index),
  renderItem,
}) => (
  <section className={`pinned-steps-container ${className}`} id={id}>
    <div className="container">
      <div className="pinned-steps">
        <div className="pinned-steps-col pinned-steps-header">
          <div className="container">
            <div className="pinned-steps-header-content">
              <Copy delay={0.1}>
                <p className="mono pinned-steps-label">{label}</p>
              </Copy>
              <Copy delay={0.15}>
                <h3>{intro}</h3>
              </Copy>
              <div
                className="pinned-steps-pills"
                data-reveal=".pinned-steps-pill"
                data-reveal-start="top 75%"
                data-reveal-duration="0.3"
                data-reveal-stagger="-0.1"
                data-reveal-ease="none"
              >
                {items.map((item, index) => (
                  <div
                    key={itemKey(item, index)}
                    className={`pinned-steps-pill ${
                      index === 0 ? "active" : ""
                    }`}
                  >
                    <p className="pinned-steps-pill-label">{pillLabel}</p>
                    <p className="pinned-steps-pill-index">
                      {pillValue(item, index)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pinned-steps-col pinned-steps-cards">
          {items.map((item, index) => (
            <div className="pinned-steps-card" key={itemKey(item, index)}>
              <div className="pinned-steps-card-index">
                <h2>{pad(index)}</h2>
              </div>
              <div className="pinned-steps-card-copy">
                {renderItem(item, index)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <PinnedStepsMotion id={id} />
  </section>
);

export default PinnedSteps;
