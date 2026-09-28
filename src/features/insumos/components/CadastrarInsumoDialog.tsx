"use client";

import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NovoInsumo } from "@/features/insumos/components/NovoInsumo";
import type { InsumoInput } from "@/features/insumos/types";

type CadastrarInsumoDialogProps = {
  onRegistrar: (insumo: InsumoInput) => void;
};

export function CadastrarInsumoDialog({ onRegistrar }: CadastrarInsumoDialogProps) {
  const [aberto, setAberto] = useState(false);
  const [instancia, setInstancia] = useState(0);

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
        onClick={() => setAberto(true)}
        className="h-11 px-5 text-xs font-semibold tracking-wider uppercase md:h-10"
      >
        <PlusCircleIcon aria-hidden="true" />
        Cadastrar Novo Insumo
      </Button>
      <DialogContent
        showCloseButton
        className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto bg-canvas p-0 sm:max-w-4xl"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Cadastrar novo insumo</DialogTitle>
        </DialogHeader>
        <div className="p-1">
          <NovoInsumo
            key={instancia}
            onFechar={() => setAberto(false)}
            onRegistrar={onRegistrar}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
