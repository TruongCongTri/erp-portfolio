import FormSection from "../Form/FormSection";
import DataText from "../Language/DataText";
import { getDictionary } from "@/i18n";
import ApplicationForm from "./ApplicationForm";

export const APPLY_FORM_ID = "apply";

// Server-rendered section shell; only the form fields are client-side.
// With `jobId` (a job page) the job title is fixed and comes from the
// Vietnamese job data, so it's marked translatable; without it (the open
// application on the Jobs page) the candidate types one.
const ApplyForm = ({ lang = "vi", jobId, jobTitle }) => {
  const t = getDictionary(lang).apply;
  const isJobPage = jobId != null;

  return (
    <FormSection
      id={APPLY_FORM_ID}
      callout={isJobPage ? t.callout : t.openCallout}
      // Job pages point the floating button at the form; the open application
      // at the end of the Jobs list doesn't (the job cards come first there).
      floatingLabel={isJobPage ? t.floating : undefined}
      title={
        isJobPage ? (
          <>
            {t.titlePrefix} <DataText>{jobTitle}</DataText>
          </>
        ) : (
          t.openTitle
        )
      }
    >
      <ApplicationForm jobId={jobId} jobTitle={jobTitle} />
    </FormSection>
  );
};

export default ApplyForm;
