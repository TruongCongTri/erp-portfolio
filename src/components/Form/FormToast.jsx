"use client";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

// Pill-style notification shown after a form submission.
export default function FormToast({ toast, onClose, closeLabel }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!toast || !ref.current) return;
    const el = ref.current;
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
        onComplete: onClose,
      });
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      ref={ref}
      key={toast.id}
      className={`form-toast ${toast.status}`}
      role={toast.status === "success" ? "status" : "alert"}
    >
      <span className="form-toast-icon" aria-hidden="true">
        {toast.status === "success" ? <IoMdCheckmark /> : <IoMdClose />}
      </span>
      <p>{toast.message}</p>
      <button
        type="button"
        className="form-toast-close"
        aria-label={closeLabel}
        onClick={onClose}
      >
        <IoMdClose />
      </button>
    </div>
  );
}
