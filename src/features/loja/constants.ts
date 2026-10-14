import type { ProductBadge, ProductCategory, ProductColorTone, ProductMaterial } from "./types";

export const CATEGORIES: ProductCategory[] = [
  "Vestuário Autoral",
  "Bolsas & Sacolas",
  "Acessórios de Cabeça",
  "Casa & Tapeçaria",
];

export const MATERIALS: ProductMaterial[] = [
  "Algodão Orgânico",
  "Linho Puro Brasileiro",
  "Lã Merino Natural",
  "Seda Rústica Vegetal",
];

export const COLOR_TONES: ProductColorTone[] = ["Terracota", "Sálvia", "Cru", "Marrom"];

export const COLOR_TONE_SWATCH_CLASS: Record<ProductColorTone, string> = {
  Terracota: "bg-primary",
  Sálvia: "bg-secondary",
  Cru: "bg-muted border border-border",
  Marrom: "bg-foreground",
};

export const BADGE_STYLE_CLASS: Record<ProductBadge, string> = {
  Lançamento: "bg-foreground text-background",
  "Em Demanda": "bg-secondary text-secondary-foreground",
  "Edição Limitada": "bg-foreground text-background",
  "Pronta Entrega": "bg-primary text-primary-foreground",
};

export const MIN_PRICE = 180;
export const MAX_PRICE = 890;
export const PRODUCTS_PER_PAGE = 6;
