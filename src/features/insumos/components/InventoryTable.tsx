"use client";

import { SearchIcon } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInventoryTable } from "@/features/insumos/hooks/use-inventory-table";
import {
  SUFIXO_CUSTO,
  calcularCustoUnitario,
  formatarCustoUnitario,
} from "@/features/insumos/services/insumo-custo";
import {
  capacidadeDeReferencia,
  statusDoEstoque,
  type FiltroDeInsumos,
} from "@/features/insumos/services/insumo-estoque";
import { ROTULO_CATEGORIA, type InsumoEmEstoque } from "@/features/insumos/types";

const FORMATO_MOEDA = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const ABAS: { valor: FiltroDeInsumos; rotulo: string }[] = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "fio", rotulo: ROTULO_CATEGORIA.fio },
  { valor: "aviamento", rotulo: ROTULO_CATEGORIA.aviamento },
  { valor: "alerta", rotulo: "Alerta Baixo" },
];

export function InventoryTable({ insumos }: { insumos: InsumoEmEstoque[] }) {
  const {
    busca,
    filtro,
    contagem,
    itensDaPagina,
    totalFiltrado,
    paginaAtual,
    totalPaginas,
    alterarBusca,
    alterarFiltro,
    irParaPagina,
  } = useInventoryTable(insumos);

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-surface p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={busca}
            onChange={(e) => alterarBusca(e.target.value)}
            placeholder="Filtrar por nome, cor, fibra..."
            aria-label="Filtrar insumos"
            className="h-10 bg-canvas pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {ABAS.map(({ valor, rotulo }) => (
            <Button
              key={valor}
              type="button"
              size="sm"
              variant={filtro === valor ? "default" : "outline"}
              onClick={() => alterarFiltro(valor)}
              className="rounded-full"
            >
              {rotulo} ({contagem[valor]})
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Insumo &amp; Marca</TableHead>
              <TableHead>Tipo / Lote</TableHead>
              <TableHead>Cor Visual</TableHead>
              <TableHead>Preço / Cone</TableHead>
              <TableHead>Rendimento</TableHead>
              <TableHead>Custo / Un.</TableHead>
              <TableHead>Nível em Estoque</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itensDaPagina.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                  Nenhum insumo encontrado para este filtro.
                </TableCell>
              </TableRow>
            ) : (
              itensDaPagina.map((insumo) => <LinhaDoInsumo key={insumo.id} insumo={insumo} />)
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row">
        <span>
          Mostrando {itensDaPagina.length} de {totalFiltrado} matérias-primas cadastradas
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={paginaAtual <= 1}
            onClick={() => irParaPagina(paginaAtual - 1)}
          >
            Anterior
          </Button>
          <span aria-current="page">
            {paginaAtual} / {totalPaginas}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={paginaAtual >= totalPaginas}
            onClick={() => irParaPagina(paginaAtual + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </section>
  );
}

function LinhaDoInsumo({ insumo }: { insumo: InsumoEmEstoque }) {
  const custo = calcularCustoUnitario(insumo);
  const status = statusDoEstoque(insumo.estoqueAtual, insumo.pontoPedido);
  const capacidade = capacidadeDeReferencia(insumo.pontoPedido);
  const pctNivel = Math.min(100, Math.round((insumo.estoqueAtual / capacidade) * 100));
  const corDaBarra = status === "ok" ? "bg-sage" : status === "baixo" ? "bg-ochre" : "bg-critical";

  return (
    <TableRow>
      <TableCell className="max-w-56 whitespace-normal">
        <div className="flex flex-col">
          <span className="font-medium text-ink">{insumo.nomeComercial}</span>
          <span className="text-xs text-muted-foreground">{insumo.marca}</span>
        </div>
      </TableCell>
      <TableCell className="whitespace-normal">
        <div className="flex flex-col font-mono text-xs">
          <span>{ROTULO_CATEGORIA[insumo.categoria]}</span>
          <span className="text-muted-foreground">{insumo.lote}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-3.5 shrink-0 rounded-full border border-border"
            style={{ backgroundColor: corAproximada(insumo.cor) }}
          />
          <span className="text-sm">{insumo.cor || "—"}</span>
        </div>
      </TableCell>
      <TableCell className="font-mono text-sm">
        {FORMATO_MOEDA.format(insumo.precoAquisicao)}
      </TableCell>
      <TableCell className="font-mono text-sm">
        {insumo.pesoGramas ? `${insumo.pesoGramas}g` : "—"}
        {insumo.rendimentoMetros ? (
          <span className="text-muted-foreground"> ({insumo.rendimentoMetros}m)</span>
        ) : null}
      </TableCell>
      <TableCell className="font-mono text-sm">
        {custo ? `R$ ${formatarCustoUnitario(custo.valor)}${SUFIXO_CUSTO[custo.unidade]}` : "—"}
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-ink">
              {insumo.estoqueAtual}
              {insumo.unidade === "un" ? "" : insumo.unidade}
            </span>
            <StatusBadge status={status} />
          </div>
          <div
            role="progressbar"
            aria-valuenow={pctNivel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Nível de estoque de ${insumo.nomeComercial}`}
            className="h-1.5 w-24 overflow-hidden rounded-full bg-border"
          >
            <div className={`h-full ${corDaBarra}`} style={{ width: `${pctNivel}%` }} />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

/**
 * Aproximação só para a bolinha de prévia da cor: usa o nome cadastrado como pista
 * (sem depender do seletor livre de hex, proibido pelo design system). Cai para a
 * borda neutra quando não reconhece o nome.
 */
function corAproximada(nomeDaCor: string): string {
  const nome = nomeDaCor.toLowerCase();
  if (nome.includes("terracota") || nome.includes("argila")) return "#8c6a5d";
  if (nome.includes("verde") || nome.includes("musgo")) return "#a3b18a";
  if (nome.includes("cru") || nome.includes("natural") || nome.includes("branco")) return "#f2ede4";
  if (nome.includes("dourado") || nome.includes("amêndoa") || nome.includes("amendoa")) return "#d4a373";
  return "#e4e2dd";
}
