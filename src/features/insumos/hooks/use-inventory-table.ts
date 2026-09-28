import { useMemo, useState } from "react";
import {
  contarPorFiltro,
  filtrarInsumos,
  type FiltroDeInsumos,
} from "@/features/insumos/services/insumo-estoque";
import type { InsumoEmEstoque } from "@/features/insumos/types";

const ITENS_POR_PAGINA = 4;

export function useInventoryTable(insumos: InsumoEmEstoque[]) {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<FiltroDeInsumos>("todos");
  const [pagina, setPagina] = useState(1);

  const contagem = useMemo(() => contarPorFiltro(insumos), [insumos]);
  const filtrados = useMemo(
    () => filtrarInsumos(insumos, filtro, busca),
    [insumos, filtro, busca],
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const itensDaPagina = filtrados.slice(inicio, inicio + ITENS_POR_PAGINA);

  function alterarBusca(valor: string) {
    setBusca(valor);
    setPagina(1);
  }

  function alterarFiltro(valor: FiltroDeInsumos) {
    setFiltro(valor);
    setPagina(1);
  }

  return {
    busca,
    filtro,
    contagem,
    itensDaPagina,
    totalFiltrado: filtrados.length,
    paginaAtual,
    totalPaginas,
    alterarBusca,
    alterarFiltro,
    irParaPagina: setPagina,
  };
}
