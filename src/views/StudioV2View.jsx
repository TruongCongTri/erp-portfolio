import "@/styles/studio.css";
import "@/styles/studio-v2.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Ecosystem from "@/components/Ecosystem/Ecosystem";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import SectionNav from "@/components/SectionNav/SectionNav";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

// `path` so the same view can sit on more than one route and each keeps its
// own canonical URL.
export function studioV2Metadata(lang, path = "/studio-v2") {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.studioV2Title,
    description: t.studioV2Description,
    path,
  });
}

// Same layout language as StudioView, with the fuller company story:
// intro, purpose, values, history, strengths, leadership and the ecosystem.
export default function StudioV2View({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.studioV2;

  const sections = [
    { id: "studio-purpose", label: t.purposeLabel },
    { id: "studio-values", label: t.valuesLabel },
    { id: "studio-history", label: dict.howWeWork.callout },
    { id: "studio-strengths", label: t.strengthsLabel },
    { id: "studio-leadership", label: t.leadershipLabel },
    { id: "ecosystem", label: t.ecosystemLabel },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} />
      <div className="page studio studio-v2">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.8}>
                  <p className="mono">{t.introLabel}</p>
                </Copy>
                <Copy delay={0.85}>
                  <h2>{t.introTitle}</h2>
                </Copy>
              </div>
            </div>
            <div className="studio-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.85}>
                  <h3>{t.introHeading}</h3>
                </Copy>
                <Copy delay={0.9}>
                  <p>
                    {t.introBefore}
                    <span className="text-highlight">{t.introHighlight}</span>
                    {t.introAfter}
                  </p>
                </Copy>
              </div>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero.png" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="studio-v2-purpose" id="studio-purpose">
          <div className="container">
            <div className="studio-v2-section-header">
              <Copy delay={0.1}>
                <p className="mono">{t.purposeLabel}</p>
              </Copy>
            </div>
            <div className="studio-v2-purpose-grid">
              <div className="studio-v2-purpose-card">
                <Copy delay={0.1}>
                  <p className="mono">{t.visionLabel}</p>
                </Copy>
                <Copy delay={0.15}>
                  <h3>{t.vision}</h3>
                </Copy>
              </div>
              <div className="studio-v2-purpose-card">
                <Copy delay={0.1}>
                  <p className="mono">{t.missionLabel}</p>
                </Copy>
                <Copy delay={0.15}>
                  <h2>{t.missionTitle}</h2>
                </Copy>
                <Copy delay={0.2}>
                  <p className="md">{t.mission}</p>
                </Copy>
              </div>
            </div>
          </div>
        </section>

        <section className="more-facts studio-v2-values" id="studio-values">
          <div className="container">
            <div className="studio-v2-section-header">
              <Copy delay={0.1}>
                <p className="mono">{t.valuesLabel}</p>
              </Copy>
              <Copy delay={0.15}>
                <h3>{t.valuesIntro}</h3>
              </Copy>
            </div>
            <div className="more-facts-items">
              {t.values.map((value, index) => (
                <div className="fact" key={value.title}>
                  <Copy delay={0.1 * (index + 1)}>
                    <h2>{value.title}</h2>
                    <p>{value.text}</p>
                  </Copy>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="how-we-work-container" id="studio-history">
          <div className="container">
            <HowWeWork lang={lang} />
          </div>
        </section>

        <section className="studio-v2-strengths" id="studio-strengths">
          <div className="container">
            <div className="studio-v2-section-header">
              <Copy delay={0.1}>
                <p className="mono">{t.strengthsLabel}</p>
              </Copy>
              <Copy delay={0.15}>
                <h3>{t.strengthsIntro}</h3>
              </Copy>
            </div>
            <div
              className="studio-v2-strengths-grid"
              data-reveal-cards=".studio-v2-strength"
            >
              {t.strengths.map((strength, index) => (
                <div className="studio-v2-strength" key={strength.title}>
                  <p className="mono studio-v2-strength-index">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{strength.title}</h3>
                  <ul>
                    {strength.items.map((item) => (
                      <li key={item}>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="studio-v2-leadership" id="studio-leadership">
          <div className="container">
            <div className="studio-v2-section-header">
              <Copy delay={0.1}>
                <p className="mono">{t.leadershipLabel}</p>
              </Copy>
            </div>
            <div className="studio-v2-leadership-body">
              <div className="studio-v2-leadership-aside">
                <div className="studio-v2-leadership-portrait">
                  <img
                    src="/studio/about-hero(1).png"
                    alt={t.leadership.name}
                    loading="lazy"
                  />
                </div>
                <Copy delay={0.1}>
                  <p className="mono">{t.leadership.label}</p>
                </Copy>
                <Copy delay={0.15}>
                  <h2>{t.leadership.title}</h2>
                </Copy>
              </div>
              <div className="studio-v2-leadership-message">
                {t.leadership.paragraphs.map((paragraph, index) => (
                  <Copy delay={0.1 + index * 0.05} key={paragraph}>
                    <p className="md">{paragraph}</p>
                  </Copy>
                ))}
                <div className="studio-v2-leadership-signature">
                  <Copy delay={0.1}>
                    <h3>{t.leadership.name}</h3>
                    <p className="mono">{t.leadership.role}</p>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Ecosystem lang={lang} />

        <CTAWindow img="/studio/about-cta-window.jpg" {...t.cta} />
        <Spotlight lang={lang} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
