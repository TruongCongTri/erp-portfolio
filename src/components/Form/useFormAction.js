"use client";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const initialState = { status: "idle", message: "", errors: {} };

/**
 * Shared submit flow for the site's forms:
 * - validates on submit with `validate(formData)` and shows styled inline
 *   errors (the form uses noValidate, so no native browser popups),
 * - focuses the first invalid field,
 * - clears a field's error as soon as it is edited,
 * - runs `action(prevState, formData)` and shows a toast with the result,
 * - resets the form after a successful submit.
 */
export default function useFormAction(action, validate, { onReset } = {}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);

  const focusFirstError = (fieldErrors) => {
    const first = Object.keys(fieldErrors)[0];
    formRef.current?.querySelector(`[name="${first}"]`)?.focus();
  };

  useEffect(() => {
    if (state.status === "idle") return;
    setErrors(state.errors ?? {});
    setToast({ status: state.status, message: state.message, id: state.submittedAt });
    if (state.status === "success") {
      formRef.current?.reset();
      onReset?.();
    } else {
      focusFirstError(state.errors ?? {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSubmit = (e) => {
    // Submit manually so a failed validation doesn't wipe what was typed
    // (React resets forms that use the `action` prop after every submit).
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(fieldErrors);
      return;
    }
    startTransition(() => formAction(formData));
  };

  // Remove a field's error once the visitor changes it. File inputs are left
  // to their own onChange, which re-checks the chosen file.
  const handleChange = (e) => {
    const { name, type } = e.target;
    if (!name || type === "file") return;
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const closeToast = useCallback(() => setToast(null), []);

  const fieldProps = (name, idPrefix) => ({
    id: `${idPrefix}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${idPrefix}-${name}-error` : undefined,
  });

  return {
    formRef,
    formProps: {
      ref: formRef,
      noValidate: true,
      onSubmit: handleSubmit,
      onChange: handleChange,
    },
    errors,
    setErrors,
    fieldProps,
    pending,
    toast,
    closeToast,
  };
}
