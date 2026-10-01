"use client";

import { useId } from "react";
import { PackagePlusIcon, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, ariaDoCampo } from "@/components/FormField";
import { useAcessorioForm } from "@/features/insumos/hooks/use-acessorio-form";
import type { AcessorioInput } from "@/features/insumos/types";

type AcessorioFormProps = {
  onSubmit: (acessorio: AcessorioInput) => void;
  onCancel: () => void;
};

const CAMPO = "h-11 bg-canvas md:h-10";

export function AcessorioForm({ onSubmit, onCancel }: AcessorioFormProps) {
  const base = useId();
  const id = (campo: string) => `${base}-${campo}`;
  const { valores, erros, alterarCampo, enviar } = useAcessorioForm({ onSubmit });

  return (
    <form
      onSubmit={enviar}
      noValidate
      autoComplete="off"
      aria-labelledby={id("titulo")}
      className="flex flex-col gap-6 rounded-xl bg-surface p-5 md:p-8"
    >
      <header className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-canvas text-terracotta">
          <PackagePlusIcon className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 id={id("titulo")} className="text-lg leading-tight font-semibold text-ink">
            Adicionar Acessório
          </h2>
          <p className="text-sm text-muted-foreground">
            Etiquetas, botões, sacolas e outros itens de acabamento vendidos por peça.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          id={id("nome")}
          label="Nome"
          obrigatorio
          erro={erros.nome}
          className="sm:col-span-2"
        >
          <Input
            id={id("nome")}
            value={valores.nome}
            onChange={(e) => alterarCampo("nome", e.target.value)}
            placeholder="Ex: Etiquetas de Couro Ecológico"
            className={CAMPO}
            {...ariaDoCampo(id("nome"), erros.nome)}
          />
        </FormField>

        <FormField
          id={id("descricao")}
          label="Descrição"
          dica="Aparece resumida no cartão do acessório."
          className="sm:col-span-2"
        >
          <Textarea
            id={id("descricao")}
            value={valores.descricao}
            onChange={(e) => alterarCampo("descricao", e.target.value)}
            placeholder="Ex: Gravação a laser com logo, com furos."
            className="min-h-16 resize-none bg-canvas"
          />
        </FormField>

        <FormField id={id("tag")} label="Etiqueta" obrigatorio erro={erros.tag}>
          <Input
            id={id("tag")}
            value={valores.tag}
            onChange={(e) => alterarCampo("tag", e.target.value)}
            placeholder="Ex: Identidade"
            className={CAMPO}
            {...ariaDoCampo(id("tag"), erros.tag)}
          />
        </FormField>

        <FormField
          id={id("fornecedor")}
          label="Fornecedor"
          obrigatorio
          erro={erros.fornecedor}
        >
          <Input
            id={id("fornecedor")}
            value={valores.fornecedor}
            onChange={(e) => alterarCampo("fornecedor", e.target.value)}
            placeholder="Ex: LaserCraft SP"
            className={CAMPO}
            {...ariaDoCampo(id("fornecedor"), erros.fornecedor)}
          />
        </FormField>

        <FormField
          id={id("custo")}
          label="Custo por Peça"
          obrigatorio
          erro={erros.custoPorPeca}
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground"
            >
              R$
            </span>
            <Input
              id={id("custo")}
              inputMode="decimal"
              value={valores.custoPorPeca}
              onChange={(e) => alterarCampo("custoPorPeca", e.target.value)}
              placeholder="0,85"
              className={`${CAMPO} pl-9 font-mono`}
              {...ariaDoCampo(id("custo"), erros.custoPorPeca)}
            />
          </div>
        </FormField>

        <FormField
          id={id("estoque")}
          label="Estoque Atual"
          obrigatorio
          erro={erros.estoqueAtual}
        >
          <div className="relative">
            <Input
              id={id("estoque")}
              inputMode="decimal"
              value={valores.estoqueAtual}
              onChange={(e) => alterarCampo("estoqueAtual", e.target.value)}
              placeholder="340"
              className={`${CAMPO} pr-10 font-mono`}
              {...ariaDoCampo(id("estoque"), erros.estoqueAtual)}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground"
            >
              un
            </span>
          </div>
        </FormField>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-5 md:h-10">
          Cancelar
        </Button>
        <Button
          type="submit"
          className="h-11 px-5 text-xs font-semibold tracking-wider uppercase md:h-10"
        >
          <SaveIcon aria-hidden="true" />
          Salvar Acessório
        </Button>
      </div>
    </form>
  );
}
