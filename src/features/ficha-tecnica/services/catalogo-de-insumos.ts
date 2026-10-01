import { calcularCustoUnitario } from "@/features/insumos/services/insumo-custo";
import {
  listarAcessoriosDeEstoque,
  listarInsumosDeEstoque,
} from "@/features/insumos/services/insumo-estoque";
import type { ItemDoCatalogo } from "@/features/ficha-tecnica/types";

/**
 * Itens que podem entrar numa receita, vindos do cadastro de insumos (Trilha 2) e ligados
 * por `id` real, nunca por texto livre. Insumos sem custo calculável ficam de fora: não dá
 * para precificar um consumo sem custo unitário.
 */
export function listarItensDoCatalogo(): ItemDoCatalogo[] {
  const insumos = listarInsumosDeEstoque().flatMap((insumo): ItemDoCatalogo[] => {
    const custo = calcularCustoUnitario(insumo);
    if (!custo) return [];
    return [
      {
        id: insumo.id,
        nome: insumo.nomeComercial,
        detalhe: [insumo.cor, insumo.lote].filter(Boolean).join(" · "),
        unidade: custo.unidade,
        custoUnitario: custo.valor,
      },
    ];
  });

  const acessorios = listarAcessoriosDeEstoque().map(
    (item): ItemDoCatalogo => ({
      id: item.id,
      nome: item.nome,
      detalhe: item.tag,
      unidade: "un",
      custoUnitario: item.custoPorPeca,
    }),
  );

  return [...insumos, ...acessorios];
}
