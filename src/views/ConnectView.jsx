import "@/styles/contact.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import FormSection from "@/components/Form/FormSection";
import ContactForm from "@/components/ContactForm/ContactForm";
import MapEmbed from "@/components/MapEmbed/MapEmbed";
import { getDictionary } from "@/i18n";
import { pageMetadata, siteConfig } from "@/lib/site";

export function connectMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.connectTitle,
    description: t.connectDescription,
    path: "/lien-he",
    image: "/contact/contact-img.jpg",
  });
}

export default function ConnectView({ lang }) {
  const dict = getDictionary(lang);
  const t = dict.connect;
  const { phones, email, taxId, offices } = siteConfig.contact;

  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>{t.titleLine1}</h1>
                  <h2>{t.titleLine2}</h2>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;26</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>{dict.contact.email}</p>
                    <p>
                      <a href={`mailto:${email}`}>{email}</a>
                    </p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>{dict.contact.phone}</p>
                    {phones.map((phone) => (
                      <p key={phone}>
                        <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
                      </p>
                    ))}
                  </Copy>
                </div>
                {offices.map((office, index) => (
                  <div className="contact-info-block" key={office.key}>
                    <Copy delay={1.15 + index * 0.05}>
                      <p>{dict.contact[office.key]}</p>
                      {office.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </Copy>
                  </div>
                ))}
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>{dict.contact.tax}</p>
                    <p>{taxId}</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.45}>
                    <p>{t.social}</p>
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img src="/contact/contact-img.jpg" alt={t.imageAlt} />
              </div>
              <MapEmbed title={dict.contact.mapTitle} className="contact-map" />
            </div>
          </div>
        </section>
        <FormSection
          id="contact-form"
          callout={t.formCallout}
          floatingLabel={t.formFloating}
          title={
            <>
              {t.formTitleBefore}
              <span>{" Chính Nam "}</span>
              {t.formTitleAfter}
            </>
          }
        >
          <ContactForm />
        </FormSection>
      </div>
      <Footer lang={lang} />
    </>
  );
}
