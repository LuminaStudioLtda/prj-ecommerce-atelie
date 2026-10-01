"use client";

import { useId } from "react";
import { CalculatorIcon, PackagePlusIcon, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  ariaDoCampo,
} from "@/components/FormField";
import { useInsumoForm } from "@/features/insumos/hooks/use-insumo-form";
import {
  ROTULO_CUSTO,
  ROTULO_UNIDADE,
  SUFIXO_CUSTO,
  UNIDADES_INSUMO,
  formatarCustoUnitario,
} from "@/features/insumos/services/insumo-custo";
import {
  ehCategoriaInsumo,
  ehUnidadeInsumo,
  pesoObrigatorio,
  rendimentoObrigatorio,
} from "@/features/insumos/services/insumo-form";
import { ROTULO_CATEGORIA, type CategoriaInsumo, type InsumoInput } from "@/features/insumos/types";

const CATEGORIAS_INSUMO: CategoriaInsumo[] = ["fio", "aviamento", "embalagem"];

type InsumoFormProps = {
  /** Quando informado, o formulário entra em modo de edição com os valores do insumo. */
  insumo?: InsumoInput;
  onSubmit: (insumo: InsumoInput) => void | Promise<void>;
  onCancel?: () => void;
};

const CAMPO = "h-11 bg-canvas md:h-10";
const CAMPO_SELECT =
  "w-full bg-canvas data-[size=default]:h-11 md:data-[size=default]:h-10";

