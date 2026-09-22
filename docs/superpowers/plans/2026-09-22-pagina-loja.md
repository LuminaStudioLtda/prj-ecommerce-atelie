# Página da Loja Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a página `/loja` como um catálogo funcional client-side (filtros, ordenação, "carregar mais") sobre 24 produtos mockados.

**Architecture:** Nova feature `src/features/loja/` com uma camada de dados mockada (`services/product-service.ts`), tipos (`types.ts`), constantes (`constants.ts`) e componentes (`ProductCard`, `FilterSidebar`, `AppliedFilters`, `LojaCatalog`). `LojaCatalog` é o orquestrador client-side: guarda estado de filtros/ordenação/paginação e filtra o array de produtos em memória, sem chamada de API. `src/app/loja/page.tsx` passa a renderizar `SiteHeader` + `LojaCatalog` em vez do `PlaceholderPage` atual.

**Tech Stack:** Next.js App Router, React 19, TypeScript estrito, Tailwind CSS, lucide-react.

## Global Constraints

- Use exclusivamente pnpm.
- TypeScript estrito; `any` explícito é proibido.
- Sem barrel files.
- Feature fica em `src/features/loja/`, seguindo os subdiretórios de `ARCHITECTURE.md` (`components/`, `services/`, `types.ts`); `constants.ts` fica na raiz da feature, ao lado de `types.ts`.
- Toda a filtragem/ordenação/paginação é client-side, em memória, sobre um array fixo de 24 produtos mockados — sem chamada de API, sem backend.
- Estado local ao componente `LojaCatalog` (`useState`) — sem Zustand, pois é estado de uma única página/feature.
- Sem paginação numerada — só "Carregar Mais Peças do Ateliê" (revela +6 produtos por vez).
- Contagens de categoria/material no filtro são totais fixos do catálogo completo (não recalculam por outros filtros ativos).
- Sem foto real de produto — placeholder de imagem cinza genérico (ícone `ImageIcon` da lucide-react sobre fundo cinza neutro).
- Coração de favorito é um toggle visual local por card (`useState` interno), não persiste, não integra com `/favoritos`.
- Nome do produto não é link (sem página de detalhe de produto nesta task).
- Sem projeto de teste automatizado configurado — verificação via `pnpm lint`, `pnpm typecheck`, `pnpm build` e `curl` (conteúdo estático inicial). Interatividade real dos filtros (clicar, ver a grade mudar) não pode ser verificada por `curl` — checagem manual no navegador, disclosed limitation como nas tasks anteriores.

---

### Task 1: Criar a camada de dados (types, constants, product-service)

**Files:**
- Create: `src/features/loja/types.ts`
- Create: `src/features/loja/constants.ts`
- Create: `src/features/loja/services/product-service.ts`

**Interfaces:**
- Produces: tipos `Product`, `ProductCategory`, `ProductMaterial`, `ProductColorTone`, `ProductionMode`, `ProductBadge`, `SortOption`, `ProductionModeFilter`, `ProductFilters` de `@/features/loja/types` — usados por todas as tasks seguintes.
- Produces: `CATEGORIES`, `MATERIALS`, `COLOR_TONES`, `COLOR_TONE_SWATCH_CLASS`, `MIN_PRICE`, `MAX_PRICE`, `PRODUCTS_PER_PAGE` de `@/features/loja/constants` — usados pelas Tasks 2, 3, 4.
- Produces: `PRODUCTS`, `CATEGORY_COUNTS`, `MATERIAL_COUNTS` de `@/features/loja/services/product-service` — usados pela Task 4.

- [ ] **Step 1: Criar `src/features/loja/types.ts`**

```ts
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
```

- [ ] **Step 2: Criar `src/features/loja/constants.ts`**

```ts
import type { ProductCategory, ProductColorTone, ProductMaterial } from "./types";

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

export const MIN_PRICE = 180;
export const MAX_PRICE = 890;
export const PRODUCTS_PER_PAGE = 6;
```

- [ ] **Step 3: Criar `src/features/loja/services/product-service.ts`**

