import "@/styles/studio.css";
import "@/styles/design-consult.css";

import Nav from "@/components/Nav/Nav";
import DesignProcess from "@/components/DesignProcess/DesignProcess";
import PageChain from "@/components/PageChain/PageChain";
import SectionNav from "@/components/SectionNav/SectionNav";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function designMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.designTitle,
    description: t.designDescription,
    path: "/tu-van-thiet-ke",
  });
}

const pad = (index) => String(index + 1).padStart(2, "0");

// Design consultation, built like AllInOneView: the hero reveals line by line,
// the numbered sections follow, and the five stages run as a pinned scene.
//
// No footer: the page runs on into /bang-gia-thiet-ke (PageChain), and the
// footer waits at the end of that one.
export default function DesignConsultView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.designConsult;

  const sections = [
    { id: "design-overview", label: t.introLabel },
    { id: "design-interior", label: t.interiorLabel },
    { id: "design-process", label: t.processLabel },
  ];
  // The two price lists, by name only
  const links = [
    { path: "/bang-gia-thiet-ke", label: dict.meta.designPricingTitle },
    { path: "/bang-gia", label: dict.meta.pricingTitle },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} links={links} />
      <div className="page studio design-consult">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.8}>
                  <p className="mono">{t.heroLabel}</p>
                </Copy>
                <Copy delay={0.85}>
                  <h2>{t.heroTitle}</h2>
                </Copy>
              </div>
            </div>
            <div className="studio-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.9}>
                  <p className="md">{t.heroText}</p>
                </Copy>
              </div>
              <div className="studio-hero-hero-img">
                <img src="/gallery-callout/gallery-callout-1.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="design-section-intro" id="design-overview">
          <div className="container">
            <div className="design-section-header">
              <Copy delay={0.1}>
                <p className="mono design-section-index">{pad(0)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{t.introLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <section className="design-intro">
          <div className="container">
            <div className="design-intro-col">
              <Copy delay={0.1}>
                <h3>{t.introHeading}</h3>
              </Copy>
            </div>
            <div className="design-intro-col">
              {t.intro.map((paragraph, index) => (
                <Copy delay={0.1 + index * 0.05} key={paragraph}>
                  <p className="md">{paragraph}</p>
                </Copy>
              ))}
            </div>
          </div>
        </section>

        <section className="design-statement">
          <div className="container">
            <Copy delay={0.1}>
              <h3>{t.statement}</h3>
            </Copy>
          </div>
        </section>

        <section className="design-interior" id="design-interior">
          <div className="container">
            <div className="design-interior-header">
              <Copy delay={0.1}>
                <p className="mono">{t.interiorLabel}</p>
              </Copy>
            </div>
            <div
              className="design-interior-grid"
              data-reveal-cards=".design-interior-card"
            >
              {t.interior.map((paragraph, index) => (
                <div className="design-interior-card" key={paragraph}>
                  <p className="mono design-interior-index">{pad(index)}</p>
                  <p className="md">{paragraph}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="design-section-intro">
          <div className="container">
            <div className="design-section-header">
              <Copy delay={0.1}>
                <p className="mono design-section-index">{pad(1)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{t.processLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <DesignProcess lang={lang} />

        <CTAWindow img="/gallery-callout/gallery-callout-4.jpg" {...t.cta} />
        <Spotlight lang={lang} />

        {/* Scrolling on past the end opens the design rates */}
        <PageChain
          direction="next"
          path="/bang-gia-thiet-ke"
          label={t.nextLabel}
          title={t.nextTitle}
          hint={t.nextHint}
        />
      </div>
    </>
  );
}
