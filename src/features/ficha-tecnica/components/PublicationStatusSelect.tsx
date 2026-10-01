"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  EFEITO_STATUS_PUBLICACAO,
  ROTULO_STATUS_PUBLICACAO,
  type StatusPublicacao,
} from "@/features/ficha-tecnica/types";

type PublicationStatusSelectProps = {
  valor: StatusPublicacao;
  destaque: boolean;
  onAlterarStatus: (status: StatusPublicacao) => void;
  onAlterarDestaque: (destaque: boolean) => void;
};

const STATUS: StatusPublicacao[] = ["rascunho", "ativo", "pausado", "fora-de-linha"];

export function PublicationStatusSelect({
  valor,
  destaque,
  onAlterarStatus,
  onAlterarDestaque,
}: PublicationStatusSelectProps) {
  const nome = useId();

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-3">
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Status de publicação</legend>
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-canvas p-1 sm:grid-cols-4">
          {STATUS.map((status) => (
            <label
              key={status}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-center rounded-md px-2 text-center text-sm transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50 md:min-h-9",
                valor === status
                  ? "bg-terracotta font-semibold text-surface"
                  : "text-muted-foreground hover:text-ink",
              )}
            >
              <input
                type="radio"
                name={nome}
                value={status}
                checked={valor === status}
                onChange={() => onAlterarStatus(status)}
                className="sr-only"
              />
              {ROTULO_STATUS_PUBLICACAO[status]}
            </label>
          ))}
        </div>
        <p className="px-1 text-xs text-muted-foreground">{EFEITO_STATUS_PUBLICACAO[valor]}</p>
      </fieldset>

      <label className="flex min-h-9 cursor-pointer items-center gap-2 px-1 text-sm text-ink">
        <input
          type="checkbox"
          checked={destaque}
          onChange={(evento) => onAlterarDestaque(evento.target.checked)}
          className="size-5 accent-terracotta"
        />
        Destaque na vitrine home
      </label>
    </div>
  );
}