```ts
import { CATEGORIES, MATERIALS } from "../constants";
import type { Product, ProductCategory, ProductMaterial } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "blusa-trama-suave",
    name: "Blusa Trama Suave",
    price: 480,
    category: "Vestuário Autoral",
    material: "Algodão Orgânico",
    colorTones: ["Terracota", "Cru"],
    productionMode: "pronta-entrega",
    badge: "Lançamento",
    fiberDescription: "100% Algodão Cru e Terracota",
  },
  {
    id: "cardigan-aurora",
    name: "Cardigan Aurora",
    price: 720,
    category: "Vestuário Autoral",
    material: "Lã Merino Natural",
    colorTones: ["Sálvia"],
    productionMode: "sob-demanda",
    badge: "Em Demanda",
    fiberDescription: "100% Lã Merino Rústica",
  },
  {
    id: "vestido-flora-botanica",
    name: "Vestido Flora Botânica",
    price: 890,
    category: "Vestuário Autoral",
    material: "Linho Puro Brasileiro",
    colorTones: ["Cru"],
    productionMode: "sob-demanda",
    badge: "Edição Limitada",
    fiberDescription: "100% Linho Brasileiro Rústico",
  },
  {
    id: "bolsa-terracota-media",
    name: "Bolsa Terracota Média",
    price: 390,
    category: "Bolsas & Sacolas",
    material: "Algodão Orgânico",
    colorTones: ["Terracota", "Marrom"],
    productionMode: "pronta-entrega",
    badge: "Pronta Entrega",
    fiberDescription: "Algodão Estruturado e Couro Vegano",
  },
  {
    id: "chapeu-solsticio",
    name: "Chapéu Solstício",
    price: 240,
    category: "Acessórios de Cabeça",
    material: "Linho Puro Brasileiro",
    colorTones: ["Sálvia"],
    productionMode: "pronta-entrega",
    fiberDescription: "Fibras Naturais e Ráfia",
  },
  {
    id: "sueter-terra-organica",
    name: "Suéter Terra Orgânica",
    price: 640,
    category: "Vestuário Autoral",
    material: "Lã Merino Natural",
    colorTones: ["Terracota", "Marrom"],
    productionMode: "sob-demanda",
    badge: "Em Demanda",
    fiberDescription: "Lã Merino e Ráfia Rústica",
  },
  {
    id: "top-cropped-vento",
    name: "Top Cropped Vento",
    price: 320,
    category: "Vestuário Autoral",
    material: "Algodão Orgânico",
    colorTones: ["Cru"],
    productionMode: "pronta-entrega",
    fiberDescription: "100% Algodão Penteado",
  },
  {
    id: "manta-raizes",
    name: "Manta Raízes",
    price: 650,
    category: "Casa & Tapeçaria",
    material: "Lã Merino Natural",
    colorTones: ["Marrom", "Terracota"],
    productionMode: "sob-demanda",
    badge: "Edição Limitada",
    fiberDescription: "Lã Merino e Linho Trançado",
  },
  {
    id: "bolsa-praiana-cru",
    name: "Bolsa Praiana Cru",
    price: 310,
    category: "Bolsas & Sacolas",
    material: "Algodão Orgânico",
    colorTones: ["Cru"],
    productionMode: "pronta-entrega",
    fiberDescription: "Algodão Cru Trançado à Mão",
  },
  {
    id: "colete-outono",
    name: "Colete Outono",
    price: 580,
    category: "Vestuário Autoral",
    material: "Lã Merino Natural",
    colorTones: ["Marrom"],
    productionMode: "sob-demanda",
    fiberDescription: "Lã Merino Encorpada",
  },
  {
    id: "turbante-aurora",
    name: "Turbante Aurora",
    price: 180,
    category: "Acessórios de Cabeça",
    material: "Algodão Orgânico",
    colorTones: ["Terracota"],
    productionMode: "pronta-entrega",
    badge: "Pronta Entrega",
    fiberDescription: "Algodão Orgânico Macio",
  },
  {
    id: "saida-de-praia-vento-leve",
    name: "Saída de Praia Vento Leve",
    price: 460,
    category: "Vestuário Autoral",
    material: "Linho Puro Brasileiro",
    colorTones: ["Cru", "Sálvia"],
    productionMode: "pronta-entrega",
    fiberDescription: "Linho Brasileiro Leve",
  },
  {
    id: "bolsa-tapecaria-mineral",
    name: "Bolsa Tapeçaria Mineral",
    price: 520,
    category: "Bolsas & Sacolas",
    material: "Seda Rústica Vegetal",
    colorTones: ["Sálvia", "Marrom"],
    productionMode: "sob-demanda",
    badge: "Edição Limitada",
    fiberDescription: "Seda Vegetal e Fibra de Bananeira",
  },
  {
    id: "almofada-botanica",
    name: "Almofada Botânica",
    price: 260,
    category: "Casa & Tapeçaria",
    material: "Algodão Orgânico",
    colorTones: ["Sálvia", "Cru"],
    productionMode: "pronta-entrega",
    fiberDescription: "Algodão Cru Trançado",
  },
  {
    id: "blusa-ondas-suaves",
    name: "Blusa Ondas Suaves",
    price: 610,
    category: "Vestuário Autoral",
    material: "Seda Rústica Vegetal",
    colorTones: ["Cru"],
    productionMode: "sob-demanda",
    badge: "Lançamento",
    fiberDescription: "Seda Vegetal Rústica",
  },
  {
    id: "boina-terra",
    name: "Boina Terra",
    price: 210,
    category: "Acessórios de Cabeça",
    material: "Lã Merino Natural",
    colorTones: ["Marrom"],
    productionMode: "pronta-entrega",
    fiberDescription: "Lã Merino Encorpada",
  },
  {
    id: "cropped-trama-aberta",
    name: "Cropped Trama Aberta",
    price: 350,
    category: "Vestuário Autoral",
    material: "Algodão Orgânico",
    colorTones: ["Terracota", "Cru"],
    productionMode: "pronta-entrega",
    fiberDescription: "Algodão Orgânico Trançado",
  },
  {
    id: "bolsa-tote-raiz",
    name: "Bolsa Tote Raiz",
    price: 430,
    category: "Bolsas & Sacolas",
    material: "Linho Puro Brasileiro",
    colorTones: ["Marrom"],
    productionMode: "sob-demanda",
    badge: "Em Demanda",
    fiberDescription: "Linho Brasileiro Encorpado",
  },
  {
    id: "kimono-aurora-dourada",
    name: "Kimono Aurora Dourada",
    price: 890,
    category: "Vestuário Autoral",
    material: "Seda Rústica Vegetal",
    colorTones: ["Terracota", "Sálvia"],
    productionMode: "sob-demanda",
    badge: "Edição Limitada",
    fiberDescription: "Seda Vegetal e Algodão",
  },
  {
    id: "tapete-raizes-redondo",
    name: "Tapete Raízes Redondo",
    price: 470,
    category: "Casa & Tapeçaria",
    material: "Algodão Orgânico",
    colorTones: ["Marrom", "Cru"],
    productionMode: "sob-demanda",
    fiberDescription: "Algodão Trançado Grosso",
  },
  {
    id: "faixa-de-cabelo-salvia",
    name: "Faixa de Cabelo Sálvia",
    price: 190,
    category: "Acessórios de Cabeça",
    material: "Algodão Orgânico",
    colorTones: ["Sálvia"],
    productionMode: "pronta-entrega",
    badge: "Pronta Entrega",
    fiberDescription: "Algodão Orgânico Macio",
  },
  {
    id: "bolero-trama-fina",
    name: "Bolero Trama Fina",
    price: 390,
    category: "Vestuário Autoral",
    material: "Lã Merino Natural",
    colorTones: ["Cru"],
    productionMode: "pronta-entrega",
    fiberDescription: "Lã Merino Fina",
  },
  {
    id: "cesto-organizador-trancado",
    name: "Cesto Organizador Trançado",
    price: 280,
    category: "Casa & Tapeçaria",
    material: "Linho Puro Brasileiro",
    colorTones: ["Marrom", "Terracota"],
    productionMode: "pronta-entrega",
    fiberDescription: "Linho Brasileiro Trançado",
  },
  {
    id: "bag-franjas-terracota",
    name: "Bag Franjas Terracota",
    price: 360,
    category: "Bolsas & Sacolas",
    material: "Lã Merino Natural",
    colorTones: ["Terracota"],
    productionMode: "sob-demanda",
    badge: "Em Demanda",
    fiberDescription: "Lã Merino e Franjas Artesanais",
  },
];

export const CATEGORY_COUNTS: Record<ProductCategory, number> = CATEGORIES.reduce(
  (counts, category) => {
    counts[category] = PRODUCTS.filter((product) => product.category === category).length;
    return counts;
  },
  {} as Record<ProductCategory, number>,
);

export const MATERIAL_COUNTS: Record<ProductMaterial, number> = MATERIALS.reduce(
  (counts, material) => {
    counts[material] = PRODUCTS.filter((product) => product.material === material).length;
    return counts;
  },
  {} as Record<ProductMaterial, number>,
);
```

