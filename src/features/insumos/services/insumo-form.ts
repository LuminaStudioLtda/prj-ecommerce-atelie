import { calcularCustoUnitario } from "@/features/insumos/services/insumo-custo";
import type {
  CategoriaInsumo,
  CustoUnitario,
  InsumoFormErrors,
  InsumoFormValues,
  InsumoInput,
  UnidadeInsumo,
} from "@/features/insumos/types";

const COM_VIRGULA = /^(\d{1,3}(\.\d{3})+|\d+)(,\d+)?$/;
const SO_PONTO = /^\d+(\.\d+)?$/;

export const VALORES_INICIAIS: InsumoFormValues = {
  categoria: "fio",
  sku: "",
  nomeComercial: "",
  marca: "",
  cor: "",
  lote: "",
  unidade: "g",
  pesoGramas: "",
  rendimentoMetros: "",
  precoAquisicao: "",
};

export type ResultadoValidacao =
  | { valido: true; insumo: InsumoInput }
  | { valido: false; erros: InsumoFormErrors };

export function ehUnidadeInsumo(valor: string): valor is UnidadeInsumo {
  return valor === "g" || valor === "m" || valor === "un";
}

export function ehCategoriaInsumo(valor: string): valor is CategoriaInsumo {
  return valor === "fio" || valor === "aviamento" || valor === "embalagem";
}

/** Peso é obrigatório quando o custo é calculado por grama. */
export function pesoObrigatorio(unidade: UnidadeInsumo): boolean {
  return unidade === "g";
}

/** Rendimento é obrigatório quando o custo é calculado por metro. */
export function rendimentoObrigatorio(unidade: UnidadeInsumo): boolean {
  return unidade === "m";
}

/**
 * Converte texto em número aceitando o formato brasileiro.
 * Com vírgula, os pontos são milhares ("1.234,56"); sem vírgula, o ponto é decimal ("42.5").
 */
export function parseNumeroPtBr(texto: string): number | null {
  const limpo = texto.replace(/^R\$\s*/, "").replace(/\s/g, "");
  if (limpo === "") return null;

  if (limpo.includes(",")) {
    if (!COM_VIRGULA.test(limpo)) return null;
    return Number(limpo.replace(/\./g, "").replace(",", "."));
  }

  if (!SO_PONTO.test(limpo)) return null;
  return Number(limpo);
}

export function insumoParaValoresDoForm(insumo: InsumoInput): InsumoFormValues {
  return {
    categoria: insumo.categoria,
    sku: insumo.sku,
    nomeComercial: insumo.nomeComercial,
    marca: insumo.marca,
    cor: insumo.cor,
    lote: insumo.lote,
    unidade: insumo.unidade,
    pesoGramas: numeroParaTexto(insumo.pesoGramas),
    rendimentoMetros: numeroParaTexto(insumo.rendimentoMetros),
    precoAquisicao: numeroParaTexto(insumo.precoAquisicao),
  };
}

/** Custo calculado a partir do que já foi digitado; `null` enquanto os dados não são válidos. */
export function calcularCustoDoFormulario(valores: InsumoFormValues): CustoUnitario | null {
  const preco = parseNumeroPtBr(valores.precoAquisicao);
  if (preco === null) return null;

  return calcularCustoUnitario({
    unidade: valores.unidade,
    precoAquisicao: preco,
    pesoGramas: parseNumeroPtBr(valores.pesoGramas),
    rendimentoMetros: parseNumeroPtBr(valores.rendimentoMetros),
  });
}

export function validarInsumoForm(valores: InsumoFormValues): ResultadoValidacao {
  const erros: InsumoFormErrors = {};

  const sku = valores.sku.trim();
  const nomeComercial = valores.nomeComercial.trim();
  const lote = valores.lote.trim();

  if (!sku) erros.sku = "Informe o SKU ou código interno.";
  if (!nomeComercial) erros.nomeComercial = "Informe o nome comercial.";
  if (!lote) erros.lote = "Informe o lote para rastrear a tonalidade.";

  const precoAquisicao = parseNumeroPtBr(valores.precoAquisicao);
  if (valores.precoAquisicao.trim() === "") {
    erros.precoAquisicao = "Informe o preço de aquisição.";
  } else if (precoAquisicao === null || precoAquisicao <= 0) {
    erros.precoAquisicao = "Informe um valor maior que zero, como 42,00.";
  }

  const pesoGramas = lerMedida(valores.pesoGramas, pesoObrigatorio(valores.unidade), "o peso", "gramas", erros, "pesoGramas");
  const rendimentoMetros = lerMedida(valores.rendimentoMetros, rendimentoObrigatorio(valores.unidade), "o rendimento", "metros", erros, "rendimentoMetros");

  if (Object.keys(erros).length > 0 || precoAquisicao === null) {
    return { valido: false, erros };
  }

  return {
    valido: true,
    insumo: {
      categoria: valores.categoria,
      sku,
      nomeComercial,
      marca: valores.marca.trim(),
      cor: valores.cor.trim(),
      lote,
      unidade: valores.unidade,
      pesoGramas,
      rendimentoMetros,
      precoAquisicao,
    },
  };
}

function lerMedida(
  texto: string,
  obrigatoria: boolean,
  descricao: string,
  unidade: string,
  erros: InsumoFormErrors,
  campo: "pesoGramas" | "rendimentoMetros",
): number | null {
  if (texto.trim() === "") {
    if (obrigatoria) erros[campo] = `Informe ${descricao} em ${unidade}.`;
    return null;
  }

  const numero = parseNumeroPtBr(texto);
  if (numero === null || numero <= 0) {
    erros[campo] = `Use um número maior que zero para ${descricao}.`;
    return null;
  }

  return numero;
}

function numeroParaTexto(numero: number | null): string {
  return numero === null ? "" : String(numero).replace(".", ",");
}
