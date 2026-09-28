"use client";

import { DownloadIcon, SmartphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecalcularFichasDialog } from "@/features/insumos/components/RecalcularFichasDialog";
import { exportarEstoqueParaXlsx } from "@/features/insumos/services/insumo-exportacao";
import type { AcessorioEmEstoque, InsumoEmEstoque } from "@/features/insumos/types";

type FichaTecnicaSyncFooterProps = {
  insumos: InsumoEmEstoque[];
  acessorios: AcessorioEmEstoque[];
};

export function FichaTecnicaSyncFooter({ insumos, acessorios }: FichaTecnicaSyncFooterProps) {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-surface p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-canvas text-terracotta">
          <SmartphoneIcon className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-ink">Sincronização Direta com Ficha Técnica</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Qualquer alteração de preço do lote impacta instantaneamente o custo base de
            confecção no Motor de Precificação.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={() => exportarEstoqueParaXlsx(insumos, acessorios)}
          className="h-10"
        >
          <DownloadIcon aria-hidden="true" />
          Exportar Planilha (XLSX)
        </Button>
        <RecalcularFichasDialog />
      </div>
    </section>
  );
}
