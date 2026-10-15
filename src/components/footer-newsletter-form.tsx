"use client";

import { useNewsletterSignup } from "@/hooks/use-newsletter-signup";

export function FooterNewsletterForm() {
  const { email, error, isSubscribed, handleEmailChange, handleSubmit } = useNewsletterSignup();

  if (isSubscribed) {
    return (
      <p role="status" className="text-[11px] text-foreground">
        Inscrição confirmada. Obrigada!
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-1.5" onSubmit={handleSubmit} noValidate>
      <div className="flex gap-1.5">
        <input
          type="email"
          aria-label="Seu e-mail"
          aria-invalid={Boolean(error)}
          value={email}
          onChange={(event) => handleEmailChange(event.target.value)}
          placeholder="Seu e-mail elegante"
          className="h-9 min-w-0 flex-1 rounded-sm border border-border bg-card px-3 text-[11px] text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none"
        />
        <button
          type="submit"
          className="h-9 rounded-sm bg-primary px-3 text-[9px] font-semibold tracking-wider text-primary-foreground uppercase"
        >
          Assinar
        </button>
      </div>
      {error ? <p className="text-[11px] text-critical">{error}</p> : null}
    </form>
  );
}
