import { parseNumeroPtBr } from "@/features/insumos/services/insumo-form";
import {
  calcularPrecificacao,
  type ConfiguracaoDePrecificacao,
  type ResultadoDePrecificacao,
} from "@/features/ficha-tecnica/services/precificacao";
import type {
  FichaTecnicaFormErrors,
  FichaTecnicaFormValues,
  ItemDoCatalogo,
} from "@/features/ficha-tecnica/types";

export const CATEGORIAS_DO_ATELIE = [
  "Vestuário",
  "Acessórios",
  "Casa & Decoração",
  "Amigurumi",
] as const;

export const VALORES_INICIAIS: FichaTecnicaFormValues = {
  nome: "",
  categoria: "",
  narrativa: "",
  status: "rascunho",
  destaqueNaVitrine: false,
  prontaEntrega: false,
  estoqueFisico: "",
  sobEncomenda: true,
  prazoDias: "",
  itens: [],
  horas: "",
  minutos: "",
  embalagens: "",
  margemPct: 35,
  precoManual: "",
};

export type LinhaDaReceita = {
  insumoId: string;
  item: ItemDoCatalogo | undefined;
  quantidade: number | null;
  /** `null` enquanto a quantidade digitada não é um número maior que zero. */
  custo: number | null;
};

/** Cruza cada linha da receita com o catálogo e calcula o custo (quantidade × custo unitário). */
export function calcularLinhasDaReceita(
  itens: FichaTecnicaFormValues["itens"],
  catalogo: ItemDoCatalogo[],
): LinhaDaReceita[] {
  return itens.map(({ insumoId, quantidade: texto }) => {
    const item = catalogo.find((candidato) => candidato.id === insumoId);
    const quantidade = parseNumeroPtBr(texto);
    const valida = quantidade !== null && quantidade > 0;
    return {
      insumoId,
      item,
      quantidade: valida ? quantidade : null,
      custo: item && valida ? quantidade * item.custoUnitario : null,
    };
  });
}

export function somarCustoDosInsumos(linhas: LinhaDaReceita[]): number {
  return linhas.reduce((soma, linha) => soma + (linha.custo ?? 0), 0);
}

/** Tempo total de confecção em minutos; campos vazios ou inválidos contam como zero. */
export function calcularTempoEmMinutos(horas: string, minutos: string): number {
  return (lerInteiro(horas) ?? 0) * 60 + (lerInteiro(minutos) ?? 0);
}

export function calcularPrecificacaoDoFormulario(
  valores: FichaTecnicaFormValues,
  linhas: LinhaDaReceita[],
  configuracao: ConfiguracaoDePrecificacao,
): ResultadoDePrecificacao {
  const precoManual = parseNumeroPtBr(valores.precoManual);
  return calcularPrecificacao(
    {
      custoInsumos: somarCustoDosInsumos(linhas),
      tempoMinutos: calcularTempoEmMinutos(valores.horas, valores.minutos),
      embalagens: Math.max(0, parseNumeroPtBr(valores.embalagens) ?? 0),
      margem: valores.margemPct / 100,
      precoManual: precoManual !== null && precoManual > 0 ? precoManual : null,
    },
    configuracao,
  );
}

export function validarFichaTecnica(
  valores: FichaTecnicaFormValues,
  linhas: LinhaDaReceita[],
): FichaTecnicaFormErrors {
  const erros: FichaTecnicaFormErrors = {};

  if (!valores.nome.trim()) erros.nome = "Informe o nome da peça.";
  if (!valores.categoria) erros.categoria = "Escolha a categoria do ateliê.";

  if (!valores.prontaEntrega && !valores.sobEncomenda) {
    erros.modalidade = "Marque ao menos uma modalidade de comercialização.";
  }
  if (valores.prontaEntrega) {
    const estoque = lerInteiro(valores.estoqueFisico);
    if (estoque === null) erros.estoqueFisico = "Informe o estoque físico (0 ou mais).";
  }
  if (valores.sobEncomenda) {
    const prazo = lerInteiro(valores.prazoDias);
    if (prazo === null || prazo <= 0) erros.prazoDias = "Informe o prazo em dias úteis.";
  }

  if (linhas.length === 0) {
    erros.itens = "Adicione ao menos um insumo à receita.";
  } else if (linhas.some((linha) => linha.custo === null)) {
    erros.itens = "Informe um consumo maior que zero em todos os insumos.";
  }

  if (calcularTempoEmMinutos(valores.horas, valores.minutos) <= 0) {
    erros.tempo = "Informe o tempo de confecção.";
  }

  const erroEmbalagens = erroDasEmbalagens(valores.embalagens);
  if (erroEmbalagens) erros.embalagens = erroEmbalagens;

  const erroPreco = erroDoPrecoManual(valores.precoManual);
  if (erroPreco) erros.precoManual = erroPreco;

  return erros;
}

/** Mensagem de erro do custo de embalagens digitado, ou `undefined` se vazio (opcional) ou válido. */
export function erroDasEmbalagens(texto: string): string | undefined {
  if (texto.trim() === "") return undefined;
  const valor = parseNumeroPtBr(texto);
  return valor === null || valor < 0 ? "Use um valor em reais, como 8,00." : undefined;
}

/** Mensagem de erro do preço manual digitado, ou `undefined` se vazio (usa o sugerido) ou válido. */
export function erroDoPrecoManual(texto: string): string | undefined {
  if (texto.trim() === "") return undefined;
  const valor = parseNumeroPtBr(texto);
  return valor === null || valor <= 0 ? "Informe um preço maior que zero." : undefined;
}

/** Inteiro não negativo digitado pelo usuário, ou `null` se vazio/inválido. */
function lerInteiro(texto: string): number | null {
  const limpo = texto.trim();
  if (!/^\d+$/.test(limpo)) return null;
  return Number(limpo);
}
