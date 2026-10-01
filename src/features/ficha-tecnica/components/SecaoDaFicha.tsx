import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SecaoDaFichaProps = {
  numero?: string;
  titulo: string;
  descricao: string;
  /** Conteúdo alinhado à direita do cabeçalho (selo, botão de ação). */
  acao?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function SecaoDaFicha({
  numero,
  titulo,
  descricao,
  acao,
  className,
  children,
}: SecaoDaFichaProps) {
  return (
    <section
      aria-label={titulo}
      className={cn("flex flex-col gap-6 rounded-xl border border-border bg-surface p-5 md:p-6", className)}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {numero ? (
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-terracotta font-mono text-xs font-semibold text-surface"
            >
              {numero}
            </span>
          ) : null}
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg leading-tight font-semibold text-ink">{titulo}</h2>
            <p className="text-sm text-muted-foreground">{descricao}</p>
          </div>
        </div>
        {acao}
      </header>
      {children}
    </section>
  );
}
