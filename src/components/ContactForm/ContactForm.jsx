"use client";
import { submitContact } from "@/app/actions/contact";
import { useI18n } from "@/i18n/client";
import { readContact, validateContact } from "@/lib/validation";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import Field from "../Form/Field";
import FormToast from "../Form/FormToast";
import useFormAction from "../Form/useFormAction";

const ID = "contact";

export default function ContactForm() {
  const { lang, t } = useI18n();
  const { formProps, errors, fieldProps, pending, toast, closeToast } =
    useFormAction(submitContact, (formData) =>
      validateContact(readContact(formData)),
    );

  return (
    <>
      <form className="form-fields" {...formProps}>
        <input type="hidden" name="lang" value={lang} />

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

        <Field id={`${ID}-subject`} label={t.contactForm.subject} error={errors.subject}>
          <input
            {...fieldProps("subject", ID)}
            type="text"
            placeholder={t.contactForm.subjectPlaceholder}
          />
        </Field>

        <Field
          id={`${ID}-message`}
          label={t.contactForm.message}
          required
          full
          error={errors.message}
        >
          <textarea
            {...fieldProps("message", ID)}
            rows={5}
            placeholder={t.contactForm.messagePlaceholder}
            aria-required="true"
          />
        </Field>

        <p className="form-fields-note">
          <span className="form-required">*</span> {t.form.requiredNote}
        </p>

        <div className="form-submit full">
          <AnimatedButton label={t.contactForm.submit} type="submit" disabled={pending} />
        </div>
      </form>

      <FormToast toast={toast} onClose={closeToast} closeLabel={t.form.closeToast} />
    </>
  );
}
