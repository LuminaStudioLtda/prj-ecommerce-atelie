"use client";

import { useId } from "react";
import { TriangleAlertIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormField, ariaDoCampo } from "@/components/FormField";
import {
  erroDasEmbalagens,
  erroDoPrecoManual,
} from "@/features/ficha-tecnica/services/ficha-tecnica-form";
import { RentabilidadeDonut } from "@/features/ficha-tecnica/components/RentabilidadeDonut";
import { SecaoDaFicha } from "@/features/ficha-tecnica/components/SecaoDaFicha";
import {
  formatarMoeda,
  formatarPercentual,
  type ConfiguracaoDePrecificacao,
  type ResultadoDePrecificacao,
} from "@/features/ficha-tecnica/services/precificacao";
import type { FichaTecnicaFormErrors, FichaTecnicaFormValues } from "@/features/ficha-tecnica/types";

type MotorDePrecificacaoProps = {
  valores: Pick<FichaTecnicaFormValues, "margemPct" | "embalagens" | "precoManual">;
  erros: FichaTecnicaFormErrors;
  resultado: ResultadoDePrecificacao;
  configuracao: ConfiguracaoDePrecificacao;
  onAlterar: <K extends "margemPct" | "embalagens" | "precoManual">(
    campo: K,
    valor: FichaTecnicaFormValues[K],
  ) => void;
};

const LINHA = "flex items-baseline justify-between gap-3 text-sm";

export function MotorDePrecificacao({
  valores,
  erros,
  resultado,
  configuracao,
  onAlterar,
}: MotorDePrecificacaoProps) {
  const base = useId();
  const erroEmbalagens = erros.embalagens ?? erroDasEmbalagens(valores.embalagens);
  const erroPreco = erros.precoManual ?? erroDoPrecoManual(valores.precoManual);
  const id = (campo: string) => `${base}-${campo}`;

  const { custoDireto, custoInsumos, custoMaoDeObra, embalagens } = resultado;
  const partes = [
    { rotulo: "Insumos", valor: custoInsumos, classe: "bg-terracotta" },
    { rotulo: "Mão de obra", valor: custoMaoDeObra, classe: "bg-ink" },
    { rotulo: "Embalagens", valor: embalagens, classe: "bg-ochre" },
  ];

  const manual = valores.precoManual.trim() !== "" && !erroPreco;
  const prejuizo = resultado.precoFinal > 0 && resultado.lucro < 0;
  const abaixoDoSugerido = manual && resultado.precoFinal < resultado.precoSugerido && !prejuizo;

  return (
    <SecaoDaFicha
      numero="03"
      titulo="Motor de precificação"
      descricao="Rentabilidade calculada pelas fórmulas do ateliê."
    >
      <div className="flex flex-col gap-3 rounded-xl bg-canvas p-4">
        <div className={LINHA}>
          <span className="text-muted-foreground">Custo total de produção direta</span>
          <span className="font-mono text-xl font-semibold text-ink">{formatarMoeda(custoDireto)}</span>
        </div>
        <div
          role="img"
          aria-label="Proporção entre insumos, mão de obra e embalagens no custo direto"
          className="flex h-2 overflow-hidden rounded-full bg-border"
        >
          {custoDireto > 0
            ? partes.map((parte) => (
                <span
                  key={parte.rotulo}
                  className={parte.classe}
                  style={{ width: `${(parte.valor / custoDireto) * 100}%` }}
                />
              ))
            : null}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {partes.map((parte) => (
            <li key={parte.rotulo} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={`size-2 rounded-full ${parte.classe}`} />
              {parte.rotulo}: <span className="font-mono text-ink">{formatarMoeda(parte.valor)}</span>
            </li>
          ))}
        </ul>
      </div>

      <FormField
        id={id("embalagens")}
        label="Embalagens, tags & mimos (R$)"
        dica="Custo indireto somado ao custo direto da peça."
        erro={erroEmbalagens}
      >
        <Input
          id={id("embalagens")}
          inputMode="decimal"
          value={valores.embalagens}
          onChange={(evento) => onAlterar("embalagens", evento.target.value)}
          placeholder="0,00"
          className="h-11 bg-canvas font-mono md:h-10"
          {...ariaDoCampo(id("embalagens"), erroEmbalagens, "dica")}
        />
      </FormField>

      <div className="flex flex-col gap-3">
        <div className={LINHA}>
          <label htmlFor={id("margem")} className="text-xs font-semibold tracking-wider text-ink uppercase">
            Margem de lucro desejada
          </label>
          <span className="font-mono text-sm font-semibold text-terracotta">{valores.margemPct}%</span>
        </div>
        <input
          id={id("margem")}
          type="range"
          min={0}
          max={100}
          step={1}
          value={valores.margemPct}
          onChange={(evento) => onAlterar("margemPct", Number(evento.target.value))}
          className="h-6 w-full cursor-pointer accent-terracotta"
        />
        <p className="text-xs text-muted-foreground">
          Lucro previsto sobre o preço sugerido:{" "}
          <span className="font-mono text-ink">
            {formatarMoeda(resultado.lucroSugerido)}
          </span>
        </p>
      </div>

      <dl className="flex flex-col gap-2 border-t border-border pt-4">
        <div className={LINHA}>
          <dt className="text-muted-foreground">
            Taxa de perdas ({formatarPercentual(configuracao.taxaPerdas)})
          </dt>
          <dd className="font-mono text-ink">{formatarMoeda(resultado.valorPerdas)}</dd>
        </div>
        <div className={LINHA}>
          <dt className="text-muted-foreground">Preço sugerido pelo algoritmo</dt>
          <dd className="font-mono text-lg font-semibold text-ink">
            {formatarMoeda(resultado.precoSugerido)}
          </dd>
        </div>
      </dl>

      <div className="flex flex-col gap-3 rounded-xl border border-terracotta/40 bg-canvas p-4">
        <FormField
          id={id("preco")}
          label="Preço final de venda (R$)"
          dica="Deixe vazio para usar o preço sugerido."
          erro={erroPreco}
        >
          <Input
            id={id("preco")}
            inputMode="decimal"
            value={valores.precoManual}
            onChange={(evento) => onAlterar("precoManual", evento.target.value)}
            placeholder={resultado.precoSugerido.toFixed(2).replace(".", ",")}
            className="h-12 bg-surface font-mono text-lg font-semibold"
            {...ariaDoCampo(id("preco"), erroPreco, "dica")}
          />
        </FormField>

        <p className="text-xs text-muted-foreground">
          Preço aplicado: <span className="font-mono font-semibold text-ink">{formatarMoeda(resultado.precoFinal)}</span>
          {" · "}margem real:{" "}
          <span className="font-mono font-semibold text-ink">
            {resultado.precoFinal > 0 ? formatarPercentual(resultado.margemReal) : "—"}
          </span>
        </p>

        {prejuizo ? (
          <p role="status" className="flex items-start gap-2 text-xs font-semibold text-critical">
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Este preço não cobre o custo direto com perdas: a peça daria prejuízo.
          </p>
        ) : abaixoDoSugerido ? (
          <p role="status" className="flex items-start gap-2 text-xs text-ink">
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0 text-ochre" aria-hidden="true" />
            Preço abaixo do sugerido: a margem fica menor que os {valores.margemPct}% desejados.
          </p>
        ) : null}
      </div>

      <RentabilidadeDonut resultado={resultado} />
    </SecaoDaFicha>
  );
}
