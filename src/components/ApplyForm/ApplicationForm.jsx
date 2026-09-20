"use client";
import { useState } from "react";

import { IoMdAttach } from "react-icons/io";

import { submitApplication } from "@/app/actions/apply";
import { useI18n } from "@/i18n/client";
import { CV_ACCEPT } from "@/lib/application";
import {
  checkCv,
  errorMessages,
  readApplication,
  validateApplication,
} from "@/lib/validation";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import Field from "../Form/Field";
import FormToast from "../Form/FormToast";
import useFormAction from "../Form/useFormAction";

const ID = "apply";

export default function ApplicationForm({ jobId, jobTitle }) {
  const { lang, t } = useI18n();
  const jobTitleFixed = jobId != null;
  const [fileName, setFileName] = useState("");

  const { formProps, errors, setErrors, fieldProps, pending, toast, closeToast } =
    useFormAction(
      submitApplication,
      (formData) =>
        validateApplication(readApplication(formData), { jobTitleFixed }),
      { onReset: () => setFileName("") },
    );

  // Show the chosen file name and flag a wrong type/size straight away.
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file?.name ?? "");
    const error = file ? checkCv(file, errorMessages(lang)) : undefined;
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next.cv = error;
      else delete next.cv;
      return next;
    });
  };

  return (
    <>
      <form className="form-fields" {...formProps}>
        <input type="hidden" name="lang" value={lang} />
        {jobTitleFixed && <input type="hidden" name="jobId" value={jobId} />}

        <Field id={`${ID}-name`} label={t.form.name} required error={errors.name}>
          <input
            {...fieldProps("name", ID)}
            type="text"
            autoComplete="name"
            placeholder={t.form.namePlaceholder}
            aria-required="true"
          />
        </Field>

        <Field id={`${ID}-email`} label={t.form.email} required error={errors.email}>
          <input
            {...fieldProps("email", ID)}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="email@domain.com"
            aria-required="true"
          />
        </Field>

        <Field id={`${ID}-phone`} label={t.form.phone} error={errors.phone}>
          <input
            {...fieldProps("phone", ID)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0901 234 567"
          />
        </Field>

        <Field id={`${ID}-profile`} label={t.apply.profile} error={errors.profile}>
          <input
            {...fieldProps("profile", ID)}
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
          />
        </Field>

        <Field
          id={`${ID}-jobTitle`}
          label={t.apply.jobTitle}
          required
          error={errors.jobTitle}
        >
          {jobTitleFixed ? (
            // The job page's title is Vietnamese data. Shown as text (not an
            // input value) so it can be machine-translated on English pages.
            <output id={`${ID}-jobTitle`} className="form-static" translate="yes">
              {jobTitle}
            </output>
          ) : (
            <input
              {...fieldProps("jobTitle", ID)}
              type="text"
              autoComplete="organization-title"
              placeholder={t.apply.jobTitlePlaceholder}
              aria-required="true"
            />
          )}
        </Field>

        <Field id={`${ID}-cv`} label={t.apply.cv} required error={errors.cv}>
          <div className="form-file">
            <input
              {...fieldProps("cv", ID)}
              type="file"
              accept={CV_ACCEPT}
              aria-required="true"
              onChange={handleFileChange}
            />
            <span className="form-file-icon" aria-hidden="true">
              <IoMdAttach />
            </span>
            <span className="form-file-name" key={fileName || "empty"}>
              {fileName || t.apply.chooseFile}
            </span>
          </div>
        </Field>

        <p className="form-fields-note">
          <span className="form-required">*</span> {t.form.requiredNote}
        </p>

        <div className="form-submit full">
          <AnimatedButton label={t.apply.submit} type="submit" disabled={pending} />
        </div>
      </form>

      <FormToast toast={toast} onClose={closeToast} closeLabel={t.form.closeToast} />
    </>
  );
}
