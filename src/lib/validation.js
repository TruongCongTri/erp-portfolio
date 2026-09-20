// Form validation shared by the forms (before submit, for inline messages)
// and their submit actions. Messages come from the page language's
// dictionary (src/i18n, `form.errors`) and are shown under each field in place
// of the browser's native validation popups.

import { getDictionary } from "@/i18n";
import { CV_EXTENSIONS, MAX_CV_SIZE } from "@/lib/application";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\s.-]{8,20}$/;

const text = (formData, name) => formData.get(name)?.toString().trim() || "";

// Error messages for a language ("vi" | "en").
export const errorMessages = (lang) => getDictionary(lang).form.errors;

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function checkName(value, m) {
  if (!value) return m.nameRequired;
}

function checkEmail(value, m) {
  if (!value) return m.emailRequired;
  if (!EMAIL_RE.test(value)) return m.emailInvalid;
}

// Optional: only checked when filled in.
function checkPhone(value, m) {
  if (value && !PHONE_RE.test(value)) return m.phoneInvalid;
}

function checkUrl(value, m) {
  if (value && !isValidUrl(value)) return m.urlInvalid;
}

export function checkCv(file, m) {
  if (!file || typeof file === "string" || file.size === 0) return m.cvRequired;
  if (!CV_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext)))
    return m.cvType;
  if (file.size > MAX_CV_SIZE) return m.cvSize;
}

const compact = (errors) =>
  Object.fromEntries(Object.entries(errors).filter(([, message]) => message));

export function readApplication(formData) {
  return {
    lang: text(formData, "lang") || "vi",
    jobId: text(formData, "jobId"),
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    profile: text(formData, "profile"),
    jobTitle: text(formData, "jobTitle"),
    cv: formData.get("cv"),
  };
}

// Required: name, email, job title (typed, unless fixed by the job page), CV.
export function validateApplication(values, { jobTitleFixed = false } = {}) {
  const m = errorMessages(values.lang);
  return compact({
    name: checkName(values.name, m),
    email: checkEmail(values.email, m),
    phone: checkPhone(values.phone, m),
    profile: checkUrl(values.profile, m),
    jobTitle: !jobTitleFixed && !values.jobTitle ? m.jobTitleRequired : undefined,
    cv: checkCv(values.cv, m),
  });
}

export function readContact(formData) {
  return {
    lang: text(formData, "lang") || "vi",
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };
}

// Required: name, email, message.
export function validateContact(values) {
  const m = errorMessages(values.lang);
  return compact({
    name: checkName(values.name, m),
    email: checkEmail(values.email, m),
    phone: checkPhone(values.phone, m),
    message: values.message.length < 10 ? m.messageShort : undefined,
  });
}
