import "@/styles/studio.css";
import "@/styles/construction.css";
import "@/components/PriceTables/PriceTables.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import PageChain from "@/components/PageChain/PageChain";
import SectionNav from "@/components/SectionNav/SectionNav";
import MaterialOrbit from "@/components/PriceTables/MaterialOrbit";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function constructionPricingMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.constructionPricingTitle,
    description: t.constructionPricingDescription,
    path: "/bang-gia-thi-cong",
  });
}

const pad = (index) => String(index + 1).padStart(2, "0");

// "3800000" -> "3.800.000" (vi) / "3,800,000" (en)
const group = (value, lang) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : ".");

// The structural rates, continuing /thi-cong-xay-dung: scrolling up from the
// top goes back there (PageChain). The material schedule is the one /bang-gia
// carries, read by key so the two pages can never drift apart.
export default function ConstructionPricingView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.construction;
  const page = t.pricingPage;
  const materials = dict.pricing.sections.find(
    (section) => section.key === "roughMaterials",
  );

  const sections = [
    { id: "construction-packages", label: page.packagesLabel },
    { id: "construction-materials", label: materials.materialsLabel },
  ];
  const links = [
    { path: "/thi-cong-xay-dung", label: dict.nav.construction },
    { path: "/bang-gia", label: dict.meta.pricingTitle },
  ];

  return (
    <>
      <Nav />
      <SectionNav items={sections} links={links} />
      <div className="page studio construction construction-pricing">
        <PageChain
          direction="prev"
          path="/thi-cong-xay-dung"
          label={page.prevLabel}
          title={page.prevTitle}
          hint={page.prevHint}
        />

        <section className="construction-pricing-hero">
          <div className="container">
            <div className="construction-pricing-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.1}>
                  <p className="mono">{page.heroLabel}</p>
                </Copy>
                <Copy delay={0.15}>
                  <h2>{page.heroTitle}</h2>
                </Copy>
              </div>
            </div>
            <div className="construction-pricing-hero-col">
              <Copy delay={0.2}>
                <p className="md">{page.heroIntro}</p>
              </Copy>
            </div>
          </div>
        </section>

        <section
          className="construction-section-intro"
          id="construction-packages"
        >
          <div className="container">
            <div className="construction-section-header">
              <Copy delay={0.1}>
                <p className="mono construction-section-index">{pad(0)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{page.packagesLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <section className="construction-packages">
          <div className="container">
            <div
              className="construction-packages-grid"
              data-reveal-cards=".construction-package"
            >
              {materials.packages.map((name, index) => (
                <div className="construction-package" key={name}>
                  <p className="mono construction-package-index">
                    {pad(index)}
                  </p>
                  <h3>{name}</h3>
                  <p className="construction-package-price">
                    <span>{group(materials.packagePrices[index], lang)}</span>
                    <span className="mono construction-package-unit">
                      {dict.pricing.unit}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="construction-notes">
              {page.notes.map((note) => (
                <Copy delay={0.1} key={note}>
                  <p className="md">{note}</p>
                </Copy>
              ))}
            </div>

            <div className="construction-support">
              <Copy delay={0.1}>
                <p className="mono construction-support-label">
                  {page.supportLabel}
                </p>
              </Copy>
              <div
                className="construction-support-grid"
                data-reveal-cards=".construction-support-item"
              >
                {page.support.map((item) => (
                  <div className="construction-support-item" key={item}>
                    <p className="md">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="construction-section-intro"
          id="construction-materials"
        >
          <div className="container">
            <div className="construction-section-header">
              <Copy delay={0.1}>
                <p className="mono construction-section-index">{pad(1)}</p>
              </Copy>
              <Copy delay={0.15}>
                <h2>{materials.materialsLabel}</h2>
              </Copy>
            </div>
          </div>
        </section>

        <MaterialOrbit
          id="construction-material-orbit"
          section={materials}
          t={dict.pricing}
          lang={lang}
        />

        <CTAWindow img="/how-we-work/process-3.jpg" {...page.cta} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
