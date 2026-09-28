import { parseNumeroPtBr } from "@/features/insumos/services/insumo-form";
import type {
  AcessorioFormErrors,
  AcessorioFormValues,
  AcessorioInput,
} from "@/features/insumos/types";

export const VALORES_INICIAIS_ACESSORIO: AcessorioFormValues = {
  nome: "",
  descricao: "",
  tag: "",
  estoqueAtual: "",
  custoPorPeca: "",
  fornecedor: "",
};

export type ResultadoValidacaoAcessorio =
  | { valido: true; acessorio: AcessorioInput }
  | { valido: false; erros: AcessorioFormErrors };

export function validarAcessorioForm(valores: AcessorioFormValues): ResultadoValidacaoAcessorio {
  const erros: AcessorioFormErrors = {};

  const nome = valores.nome.trim();
  const tag = valores.tag.trim();
  const fornecedor = valores.fornecedor.trim();

  if (!nome) erros.nome = "Informe o nome do acessório.";
  if (!tag) erros.tag = "Informe uma etiqueta curta, como Embalagem.";
  if (!fornecedor) erros.fornecedor = "Informe o fornecedor.";

  const custoPorPeca = parseNumeroPtBr(valores.custoPorPeca);
  if (valores.custoPorPeca.trim() === "") {
    erros.custoPorPeca = "Informe o custo por peça.";
  } else if (custoPorPeca === null || custoPorPeca <= 0) {
    erros.custoPorPeca = "Informe um valor maior que zero, como 0,85.";
  }

  const estoqueAtual = parseNumeroPtBr(valores.estoqueAtual);
  if (valores.estoqueAtual.trim() === "") {
    erros.estoqueAtual = "Informe a quantidade atual em estoque.";
  } else if (estoqueAtual === null || estoqueAtual < 0) {
    erros.estoqueAtual = "Informe um número maior ou igual a zero.";
  }

  if (Object.keys(erros).length > 0 || custoPorPeca === null || estoqueAtual === null) {
    return { valido: false, erros };
  }

  return {
    valido: true,
    acessorio: {
      nome,
      descricao: valores.descricao.trim(),
      tag,
      fornecedor,
      custoPorPeca,
      estoqueAtual,
    },
  };
}
