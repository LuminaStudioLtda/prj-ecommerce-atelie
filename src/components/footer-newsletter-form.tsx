"use client";

export function FooterNewsletterForm() {
  return (
    <form className="flex gap-1.5" onSubmit={(event) => event.preventDefault()}>
      <input
        type="email"
        aria-label="Seu e-mail"
        placeholder="Seu e-mail elegante"
        className="h-9 min-w-0 flex-1 rounded-sm border border-border bg-card px-3 text-[11px] text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none"
      />
      <button
        type="submit"
        className="h-9 rounded-sm bg-primary px-3 text-[9px] font-semibold tracking-wider text-primary-foreground uppercase"
      >
        Assinar
      </button>
    </form>
  );
}
