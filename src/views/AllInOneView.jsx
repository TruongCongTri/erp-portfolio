import "@/styles/studio.css";
import "@/styles/all-in-one.css";

import Nav from "@/components/Nav/Nav";
import BuildProcess from "@/components/BuildProcess/BuildProcess";
import BuildSchedule from "@/components/BuildSchedule/BuildSchedule";
import PageChain from "@/components/PageChain/PageChain";
import SectionNav from "@/components/SectionNav/SectionNav";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function allInOneMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.allInOneTitle,
    description: t.allInOneDescription,
    path: "/xay-nha-tron-goi",
  });
}

const pad = (index) => String(index + 1).padStart(2, "0");

// The turnkey package, in the same scroll language as StudioView: a hero that
// reveals line by line, cards that scale in, the pinned nine-step process and
// the schedule, then the CTA window and the Spotlight scene.
//
// No footer: the page runs on into /bang-gia (PageChain), and the footer waits
// at the end of that one.
export default function AllInOneView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.allInOne;

  const sections = [
    { id: "all-in-one-benefits", label: t.benefitsLabel },
    { id: "build-process", label: t.processLabel },
    { id: "build-schedule", label: t.scheduleLabel },
  ];
  // The two price lists, by name only
  const links = [
    { path: "/bang-gia", label: dict.meta.pricingTitle },
    { path: "/bang-gia-thiet-ke", label: dict.meta.designPricingTitle },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} links={links} />
      <div className="page studio all-in-one">
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
                <Copy delay={0.85}>
                  <h3>{t.heroHeading}</h3>
                </Copy>
                <Copy delay={0.9}>
                  <p>
                    {t.heroBefore}
                    <span className="text-highlight">{t.heroHighlight}</span>
                    {t.heroAfter}
                  </p>
                </Copy>
                <Copy delay={0.95}>
                  <p>{t.heroCompany}</p>
                </Copy>
              </div>
              <div className="studio-hero-hero-img">
                <img src="/gallery-callout/gallery-callout-2.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="all-in-one-benefits" id="all-in-one-benefits">
          <div className="container">
            <div className="all-in-one-section-header">
              <Copy delay={0.1}>
                <p className="mono">{t.benefitsLabel}</p>
              </Copy>
              <Copy delay={0.15}>
                <h3>{t.benefitsTitle}</h3>
              </Copy>
            </div>
            <div
              className="all-in-one-benefits-grid"
              data-reveal-cards=".all-in-one-benefit"
            >
              {t.benefits.map((benefit, index) => (
                <div className="all-in-one-benefit" key={benefit.title}>
                  <p className="mono all-in-one-benefit-index">{pad(index)}</p>
                  <h3>{benefit.title}</h3>
                  <p className="md">{benefit.text}</p>
                </div>
              ))}
            </div>
            <div className="all-in-one-benefits-closing">
              <Copy delay={0.1}>
                <h3>{t.benefitsClosing}</h3>
              </Copy>
            </div>
          </div>
        </section>

        <BuildProcess lang={lang} />

        <BuildSchedule lang={lang} />

        <CTAWindow img="/home/home-cta-window.jpg" {...t.cta} />
        <Spotlight lang={lang} />

        {/* Scrolling on past the end opens the price list */}
        <PageChain
          direction="next"
          path="/bang-gia"
          label={t.nextLabel}
          title={t.nextTitle}
          hint={t.nextHint}
        />
      </div>
    </>
  );
}
