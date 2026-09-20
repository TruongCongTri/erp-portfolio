"use client";
import "./Nav.css";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import MenuBtn from "../MenuBtn/MenuBtn";
import { useViewTransition } from "@/hooks/useViewTransition";
import { splitLines } from "@/lib/motion";
import { useI18n } from "@/i18n/client";
import { siteConfig } from "@/lib/site";

gsap.registerPlugin(SplitText);

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef([]);
  const router = useRouter();
  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();
  const { t, href } = useI18n();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isOpen]);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1",
    );
  }, []);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;

      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];

      gsap.set(menu, {
        clipPath: "circle(0% at 50% 50%)",
      });

      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");

      h2Elements.forEach((h2, index) => {
        const split = splitLines(h2, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      pElements.forEach((p, index) => {
        const split = splitLines(p, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onStart: () => {
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";

              splitTextRefs.current.forEach((split) => {
                gsap.set(split.lines, { y: "120%" });
              });

              document.body.classList.remove("menu-open");

              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        textTimeline.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0,
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current && !isNavigating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    } else {
    }
  }, [isAnimating, isNavigating]);

  const handleLinkClick = useCallback(
    (e, href) => {
      e.preventDefault();

      const currentPath = window.location.pathname.replace(/\.html$/, "");
      if (currentPath === href) {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (isNavigating) return;

      setIsNavigating(true);
      navigateWithTransition(href);
    },
    [isNavigating, router, isOpen, setIsOpen],
  );

  const splitTextIntoSpans = (text) => {
    return text
      .split("")
      .map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;&nbsp;</span>
        ) : (
          <span key={index}>{char}</span>
        ),
      );
  };

  const links = [
    { path: "/", label: t.nav.home },
    { path: "/gioi-thieu", label: t.nav.about },
    { path: "/du-an", label: t.nav.projects },
    { path: "/danh-gia", label: t.nav.reviews },
    { path: "/thu-vien", label: t.nav.gallery },
  ];

  // The service pages, as a group under the main links.
  const serviceLinks = [
    { path: "/xay-nha-tron-goi", label: t.nav.turnkey },
    { path: "/tu-van-thiet-ke", label: t.nav.design },
    { path: "/thi-cong-xay-dung", label: t.nav.construction },
    { path: "/ho-tro-phap-ly", label: t.nav.legal },
  ];

  // Bottom right, under the contact details they belong with.
  const asideLinks = [
    { path: "/lien-he", label: t.nav.contact },
    { path: "/tuyen-dung", label: t.nav.careers },
  ];

  return (
    <div>
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} label={t.common.menu} />
      <div className="menu" ref={menuRef}>
        <div className="menu-wrapper">
          <div className="col col-1">
            <div className="links">
              {links.map((link) => (
                <div className="link" key={link.path}>
                  <a
                    href={href(link.path)}
                    onMouseEnter={() => router.prefetch(href(link.path))}
                    onFocus={() => router.prefetch(href(link.path))}
                    onClick={(e) => handleLinkClick(e, href(link.path))}
                  >
                    <h2>{link.label}</h2>
                  </a>
                </div>
              ))}
            </div>
            <div className="menu-services">
              <p className="mono menu-services-label">{t.nav.services}</p>
              <div className="links menu-services-links">
                {serviceLinks.map((link) => (
                  <div className="link menu-service-link" key={link.path}>
                    <a
                      href={href(link.path)}
                      onMouseEnter={() => router.prefetch(href(link.path))}
                      onFocus={() => router.prefetch(href(link.path))}
                      onClick={(e) => handleLinkClick(e, href(link.path))}
                    >
                      <h2>{link.label}</h2>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col col-2">
            {/* Top right: contact / address / social info */}
            <div className="socials">
              <div className="sub-col">
                <div className="menu-meta menu-commissions">
                  <p>{t.nav.contactLabel}</p>
                  {siteConfig.contact.phones.map((phone) => (
                    <p key={phone}>{phone}</p>
                  ))}
                  <p>{siteConfig.contact.email}</p>
                </div>
                <div className="menu-meta">
                  <p>{t.contact.tax}</p>
                  <p>{siteConfig.contact.taxId}</p>
                </div>
              </div>
              <div className="sub-col">
                {siteConfig.contact.offices.map((office) => (
                  <div className="menu-meta" key={office.key}>
                    <p>{t.contact[office.key]}</p>
                    <p>{office.lines.join(" ")}</p>
                  </div>
                ))}
                <div className="menu-meta">
                  <p>{t.nav.social}</p>
                  <p>Instagram</p>
                  <p>LinkedIn</p>
                </div>
              </div>
            </div>
            {/* Bottom right: contact, then careers */}
            <div className="menu-aside-links">
              {asideLinks.map((link) => (
                <div className="link menu-aside-link" key={link.path}>
                  <a
                    href={href(link.path)}
                    onMouseEnter={() => router.prefetch(href(link.path))}
                    onFocus={() => router.prefetch(href(link.path))}
                    onClick={(e) => handleLinkClick(e, href(link.path))}
                  >
                    <h2>{link.label}</h2>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
