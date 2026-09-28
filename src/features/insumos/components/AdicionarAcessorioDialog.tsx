"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AcessorioForm } from "@/features/insumos/components/AcessorioForm";
import type { AcessorioInput } from "@/features/insumos/types";

type AdicionarAcessorioDialogProps = {
  onAdicionar: (acessorio: AcessorioInput) => void;
};

export function AdicionarAcessorioDialog({ onAdicionar }: AdicionarAcessorioDialogProps) {
  const [aberto, setAberto] = useState(false);
  const [instancia, setInstancia] = useState(0);

  function salvar(acessorio: AcessorioInput) {
    onAdicionar(acessorio);
    setAberto(false);
  }

  return (
    <Dialog
      open={aberto}
      onOpenChange={(valor) => {
        setAberto(valor);
        if (valor) setInstancia((atual) => atual + 1);
      }}
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => setAberto(true)}
        className="h-10 self-start sm:self-auto"
      >
        <PlusIcon aria-hidden="true" />
        Adicionar Acessório
      </Button>
      <DialogContent className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto bg-canvas p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Adicionar acessório</DialogTitle>
        </DialogHeader>
        <div className="p-1">
          <AcessorioForm key={instancia} onSubmit={salvar} onCancel={() => setAberto(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
