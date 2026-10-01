"use client";

import { useId } from "react";
import { ClockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormField, ariaDoCampo } from "@/components/FormField";
import { SecaoDaFicha } from "@/features/ficha-tecnica/components/SecaoDaFicha";
import { formatarMoeda } from "@/features/ficha-tecnica/services/precificacao";
import type { FichaTecnicaFormValues } from "@/features/ficha-tecnica/types";

type MaoDeObraSectionProps = {
  valores: Pick<FichaTecnicaFormValues, "horas" | "minutos">;
  erro?: string;
  valorHora: number;
  custoMaoDeObra: number;
  onAlterar: (campo: "horas" | "minutos", valor: string) => void;
};

export function MaoDeObraSection({
  valores,
  erro,
  valorHora,
  custoMaoDeObra,
  onAlterar,
}: MaoDeObraSectionProps) {
  const base = useId();
  const id = (campo: string) => `${base}-${campo}`;

  return (
    <SecaoDaFicha
      titulo="Mão de obra artesanal"
      descricao="Tempo de agulha por peça, valorizado pela hora técnica do ateliê."
      acao={
        <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-sage/20 px-2.5 text-xs font-semibold text-ink">
          <ClockIcon className="size-3.5" aria-hidden="true" />
          Valor da hora fixo
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <fieldset className="flex flex-col gap-1.5 rounded-xl bg-canvas p-4">
          <legend className="sr-only">Tempo estimado de confecção</legend>
          <span aria-hidden="true" className="text-xs font-semibold tracking-wider text-ink uppercase">
            Tempo estimado
          </span>
          <div className="flex items-end gap-2">
            <FormField id={id("horas")} label="Horas" className="flex-1">
              <Input
                id={id("horas")}
                inputMode="numeric"
                value={valores.horas}
                onChange={(evento) => onAlterar("horas", evento.target.value)}
                placeholder="0"
                className="h-11 bg-surface font-mono md:h-10"
                {...ariaDoCampo(id("horas"), erro)}
              />
            </FormField>
            <FormField id={id("minutos")} label="Minutos" className="flex-1">
              <Input
                id={id("minutos")}
                inputMode="numeric"
                value={valores.minutos}
                onChange={(evento) => onAlterar("minutos", evento.target.value)}
                placeholder="0"
                className="h-11 bg-surface font-mono md:h-10"
                {...ariaDoCampo(id("minutos"), erro)}
              />
            </FormField>
          </div>
        </fieldset>

        <div className="flex flex-col justify-between gap-1 rounded-xl bg-canvas p-4">
          <span className="text-xs font-semibold tracking-wider text-ink uppercase">
            Valor da hora técnica
          </span>
          <span className="font-mono text-xl font-semibold text-ink">
            {formatarMoeda(valorHora)}
            <span className="text-sm font-normal text-muted-foreground"> /hora</span>
          </span>
          <span className="text-xs text-muted-foreground">Definido na configuração global.</span>
        </div>

        <div className="flex flex-col justify-between gap-1 rounded-xl bg-canvas p-4">
          <span className="text-xs font-semibold tracking-wider text-ink uppercase">
            Subtotal mão de obra
          </span>
          <span className="font-mono text-xl font-semibold text-terracotta">
            {formatarMoeda(custoMaoDeObra)}
          </span>
          <span className="text-xs text-muted-foreground">(minutos ÷ 60) × valor da hora.</span>
        </div>
      </div>

      {erro ? (
        <p role="alert" className="-mt-3 text-xs text-critical">
          {erro}
        </p>
      ) : null}
    </SecaoDaFicha>
  );
}
