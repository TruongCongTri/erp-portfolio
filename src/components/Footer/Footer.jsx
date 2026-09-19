import "./Footer.css";

import Copy from "../Copy/Copy";
import TransitionLink from "../TransitionLink/TransitionLink";

import { RiLinkedinBoxLine } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiDribbbleLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";

const footerLinks = [
  { href: "/", label: "Index" },
  { href: "/studio", label: "Giới Thiệu" },
  { href: "/spaces", label: "Dự Án" },
  { href: "/spaces/1", label: "Dự Án Tiêu Biểu" },
  { href: "/reviews", label: "Đánh Giá" },
  { href: "/blueprints", label: "Thư Viện" },
  { href: "/connect", label: "Liên Hệ" },
  { href: "/hiring", label: "Tuyển Dụng" },
];

// Server component; text and icon entrances are handled by MotionRuntime.
const Footer = () => {
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
                <h2>Spaces made simple, thoughtful, lasting.</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <nav className="footer-nav-links" aria-label="Footer">
              <Copy delay={0.1}>
                {footerLinks.map((link) => (
                  <TransitionLink key={link.label} href={link.href}>
                    <h3>{link.label}</h3>
                  </TransitionLink>
                ))}
              </Copy>
            </nav>
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
              <p>
                We believe design is not decoration but the quiet structure that
                shapes experience.
              </p>
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
              Developed by — <span>Cong Tri</span>
            </p>
            <p>This website is using cookies.</p>
            <p>All rights reserved &copy; 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
