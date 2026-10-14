"use client";

import { useMemo, useState } from "react";
import { MAX_PRICE, MIN_PRICE, PRODUCTS_PER_PAGE } from "@/features/loja/constants";
import {
  filterProducts,
  sortProducts,
  CATEGORY_COUNTS,
  MATERIAL_COUNTS,
  PRODUCTS,
} from "@/features/loja/services/product-service";
import type {
  ProductCategory,
  ProductColorTone,
  ProductFilters,
  ProductMaterial,
  ProductionModeFilter,
  SortOption,
} from "@/features/loja/types";
import { AppliedFilters } from "@/features/loja/components/AppliedFilters";
import { FilterSidebar } from "@/features/loja/components/FilterSidebar";
import { ProductCard } from "@/features/loja/components/ProductCard";

const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  materials: [],
  colorTones: [],
  productionMode: "todas",
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
};

export function LojaCatalog() {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("mais-recentes");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const filteredProducts = useMemo(
    () => sortProducts(filterProducts(PRODUCTS, filters), sort),
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

  function changeSort(next: SortOption) {
    setSort(next);
    setVisibleCount(PRODUCTS_PER_PAGE);
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
          onChange={(event) => changeSort(event.target.value as SortOption)}
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
