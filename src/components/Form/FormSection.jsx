import "./Form.css";

import Copy from "../Copy/Copy";

// Server-rendered layout for a form block: callout on the left, heading and
// the (client) form on the right. Used by the job application and contact forms.
// `floatingLabel` makes the site's floating button offer "<label> ↓" to jump
// here until the form has been scrolled past (see FloatingAction).
const FormSection = ({ id, callout, title, floatingLabel, children }) => {
  const titleId = `${id}-title`;

  return (
    <section
      className="form-section"
      id={id}
      aria-labelledby={titleId}
      data-floating-cta={floatingLabel}
    >
      <div className="container">
        <div className="form-section-col">
          <Copy delay={0.1}>
            <p className="form-section-callout">{callout}</p>
          </Copy>
        </div>
        <div className="form-section-col">
          <Copy delay={0.15}>
            <h3 id={titleId}>{title}</h3>
          </Copy>
          {children}
        </div>
      </div>
    </section>
  );
};

export default FormSection;
