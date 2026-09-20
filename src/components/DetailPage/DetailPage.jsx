import "./DetailPage.css";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import CTAWindow from "../CTAWindow/CTAWindow";
import Copy from "../Copy/Copy";
import { fixedText, translatable } from "../Language/DataText";

// Rows of { label, values[] } columns, e.g. "Số lượng: 05".
const MetaRows = ({ rows = [], delay, step }) =>
  rows.map((row, rowIndex) => (
    <div className="detail-content-wrapper detail-meta" key={rowIndex}>
      <div className="detail-hero-row">
        {row.map((item) => (
          <div className="detail-hero-sub-col" key={item.label}>
            <Copy delay={delay + rowIndex * step}>
              <p {...(item.fixedLabel ? fixedText : {})}>{item.label}</p>
              {item.values.map((value) => (
                <p key={value}>{value}</p>
              ))}
            </Copy>
          </div>
        ))}
      </div>
    </div>
  ));

// A labelled block: paragraphs, meta rows, image and a closing line, each
// optional and rendered in that order.
const SectionBlock = ({ block }) => (
  <div className="container">
    <div className="detail-col">
      <Copy delay={0.1}>
        <p>{block.label}</p>
      </Copy>
    </div>
    <div className="detail-col">
      {block.paragraphs?.length > 0 && (
        <Copy delay={0.1}>
          {block.paragraphs.map((text) => (
            <h3 key={text}>{text}</h3>
          ))}
        </Copy>
      )}
      <MetaRows rows={block.meta} delay={0.1} step={0.1} />
      {block.image && (
        <div className="detail-section-img">
          <img src={block.image.src} alt={block.image.alt} loading="lazy" />
        </div>
      )}
      {block.closing && (
        <Copy delay={0.2}>
          <h3>{block.closing}</h3>
        </Copy>
      )}
    </div>
  </div>
);

/**
 * Shared detail layout for projects, jobs and reviews.
 *
 * @param detail   { image, imageAlt, title, location, country?, intro?: { label?, text },
 *                   meta?: MetaRows, sections?: [{ blocks: Block[] }], cta? }
 * @param children extra content after the CTA window (e.g. an application form)
 *
 * All `detail` content is Vietnamese data, so it's marked translatable for
 * English pages; dictionary labels inside it are flagged `fixedLabel` / fixed.
 */
const DetailPage = ({ lang = "vi", detail, children }) => {
  const {
    image,
    imageAlt,
    title,
    location,
    country,
    intro,
    meta,
    sections = [],
    cta,
  } = detail;

  return (
    <>
      <Nav />
      <div className="page detail">
        <section className="detail-hero" {...translatable}>
          <div className="detail-hero-img">
            <img src={image} alt={imageAlt ?? title} fetchPriority="high" />
          </div>
          <div className="detail-hero-overlay"></div>
          <div className="container">
            <div className="detail-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>{title}</h1>
              </Copy>
            </div>
            <div className="detail-content">
              <div className="detail-col">
                {location && (
                  <Copy delay={1.05} animateOnScroll={false}>
                    <p>{location}</p>
                  </Copy>
                )}
              </div>
              <div className="detail-col">
                {country && (
                  <div className="detail-content-wrapper">
                    <Copy delay={1.1} animateOnScroll={false}>
                      <p>{country}</p>
                    </Copy>
                  </div>
                )}
                {intro && (
                  <div className="detail-content-wrapper">
                    <Copy delay={1.15} animateOnScroll={false}>
                      {intro.label && (
                        <p {...(intro.fixedLabel ? fixedText : {})}>{intro.label}</p>
                      )}
                      <h3>{intro.text}</h3>
                    </Copy>
                  </div>
                )}
                <MetaRows rows={meta} delay={0.2} step={0.15} />
              </div>
            </div>
          </div>
        </section>
        {sections.map((section, index) => (
          <section
            key={index}
            className={`detail-section detail-section-${index === 0 ? 1 : 2}`}
            {...translatable}
          >
            {section.blocks.map((block) => (
              <SectionBlock key={block.label} block={block} />
            ))}
          </section>
        ))}
        {cta && (
          <div {...translatable}>
            <CTAWindow {...cta} />
          </div>
        )}
        {children}
      </div>
      <Footer lang={lang} />
    </>
  );
};

export default DetailPage;
