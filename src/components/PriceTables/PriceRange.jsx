import Copy from "../Copy/Copy";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { localizePath } from "@/i18n";

// "6350000" -> "6.350.000" (vi) / "6,350,000" (en)
const group = (value, lang) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : ".");

// A single quoted range rather than a table: the turnkey price moves with the
// style and the materials, so the number is a bracket and the card sends you
// on to a conversation.
const PriceRange = ({ section, t, lang }) => (
  <section className="price-range">
    <div className="container">
      <div className="price-range-card" data-reveal-cards=".price-range-card">
        <div className="price-range-figure">
          <Copy delay={0.1}>
            <p className="mono price-range-label">{section.rangeLabel}</p>
          </Copy>
          <Copy delay={0.15}>
            <p className="mono price-range-note">{section.rangeNote}</p>
          </Copy>
          <p className="price-range-value">
            <span>{group(section.rangeFrom, lang)}</span>
            <span className="price-range-dash" aria-hidden="true">
              —
            </span>
            <span>{group(section.rangeTo, lang)}</span>
          </p>
          <p className="mono price-range-unit">{t.unit}</p>
        </div>
        <div className="price-range-copy">
          <Copy delay={0.1}>
            <p className="md">{section.text}</p>
          </Copy>
          <AnimatedButton
            label={t.contactCta}
            route={localizePath(lang, "/lien-he")}
          />
        </div>
      </div>
    </div>
  </section>
);

export default PriceRange;
