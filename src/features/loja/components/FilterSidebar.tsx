"use client";

import type { ChangeEvent, ReactNode } from "react";
import { Check, ChevronUp, Leaf } from "lucide-react";
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

const PRODUCTION_MODES: { value: ProductionModeFilter; label: string; description: string }[] = [
  { value: "todas", label: "Todas as modalidades", description: "Pronta entrega e sob demanda" },
  {
    value: "pronta-entrega",
    label: "Pronta Entrega Imediata",
    description: "Peças já confeccionadas",
  },
  {
    value: "sob-demanda",
    label: "Feito sob Demanda",
    description: "Confeccionadas após o pedido",
  },
];

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="group flex flex-col gap-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronUp
          className="size-3.5 text-muted-foreground transition-transform group-not-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="flex flex-col gap-2.5">{children}</div>
    </details>
  );
}

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
    const value = Number(event.target.value);
    onPriceRangeChange(Math.min(value, filters.maxPrice), filters.maxPrice);
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    onPriceRangeChange(filters.minPrice, Math.max(value, filters.minPrice));
  }

  const activeTones = filters.colorTones.length > 0 ? filters.colorTones.join(", ") : "Todos";

  return (
    <aside className="flex h-fit flex-col gap-6 rounded-sm bg-surface-container-low p-6 text-xs">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-base leading-tight text-foreground">Filtros do Ateliê</h2>
        <button
          type="button"
          onClick={onClearAll}
          className="text-[10px] text-muted-foreground underline underline-offset-2 hover:text-primary"
        >
          Limpar Todos
        </button>
      </div>

      <FilterSection title="Categorias de Peças">
        {CATEGORIES.map((category) => (
          <label key={category} className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => onToggleCategory(category)}
              className="size-3.5 accent-primary"
            />
            <span className="flex-1">{category}</span>
            <span className="text-[10px]">{categoryCounts[category]}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Fibras & Matéria-Prima">
        {MATERIALS.map((material) => (
          <label key={material} className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              checked={filters.materials.includes(material)}
              onChange={() => onToggleMaterial(material)}
              className="size-3.5 accent-primary"
            />
            <span className="flex-1">{material}</span>
            <span className="text-[10px]">{materialCounts[material]}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Paleta Botânica & Mineral">
        <div className="flex gap-2">
          {COLOR_TONES.map((tone) => {
            const isSelected = filters.colorTones.includes(tone);
            return (
              <button
                key={tone}
                type="button"
                onClick={() => onToggleColorTone(tone)}
                aria-label={tone}
                aria-pressed={isSelected}
                className={`flex size-8 items-center justify-center rounded-md ${COLOR_TONE_SWATCH_CLASS[tone]} ${
                  isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-surface-container-low" : ""
                }`}
              >
                {isSelected ? <Check className="size-3.5 text-primary-foreground" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between gap-2 text-[9px] text-muted-foreground">
          <span>
            Tom Ativo:
            <br />
            {activeTones}
          </span>
          <span className="text-right">
            Tinta
            <br />
            Vegetal
          </span>
        </div>
      </FilterSection>

      <FilterSection title="Investimento (R$)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            className="h-7 w-full min-w-0 rounded-sm border border-border bg-card px-2 text-[10px] text-foreground"
            aria-label="Preço mínimo"
          />
          <span className="text-muted-foreground">—</span>
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={filters.maxPrice}
            onChange={handleMaxPriceChange}
            className="h-7 w-full min-w-0 rounded-sm border border-border bg-card px-2 text-[10px] text-foreground"
            aria-label="Preço máximo"
          />
        </div>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={filters.maxPrice}
          onChange={handleMaxPriceChange}
          aria-label="Preço máximo"
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>Essenciais</span>
          <span>Peças Escultuárias</span>
        </div>
      </FilterSection>

      <FilterSection title="Modalidade de Produção">
        {PRODUCTION_MODES.map(({ value, label, description }) => (
          <label key={value} className="flex items-start gap-2">
            <input
              type="radio"
              name="production-mode"
              checked={filters.productionMode === value}
              onChange={() => onProductionModeChange(value)}
              className="mt-0.5 size-3.5 accent-primary"
            />
            <span className="flex flex-col">
              <span className="text-foreground">{label}</span>
              <span className="text-[9px] text-muted-foreground">{description}</span>
            </span>
          </label>
        ))}
      </FilterSection>

      <div className="rounded-sm bg-card p-4 text-[10px] leading-relaxed text-muted-foreground">
        <p className="mb-1 flex items-center gap-1.5 font-medium text-foreground">
          <Leaf className="size-3.5" aria-hidden="true" />
          Produção Responsável
        </p>
        <p>Nossos fios possuem certificação orgânica e tingimento com folhas e raízes nacionais.</p>
      </div>
    </aside>
  );
}
