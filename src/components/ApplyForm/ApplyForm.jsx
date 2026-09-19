import "./ApplyForm.css";

import Copy from "../Copy/Copy";
import ApplicationForm from "./ApplicationForm";

export const APPLY_FORM_ID = "apply";

// Server-rendered section shell; only the form fields are client-side.
// With `jobId` the job title is fixed; without it the candidate types one.
const ApplyForm = ({ jobId, jobTitle, callout = "Ứng tuyển", title }) => {
  return (
    <section
      className="apply-form"
      id={APPLY_FORM_ID}
      aria-labelledby="apply-form-title"
    >
      <div className="container">
        <div className="apply-form-col">
          <Copy delay={0.1}>
            <p className="apply-form-callout">{callout}</p>
          </Copy>
        </div>
        <div className="apply-form-col">
          <Copy delay={0.15}>
            <h3 id="apply-form-title">
              {title ?? (
                <>
                  Ứng tuyển vị trí <span>{jobTitle}</span>
                </>
              )}
            </h3>
          </Copy>
          <ApplicationForm jobId={jobId} jobTitle={jobTitle} />
        </div>
      </div>
    </section>
  );
};

export default ApplyForm;
