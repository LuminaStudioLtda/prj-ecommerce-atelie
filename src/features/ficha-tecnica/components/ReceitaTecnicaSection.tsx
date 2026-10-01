"use client";

import { PlusIcon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SecaoDaFicha } from "@/features/ficha-tecnica/components/SecaoDaFicha";
import type { LinhaDaReceita } from "@/features/ficha-tecnica/services/ficha-tecnica-form";
import { formatarMoeda } from "@/features/ficha-tecnica/services/precificacao";
import type { ItemDaReceitaForm, ItemDoCatalogo } from "@/features/ficha-tecnica/types";
import { SUFIXO_CUSTO, formatarCustoUnitario } from "@/features/insumos/services/insumo-custo";

type ReceitaTecnicaSectionProps = {
  catalogo: ItemDoCatalogo[];
  itens: ItemDaReceitaForm[];
  linhas: LinhaDaReceita[];
  custoInsumos: number;
  erro?: string;
  onAdicionar: (insumoId: string) => void;
  onAlterarQuantidade: (insumoId: string, quantidade: string) => void;
  onRemover: (insumoId: string) => void;
};

export function ReceitaTecnicaSection({
  catalogo,
  itens,
  linhas,
  custoInsumos,
  erro,
  onAdicionar,
  onAlterarQuantidade,
  onRemover,
}: ReceitaTecnicaSectionProps) {
  const disponiveis = catalogo.filter((item) => !itens.some((usado) => usado.insumoId === item.id));

  return (
    <SecaoDaFicha
      numero="02"
      titulo="Receita técnica & insumos"
      descricao="Consumo exato de matérias-primas por peça acabada."
      acao={
        <Select value="" onValueChange={onAdicionar} disabled={disponiveis.length === 0}>
          <SelectTrigger
            aria-label="Adicionar insumo à receita"
            className="h-11 w-full gap-2 bg-canvas sm:w-56 data-[size=default]:h-11 md:data-[size=default]:h-10"
          >
            <PlusIcon className="size-4 text-terracotta" aria-hidden="true" />
            <SelectValue placeholder="Adicionar insumo" />
          </SelectTrigger>
          <SelectContent align="end">
            {disponiveis.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      {linhas.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-canvas px-4 py-8 text-center text-sm text-muted-foreground">
          Nenhum insumo na receita ainda. Use &ldquo;Adicionar insumo&rdquo; para puxar fios e
          aviamentos do cadastro, com o custo unitário já calculado.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[36rem]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs tracking-wider uppercase">Insumo cadastrado</TableHead>
                <TableHead className="text-xs tracking-wider uppercase">Custo unitário</TableHead>
                <TableHead className="w-40 text-xs tracking-wider uppercase">Consumo real</TableHead>
                <TableHead className="text-right text-xs tracking-wider uppercase">Custo</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Remover</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {linhas.map((linha, indice) => {
                const { item } = linha;
                const quantidade = itens[indice]?.quantidade ?? "";
                const invalida = quantidade.trim() !== "" && linha.custo === null;
                const inputId = `consumo-${linha.insumoId}`;

                return (
                  <TableRow key={linha.insumoId}>
                    <TableCell className="whitespace-normal">
                      <span className="block font-medium text-ink">
                        {item?.nome ?? "Insumo não encontrado"}
                      </span>
                      {item?.detalhe ? (
                        <span className="block text-xs text-muted-foreground">{item.detalhe}</span>
                      ) : null}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {item
                        ? `R$ ${formatarCustoUnitario(item.custoUnitario)}${SUFIXO_CUSTO[item.unidade]}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <label htmlFor={inputId} className="sr-only">
                          Consumo de {item?.nome ?? "insumo"} em {item?.unidade}
                        </label>
                        <Input
                          id={inputId}
                          inputMode="decimal"
                          value={quantidade}
                          onChange={(evento) => onAlterarQuantidade(linha.insumoId, evento.target.value)}
                          placeholder="0"
                          aria-invalid={invalida ? true : undefined}
                          className="h-10 bg-canvas font-mono"
                        />
                        <span className="w-6 shrink-0 font-mono text-xs text-muted-foreground">
                          {item?.unidade}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-ink">
                      {linha.custo === null ? "—" : formatarMoeda(linha.custo)}
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => onRemover(linha.insumoId)}
                        className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-canvas hover:text-critical focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        <Trash2Icon className="size-4" aria-hidden="true" />
                        <span className="sr-only">Remover {item?.nome ?? "insumo"}</span>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {erro ? (
        <p role="alert" className="-mt-3 text-xs text-critical">
          {erro}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-3 rounded-xl bg-canvas px-4 py-3">
        <span className="text-sm text-muted-foreground">Subtotal de insumos físicos</span>
        <span className="font-mono text-lg font-semibold text-ink">{formatarMoeda(custoInsumos)}</span>
      </div>
    </SecaoDaFicha>
  );
}
