"use client";

import { useNewsletterSignup } from "@/hooks/use-newsletter-signup";

export function NewsletterForm() {
  const { email, error, isSubscribed, handleEmailChange, handleSubmit } = useNewsletterSignup();

  if (isSubscribed) {
    return (
      <p role="status" className="text-body-sm font-semibold text-secondary">
        Inscrição confirmada. Obrigada por fazer parte!
      </p>
    );
  }

  return (
    <form className="flex w-full max-w-md flex-1 flex-col gap-space-xs md:w-auto" onSubmit={handleSubmit} noValidate>
      <div className="flex items-center gap-space-sm">
        <input
          type="email"
          aria-label="Seu e-mail"
          aria-invalid={Boolean(error)}
          value={email}
          onChange={(event) => handleEmailChange(event.target.value)}
          placeholder="Seu e-mail mais afetivo..."
          className="w-full rounded-[0.5rem] border border-outline-variant/40 bg-surface px-space-md py-3 text-body-sm text-on-surface transition-all placeholder:text-outline focus:border-primary focus:outline-none aria-[invalid=true]:border-critical"
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-[0.5rem] bg-primary px-space-lg py-3 text-label-md whitespace-nowrap text-on-primary transition-all hover:bg-primary-container"
        >
          Quero Participar
        </button>
      </div>
      {error ? <p className="text-body-sm text-critical">{error}</p> : null}
    </form>
  );
}
