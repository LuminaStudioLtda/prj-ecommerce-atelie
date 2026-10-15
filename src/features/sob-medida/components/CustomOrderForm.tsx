"use client";

import { useState, type SubmitEvent } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { FIELD_CLASS, FormField } from "@/components/form-field";
import { CUSTOM_ORDER_CATEGORIES } from "@/features/sob-medida/constants";
import {
  mockSubmitCustomOrder,
  validateCustomOrder,
  type CustomOrderErrors,
  type CustomOrderFields,
} from "@/features/sob-medida/services/custom-order-service";

const EMPTY_FIELDS: CustomOrderFields = {
  name: "",
  email: "",
  category: "",
  quantity: "1",
  description: "",
};

export function CustomOrderForm() {
  const [fields, setFields] = useState<CustomOrderFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<CustomOrderErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  function update(key: keyof CustomOrderFields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function invalidProps(key: keyof CustomOrderFields) {
    return {
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": errors[key] ? `${key}-error` : undefined,
    };
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateCustomOrder(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await mockSubmitCustomOrder();
    setIsSubmitting(false);
    setIsSent(true);
  }

  if (isSent) {
    return (
      <div role="status" className="flex flex-col items-start gap-space-md">
        <div className="flex size-12 items-center justify-center rounded-[0.75rem] bg-secondary-container text-secondary">
          <MaterialIcon name="check_circle" className="text-[24px]" />
        </div>
        <h3 className="font-headline text-headline-md text-on-surface">Recebemos a sua ideia</h3>
        <p className="text-body-md text-on-surface-variant">
          Obrigada, {fields.name.trim().split(" ")[0]}. Vamos analisar o pedido e responder no e-mail{" "}
          <span className="font-semibold text-on-surface">{fields.email.trim()}</span> com a proposta e o
          orçamento.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY_FIELDS);
            setIsSent(false);
          }}
          className="rounded-[0.25rem] bg-surface-container px-space-lg py-3 text-label-lg text-on-surface transition-colors hover:text-primary"
        >
          Enviar outro pedido
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

      <div className="grid grid-cols-1 gap-space-md md:grid-cols-[2fr_1fr]">
        <FormField id="category" label="Tipo de projeto" error={errors.category}>
          <select
            id="category"
            value={fields.category}
            onChange={(event) => update("category", event.target.value)}
            className={FIELD_CLASS}
            {...invalidProps("category")}
          >
            <option value="">Selecione</option>
            {CUSTOM_ORDER_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="quantity" label="Quantidade" error={errors.quantity}>
          <input
            id="quantity"
            type="number"
            min={1}
            inputMode="numeric"
            value={fields.quantity}
            onChange={(event) => update("quantity", event.target.value)}
            className={FIELD_CLASS}
            {...invalidProps("quantity")}
          />
        </FormField>
      </div>

      <FormField id="description" label="Conte a sua ideia" error={errors.description}>
        <textarea
          id="description"
          rows={5}
          value={fields.description}
          onChange={(event) => update("description", event.target.value)}
          placeholder="Ocasião, cores, medidas, referências e prazo desejado."
          className={FIELD_CLASS}
          {...invalidProps("description")}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-space-xs rounded-[0.25rem] bg-primary px-8 py-3.5 text-label-lg text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-60 md:self-start"
      >
        <MaterialIcon name="send" className="text-[18px]" />
        <span>{isSubmitting ? "Enviando..." : "Solicitar orçamento"}</span>
      </button>
    </form>
  );
}
