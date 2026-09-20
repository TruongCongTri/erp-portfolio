"use client";
import "./ErrorScreen.css";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import Copy from "../Copy/Copy";
import { useI18n } from "@/i18n/client";

/**
 * The 404 and error pages, in the site's own language: mono label, a heading
 * that reveals line by line, and the pill buttons. The status code sits behind
 * the text like the year on the contact page.
 *
 * @param variant "notFound" | "error"
 * @param reset   error pages only: retry the render (from error.jsx)
 */
export default function ErrorScreen({ variant = "notFound", reset }) {
  const { lang, t, href } = useI18n();
  const e = t.errors;
  const isNotFound = variant === "notFound";

  return (
    <>
      <Nav />
      <div className="page error-screen">
        <section className="error-screen-hero">
          <p className="error-screen-code" aria-hidden="true">
            {isNotFound ? e.code404 : e.code500}
          </p>
          <div className="container">
            <div className="error-screen-content">
              <Copy animateOnScroll={false} delay={0.2}>
                <p className="mono">{isNotFound ? e.notFoundLabel : e.errorLabel}</p>
              </Copy>
              <Copy animateOnScroll={false} delay={0.25}>
                <h1>{isNotFound ? e.notFoundTitle : e.errorTitle}</h1>
              </Copy>
              <Copy animateOnScroll={false} delay={0.3}>
                <p className="md">{isNotFound ? e.notFoundText : e.errorText}</p>
              </Copy>
              <div className="error-screen-actions">
                <AnimatedButton
                  label={e.home}
                  route={href("/")}
                  animateOnScroll={false}
                  delay={0.35}
                />
                {isNotFound ? (
                  <AnimatedButton
                    label={e.contact}
                    route={href("/lien-he")}
                    animateOnScroll={false}
                    delay={0.4}
                  />
                ) : (
                  <AnimatedButton
                    label={e.retry}
                    animateOnScroll={false}
                    delay={0.4}
                    onClick={reset}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer lang={lang} />
    </>
  );
}