- [ ] **Step 4: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 5: Commit**

```bash
git add src/features/loja/types.ts src/features/loja/constants.ts src/features/loja/services/product-service.ts
git commit -m "feat: cria camada de dados mockada da loja (types, constants, product-service)"
```

---

### Task 2: Criar o ProductCard

**Files:**
- Create: `src/features/loja/components/ProductCard.tsx`

**Interfaces:**
- Consumes: `COLOR_TONE_SWATCH_CLASS` de `@/features/loja/constants`; tipo `Product` de `@/features/loja/types` (Task 1).
- Produces: `export function ProductCard({ product }: { product: Product }): JSX.Element` — usado pela Task 4.

- [ ] **Step 1: Criar `src/features/loja/components/ProductCard.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Heart, ImageIcon } from "lucide-react";
import { COLOR_TONE_SWATCH_CLASS } from "../constants";
import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex aspect-square items-center justify-center rounded-lg bg-gray-100">
        {product.badge ? (
          <span className="absolute top-2 left-2 rounded-full bg-background px-2 py-1 text-[10px] font-medium tracking-wide text-foreground">
            {product.badge.toUpperCase()}
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => setIsFavorited((current) => !current)}
          aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorited}
          className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-background"
        >
          <Heart
            className={isFavorited ? "size-4 text-primary" : "size-4 text-foreground"}
            aria-hidden="true"
            fill={isFavorited ? "currentColor" : "none"}
          />
        </button>
        <ImageIcon className="size-8 text-gray-400" aria-hidden="true" />
      </div>
      <p className="text-xs text-muted-foreground">{product.fiberDescription}</p>
      <p className="text-sm font-medium text-primary">{product.name}</p>
      <p className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
      <div className="flex gap-1">
        {product.colorTones.map((tone) => (
          <span
            key={tone}
            className={`size-3 rounded-full ${COLOR_TONE_SWATCH_CLASS[tone]}`}
            title={tone}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros. (Componente ainda não é renderizado em nenhuma rota — verificação visual acontece na Task 5.)

- [ ] **Step 3: Commit**

```bash
git add src/features/loja/components/ProductCard.tsx
git commit -m "feat: cria componente ProductCard da loja"
```

---

### Task 3: Criar FilterSidebar e AppliedFilters

**Files:**
- Create: `src/features/loja/components/FilterSidebar.tsx`
- Create: `src/features/loja/components/AppliedFilters.tsx`

**Interfaces:**
- Consumes: `CATEGORIES`, `COLOR_TONES`, `COLOR_TONE_SWATCH_CLASS`, `MATERIALS`, `MAX_PRICE`, `MIN_PRICE` de `@/features/loja/constants`; tipos `ProductCategory`, `ProductColorTone`, `ProductFilters`, `ProductMaterial`, `ProductionModeFilter` de `@/features/loja/types` (Task 1).
- Produces: `export function FilterSidebar(props: FilterSidebarProps): JSX.Element` e `export function AppliedFilters(props: AppliedFiltersProps): JSX.Element` — usados pela Task 4. Assinaturas exatas abaixo.

- [ ] **Step 1: Criar `src/features/loja/components/FilterSidebar.tsx`**

```tsx
"use client";

