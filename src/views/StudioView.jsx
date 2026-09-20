import "@/styles/studio.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import SectionNav from "@/components/SectionNav/SectionNav";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function studioMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.studioTitle,
    description: t.studioDescription,
    path: "/gioi-thieu",
  });
}

export default function StudioView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.studio;

  const sections = [
    { id: "studio-overview", label: t.overviewLabel },
    { id: "studio-values", label: t.valuesLabel },
    { id: "studio-history", label: dict.howWeWork.callout },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} />
      <div className="page studio">
        <section className="studio-hero" id="studio-overview">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  {t.introBefore}
                  <span className="text-highlight">{t.introHighlight}</span>
                  {t.introAfter}
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.85}>
                  <p>{t.missionLabel}</p>
                </Copy>
                <Copy delay={0.9}>
                  <h3>{t.mission}</h3>
                </Copy>
              </div>
              <div className="studio-hero-content">
                <Copy delay={0.85}>
                  <p>{t.visionLabel}</p>
                </Copy>
                <Copy delay={0.9}>
                  <h2>{t.visionTitle}</h2>
                  <h3>{t.vision}</h3>
                </Copy>
              </div>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero(1).png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts" id="studio-values">
          <div className="container">
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
        <CTAWindow img="/studio/about-cta-window.jpg" {...t.cta} />
        <Spotlight lang={lang} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
