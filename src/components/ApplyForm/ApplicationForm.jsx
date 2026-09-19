"use client";
import { useActionState, useEffect, useRef, useState, startTransition } from "react";

import gsap from "gsap";
import { IoMdAttach, IoMdCheckmark, IoMdClose } from "react-icons/io";

import { submitApplication } from "@/app/actions/apply";
import { CV_ACCEPT, MAX_CV_SIZE } from "@/lib/application";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const initialState = { status: "idle", message: "", errors: {} };

function Field({ label, name, error, children, full }) {
  return (
    <div className={`apply-field ${full ? "full" : ""} ${error ? "invalid" : ""}`}>
      <label htmlFor={`apply-${name}`}>{label}</label>
      {children}
      {error && (
        <p className="apply-field-error" id={`apply-${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplicationForm({ jobId, jobTitle }) {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    initialState,
  );
  const [clientErrors, setClientErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);
  const toastRef = useRef(null);

  const errors = { ...state.errors, ...clientErrors };

  // Show a toast for every server response; clear the form on success.
  useEffect(() => {
    if (state.status === "idle") return;
    setToast({ status: state.status, message: state.message, id: state.submittedAt });
    if (state.status === "success") {
      formRef.current?.reset();
      setFileName("");
    }
  }, [state]);

  useEffect(() => {
    if (!toast || !toastRef.current) return;
    const el = toastRef.current;
    gsap.fromTo(
      el,
      { y: 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
    );
    const timer = setTimeout(() => {
      gsap.to(el, {
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setToast(null),
      });
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file?.name ?? "");
    setClientErrors((prev) => {
      const next = { ...prev };
      if (file && file.size > MAX_CV_SIZE) {
        next.cv = "CV không được vượt quá 5 MB.";
      } else {
        delete next.cv;
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    // Submit manually so a failed validation doesn't wipe what was typed
    // (React resets forms that use the `action` prop after every submit).
    e.preventDefault();
    if (clientErrors.cv) return;
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  const describedBy = (name) =>
    errors[name] ? `apply-${name}-error` : undefined;

  return (
    <>
      <form
        ref={formRef}
        className="apply-form-fields"
        onSubmit={handleSubmit}
      >
        {jobId != null && <input type="hidden" name="jobId" value={jobId} />}

        <Field label="Họ và tên" name="name" error={errors.name}>
          <input
            id="apply-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            required
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
          />
        </Field>

        <Field label="Email" name="email" error={errors.email}>
          <input
            id="apply-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email@domain.com"
            required
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
          />
        </Field>

        <Field label="Số điện thoại" name="phone" error={errors.phone}>
          <input
            id="apply-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0901 234 567"
            pattern="[0-9+\(\)\s.\-]{8,20}"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
          />
        </Field>

        <Field
          label="Link hồ sơ (LinkedIn, Portfolio...)"
          name="profile"
          error={errors.profile}
        >
          <input
            id="apply-profile"
            name="profile"
            type="url"
            autoComplete="url"
            placeholder="https://"
            aria-invalid={!!errors.profile}
            aria-describedby={describedBy("profile")}
          />
        </Field>

        <Field label="Vị trí ứng tuyển" name="jobTitle" error={errors.jobTitle}>
          {jobId != null ? (
            <input
              id="apply-jobTitle"
              type="text"
              value={jobTitle}
              readOnly
              aria-readonly="true"
            />
          ) : (
            <input
              id="apply-jobTitle"
              name="jobTitle"
              type="text"
              placeholder="Vị trí bạn muốn đóng góp"
              required
              aria-invalid={!!errors.jobTitle}
              aria-describedby={describedBy("jobTitle")}
            />
          )}
        </Field>

        <Field label="CV (PDF, DOC, DOCX - tối đa 5 MB)" name="cv" error={errors.cv}>
          <div className="apply-file">
            <input
              id="apply-cv"
              name="cv"
              type="file"
              accept={CV_ACCEPT}
              required
              onChange={handleFileChange}
              aria-invalid={!!errors.cv}
              aria-describedby={describedBy("cv")}
            />
            <span className="apply-file-icon" aria-hidden="true">
              <IoMdAttach />
            </span>
            <span className="apply-file-name">
              {fileName || "Chọn file CV"}
            </span>
          </div>
        </Field>

        <div className="apply-submit full">
          <AnimatedButton label="Gửi hồ sơ" type="submit" disabled={pending} />
        </div>
      </form>

      {toast && (
        <div
          ref={toastRef}
          key={toast.id}
          className={`apply-toast ${toast.status}`}
          role={toast.status === "success" ? "status" : "alert"}
        >
          <span className="apply-toast-icon" aria-hidden="true">
            {toast.status === "success" ? <IoMdCheckmark /> : <IoMdClose />}
          </span>
          <p>{toast.message}</p>
          <button
            type="button"
            className="apply-toast-close"
            aria-label="Đóng thông báo"
            onClick={() => setToast(null)}
          >
            <IoMdClose />
          </button>
        </div>
      )}
    </>
  );
}
