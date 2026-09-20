import "@/styles/studio.css";
import "@/styles/construction.css";

import Nav from "@/components/Nav/Nav";
import ConstructionSchedule from "@/components/ConstructionSchedule/ConstructionSchedule";
import PageChain from "@/components/PageChain/PageChain";
import SectionNav from "@/components/SectionNav/SectionNav";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function constructionMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.constructionTitle,
    description: t.constructionDescription,
    path: "/thi-cong-xay-dung",
  });
}

const pad = (index) => String(index + 1).padStart(2, "0");

// Structural construction, in the same scroll language as AllInOneView.
//
// No footer: the page runs on into /bang-gia-thi-cong (PageChain), and the
// footer waits at the end of that one.
export default function ConstructionView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.construction;
  // The structural items are the ones the turnkey schedule already lists.
  const rough = dict.allInOne.schedule.find((stage) => stage.key === "rough");

  const sections = [
    { id: "construction-intro", label: t.introLabel },
    { id: "construction-process", label: t.processLabel },
  ];
  const links = [
    { path: "/bang-gia-thi-cong", label: dict.meta.constructionPricingTitle },
    { path: "/xay-nha-tron-goi", label: dict.nav.turnkey },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} links={links} />
      <div className="page studio construction">
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
                <img src="/how-we-work/process-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="construction-section-intro" id="construction-intro">
          <div className="container">
            <div className="construction-section-header">
              <Copy delay={0.1}>
                <p className="mono construction-section-index">{pad(0)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{t.introLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <section className="construction-intro">
          <div className="container">
            <div className="construction-intro-col">
              <Copy delay={0.1}>
                <h3>{t.introHeading}</h3>
              </Copy>
            </div>
            <div className="construction-intro-col">
              {t.intro.map((paragraph, index) => (
                <Copy delay={0.1 + index * 0.05} key={paragraph}>
                  <p className="md">{paragraph}</p>
                </Copy>
              ))}
            </div>
          </div>
        </section>

        <section
          className="construction-section-intro"
          id="construction-process"
        >
          <div className="container">
            <div className="construction-section-header">
              <Copy delay={0.1}>
                <p className="mono construction-section-index">{pad(1)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{t.processLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <section className="construction-items">
          <div className="container">
            <Copy delay={0.1}>
              <p className="mono construction-items-label">{t.itemsLabel}</p>
            </Copy>
            <div
              className="construction-items-grid"
              data-reveal-cards=".construction-item"
            >
              {rough.items.map((item, index) => (
                <div className="construction-item" key={item}>
                  <p className="mono construction-item-index">{pad(index)}</p>
                  <p className="md">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ConstructionSchedule lang={lang} />

        <CTAWindow img="/how-we-work/process-4.jpg" {...t.cta} />
        <Spotlight lang={lang} />

        {/* Scrolling on past the end opens the construction rates */}
        <PageChain
          direction="next"
          path="/bang-gia-thi-cong"
          label={t.nextLabel}
          title={t.nextTitle}
          hint={t.nextHint}
        />
      </div>
    </>
  );
}
