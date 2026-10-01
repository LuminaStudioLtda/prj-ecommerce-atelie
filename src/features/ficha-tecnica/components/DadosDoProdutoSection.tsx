"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField, ariaDoCampo } from "@/components/FormField";
import { FotosDoProduto } from "@/features/ficha-tecnica/components/FotosDoProduto";
import { ModalidadeFields } from "@/features/ficha-tecnica/components/ModalidadeFields";
import { SecaoDaFicha } from "@/features/ficha-tecnica/components/SecaoDaFicha";
import type { useFotosDoProduto } from "@/features/ficha-tecnica/hooks/use-fotos-do-produto";
import { CATEGORIAS_DO_ATELIE } from "@/features/ficha-tecnica/services/ficha-tecnica-form";
import type { FichaTecnicaFormErrors, FichaTecnicaFormValues } from "@/features/ficha-tecnica/types";

type DadosDoProdutoSectionProps = {
  valores: FichaTecnicaFormValues;
  erros: FichaTecnicaFormErrors;
  fotos: ReturnType<typeof useFotosDoProduto>;
  onAlterar: <K extends keyof FichaTecnicaFormValues>(
    campo: K,
    valor: FichaTecnicaFormValues[K],
  ) => void;
};

const CAMPO = "h-11 bg-canvas md:h-10";
const CAMPO_SELECT = "w-full bg-canvas data-[size=default]:h-11 md:data-[size=default]:h-10";

export function DadosDoProdutoSection({
  valores,
  erros,
  fotos,
  onAlterar,
}: DadosDoProdutoSectionProps) {
  const base = useId();
  const id = (campo: string) => `${base}-${campo}`;

  return (
    <SecaoDaFicha
      numero="01"
      titulo="Dados do produto & apresentação"
      descricao="Informações editoriais e canais de estoque físico."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]">
        <FormField id={id("nome")} label="Nome da peça autoral" obrigatorio erro={erros.nome}>
          <Input
            id={id("nome")}
            value={valores.nome}
            onChange={(evento) => onAlterar("nome", evento.target.value)}
            placeholder="Ex.: Cardigan de Crochê Aurora"
            className={CAMPO}
            {...ariaDoCampo(id("nome"), erros.nome)}
          />
        </FormField>

        <FormField id={id("categoria")} label="Categoria do ateliê" obrigatorio erro={erros.categoria}>
          <Select value={valores.categoria} onValueChange={(valor) => onAlterar("categoria", valor)}>
            <SelectTrigger
              id={id("categoria")}
              className={CAMPO_SELECT}
              {...ariaDoCampo(id("categoria"), erros.categoria)}
            >
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS_DO_ATELIE.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField
        id={id("narrativa")}
        label="Narrativa da peça & cuidados de lavagem"
        dica="Markdown habilitado: use **negrito**, listas com - e títulos com #."
      >
        <Textarea
          id={id("narrativa")}
          value={valores.narrativa}
          onChange={(evento) => onAlterar("narrativa", evento.target.value)}
          rows={5}
          placeholder="Conte a história da peça, o ponto usado e como lavá-la."
          className="min-h-32 bg-canvas"
          {...ariaDoCampo(id("narrativa"), undefined, "dica")}        />
      </FormField>

      <FotosDoProduto
        fotos={fotos.fotos}
        erro={fotos.erro}
        onAdicionar={fotos.adicionar}
        onRemover={fotos.remover}
        onDefinirCapa={fotos.definirCapa}
      />

      <ModalidadeFields valores={valores} erros={erros} onAlterar={onAlterar} />
    </SecaoDaFicha>
  );
}
