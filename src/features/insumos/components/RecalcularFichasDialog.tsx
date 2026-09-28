"use client";

import { useState } from "react";
import { InboxIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * A recalculação real depende da Ficha Técnica / Motor de Precificação (Trilha 3),
 * que ainda não existe no código. Em vez de fingir um recálculo, o modal mostra o
 * estado vazio honesto: nenhuma ficha técnica está cadastrada ainda.
 */
export function RecalcularFichasDialog() {
  const [aberto, setAberto] = useState(false);

  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <Button type="button" onClick={() => setAberto(true)} className="h-10">
        <RefreshCwIcon aria-hidden="true" />
        Recalcular Fichas Técnicas
      </Button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Fichas técnicas impactadas</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-canvas text-terracotta">
            <InboxIcon className="size-6" aria-hidden="true" />
          </div>
          <p className="text-sm text-ink">Nenhuma ficha técnica cadastrada ainda.</p>
          <p className="text-sm text-muted-foreground">
            Quando o Motor de Precificação existir, as fichas que usam estes insumos
            aparecerão aqui para reajuste automático de custo.
          </p>
        </div>
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={() => setAberto(false)}>
            Entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
