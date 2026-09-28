import * as XLSX from "xlsx";
import { calcularCustoUnitario, formatarCustoUnitario } from "@/features/insumos/services/insumo-custo";
import { statusDoEstoque } from "@/features/insumos/services/insumo-estoque";
import { ROTULO_CATEGORIA } from "@/features/insumos/types";
import type { AcessorioEmEstoque, InsumoEmEstoque } from "@/features/insumos/types";

const ROTULO_STATUS = { ok: "Estável", baixo: "Alerta Baixo", critico: "Crítico" };

/**
 * Gera e baixa uma planilha .xlsx com os dados atualmente exibidos na tela (mocados),
 * inteiramente no navegador — sem chamada a backend. Chame apenas a partir de um
 * componente cliente, em resposta a um clique do usuário.
 */
export function exportarEstoqueParaXlsx(insumos: InsumoEmEstoque[], acessorios: AcessorioEmEstoque[]) {
  const linhasInsumos = insumos.map((insumo) => {
    const custo = calcularCustoUnitario(insumo);
    return {
      SKU: insumo.sku,
      Categoria: ROTULO_CATEGORIA[insumo.categoria],
      "Nome comercial": insumo.nomeComercial,
      Marca: insumo.marca,
      Cor: insumo.cor,
      Lote: insumo.lote,
      Unidade: insumo.unidade,
      "Peso do novelo/cone (g)": insumo.pesoGramas ?? "",
      "Rendimento (m)": insumo.rendimentoMetros ?? "",
      "Preço de aquisição (R$)": insumo.precoAquisicao,
      "Custo unitário (R$)": custo ? formatarCustoUnitario(custo.valor) : "",
      "Estoque atual": insumo.estoqueAtual,
      "Ponto de pedido": insumo.pontoPedido,
      Status: ROTULO_STATUS[statusDoEstoque(insumo.estoqueAtual, insumo.pontoPedido)],
    };
  });

  const linhasAcessorios = acessorios.map((item) => ({
    Nome: item.nome,
    Etiqueta: item.tag,
    Descrição: item.descricao,
    Fornecedor: item.fornecedor,
    "Custo por peça (R$)": item.custoPorPeca,
    "Estoque atual": item.estoqueAtual,
    "Ponto de pedido": item.pontoPedido,
    Status: ROTULO_STATUS[statusDoEstoque(item.estoqueAtual, item.pontoPedido)],
  }));

  const planilha = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(planilha, XLSX.utils.json_to_sheet(linhasInsumos), "Insumos");
  XLSX.utils.book_append_sheet(
    planilha,
    XLSX.utils.json_to_sheet(linhasAcessorios),
    "Acessórios",
  );

  const dataDeHoje = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(planilha, `insumos-stitch-and-soul-${dataDeHoje}.xlsx`);
}
