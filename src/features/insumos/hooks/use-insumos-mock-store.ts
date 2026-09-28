import { useMemo, useState } from "react";
import {
  calcularKpis,
  criarAcessorioEmEstoque,
  criarInsumoEmEstoque,
} from "@/features/insumos/services/insumo-estoque";
import type {
  AcessorioEmEstoque,
  AcessorioInput,
  InsumoEmEstoque,
  InsumoInput,
} from "@/features/insumos/types";

/**
 * Estado da tela de Gestão de Insumos em memória, iniciado com os dados de exemplo do
 * service. Simula persistência apenas durante a sessão (não sobrevive a um recarregar
 * de página) até a Trilha 0 trazer o cliente MySQL — ver comentário em insumo-estoque.ts.
 */
export function useInsumosMockStore(
  insumosIniciais: InsumoEmEstoque[],
  acessoriosIniciais: AcessorioEmEstoque[],
) {
  const [insumos, setInsumos] = useState(insumosIniciais);
  const [acessorios, setAcessorios] = useState(acessoriosIniciais);

  const kpis = useMemo(() => calcularKpis(insumos, acessorios), [insumos, acessorios]);

  function adicionarInsumo(insumo: InsumoInput) {
    setInsumos((atual) => [criarInsumoEmEstoque(insumo), ...atual]);
  }

  function adicionarAcessorio(acessorio: AcessorioInput) {
    setAcessorios((atual) => [criarAcessorioEmEstoque(acessorio), ...atual]);
  }

  return { insumos, acessorios, kpis, adicionarInsumo, adicionarAcessorio };
}
