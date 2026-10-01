"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { FormField, ariaDoCampo } from "@/components/FormField";
import { cn } from "@/lib/utils";
import type { FichaTecnicaFormErrors, FichaTecnicaFormValues } from "@/features/ficha-tecnica/types";

type ModalidadeFieldsProps = {
  valores: FichaTecnicaFormValues;
  erros: FichaTecnicaFormErrors;
  onAlterar: <K extends keyof FichaTecnicaFormValues>(
    campo: K,
    valor: FichaTecnicaFormValues[K],
  ) => void;
};

const CAMPO = "h-11 bg-canvas md:h-10";

export function ModalidadeFields({ valores, erros, onAlterar }: ModalidadeFieldsProps) {
  const base = useId();
  const id = (campo: string) => `${base}-${campo}`;

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-xs font-semibold tracking-wider text-ink uppercase">
        Modalidade de comercialização &amp; prazos
      </legend>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className={cn(
            "flex flex-col gap-4 rounded-xl border bg-canvas p-4 transition-colors",
            valores.prontaEntrega ? "border-terracotta" : "border-border",
          )}
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={valores.prontaEntrega}
              onChange={(evento) => onAlterar("prontaEntrega", evento.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-terracotta"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-ink">Pronta entrega</span>
              <span className="text-xs text-muted-foreground">
                Unidades já tecidas e finalizadas na oficina. Envio imediato.
              </span>
            </span>
          </label>
          {valores.prontaEntrega ? (
            <FormField id={id("estoque")} label="Estoque físico atual" erro={erros.estoqueFisico}>
              <Input
                id={id("estoque")}
                inputMode="numeric"
                value={valores.estoqueFisico}
                onChange={(evento) => onAlterar("estoqueFisico", evento.target.value)}
                placeholder="0"
                className={cn(CAMPO, "bg-surface font-mono")}
                {...ariaDoCampo(id("estoque"), erros.estoqueFisico)}
              />
            </FormField>
          ) : null}
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 rounded-xl border bg-canvas p-4 transition-colors",
            valores.sobEncomenda ? "border-terracotta" : "border-border",
          )}
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={valores.sobEncomenda}
              onChange={(evento) => onAlterar("sobEncomenda", evento.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-terracotta"
            />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-ink">Sob encomenda</span>
              <span className="text-xs text-muted-foreground">
                Confeccionado após a aprovação do pedido, sem estoque físico.
              </span>
            </span>
          </label>
          {valores.sobEncomenda ? (
            <FormField
              id={id("prazo")}
              label="Prazo de confecção (dias úteis)"
              obrigatorio
              erro={erros.prazoDias}
            >
              <Input
                id={id("prazo")}
                inputMode="numeric"
                value={valores.prazoDias}
                onChange={(evento) => onAlterar("prazoDias", evento.target.value)}
                placeholder="12"
                className={cn(CAMPO, "bg-surface font-mono")}
                {...ariaDoCampo(id("prazo"), erros.prazoDias)}
              />
            </FormField>
          ) : null}
        </div>
      </div>

      {erros.modalidade ? (
        <p role="alert" className="text-xs text-critical">
          {erros.modalidade}
        </p>
      ) : null}
    </fieldset>
  );
}
