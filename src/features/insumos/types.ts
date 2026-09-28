export type UnidadeInsumo = "g" | "m" | "un";

export type CategoriaInsumo = "fio" | "aviamento" | "embalagem";

/** Insumo já validado e tipado, pronto para ser persistido pelo service da feature. */
export type InsumoInput = {
  categoria: CategoriaInsumo;
  sku: string;
  nomeComercial: string;
  marca: string;
  cor: string;
  lote: string;
  unidade: UnidadeInsumo;
  /** Peso do novelo/cone em gramas. */
  pesoGramas: number | null;
  /** Rendimento total do novelo/cone em metros. */
  rendimentoMetros: number | null;
  /** Preço pago pelo novelo/cone/embalagem, em reais. */
  precoAquisicao: number;
};

/** Valores do formulário como o usuário os digita (números em texto, aceitando vírgula). */
export type InsumoFormValues = {
  categoria: CategoriaInsumo;
  sku: string;
  nomeComercial: string;
  marca: string;
  cor: string;
  lote: string;
  unidade: UnidadeInsumo;
  pesoGramas: string;
  rendimentoMetros: string;
  precoAquisicao: string;
};

export type InsumoFormErrors = Partial<Record<keyof InsumoFormValues, string>>;

export type CustoUnitario = {
  /** Valor em reais por `unidade`, arredondado para no máximo 5 casas decimais. */
  valor: number;
  unidade: UnidadeInsumo;
};

export const ROTULO_CATEGORIA: Record<CategoriaInsumo, string> = {
  fio: "Fios & Lãs",
  aviamento: "Aviamentos",
  embalagem: "Embalagens",
};

/**
 * Linha de estoque de um insumo já cadastrado (Trilha 2). Enquanto o cliente MySQL
 * da Trilha 0 não existe, `services/insumo-estoque.ts` devolve dados de exemplo com
 * este formato; o service de listagem é o único ponto a trocar quando o backend chegar.
 */
export type InsumoEmEstoque = InsumoInput & {
  id: string;
  /** Quantidade atual em estoque, na mesma unidade de `unidade`. */
  estoqueAtual: number;
  /** Ponto de pedido (estoque mínimo) configurado para o insumo. */
  pontoPedido: number;
};

/** Item de acabamento vendido por unidade (etiqueta, botão, sacola...), fora da tabela principal. */
export type AcessorioEmEstoque = {
  id: string;
  nome: string;
  descricao: string;
  tag: string;
  estoqueAtual: number;
  pontoPedido: number;
  custoPorPeca: number;
  fornecedor: string;
};

/** Valores coletados por `AcessorioForm` para um novo acessório (id/pontoPedido são gerados no service). */
export type AcessorioInput = {
  nome: string;
  descricao: string;
  tag: string;
  estoqueAtual: number;
  custoPorPeca: number;
  fornecedor: string;
};

/** Valores do formulário de acessório como o usuário os digita (números em texto). */
export type AcessorioFormValues = {
  nome: string;
  descricao: string;
  tag: string;
  estoqueAtual: string;
  custoPorPeca: string;
  fornecedor: string;
};

export type AcessorioFormErrors = Partial<Record<keyof AcessorioFormValues, string>>;

