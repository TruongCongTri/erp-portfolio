import "@/styles/studio.css";
import "@/styles/pricing.css";
import "@/components/PriceTables/PriceTables.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import PageChain from "@/components/PageChain/PageChain";
import SectionNav from "@/components/SectionNav/SectionNav";
import RateSteps from "@/components/PriceTables/RateSteps";
import PackageOrbit from "@/components/PriceTables/PackageOrbit";
import PriceRange from "@/components/PriceTables/PriceRange";
import MaterialOrbit from "@/components/PriceTables/MaterialOrbit";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function pricingMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.pricingTitle,
    description: t.pricingDescription,
    path: "/bang-gia",
  });
}

// The price list, continuing /xay-nha-tron-goi: scrolling up from the top of
// page goes back there (PageChain). Each section reads as two scroll scenes -
// the rates on the pinned-steps scene, the packages on the wheel - so 02-05
// only have to be added to `pricing.sections`.
export default function PricingView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.pricing;

  const sections = t.sections.map((section, index) => ({
    id: `pricing-section-${index + 1}`,
    label: section.label,
  }));
  // The two service pages these prices belong to, by name only
  const links = [
    { path: "/xay-nha-tron-goi", label: dict.meta.allInOneTitle },
    { path: "/tu-van-thiet-ke", label: dict.meta.designTitle },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} links={links} />
      <div className="page studio pricing">
        <PageChain
          direction="prev"
          path="/xay-nha-tron-goi"
          label={t.prevLabel}
          title={t.prevTitle}
          hint={t.prevHint}
        />

        <section className="pricing-hero">
          <div className="container">
            <div className="pricing-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.1}>
                  <p className="mono">{t.heroLabel}</p>
                </Copy>
                <Copy delay={0.15}>
                  <h2>{t.heroTitle}</h2>
                </Copy>
              </div>
            </div>
            <div className="pricing-hero-col">
              <Copy delay={0.2}>
                <p className="md">{t.heroIntro}</p>
              </Copy>
            </div>
          </div>
        </section>

        {t.sections.map((section, index) => (
          <div
            className="pricing-section"
            id={`pricing-section-${index + 1}`}
            key={section.label}
          >
            <section className="pricing-section-intro">
              <div className="container">
                <div className="pricing-section-header">
                  <Copy delay={0.1}>
                    <p className="mono pricing-section-index">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </Copy>
                  <Copy delay={0.15}>
                    <h2>{section.label}</h2>
                  </Copy>
                </div>
              </div>
            </section>

            {/* A section carries whichever of these its prices need */}
            {section.types && (
              <RateSteps
                id={`price-rates-${index + 1}`}
                section={section}
                t={t}
                lang={lang}
              />
            )}

            {/* `groups` carries a tick per package, `materialGroups` a make */}
            {section.groups && (
              <PackageOrbit
                id={`price-packages-${index + 1}`}
                section={section}
                t={t}
              />
            )}

            {section.materialGroups && (
              <MaterialOrbit
                id={`price-materials-${index + 1}`}
                section={section}
                t={t}
                lang={lang}
              />
            )}

            {section.rangeFrom && (
              <PriceRange section={section} t={t} lang={lang} />
            )}

            {section.note && (
              <section className="pricing-note">
                <div className="container">
                  <Copy delay={0.1}>
                    <p className="md">{section.note}</p>
                  </Copy>
                </div>
              </section>
            )}
          </div>
        ))}

        <CTAWindow img="/studio/about-cta-window.jpg" {...t.cta} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
