"use client";

import { useState, type SubmitEvent } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { FIELD_CLASS, FormField } from "@/components/form-field";
import { CONTACT_SUBJECTS } from "@/features/contato/constants";
import {
  mockSendContact,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/features/contato/services/contact-service";

const EMPTY_FIELDS: ContactFields = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  function update(key: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function invalidProps(key: keyof ContactFields) {
    return {
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": errors[key] ? `${key}-error` : undefined,
    };
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateContact(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await mockSendContact();
    setIsSubmitting(false);
    setIsSent(true);
  }

  if (isSent) {
    return (
      <div role="status" className="flex flex-col items-start gap-space-md">
        <div className="flex size-12 items-center justify-center rounded-[0.75rem] bg-secondary-container text-secondary">
          <MaterialIcon name="check_circle" className="text-[24px]" />
        </div>
        <h3 className="font-headline text-headline-md text-on-surface">Mensagem enviada</h3>
        <p className="text-body-md text-on-surface-variant">
          Obrigada, {fields.name.trim().split(" ")[0]}. Vamos responder no e-mail{" "}
          <span className="font-semibold text-on-surface">{fields.email.trim()}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY_FIELDS);
            setIsSent(false);
          }}
          className="rounded-[0.25rem] bg-surface-container px-space-lg py-3 text-label-lg text-on-surface transition-colors hover:text-primary"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-space-md" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
        <FormField id="name" label="Nome" error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            className={FIELD_CLASS}
            {...invalidProps("name")}
          />
        </FormField>
        <FormField id="email" label="E-mail" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            className={FIELD_CLASS}
            {...invalidProps("email")}
          />
        </FormField>
      </div>

      <FormField id="subject" label="Assunto" error={errors.subject}>
        <select
          id="subject"
          value={fields.subject}
          onChange={(event) => update("subject", event.target.value)}
          className={FIELD_CLASS}
          {...invalidProps("subject")}
        >
          <option value="">Selecione</option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="message" label="Mensagem" error={errors.message}>
        <textarea
          id="message"
          rows={5}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          className={FIELD_CLASS}
          {...invalidProps("message")}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-space-xs rounded-[0.25rem] bg-primary px-8 py-3.5 text-label-lg text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-60 md:self-start"
      >
        <MaterialIcon name="send" className="text-[18px]" />
        <span>{isSubmitting ? "Enviando..." : "Enviar mensagem"}</span>
      </button>
    </form>
  );
}
