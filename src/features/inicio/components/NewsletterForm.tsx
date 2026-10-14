"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex w-full max-w-md flex-1 items-center gap-space-sm md:w-auto"
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        type="email"
        aria-label="Seu e-mail"
        placeholder="Seu e-mail mais afetivo..."
        className="w-full rounded-[0.5rem] border border-outline-variant/40 bg-surface px-space-md py-3 text-body-sm text-on-surface transition-all placeholder:text-outline focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center justify-center rounded-[0.5rem] bg-primary px-space-lg py-3 text-label-md whitespace-nowrap text-on-primary transition-all hover:bg-primary-container"
      >
        Quero Participar
      </button>
    </form>
  );
}
