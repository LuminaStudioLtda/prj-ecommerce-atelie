"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MAX_PRICE, MIN_PRICE, PRODUCTS_PER_PAGE } from "@/features/loja/constants";
import {
  filterProducts,
  searchProducts,
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
import { CatalogPagination } from "@/features/loja/components/CatalogPagination";
import { FilterSidebar } from "@/features/loja/components/FilterSidebar";
import { ProductCard } from "@/features/loja/components/ProductCard";

type LojaCatalogProps = {
  query: string;
};

const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  materials: [],
  colorTones: [],
  productionMode: "todas",
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
};

export function LojaCatalog({ query }: LojaCatalogProps) {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("mais-recentes");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const filteredProducts = useMemo(
    () => sortProducts(filterProducts(searchProducts(PRODUCTS, query), filters), sort),
    [query, filters, sort],
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

  function showPage(page: number) {
    setVisibleCount(Math.max(1, page) * PRODUCTS_PER_PAGE);
  }

  return (
    <>
      <section className="bg-surface-container-low">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-8 pb-10 md:px-12">
          <nav aria-label="Trilha de navegação" className="text-[10px] text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/inicio" className="hover:text-primary">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-foreground">
                Loja &amp; Catálogo
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
              Coleção Permanente &amp; Lotes Sazonais
            </p>
            <h1 className="font-serif text-4xl leading-tight text-foreground md:text-6xl">
              {query ? `Resultados para “${query}”` : "Nossas Criações"}
            </h1>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
              Cada laçada carrega tempo, paciência e a nobreza de fibras naturais selecionadas.
              Peças concebidas individualmente por mãos artesãs, unindo a serenidade do linho à
              maciez do algodão puro.
              {query ? (
                <>
                  {" "}
                  <Link href="/loja" className="text-primary underline-offset-4 hover:underline">
                    Limpar busca
                  </Link>
                </>
              ) : null}
            </p>
            <div className="flex shrink-0 items-stretch gap-3">
              <p className="flex items-center rounded-sm bg-card px-4 py-3 text-[11px] leading-snug text-foreground">
                Exibindo {filteredProducts.length}
                <br className="hidden sm:block" /> peças artesanais
              </p>
              <label className="relative flex items-center gap-2 rounded-sm bg-card px-4 py-3 text-[11px] text-muted-foreground">
                <span className="tracking-wider uppercase">Ordenar:</span>
                <select
                  value={sort}
                  onChange={(event) => changeSort(event.target.value as SortOption)}
                  aria-label="Ordenar produtos"
                  className="appearance-none bg-transparent pr-6 text-foreground focus:outline-none"
                >
                  <option value="mais-recentes">Mais Recentes</option>
                  <option value="menor-preco">Menor Preço</option>
                  <option value="maior-preco">Maior Preço</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 pt-12 md:px-12 lg:grid-cols-[15rem_1fr]">
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

        <div className="flex min-w-0 flex-col gap-6">
          <AppliedFilters
            filters={filters}
            onRemoveCategory={toggleCategory}
            onRemoveMaterial={toggleMaterial}
            onRemoveColorTone={toggleColorTone}
          />

          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {query
                ? `Nenhuma peça encontrada para “${query}”. Tente outro termo ou limpe os filtros.`
                : "Nenhuma peça encontrada com os filtros selecionados."}
            </p>
          )}

          <CatalogPagination
            visibleCount={visibleCount}
            totalCount={filteredProducts.length}
            pageSize={PRODUCTS_PER_PAGE}
            onShowPage={showPage}
          />
        </div>
      </div>
    </>
  );
}