export function InsumoForm({ insumo, onSubmit, onCancel }: InsumoFormProps) {
  const base = useId();
  const id = (campo: string) => `${base}-${campo}`;
  const editando = insumo !== undefined;

  const { valores, erros, erroEnvio, enviando, custo, alterarCampo, enviar } =
    useInsumoForm({ insumoInicial: insumo, onSubmit });

  return (
    <form
      onSubmit={enviar}
      noValidate
      autoComplete="off"
      aria-labelledby={id("titulo")}
      className="@container flex flex-col gap-6 rounded-xl border border-border bg-surface p-5 md:p-8"
    >
      <header className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-canvas text-terracotta">
          <PackagePlusIcon className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 id={id("titulo")} className="text-lg leading-tight font-semibold text-ink">
            {editando ? "Editar Insumo" : "Entrada Rápida de Insumo"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Alimente a base de cálculos com as métricas da nota fiscal ou do cone.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @3xl:grid-cols-6">
        <FormField
          id={id("categoria")}
          label="Tipo de Insumo"
          obrigatorio
          className="@3xl:col-span-2"
        >
          <Select
            value={valores.categoria}
            onValueChange={(categoria) => {
              if (ehCategoriaInsumo(categoria)) alterarCampo("categoria", categoria);
            }}
          >
            <SelectTrigger id={id("categoria")} className={CAMPO_SELECT}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS_INSUMO.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {ROTULO_CATEGORIA[categoria]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          id={id("sku")}
          label="SKU / Código"
          obrigatorio
          erro={erros.sku}
          className="@3xl:col-span-2"
        >
          <Input
            id={id("sku")}
            value={valores.sku}
            onChange={(e) => alterarCampo("sku", e.target.value)}
            placeholder="Ex: FIO-ALG-001"
            className={`${CAMPO} font-mono`}
            {...ariaDoCampo(id("sku"), erros.sku)}
          />
        </FormField>

        <FormField
          id={id("nome")}
          label="Nome Comercial"
          obrigatorio
          erro={erros.nomeComercial}
          className="@3xl:col-span-2"
        >
          <Input
            id={id("nome")}
            value={valores.nomeComercial}
            onChange={(e) => alterarCampo("nomeComercial", e.target.value)}
            placeholder="Ex: Fio Algodão Mercerizado 100%"
            className={CAMPO}
            {...ariaDoCampo(id("nome"), erros.nomeComercial)}
          />
        </FormField>

        <FormField id={id("marca")} label="Marca" className="@3xl:col-span-2">
          <Input
            id={id("marca")}
            value={valores.marca}
            onChange={(e) => alterarCampo("marca", e.target.value)}
            placeholder="Ex: Círculo Charme"
            className={CAMPO}
          />
        </FormField>

        <FormField id={id("cor")} label="Cor / Tonalidade" className="@3xl:col-span-2">
          <Input
            id={id("cor")}
            value={valores.cor}
            onChange={(e) => alterarCampo("cor", e.target.value)}
            placeholder="Ex: Terracota Argila (7625)"
            className={CAMPO}
          />
        </FormField>

        <FormField
          id={id("lote")}
          label="Lote / Tintura"
          obrigatorio
          erro={erros.lote}
          className="@3xl:col-span-2"
        >
          <Input
            id={id("lote")}
            value={valores.lote}
            onChange={(e) => alterarCampo("lote", e.target.value)}
            placeholder="Ex: L-8940"
            className={`${CAMPO} font-mono`}
            {...ariaDoCampo(id("lote"), erros.lote)}
          />
        </FormField>

        <FormField
          id={id("unidade")}
          label="Unidade"
          obrigatorio
          dica="Define como o custo unitário é calculado."
          className="@3xl:col-span-2"
        >
          <Select
            value={valores.unidade}
            onValueChange={(unidade) => {
              if (ehUnidadeInsumo(unidade)) alterarCampo("unidade", unidade);
            }}
          >
            <SelectTrigger
              id={id("unidade")}
              className={CAMPO_SELECT}
              {...ariaDoCampo(id("unidade"), undefined, "Define como o custo unitário é calculado.")}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNIDADES_INSUMO.map((unidade) => (
                <SelectItem key={unidade} value={unidade}>
                  {ROTULO_UNIDADE[unidade]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          id={id("peso")}
          label="Peso do Novelo / Cone"
          obrigatorio={pesoObrigatorio(valores.unidade)}
          erro={erros.pesoGramas}
          className="@3xl:col-span-2"
        >
          <div className="relative">
            <Input
              id={id("peso")}
              inputMode="decimal"
              value={valores.pesoGramas}
              onChange={(e) => alterarCampo("pesoGramas", e.target.value)}
              placeholder="400"
              className={`${CAMPO} pr-8 font-mono`}
              {...ariaDoCampo(id("peso"), erros.pesoGramas)}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
            >
              g
            </span>
          </div>
        </FormField>

        <FormField
          id={id("rendimento")}
          label="Rendimento Total"
          obrigatorio={rendimentoObrigatorio(valores.unidade)}
          erro={erros.rendimentoMetros}
          className="@3xl:col-span-2"
        >
          <div className="relative">
            <Input
              id={id("rendimento")}
              inputMode="decimal"
              value={valores.rendimentoMetros}
              onChange={(e) => alterarCampo("rendimentoMetros", e.target.value)}
              placeholder="396"
              className={`${CAMPO} pr-8 font-mono`}
              {...ariaDoCampo(id("rendimento"), erros.rendimentoMetros)}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
            >
              m
            </span>
          </div>
        </FormField>

        <FormField
          id={id("preco")}
          label="Preço de Aquisição"
          obrigatorio
          erro={erros.precoAquisicao}
          className="@3xl:col-span-2"
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground"
            >
              R$
            </span>
            <Input
              id={id("preco")}
              inputMode="decimal"
              value={valores.precoAquisicao}
              onChange={(e) => alterarCampo("precoAquisicao", e.target.value)}
              placeholder="42,00"
              className={`${CAMPO} pl-9 font-mono`}
              {...ariaDoCampo(id("preco"), erros.precoAquisicao)}
            />
          </div>
        </FormField>

        <FormField
          id={id("custo")}
          label={ROTULO_CUSTO[valores.unidade]}
          dica="Base de amortização das receitas artesanais."
          className="@3xl:col-span-4"
        >
          <output
            id={id("custo")}
            className="flex h-11 items-center justify-between gap-3 rounded-lg border border-border bg-canvas px-3 md:h-10"
          >
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalculatorIcon className="size-4 text-terracotta" aria-hidden="true" />
              Calculado automaticamente
            </span>
            {custo ? (
              <span className="flex items-baseline gap-1 font-mono text-ink">
                <span className="text-xs text-muted-foreground">R$</span>
                <span className="text-base font-semibold">
                  {formatarCustoUnitario(custo.valor)}
                </span>
                <span className="text-xs text-muted-foreground">{SUFIXO_CUSTO[custo.unidade]}</span>
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Preencha os dados para calcular
              </span>
            )}
          </output>
        </FormField>
      </div>

      {erroEnvio ? (
        <p role="alert" className="text-sm text-critical">
          {erroEnvio}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 @md:flex-row @md:justify-end">
        {onCancel ? (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={enviando}
            className="h-11 px-5 md:h-10"
          >
            Cancelar
          </Button>
        ) : null}
        <Button
          type="submit"
          disabled={enviando}
          className="h-11 px-5 text-xs font-semibold tracking-wider uppercase md:h-10"
        >
          <SaveIcon aria-hidden="true" />
          {enviando ? "Salvando..." : "Salvar Registro"}
        </Button>
      </div>
    </form>
  );
}
