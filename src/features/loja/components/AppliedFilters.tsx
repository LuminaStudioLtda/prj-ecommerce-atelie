"use client";

import { X } from "lucide-react";
import type {
  ProductCategory,
  ProductColorTone,
  ProductFilters,
  ProductMaterial,
} from "@/features/loja/types";

type AppliedFiltersProps = {
  filters: ProductFilters;
  onRemoveCategory: (category: ProductCategory) => void;
  onRemoveMaterial: (material: ProductMaterial) => void;
  onRemoveColorTone: (tone: ProductColorTone) => void;
};

const CHIP_BASE_CLASS =
  "flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] text-foreground transition-opacity hover:opacity-80";
const GREEN_CHIP_CLASS = `${CHIP_BASE_CLASS} bg-sage/40`;
const TONE_CHIP_CLASS = `${CHIP_BASE_CLASS} bg-accent`;

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
      <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
        Filtros aplicados:
      </span>
      {filters.categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onRemoveCategory(category)}
          aria-label={`Remover filtro ${category}`}
          className={GREEN_CHIP_CLASS}
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
          aria-label={`Remover filtro ${material}`}
          className={GREEN_CHIP_CLASS}
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
          aria-label={`Remover filtro tom ${tone}`}
          className={TONE_CHIP_CLASS}
        >
          Tom: {tone}
          <X className="size-3" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
