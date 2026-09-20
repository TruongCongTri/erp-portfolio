import PinnedSteps from "../PinnedSteps/PinnedSteps";
import Copy from "../Copy/Copy";

// "180000" -> "180.000" (vi) / "180,000" (en). Done by hand rather than with
// toLocaleString so the server and the browser always agree.
const group = (value, lang) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : ".");

// The design rates on a PinnedSteps scene: one card per building type, each
// carrying the rate for every style, so the 2 × 5 table is read by scrolling
// rather than across.
const RateSteps = ({ id, section, t, lang }) => (
  <PinnedSteps
    id={id}
    className="price-rates-scene"
    label={section.ratesLabel}
    intro={section.ratesIntro}
    pillLabel={t.typeLabel}
    items={section.types}
    itemKey={(type) => `${type.name}-${type.note}`}
    renderItem={(type, index) => (
      <>
        <Copy delay={0.1}>
          <h3>{type.name}</h3>
        </Copy>
        <Copy delay={0.15}>
          <p className="mono rate-note">{type.note}</p>
        </Copy>
        <dl className="rate-prices">
          {section.styles.map((style, row) => (
            <div className="rate-row" key={style}>
              <dt>
                <p className="md">{style}</p>
              </dt>
              <dd>
                <p className="rate-value">
                  {group(section.rates[row][index], lang)}
                </p>
                <p className="mono rate-unit">{t.unit}</p>
              </dd>
            </div>
          ))}
        </dl>
      </>
    )}
  />
);

export default RateSteps;
