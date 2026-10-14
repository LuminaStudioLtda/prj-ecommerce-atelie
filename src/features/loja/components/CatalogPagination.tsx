"use client";

import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

type CatalogPaginationProps = {
  visibleCount: number;
  totalCount: number;
  pageSize: number;
  onShowPage: (page: number) => void;
};

export function CatalogPagination({
  visibleCount,
  totalCount,
  pageSize,
  onShowPage,
}: CatalogPaginationProps) {
  if (totalCount === 0) {
    return null;
  }

  const shownCount = Math.min(visibleCount, totalCount);
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = Math.ceil(shownCount / pageSize);
  const percentage = Math.round((shownCount / totalCount) * 100);
  const hasMore = shownCount < totalCount;

  return (
    <div className="flex flex-col items-center gap-5 pt-6">
      <div className="flex w-full max-w-xs flex-col gap-1.5">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>
            {shownCount} de {totalCount} peças exibidas
          </span>
          <span>{percentage}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Peças exibidas"
          className="h-0.5 w-full bg-border"
        >
          <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
        </div>
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() => onShowPage(currentPage + 1)}
          className="flex items-center gap-2 rounded-sm border border-border bg-card px-8 py-3 text-[11px] text-foreground transition-colors hover:border-primary"
        >
          <RefreshCw className="size-3.5" aria-hidden="true" />
          Carregar Mais Peças do Ateliê
        </button>
      ) : null}

      {totalPages > 1 ? (
        <nav aria-label="Paginação" className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onShowPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Página anterior"
            className="flex size-8 items-center justify-center text-muted-foreground disabled:opacity-40"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onShowPage(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex size-8 items-center justify-center rounded-sm text-[11px] ${
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onShowPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Próxima página"
            className="flex size-8 items-center justify-center text-muted-foreground disabled:opacity-40"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
