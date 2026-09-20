import "@/styles/studio.css";
import "@/styles/design-consult.css";
import "@/components/PriceTables/PriceTables.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import PageChain from "@/components/PageChain/PageChain";
import SectionNav from "@/components/SectionNav/SectionNav";
import RateSteps from "@/components/PriceTables/RateSteps";
import PackageSteps from "@/components/PriceTables/PackageSteps";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function designPricingMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.designPricingTitle,
    description: t.designPricingDescription,
    path: "/bang-gia-thiet-ke",
  });
}

const pad = (index) => String(index + 1).padStart(2, "0");

// The design rates, continuing /tu-van-thiet-ke: scrolling up from the top of
// this page goes back there (PageChain). Each rate table is a pinned scene.
export default function DesignPricingView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.designConsult;
  const page = t.pricingPage;

  const sections = [
    ...t.rateSets.map((set, index) => ({
      id: `design-rate-set-${index + 1}`,
      label: set.ratesLabel,
    })),
    { id: "design-benefits-set", label: t.benefits.label },
    { id: "design-documents-set", label: t.documents.label },
  ];
  // The two service pages these rates belong to, by name only
  const links = [
    { path: "/tu-van-thiet-ke", label: dict.meta.designTitle },
    { path: "/xay-nha-tron-goi", label: dict.meta.allInOneTitle },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} links={links} />
      <div className="page studio design-consult design-pricing">
        <PageChain
          direction="prev"
          path="/tu-van-thiet-ke"
          label={page.prevLabel}
          title={page.prevTitle}
          hint={page.prevHint}
        />

        <section className="design-pricing-hero">
          <div className="container">
            <div className="design-pricing-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.1}>
                  <p className="mono">{page.heroLabel}</p>
                </Copy>
                <Copy delay={0.15}>
                  <h2>{page.heroTitle}</h2>
                </Copy>
              </div>
            </div>
            <div className="design-pricing-hero-col">
              <Copy delay={0.2}>
                <p className="md">{page.heroIntro}</p>
              </Copy>
            </div>
          </div>
        </section>

        {t.rateSets.map((set, index) => (
          <div
            className="design-rate-set"
            id={`design-rate-set-${index + 1}`}
            key={set.ratesLabel}
          >
            <section className="design-section-intro">
              <div className="container">
                <div className="design-section-header">
                  <Copy delay={0.1}>
                    <p className="mono design-section-index">{pad(index)}</p>
                  </Copy>
                  <Copy delay={0.15}>
                    <h2>{set.ratesLabel}</h2>
                  </Copy>
                </div>
              </div>
            </section>

            <RateSteps
              id={`design-rates-${index + 1}`}
              section={set}
              t={t}
              lang={lang}
            />
          </div>
        ))}

        <div className="design-rate-set" id="design-benefits-set">
          <section className="design-section-intro">
            <div className="container">
              <div className="design-section-header">
                <Copy delay={0.1}>
                  <p className="mono design-section-index">
                    {pad(t.rateSets.length)}
                  </p>
                </Copy>
                <Copy delay={0.15}>
                  <h2>{t.benefits.label}</h2>
                </Copy>
              </div>
            </div>
          </section>

          <PackageSteps
            id="design-benefits"
            block={t.benefits}
            t={t}
            pillLabel={t.packageLabel}
          />

          <section className="design-offers">
            <div className="container">
              <Copy delay={0.1}>
                <p className="mono design-offers-label">
                  {t.benefits.offersLabel}
                </p>
              </Copy>
              <div
                className="design-offers-grid"
                data-reveal-cards=".design-offer"
              >
                {t.benefits.offers.map((offer) => (
                  <div className="design-offer" key={offer.name}>
                    <p className="md">{offer.name}</p>
                    <p className="design-offer-value">{offer.value}</p>
                  </div>
                ))}
              </div>
              <Copy delay={0.1}>
                <p className="mono design-offers-note">{t.note}</p>
              </Copy>
            </div>
          </section>
        </div>

        <div className="design-rate-set" id="design-documents-set">
          <section className="design-section-intro">
            <div className="container">
              <div className="design-section-header">
                <Copy delay={0.1}>
                  <p className="mono design-section-index">
                    {pad(t.rateSets.length + 1)}
                  </p>
                </Copy>
                <Copy delay={0.15}>
                  <h2>{t.documents.label}</h2>
                </Copy>
              </div>
            </div>
          </section>

          <PackageSteps
            id="design-documents"
            block={t.documents}
            t={t}
            pillLabel={t.packageLabel}
          />
        </div>

        <CTAWindow img="/gallery-callout/gallery-callout-4.jpg" {...page.cta} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
