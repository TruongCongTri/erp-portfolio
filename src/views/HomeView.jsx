import "@/styles/home.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import Revealer from "@/components/Revealer/Revealer";
import SectionNav from "@/components/SectionNav/SectionNav";
import { getDictionary, localizePath } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function homeMetadata(lang) {
  const t = getDictionary(lang).meta;
  return {
    ...pageMetadata({ lang, description: t.homeDescription, path: "/" }),
    title: { absolute: t.homeTitle },
  };
}

export default function HomeView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.home;

  const sections = [
    { id: "home-services", label: t.servicesLabel },
    { id: "home-projects", label: t.featuredCallout },
    { id: "home-reviews", label: t.reviewsCallout },
    { id: "home-gallery", label: dict.nav.gallery },
  ];

  return (
    <>
      <Revealer />
      <Nav />
      <SectionNav items={sections} />
      {/* hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/home/hero(1).jpg" alt={t.heroImageAlt} fetchPriority="high" />
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={0.85} preloaderDelay={5.9}>
                <h1>{t.heroLine1}</h1>
                <h3 className="">{t.heroLine2}</h3>
                <h1>{t.heroLine3}</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={1} preloaderDelay={6.05}>
                <p>{t.tagline}</p>
              </Copy>
            </div>
            <AnimatedButton
              label={t.discover}
              route={localizePath(lang, "/gioi-thieu")}
              animateOnScroll={false}
              delay={1.15}
              preloaderDelay={6.2}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            {t.stats.map((stat, index) => (
              <div className="stat" key={stat.label}>
                <div className="stat-count">
                  <Copy delay={0.1 + index * 0.1}>
                    <h2>{stat.count}</h2>
                  </Copy>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-info">
                  <Copy delay={0.15 + index * 0.1}>
                    <p>{stat.label}</p>
                  </Copy>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* what-we-do Section */}
      <section className="what-we-do" id="home-services">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                {t.mission}
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>{t.servicesLabel}</p>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">{t.servicesIntro}</p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" data-reveal=".what-we-do-tag">
                {t.services.map((tag) => (
                  <div className="what-we-do-tag" key={tag}>
                    <h3>{tag}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured projects Section */}
      <section className="featured-projects-container" id="home-projects">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>{t.featuredCallout}</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>{t.featuredTitle}</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      {/* Client review Section */}
      <section className="client-reviews-container" id="home-reviews">
        <div className="container">
          <div className="client-reviews-header-callout">
            <p>{t.reviewsCallout}</p>
          </div>
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout" id="home-gallery">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img
                  src="/gallery-callout/gallery-callout-1.jpg"
                  alt={t.galleryImageAlt}
                  loading="lazy"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img
                  src="/gallery-callout/gallery-callout-2.jpg"
                  alt={t.galleryImageAlt}
                  loading="lazy"
                />
                <div className="gallery-callout-img-content">
                  <h3>800+</h3>
                  <p>{t.galleryCountLabel}</p>
                </div>
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img
                  src="/gallery-callout/gallery-callout-3.jpg"
                  alt={t.galleryImageAlt}
                  loading="lazy"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img
                  src="/gallery-callout/gallery-callout-4.jpg"
                  alt={t.galleryImageAlt}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>{t.galleryText}</h3>
              </Copy>
              <AnimatedButton
                label={t.galleryButton}
                route={localizePath(lang, "/thu-vien")}
              />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow img="/home/home-cta-window.jpg" {...t.cta} />
      <Footer lang={lang} />
    </>
  );
}
