import type { CustoUnitario, UnidadeInsumo } from "@/features/insumos/types";

const CASAS_DECIMAIS_CUSTO = 5;

type DadosDoCusto = {
  unidade: UnidadeInsumo;
  precoAquisicao: number;
  pesoGramas: number | null;
  rendimentoMetros: number | null;
};

export const UNIDADES_INSUMO: UnidadeInsumo[] = ["g", "m", "un"];

export const ROTULO_UNIDADE: Record<UnidadeInsumo, string> = {
  g: "Gramas (g)",
  m: "Metros (m)",
  un: "Unidade (un)",
};

export const ROTULO_CUSTO: Record<UnidadeInsumo, string> = {
  g: "Custo por grama",
  m: "Custo por metro",
  un: "Custo por unidade",
};

export const SUFIXO_CUSTO: Record<UnidadeInsumo, string> = {
  g: "/g",
  m: "/m",
  un: "/un",
};

/**
 * Custo unitário do insumo: preço/grama, preço/metro ou o próprio preço por unidade.
 * Retorna `null` quando faltam dados válidos para a unidade escolhida.
 */
export function calcularCustoUnitario({
  unidade,
  precoAquisicao,
  pesoGramas,
  rendimentoMetros,
}: DadosDoCusto): CustoUnitario | null {
  if (!Number.isFinite(precoAquisicao) || precoAquisicao <= 0) return null;

  if (unidade === "un") {
    return { valor: arredondarCusto(precoAquisicao), unidade };
  }

  const divisor = unidade === "g" ? pesoGramas : rendimentoMetros;
  if (divisor === null || !Number.isFinite(divisor) || divisor <= 0) return null;

  return { valor: arredondarCusto(precoAquisicao / divisor), unidade };
}

/** Formata em pt-BR com 3 a 5 casas decimais (ex.: 0,105 · 0,036 · 0,00123). */
export function formatarCustoUnitario(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: CASAS_DECIMAIS_CUSTO,
  }).format(valor);
}

function arredondarCusto(valor: number): number {
  const fator = 10 ** CASAS_DECIMAIS_CUSTO;
  return Math.round((valor + Number.EPSILON) * fator) / fator;
}
