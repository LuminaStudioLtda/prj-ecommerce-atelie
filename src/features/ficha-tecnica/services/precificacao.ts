/**
 * Motor de precificação com as fórmulas do BRD (docs/TRILHAS_DESENVOLVIMENTO.md, Trilha 3):
 *
 *   Custo_Insumos  = Σ (Quantidade_Usada * Custo_Unitário_Insumo)
 *   Custo_Mão_Obra = (Tempo_Total_Minutos / 60) * VHT
 *   Custo_Direto   = Custo_Insumos + Custo_Mão_Obra + Embalagens
 *   Preço_Sugerido = Custo_Direto * (1 + Taxa_Perdas) * (1 + Margem_Lucro_%)
 */

export type ConfiguracaoDePrecificacao = {
  /** Valor da Hora Trabalhada (VHT), em reais. */
  valorHoraTrabalhada: number;
  /** Taxa de perdas como fração (0,05 = 5%). */
  taxaPerdas: number;
};

/**
 * Valores iniciais enquanto o `PricingSettingsForm` (configuração global do admin) e o
 * cliente MySQL não existem. Não são regra de negócio do BRD: o administrador deve defini-los.
 */
export const CONFIGURACAO_PADRAO: ConfiguracaoDePrecificacao = {
  valorHoraTrabalhada: 25,
  taxaPerdas: 0.05,
};

export type EntradaDePrecificacao = {
  custoInsumos: number;
  tempoMinutos: number;
  embalagens: number;
  /** Margem de lucro desejada como fração (0,35 = 35%). */
  margem: number;
  /** `null` mantém o preço sugerido. */
  precoManual: number | null;
};

export type ResultadoDePrecificacao = {
  custoInsumos: number;
  custoMaoDeObra: number;
  embalagens: number;
  custoDireto: number;
  /** Valor monetário da taxa de perdas sobre o custo direto. */
  valorPerdas: number;
  precoSugerido: number;
  precoFinal: number;
  /** Lucro do preço sugerido, em reais, depois de custo direto e perdas. */
  lucroSugerido: number;
  /** Lucro do preço final aplicado, em reais, depois de custo direto e perdas. */
  lucro: number;
  /** Margem de lucro real sobre o custo direto com perdas (cálculo reverso do preço final). */
  margemReal: number;
};

export function calcularCustoMaoDeObra(tempoMinutos: number, valorHora: number): number {
  return (tempoMinutos / 60) * valorHora;
}

export function calcularPrecificacao(
  entrada: EntradaDePrecificacao,
  configuracao: ConfiguracaoDePrecificacao,
): ResultadoDePrecificacao {
  const custoMaoDeObra = calcularCustoMaoDeObra(entrada.tempoMinutos, configuracao.valorHoraTrabalhada);
  const custoDireto = entrada.custoInsumos + custoMaoDeObra + entrada.embalagens;
  const custoComPerdas = custoDireto * (1 + configuracao.taxaPerdas);

  const precoSugerido = arredondarMoeda(custoComPerdas * (1 + entrada.margem));
  const precoFinal = entrada.precoManual ?? precoSugerido;

  return {
    custoInsumos: entrada.custoInsumos,
    custoMaoDeObra,
    embalagens: entrada.embalagens,
    custoDireto,
    valorPerdas: custoDireto * configuracao.taxaPerdas,
    precoSugerido,
    precoFinal,
    lucroSugerido: precoSugerido - custoComPerdas,
    lucro: precoFinal - custoComPerdas,
    margemReal: custoComPerdas > 0 ? precoFinal / custoComPerdas - 1 : 0,
  };
}

function arredondarMoeda(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

const FORMATO_MOEDA = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const FORMATO_PERCENTUAL = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatarMoeda(valor: number): string {
  return FORMATO_MOEDA.format(valor);
}

/** Formata uma fração como percentual pt-BR com uma casa (0,368 → "36,8%"). */
export function formatarPercentual(fracao: number): string {
  return FORMATO_PERCENTUAL.format(fracao);
}
