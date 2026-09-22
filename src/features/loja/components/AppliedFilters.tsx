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
