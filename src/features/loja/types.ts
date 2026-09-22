export type ProductCategory =
  | "Vestuário Autoral"
  | "Bolsas & Sacolas"
  | "Acessórios de Cabeça"
  | "Casa & Tapeçaria";

export type ProductMaterial =
  | "Algodão Orgânico"
  | "Linho Puro Brasileiro"
  | "Lã Merino Natural"
  | "Seda Rústica Vegetal";

export type ProductColorTone = "Terracota" | "Sálvia" | "Cru" | "Marrom";

export type ProductionMode = "pronta-entrega" | "sob-demanda";

export type ProductBadge =
  | "Lançamento"
  | "Em Demanda"
  | "Edição Limitada"
  | "Pronta Entrega";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  material: ProductMaterial;
  colorTones: ProductColorTone[];
  productionMode: ProductionMode;
  badge?: ProductBadge;
  fiberDescription: string;
};

export type SortOption = "mais-recentes" | "menor-preco" | "maior-preco";

export type ProductionModeFilter = "todas" | ProductionMode;

export type ProductFilters = {
  categories: ProductCategory[];
  materials: ProductMaterial[];
  colorTones: ProductColorTone[];
  productionMode: ProductionModeFilter;
  minPrice: number;
  maxPrice: number;
};
