// Label + control + inline error. `id` must match the control's id; spread
// `fieldProps(name, prefix)` from useFormAction on the control to link them.
export default function Field({ id, label, required, error, full, children }) {
  return (
    <div
      className={["form-field", full && "full", error && "invalid"]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={id}>
        {label}
        {required && (
          <span className="form-required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="form-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
