"use client";
import { usePathname } from "next/navigation";

import { useLenis } from "lenis/react";

import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { useI18n } from "@/i18n/client";

const CONTACT_PATH = "/lien-he";
const CONTACT_FORM_ID = "contact-form";

// Links to the Contact page; on the Contact page itself it scrolls to the
// contact form instead of reloading the same page.
export default function ReserveButton() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { t, href } = useI18n();
  const contactPath = href(CONTACT_PATH);
  // Static hosts may serve /lien-he, /lien-he/ or /lien-he.html.
  const onContactPage =
    pathname?.replace(/(\.html|\/)$/, "") === contactPath;

  if (!onContactPage) {
    return (
      <AnimatedButton label={t.common.reserve} route={contactPath} animate={false} />
    );
  }

  const scrollToForm = () => {
    const form = document.getElementById(CONTACT_FORM_ID);
    if (!form) return;
    if (lenis) lenis.scrollTo(form, { duration: 3 });
    else form.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedButton label={t.common.reserve} animate={false} onClick={scrollToForm} />
  );
}
