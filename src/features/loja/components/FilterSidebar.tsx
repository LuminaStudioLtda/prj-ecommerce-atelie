"use client";

import type { ChangeEvent } from "react";
import {
  CATEGORIES,
  COLOR_TONES,
  COLOR_TONE_SWATCH_CLASS,
  MATERIALS,
  MAX_PRICE,
  MIN_PRICE,
} from "@/features/loja/constants";
import type {
  ProductCategory,
  ProductColorTone,
  ProductFilters,
  ProductMaterial,
  ProductionModeFilter,
} from "@/features/loja/types";

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
              className="accent-primary"
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
              className="accent-primary"
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
            className="accent-primary"
          />
          Todas as modalidades
        </label>
        <label className="flex items-center gap-2 text-muted-foreground">
          <input
            type="radio"
            name="production-mode"
            checked={filters.productionMode === "pronta-entrega"}
            onChange={() => onProductionModeChange("pronta-entrega")}
            className="accent-primary"
          />
          Pronta Entrega
        </label>
        <label className="flex items-center gap-2 text-muted-foreground">
          <input
            type="radio"
            name="production-mode"
            checked={filters.productionMode === "sob-demanda"}
            onChange={() => onProductionModeChange("sob-demanda")}
            className="accent-primary"
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
