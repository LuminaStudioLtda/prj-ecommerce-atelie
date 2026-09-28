import { calcularCustoUnitario } from "@/features/insumos/services/insumo-custo";
import type { Status } from "@/components/StatusBadge";
import type {
  AcessorioEmEstoque,
  AcessorioInput,
  CategoriaInsumo,
  InsumoEmEstoque,
  InsumoInput,
} from "@/features/insumos/types";

/**
 * Dados de exemplo para compor a tela enquanto o cliente MySQL da Trilha 0 não existe.
 * Quando o backend chegar, troque apenas as duas funções `listar*` abaixo por uma
 * chamada ao cliente definido em `lib/`; o restante do arquivo (KPIs, filtro, status)
 * continua válido porque opera sobre `InsumoEmEstoque`/`AcessorioEmEstoque`.
 */
const INSUMOS_DE_EXEMPLO: InsumoEmEstoque[] = [
  {
    id: "1",
    categoria: "fio",
    sku: "FIO-ALG-001",
    nomeComercial: "Fio Algodão Mercerizado 100%",
    marca: "Círculo Charme · Tex 378",
    cor: "Terracota Argila",
    lote: "Lot #8940-A",
    unidade: "g",
    pesoGramas: 400,
    rendimentoMetros: 396,
    precoAquisicao: 42,
    estoqueAtual: 840,
    pontoPedido: 200,
  },
  {
    id: "2",
    categoria: "fio",
    sku: "LA-MER-002",
    nomeComercial: "Lã Pura Merino Extrafina",
    marca: "Fiação da Serra · 19.5 micras",
    cor: "Verde Musgo",
    lote: "Lot #8318-M",
    unidade: "g",
    pesoGramas: 250,
    rendimentoMetros: 210,
    precoAquisicao: 68,
    estoqueAtual: 120,
    pontoPedido: 150,
  },
  {
    id: "3",
    categoria: "fio",
    sku: "COR-ALG-003",
    nomeComercial: "Cordão Algodão 4mm 24 Fios",
    marca: "EuroRoma Spesso · Reciclado",
    cor: "Cru Natural",
    lote: "Lot #2214-CR",
    unidade: "g",
    pesoGramas: 1000,
    rendimentoMetros: 254,
    precoAquisicao: 36.5,
    estoqueAtual: 3400,
    pontoPedido: 300,
  },
  {
    id: "4",
    categoria: "fio",
    sku: "SED-ART-004",
    nomeComercial: "Seda Pura Artesanal Brasileira",
    marca: "Casulo Feliz · Tingida c/ Cúrcuma",
    cor: "Dourado Amêndoa",
    lote: "Lot #SD-09",
    unidade: "g",
    pesoGramas: 150,
    rendimentoMetros: 320,
    precoAquisicao: 84,
    estoqueAtual: 300,
    pontoPedido: 250,
  },
  {
    id: "5",
    categoria: "aviamento",
    sku: "ENC-SIL-005",
    nomeComercial: "Enchimento Siliconado Premium",
    marca: "MaxFill",
    cor: "Branco",
    lote: "Lot #EN-21",
    unidade: "g",
    pesoGramas: 500,
    rendimentoMetros: null,
    precoAquisicao: 18,
    estoqueAtual: 2500,
    pontoPedido: 500,
  },
  {
    id: "6",
    categoria: "aviamento",
    sku: "ZIP-NYL-006",
    nomeComercial: "Zíper de Náilon Invisível 20cm",
    marca: "YKK",
    cor: "Terracota",
    lote: "Lot #ZP-04",
    unidade: "un",
    pesoGramas: null,
    rendimentoMetros: null,
    precoAquisicao: 3.2,
    estoqueAtual: 40,
    pontoPedido: 20,
  },
];

const ACESSORIOS_DE_EXEMPLO: AcessorioEmEstoque[] = [
  {
    id: "a1",
    nome: "Etiquetas de Couro Ecológico",
    descricao: "Gravação a laser com logo Stitch & Soul, com furos.",
    tag: "Identidade",
    estoqueAtual: 340,
    pontoPedido: 80,
    custoPorPeca: 0.85,
    fornecedor: "LaserCraft SP",
  },
  {
    id: "a2",
    nome: "Botões de Madeira Rústica",
    descricao: "Feitos à mão a partir de galhos podados de árvores frutíferas.",
    tag: "Reaproveitamento",
    estoqueAtual: 112,
    pontoPedido: 60,
    custoPorPeca: 1.2,
    fornecedor: "Marcenaria Viva",
  },
  {
    id: "a3",
    nome: "Sacolas Kraft Ecológicas",
    descricao: "Papel 120g com alça torcida e carimbo manual.",
    tag: "Embalagem",
    estoqueAtual: 18,
    pontoPedido: 40,
    custoPorPeca: 2.4,
    fornecedor: "Flor Embalagens",
  },
  {
    id: "a4",
    nome: "Olhos com Trava 12mm",
    descricao: "Pretos brilhantes com arruela de segurança não tóxica.",
    tag: "Amigurumi",
    estoqueAtual: 85,
    pontoPedido: 30,
    custoPorPeca: 0.45,
    fornecedor: "PlastFix Têxtil",
  },
];

export function listarInsumosDeEstoque(): InsumoEmEstoque[] {
  return INSUMOS_DE_EXEMPLO;
}

