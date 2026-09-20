import "./Footer.css";

import Copy from "../Copy/Copy";
import TransitionLink from "../TransitionLink/TransitionLink";
import MapEmbed from "../MapEmbed/MapEmbed";
import { siteConfig } from "@/lib/site";
import { getDictionary, localizePath } from "@/i18n";

import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiDribbbleLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";

// Server component; text and icon entrances are handled by MotionRuntime.
const Footer = ({ lang = "vi" }) => {
  const t = getDictionary(lang);
  const { phones, email, taxId, offices } = siteConfig.contact;
  // The service pages, listed beside the main ones.
  const serviceLinks = [
    { path: "/xay-nha-tron-goi", label: t.nav.turnkey },
    { path: "/tu-van-thiet-ke", label: t.nav.design },
    { path: "/thi-cong-xay-dung", label: t.nav.construction },
    { path: "/ho-tro-phap-ly", label: t.nav.legal },
  ];
  const footerLinks = [
    { path: "/", label: t.nav.home },
    { path: "/gioi-thieu", label: t.nav.about },
    { path: "/du-an", label: t.nav.projects },
    { path: "/danh-gia", label: t.nav.reviews },
    { path: "/thu-vien", label: t.nav.gallery },
    { path: "/lien-he", label: t.nav.contact },
    { path: "/tuyen-dung", label: t.nav.careers },
  ];

  return (
    <footer className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <Copy delay={0.1}>
                  <h3 className="lg">Chính Nam</h3>
                </Copy>
              </div>
              <Copy delay={0.2}>
                <h2>{t.footer.tagline}</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <nav className="footer-nav" aria-label={t.footer.navLabel}>
              <div className="footer-nav-links footer-nav-services">
                <Copy delay={0.1}>
                  <p className="mono footer-nav-label">{t.nav.services}</p>
                  {serviceLinks.map((link) => (
                    <TransitionLink
                      key={link.path}
                      href={localizePath(lang, link.path)}
                    >
                      <h3>{link.label}</h3>
                    </TransitionLink>
                  ))}
                </Copy>
              </div>
              <div className="footer-nav-links">
                <Copy delay={0.1}>
                  {footerLinks.map((link) => (
                    <TransitionLink
                      key={link.path}
                      href={localizePath(lang, link.path)}
                    >
                      <h3>{link.label}</h3>
                    </TransitionLink>
                  ))}
                </Copy>
              </div>
            </nav>
          </div>
        </div>
        <div className="container footer-contact">
          <div className="footer-contact-col">
            <div className="footer-contact-block">
              <Copy delay={0.1}>
                <p className="footer-contact-label">{t.contact.phone}</p>
                {phones.map((phone) => (
                  <p key={phone}>
                    <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
                  </p>
                ))}
              </Copy>
            </div>
            <div className="footer-contact-block">
              <Copy delay={0.15}>
                <p className="footer-contact-label">{t.contact.email}</p>
                <p>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </Copy>
            </div>
            <div className="footer-contact-block">
              <Copy delay={0.2}>
                <p className="footer-contact-label">{t.contact.tax}</p>
                <p>{taxId}</p>
              </Copy>
            </div>
          </div>

          <div className="footer-contact-col footer-offices">
            {offices.map((office, index) => (
              <div className="footer-contact-block" key={office.key}>
                <Copy delay={0.1 + index * 0.05}>
                  <p className="footer-contact-label">{t.contact[office.key]}</p>
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </Copy>
              </div>
            ))}
          </div>

          <div className="footer-contact-col">
            <MapEmbed title={t.contact.mapTitle} className="map-embed-sm" />
          </div>
        </div>

        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div
              className="footer-socials-wrapper"
              data-reveal=".icon"
              data-reveal-stagger="-0.1"
            >
              <div className="icon" aria-label="LinkedIn">
                <RiLinkedinBoxLine />
              </div>
              <div className="icon" aria-label="Instagram">
                <RiInstagramLine />
              </div>
              <div className="icon" aria-label="Dribbble">
                <RiDribbbleLine />
              </div>
              <div className="icon" aria-label="YouTube">
                <RiYoutubeLine />
              </div>
            </div>
          </div>
          <div className="footer-meta-col">
            <Copy delay={0.1}>
              <p>{t.footer.quote}</p>
            </Copy>
          </div>
        </div>
      </div>
      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            <img
              src="/logos/terrene-footer-logo(1).svg"
              alt="Chính Nam"
              loading="lazy"
            />
          </div>
          <div className="footer-copyright">
            <p>
              {t.footer.developedBy} — <span>Cong Tri</span>
            </p>
            <p>{t.footer.cookies}</p>
            <p>
              {t.footer.rights} &copy; 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
