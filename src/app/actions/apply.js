// "use server";

import { getJobById } from "@/data/jobs";
import { format, getDictionary } from "@/i18n";
import { readApplication, validateApplication } from "@/lib/validation";

export async function submitApplication(prevState, formData) {
  const values = readApplication(formData);
  const t = getDictionary(values.lang).form;
  const job = values.jobId ? getJobById(values.jobId) : null;
  // On a job page the title comes from the job data, never from the client.
  if (job) values.jobTitle = job.name;

  const errors = validateApplication(values);
  if (values.jobId && !job) errors.jobTitle = t.errors.jobNotFound;

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: t.checkDetails,
      errors,
      submittedAt: Date.now(),
    };
  }

  // TODO: deliver the application, e.g. email it to talent@chinhnambkd.vn
  // with the CV attached, or save it to storage / an ATS. Until then the
  // submission is validated but not stored anywhere.

  /*
   * OPTIONAL: Forward to a third-party form handler (e.g. Formspree / Basin / Getform)
   * If you configure an endpoint, uncomment this block:
   *
   * try {
   *   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
   *     method: "POST",
   *     body: formData,
   *     headers: { Accept: "application/json" },
   *   });
   *   if (!res.ok) throw new Error("Failed to send");
   * } catch (err) {
   *   return {
   *     status: "error",
   *     message: "Có lỗi xảy ra khi gửi hồ sơ. Vui lòng thử lại sau.",
   *     errors: {},
   *     submittedAt: Date.now(),
   *   };
   * }
   */

  return {
    status: "success",
    message: format(t.applySuccess, { name: values.name, jobTitle: values.jobTitle }),
    errors: {},
    submittedAt: Date.now(),
  };
}