export function listarAcessoriosDeEstoque(): AcessorioEmEstoque[] {
  return ACESSORIOS_DE_EXEMPLO;
}

/**
 * Monta a linha de estoque de um insumo recém-cadastrado pelo `InsumoForm`. O formulário
 * não coleta quantidade atual nem ponto de pedido (ver docs/TRILHAS_DESENVOLVIMENTO.md,
 * Trilha 2: esses dois campos pertencem ao controle de estoque, não ao cadastro do
 * insumo) — então tratamos o cadastro como a chegada de um primeiro lote: o estoque
 * inicial é o próprio peso/rendimento do novelo/cone informado, e o ponto de pedido é
 * 25% dele. Ajustável manualmente quando a tela de edição de estoque existir.
 */
export function criarInsumoEmEstoque(insumo: InsumoInput): InsumoEmEstoque {
  const estoqueAtual = quantidadeInicial(insumo);
  return {
    ...insumo,
    id: crypto.randomUUID(),
    estoqueAtual,
    pontoPedido: Math.max(1, Math.round(estoqueAtual * 0.25)),
  };
}

function quantidadeInicial(insumo: InsumoInput): number {
  if (insumo.unidade === "g") return insumo.pesoGramas ?? 1;
  if (insumo.unidade === "m") return insumo.rendimentoMetros ?? 1;
  return 1;
}

/** Ponto de pedido de um acessório recém-cadastrado, na ausência de um campo dedicado no formulário. */
export function criarAcessorioEmEstoque(acessorio: AcessorioInput): AcessorioEmEstoque {
  return {
    ...acessorio,
    id: crypto.randomUUID(),
    pontoPedido: Math.max(1, Math.round(acessorio.estoqueAtual * 0.25)),
  };
}

/** `ok` acima de 2x o ponto de pedido, `baixo` até 2x, `critico` no ponto de pedido ou abaixo. */
export function statusDoEstoque(estoqueAtual: number, pontoPedido: number): Status {
  if (estoqueAtual <= pontoPedido) return "critico";
  if (estoqueAtual <= pontoPedido * 2) return "baixo";
  return "ok";
}

/** Referência de "estoque cheio" usada só para desenhar a barra de nível, nunca como meta real. */
export function capacidadeDeReferencia(pontoPedido: number): number {
  return pontoPedido * 4;
}

export type KpisDeInsumos = {
  lotesFiosAtivos: number;
  pctComLoteRegistrado: number;
  materiaisSecundarios: number;
  custoImobilizado: number;
  custoMedioPorGrama: number | null;
};

export function calcularKpis(
  insumos: InsumoEmEstoque[],
  acessorios: AcessorioEmEstoque[],
): KpisDeInsumos {
  const fios = insumos.filter((i) => i.categoria === "fio");
  const comLote = fios.filter((i) => i.lote.trim() !== "");

  const custoInsumos = insumos.reduce((soma, insumo) => {
    const custo = calcularCustoUnitario(insumo);
    return soma + (custo ? custo.valor * insumo.estoqueAtual : 0);
  }, 0);
  const custoAcessorios = acessorios.reduce(
    (soma, item) => soma + item.custoPorPeca * item.estoqueAtual,
    0,
  );

  const custosPorGrama = insumos
    .filter((i) => i.unidade === "g")
    .map((i) => calcularCustoUnitario(i)?.valor)
    .filter((valor): valor is number => valor !== undefined);

  return {
    lotesFiosAtivos: fios.length,
    pctComLoteRegistrado: fios.length > 0 ? Math.round((comLote.length / fios.length) * 100) : 0,
    materiaisSecundarios: insumos.length - fios.length + acessorios.length,
    custoImobilizado: custoInsumos + custoAcessorios,
    custoMedioPorGrama:
      custosPorGrama.length > 0
        ? custosPorGrama.reduce((soma, valor) => soma + valor, 0) / custosPorGrama.length
        : null,
  };
}

export type FiltroDeInsumos = "todos" | CategoriaInsumo | "alerta";

export function contarPorFiltro(insumos: InsumoEmEstoque[]): Record<FiltroDeInsumos, number> {
  return {
    todos: insumos.length,
    fio: insumos.filter((i) => i.categoria === "fio").length,
    aviamento: insumos.filter((i) => i.categoria === "aviamento").length,
    embalagem: insumos.filter((i) => i.categoria === "embalagem").length,
    alerta: insumos.filter((i) => statusDoEstoque(i.estoqueAtual, i.pontoPedido) !== "ok").length,
  };
}

export function filtrarInsumos(
  insumos: InsumoEmEstoque[],
  filtro: FiltroDeInsumos,
  busca: string,
): InsumoEmEstoque[] {
  const porFiltro =
    filtro === "todos"
      ? insumos
      : filtro === "alerta"
        ? insumos.filter((i) => statusDoEstoque(i.estoqueAtual, i.pontoPedido) !== "ok")
        : insumos.filter((i) => i.categoria === filtro);

  const termo = busca.trim().toLowerCase();
  if (termo === "") return porFiltro;

  return porFiltro.filter((i) =>
    [i.nomeComercial, i.marca, i.cor, i.sku, i.lote].some((campo) =>
      campo.toLowerCase().includes(termo),
    ),
  );
}