import type { ChangeEvent } from "react";
import {
  CATEGORIES,
  COLOR_TONES,
  COLOR_TONE_SWATCH_CLASS,
  MATERIALS,
  MAX_PRICE,
  MIN_PRICE,
} from "../constants";
import type {
  ProductCategory,
  ProductColorTone,
  ProductFilters,
  ProductMaterial,
  ProductionModeFilter,
} from "../types";

type FilterSidebarProps = {
  filters: ProductFilters;
  categoryCounts: Record<ProductCategory, number>;
  materialCounts: Record<ProductMaterial, number>;
  onToggleCategory: (category: ProductCategory) => void;
  onToggleMaterial: (material: ProductMaterial) => void;
  onToggleColorTone: (tone: ProductColorTone) => void;
  onProductionModeChange: (mode: ProductionModeFilter) => void;
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
  onClearAll: () => void;
};

export function FilterSidebar({
  filters,
  categoryCounts,
  materialCounts,
  onToggleCategory,
  onToggleMaterial,
  onToggleColorTone,
  onProductionModeChange,
  onPriceRangeChange,
  onClearAll,
}: FilterSidebarProps) {
  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    onPriceRangeChange(Number(event.target.value), filters.maxPrice);
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    onPriceRangeChange(filters.minPrice, Number(event.target.value));
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-6 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Filtros do Ateliê</h2>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          Limpar Todos
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">Categorias de Peças</h3>
        {CATEGORIES.map((category) => (
          <label key={category} className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => onToggleCategory(category)}
            />
            {category} ({categoryCounts[category]})
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">Fibras & Matéria-Prima</h3>
        {MATERIALS.map((material) => (
          <label key={material} className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              checked={filters.materials.includes(material)}
              onChange={() => onToggleMaterial(material)}
            />
            {material} ({materialCounts[material]})
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">Paleta Botânica & Mineral</h3>
        <div className="flex gap-2">
          {COLOR_TONES.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => onToggleColorTone(tone)}
              aria-label={tone}
              aria-pressed={filters.colorTones.includes(tone)}
              className={`size-6 rounded-full ${COLOR_TONE_SWATCH_CLASS[tone]} ${
                filters.colorTones.includes(tone) ? "ring-primary ring-2 ring-offset-2" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">Investimento (R$)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            className="w-20 rounded border border-input bg-transparent px-2 py-1"
            aria-label="Preço mínimo"
          />
          <span className="text-muted-foreground">até</span>
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={filters.maxPrice}
            onChange={handleMaxPriceChange}
            className="w-20 rounded border border-input bg-transparent px-2 py-1"
            aria-label="Preço máximo"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground">Modalidade de Produção</h3>
        <label className="flex items-center gap-2 text-muted-foreground">
          <input
            type="radio"
            name="production-mode"
            checked={filters.productionMode === "todas"}
            onChange={() => onProductionModeChange("todas")}
          />
          Todas as modalidades
        </label>
        <label className="flex items-center gap-2 text-muted-foreground">
          <input
            type="radio"
            name="production-mode"
            checked={filters.productionMode === "pronta-entrega"}
            onChange={() => onProductionModeChange("pronta-entrega")}
          />
          Pronta Entrega
        </label>
        <label className="flex items-center gap-2 text-muted-foreground">
          <input
            type="radio"
            name="production-mode"
            checked={filters.productionMode === "sob-demanda"}
            onChange={() => onProductionModeChange("sob-demanda")}
          />
          Feito sob Demanda
        </label>
      </div>

      <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
        <p className="mb-1 font-medium text-foreground">Produção Responsável</p>
        <p>Nossas fibras possuem certificação orgânica e rastreamento de origem e razão nacional.</p>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Criar `src/features/loja/components/AppliedFilters.tsx`**

```tsx
"use client";

import { X } from "lucide-react";
import type { ProductCategory, ProductColorTone, ProductFilters, ProductMaterial } from "../types";

type AppliedFiltersProps = {
  filters: ProductFilters;
  onRemoveCategory: (category: ProductCategory) => void;
  onRemoveMaterial: (material: ProductMaterial) => void;
  onRemoveColorTone: (tone: ProductColorTone) => void;
};

export function AppliedFilters({
  filters,
  onRemoveCategory,
  onRemoveMaterial,
  onRemoveColorTone,
}: AppliedFiltersProps) {
  const hasFilters =
    filters.categories.length > 0 || filters.materials.length > 0 || filters.colorTones.length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Filtros aplicados:</span>
      {filters.categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onRemoveCategory(category)}
          className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
        >
          {category}
          <X className="size-3" aria-hidden="true" />
        </button>
      ))}
      {filters.materials.map((material) => (
        <button
          key={material}
          type="button"
          onClick={() => onRemoveMaterial(material)}
          className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
        >
          {material}
          <X className="size-3" aria-hidden="true" />
        </button>
      ))}
      {filters.colorTones.map((tone) => (
        <button
          key={tone}
          type="button"
          onClick={() => onRemoveColorTone(tone)}
          className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
        >
          Tom: {tone}
          <X className="size-3" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros. (Nenhum dos dois componentes é renderizado ainda — verificação visual acontece na Task 5.)

- [ ] **Step 4: Commit**

```bash
git add src/features/loja/components/FilterSidebar.tsx src/features/loja/components/AppliedFilters.tsx
git commit -m "feat: cria FilterSidebar e AppliedFilters da loja"
```

---

### Task 4: Criar o LojaCatalog (orquestrador)

**Files:**
- Create: `src/features/loja/components/LojaCatalog.tsx`

**Interfaces:**
- Consumes: `MIN_PRICE`, `MAX_PRICE`, `PRODUCTS_PER_PAGE` de `@/features/loja/constants`; `PRODUCTS`, `CATEGORY_COUNTS`, `MATERIAL_COUNTS` de `@/features/loja/services/product-service` (Task 1); tipos de `@/features/loja/types` (Task 1); `AppliedFilters` (Task 3); `FilterSidebar` (Task 3); `ProductCard` (Task 2).
- Produces: `export function LojaCatalog(): JSX.Element` — sem props — usado pela Task 5.

- [ ] **Step 1: Criar `src/features/loja/components/LojaCatalog.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import { MAX_PRICE, MIN_PRICE, PRODUCTS_PER_PAGE } from "../constants";
import { CATEGORY_COUNTS, MATERIAL_COUNTS, PRODUCTS } from "../services/product-service";
import type {
  Product,
  ProductCategory,
  ProductColorTone,
  ProductFilters,
  ProductMaterial,
  ProductionModeFilter,
  SortOption,
} from "../types";
import { AppliedFilters } from "./AppliedFilters";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCard } from "./ProductCard";

const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  materials: [],
  colorTones: [],
  productionMode: "todas",
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
};

function matchesFilters(product: Product, filters: ProductFilters): boolean {
  if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
    return false;
  }
  if (filters.materials.length > 0 && !filters.materials.includes(product.material)) {
    return false;
  }
  if (
    filters.colorTones.length > 0 &&
    !product.colorTones.some((tone) => filters.colorTones.includes(tone))
  ) {
    return false;
  }
  if (filters.productionMode !== "todas" && product.productionMode !== filters.productionMode) {
    return false;
  }
  if (product.price < filters.minPrice || product.price > filters.maxPrice) {
    return false;
  }
  return true;
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  if (sort === "menor-preco") {
    return [...products].sort((a, b) => a.price - b.price);
  }
  if (sort === "maior-preco") {
    return [...products].sort((a, b) => b.price - a.price);
  }
  return products;
}

export function LojaCatalog() {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("mais-recentes");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const filteredProducts = useMemo(
    () => sortProducts(PRODUCTS.filter((product) => matchesFilters(product, filters)), sort),
    [filters, sort],
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  function updateFilters(updater: (current: ProductFilters) => ProductFilters) {
    setFilters(updater);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }

  function toggleCategory(category: ProductCategory) {
    updateFilters((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((value) => value !== category)
        : [...current.categories, category],
    }));
  }

  function toggleMaterial(material: ProductMaterial) {
    updateFilters((current) => ({
      ...current,
      materials: current.materials.includes(material)
        ? current.materials.filter((value) => value !== material)
        : [...current.materials, material],
    }));
  }

  function toggleColorTone(tone: ProductColorTone) {
    updateFilters((current) => ({
      ...current,
      colorTones: current.colorTones.includes(tone)
        ? current.colorTones.filter((value) => value !== tone)
        : [...current.colorTones, tone],
    }));
  }

  function changeProductionMode(mode: ProductionModeFilter) {
    updateFilters((current) => ({ ...current, productionMode: mode }));
  }

  function changePriceRange(minPrice: number, maxPrice: number) {
    updateFilters((current) => ({ ...current, minPrice, maxPrice }));
  }

  function clearAllFilters() {
    updateFilters(() => DEFAULT_FILTERS);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-wide text-secondary-foreground uppercase">
          Coleção Permanente & Lotes Sazonais
        </p>
        <h1 className="font-serif text-3xl text-foreground">Nossas Criações</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Cada laçada carrega tempo, paciência e a robustez das fibras naturais selecionadas. Peças
          concebidas individualmente por nossa artesã, unindo a serenidade do linho à maciez do
          algodão puro.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Exibindo {visibleProducts.length} de {filteredProducts.length} peças artesanais
        </p>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="rounded border border-input bg-transparent px-2 py-1 text-sm"
          aria-label="Ordenar produtos"
        >
          <option value="mais-recentes">Ordenar: Mais Recentes</option>
          <option value="menor-preco">Ordenar: Menor Preço</option>
          <option value="maior-preco">Ordenar: Maior Preço</option>
        </select>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <FilterSidebar
          filters={filters}
          categoryCounts={CATEGORY_COUNTS}
          materialCounts={MATERIAL_COUNTS}
          onToggleCategory={toggleCategory}
          onToggleMaterial={toggleMaterial}
          onToggleColorTone={toggleColorTone}
          onProductionModeChange={changeProductionMode}
          onPriceRangeChange={changePriceRange}
          onClearAll={clearAllFilters}
        />

        <div className="flex flex-1 flex-col gap-4">
          <AppliedFilters
            filters={filters}
            onRemoveCategory={toggleCategory}
            onRemoveMaterial={toggleMaterial}
            onRemoveColorTone={toggleColorTone}
          />

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma peça encontrada com os filtros selecionados.
            </p>
          )}

          {visibleCount < filteredProducts.length ? (
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + PRODUCTS_PER_PAGE)}
              className="self-center rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Carregar Mais Peças do Ateliê
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros. (Componente ainda não é renderizado em nenhuma rota — verificação visual acontece na Task 5.)

- [ ] **Step 3: Commit**

```bash
git add src/features/loja/components/LojaCatalog.tsx
git commit -m "feat: cria LojaCatalog com filtragem, ordenacao e carregar mais"
```

---

### Task 5: Renderizar o catálogo em /loja

**Files:**
- Modify: `src/app/loja/page.tsx` (substitui todo o arquivo)

**Interfaces:**
- Consumes: `SiteHeader` de `@/components/site-header` (já existe); `LojaCatalog` de `@/features/loja/components/LojaCatalog` (Task 4).

- [ ] **Step 1: Substituir o conteúdo de `src/app/loja/page.tsx`**

```tsx
import { SiteHeader } from "@/components/site-header";
import { LojaCatalog } from "@/features/loja/components/LojaCatalog";

export default function LojaPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <LojaCatalog />
    </div>
  );
}
```

- [ ] **Step 2: Rodar lint e typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: ambos terminam sem erros.

- [ ] **Step 3: Rodar o build de produção**

Run: `pnpm build`

Expected: build termina sem erros, `/loja` listada nas rotas.

- [ ] **Step 4: Verificar o HTML inicial via curl**

Run: `pnpm dev` (background), aguardar o servidor responder em `http://localhost:3000`, então:

```bash
curl -s http://localhost:3000/loja | grep -o "Nossas Criações"
curl -s http://localhost:3000/loja | grep -o "Filtros do Ateliê"
curl -s http://localhost:3000/loja | grep -o "Vestuário Autoral"
curl -s http://localhost:3000/loja | grep -o "Blusa Trama Suave"
curl -s http://localhost:3000/loja | grep -o "Carregar Mais Peças do Ateliê"
curl -s http://localhost:3000/loja | grep -o "Exibindo 6 de 24 peças artesanais"
```

Expected: cada comando imprime o texto buscado, confirmando que o estado inicial (sem filtros, 6 de 24 produtos, botão "Carregar Mais" visível) renderizou no HTML.

Interatividade real (marcar um filtro e ver a grade mudar, clicar em "Carregar Mais" e ver mais produtos aparecerem, trocar ordenação) depende de JavaScript no navegador e **não pode ser verificada por `curl`** — é uma limitação conhecida deste ambiente, não um defeito desta task. Registrar isso claramente no relatório.

Parar o servidor depois.

- [ ] **Step 5: Commit**

```bash
git add src/app/loja/page.tsx
git commit -m "feat: renderiza LojaCatalog na rota /loja"
```
