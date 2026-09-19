// "use server";

import { getJobById } from "@/data/jobs";
import { CV_EXTENSIONS, MAX_CV_SIZE } from "@/lib/application";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\s.-]{8,20}$/;

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function submitApplication(prevState, formData) {
  const jobId = formData.get("jobId")?.toString() || "";
  const job = jobId ? getJobById(jobId) : null;

  const values = {
    name: formData.get("name")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    profile: formData.get("profile")?.toString().trim() || "",
    // A job page's title comes from the server, never from the client.
    jobTitle: job
      ? job.name
      : formData.get("jobTitle")?.toString().trim() || "",
  };
  const cv = formData.get("cv");

  const errors = {};
  if (jobId && !job) errors.jobTitle = "Vị trí ứng tuyển không tồn tại.";
  if (!values.name) errors.name = "Vui lòng nhập họ và tên.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Email không hợp lệ.";
  if (!PHONE_RE.test(values.phone))
    errors.phone = "Số điện thoại không hợp lệ.";
  if (values.profile && !isValidUrl(values.profile))
    errors.profile = "Đường dẫn phải bắt đầu bằng http:// hoặc https://";
  if (!values.jobTitle) errors.jobTitle = "Vui lòng nhập vị trí ứng tuyển.";

  if (!cv || typeof cv === "string" || cv.size === 0) {
    errors.cv = "Vui lòng đính kèm CV.";
  } else if (
    !CV_EXTENSIONS.some((ext) => cv.name.toLowerCase().endsWith(ext))
  ) {
    errors.cv = "CV phải là file PDF, DOC hoặc DOCX.";
  } else if (cv.size > MAX_CV_SIZE) {
    errors.cv = "CV không được vượt quá 5 MB.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Vui lòng kiểm tra lại thông tin.",
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
    message: `Cảm ơn ${values.name}! Hồ sơ ứng tuyển vị trí “${values.jobTitle}” đã được gửi thành công. Chính Nam sẽ liên hệ với bạn sớm.`,
    errors: {},
    submittedAt: Date.now(),
  };
}
