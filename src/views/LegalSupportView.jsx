import "@/styles/studio.css";
import "@/styles/legal-support.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import LegalDocs from "@/components/LegalDocs/LegalDocs";
import SectionNav from "@/components/SectionNav/SectionNav";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function legalMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.legalTitle,
    description: t.legalDescription,
    path: "/ho-tro-phap-ly",
  });
}

const pad = (index) => String(index + 1).padStart(2, "0");

// Legal support, in the same scroll language as AllInOneView: a hero that
// reveals line by line, the numbered overview, then the three sets of
// paperwork as a pinned scene.
export default function LegalSupportView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.legalSupport;

  const sections = [
    { id: "legal-overview", label: t.overviewLabel },
    { id: "legal-docs", label: t.docsLabel },
  ];
  // The services this one sits beside
  const links = [
    { path: "/xay-nha-tron-goi", label: dict.nav.turnkey },
    { path: "/tu-van-thiet-ke", label: dict.nav.design },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} links={links} />
      <div className="page studio legal-support">
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
                <img src="/gallery-callout/gallery-callout-3.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="legal-section-intro" id="legal-overview">
          <div className="container">
            <div className="legal-section-header">
              <Copy delay={0.1}>
                <p className="mono legal-section-index">{pad(0)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{t.overviewLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <section className="legal-overview">
          <div className="container">
            <div className="legal-overview-col">
              <Copy delay={0.1}>
                <h3>{t.overviewHeading}</h3>
              </Copy>
            </div>
            <div className="legal-overview-col">
              {t.overview.map((paragraph, index) => (
                <Copy delay={0.1 + index * 0.05} key={paragraph}>
                  <p className="md">{paragraph}</p>
                </Copy>
              ))}
            </div>
          </div>
        </section>

        <section className="legal-section-intro">
          <div className="container">
            <div className="legal-section-header">
              <Copy delay={0.1}>
                <p className="mono legal-section-index">{pad(1)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{t.docsLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <LegalDocs lang={lang} />

        <CTAWindow img="/gallery-callout/gallery-callout-2.jpg" {...t.cta} />
        <Spotlight lang={lang} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
