"use client";

import { useId } from "react";
import { ImagePlusIcon, XIcon } from "lucide-react";
import type { FotoDoProduto } from "@/features/ficha-tecnica/types";

type FotosDoProdutoProps = {
  fotos: FotoDoProduto[];
  erro: string | null;
  onAdicionar: (arquivos: FileList | null) => void;
  onRemover: (id: string) => void;
  onDefinirCapa: (id: string) => void;
};

export function FotosDoProduto({
  fotos,
  erro,
  onAdicionar,
  onRemover,
  onDefinirCapa,
}: FotosDoProdutoProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold tracking-wider text-ink uppercase">
        Registros fotográficos do ateliê{" "}
        <span className="font-normal tracking-normal text-muted-foreground normal-case">
          ({fotos.length} anexada{fotos.length === 1 ? "" : "s"})
        </span>
      </span>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {fotos.map((foto, indice) => (
          <li key={foto.id} className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-canvas">
            {/* eslint-disable-next-line @next/next/no-img-element -- URL de objeto local, não otimizável pelo next/image */}
            <img src={foto.url} alt={`Foto ${indice + 1} da peça: ${foto.nome}`} className="size-full object-cover" />
            {indice === 0 ? (
              <span className="absolute bottom-2 left-2 rounded-full bg-ink/80 px-2 py-0.5 text-xs font-semibold text-surface">
                Capa
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onDefinirCapa(foto.id)}
                className="absolute bottom-2 left-2 min-h-7 rounded-full bg-surface/90 px-2 text-xs font-semibold text-ink transition-opacity hover:bg-surface focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
              >
                Usar como capa
              </button>
            )}
            <button
              type="button"
              onClick={() => onRemover(foto.id)}
              className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-surface/90 text-ink hover:bg-surface focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <XIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">Remover foto {indice + 1}</span>
            </button>
          </li>
        ))}

        <li className="aspect-[3/4]">
          <label
            htmlFor={inputId}
            className="flex size-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-canvas p-3 text-center text-xs text-muted-foreground transition-colors hover:border-terracotta hover:text-terracotta has-[:focus-visible]:border-terracotta has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
          >
            <ImagePlusIcon className="size-6" aria-hidden="true" />
            <span>Carregar JPG ou PNG de até 10 MB</span>
            <input
              id={inputId}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              className="sr-only"
              onChange={(evento) => {
                onAdicionar(evento.target.files);
                evento.target.value = "";
              }}
            />
          </label>
        </li>
      </ul>

      {erro ? (
        <p role="alert" className="text-xs text-critical">
          {erro}
        </p>
      ) : null}
    </div>
  );
}
