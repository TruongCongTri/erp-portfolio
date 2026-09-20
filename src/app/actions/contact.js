// "use server";
// Runs in the browser while the site is a static export (see next.config.mjs),
// same as apply.js.

import { format, getDictionary } from "@/i18n";
import { readContact, validateContact } from "@/lib/validation";

export async function submitContact(prevState, formData) {
  const values = readContact(formData);
  const t = getDictionary(values.lang).form;
  const errors = validateContact(values);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: t.checkDetails,
      errors,
      submittedAt: Date.now(),
    };
  }

  // TODO: deliver the message, e.g. email it to info@chinhnambkd.vn or post
  // it to a form endpoint (Formspree / Basin / Getform) like apply.js. Until
  // then the message is validated but not sent anywhere.

  return {
    status: "success",
    message: format(t.contactSuccess, { name: values.name, email: values.email }),
    errors: {},
    submittedAt: Date.now(),
  };
}
