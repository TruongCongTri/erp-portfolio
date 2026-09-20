import "./HowWeWork.css";

import Copy from "../Copy/Copy";
import HowWeWorkMotion from "./HowWeWorkMotion";
import { getDictionary } from "@/i18n";

// Four photos cycled across the milestones
const CARD_IMAGES = 4;

// Server component; the years and the cards come from one list of milestones
// so they stay in step. Pinning and the active-year indicator are handled by
// HowWeWorkMotion, the years' entrance by MotionRuntime (data-reveal).
const HowWeWork = ({ lang = "vi" }) => {
  const t = getDictionary(lang).howWeWork;

  return (
    <>
      <div className="how-we-work">
        <div className="how-we-work-col how-we-work-header">
          <div className="container">
            <div className="how-we-work-header-content">
              <div className="how-we-work-header-callout">
                <Copy delay={0.1}>
                  <p>{t.callout}</p>
                </Copy>
              </div>
              <Copy delay={0.15}>
                <h3>{t.intro}</h3>
              </Copy>
              <div
                className="how-we-work-steps"
                data-reveal=".how-we-work-step"
                data-reveal-start="top 75%"
                data-reveal-duration="0.3"
                data-reveal-stagger="-0.1"
                data-reveal-ease="none"
              >
                {t.milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`how-we-work-step ${index === 0 ? "active" : ""}`}
                  >
                    <p className="how-we-work-step-label">{t.yearLabel}</p>
                    <p className="how-we-work-step-index">{milestone.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="how-we-work-col how-we-work-cards">
          {t.milestones.map((milestone, index) => (
            <div className="how-we-work-card" key={milestone.year}>
              <div className="how-we-work-card-img">
                <img
                  loading="lazy"
                  src={`/how-we-work/process-${(index % CARD_IMAGES) + 1}.jpg`}
                  alt={t.imageAlt}
                />
              </div>
              <div className="how-we-work-card-copy">
                <div className="how-we-work-card-index-label">
                  <h3>{milestone.year}</h3>
                </div>
                <p className="md">{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HowWeWorkMotion />
    </>
  );
};

export default HowWeWork;
