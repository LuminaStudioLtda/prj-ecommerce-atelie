import type { ReactNode } from "react";

export const FIELD_CLASS =
  "w-full rounded-[0.5rem] border border-outline-variant/40 bg-surface-container-lowest px-space-md py-3 text-body-sm text-on-surface transition-all placeholder:text-outline focus:border-primary focus:outline-none aria-[invalid=true]:border-critical";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-space-xs">
      <label htmlFor={id} className="text-label-md text-on-surface">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-body-sm text-critical">
          {error}
        </p>
      ) : null}
    </div>
  );
}
