import { EyeIcon, SaveIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UltimaAcao } from "@/features/ficha-tecnica/hooks/use-ficha-tecnica-form";

type AcoesDaFichaBarProps = {
  ultimaAcao: UltimaAcao | null;
  onSalvarRascunho: () => void;
  onPublicar: () => void;
};

const FORMATO_HORA = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

const MENSAGEM: Record<UltimaAcao["tipo"], string> = {
  rascunho: "Rascunho salvo nesta sessão",
  publicado: "Peça publicada nesta sessão",
};

export function AcoesDaFichaBar({ ultimaAcao, onSalvarRascunho, onPublicar }: AcoesDaFichaBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface px-4 py-3 lg:left-72 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" className="text-xs text-muted-foreground">
          {ultimaAcao ? (
            <>
              {MENSAGEM[ultimaAcao.tipo]} às{" "}
              <span className="font-mono text-ink">{FORMATO_HORA.format(ultimaAcao.em)}</span>. A
              gravação definitiva chega com o banco de dados.
            </>
          ) : (
            "Alterações ainda não salvas."
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" className="h-11 flex-1 sm:flex-none" onClick={onSalvarRascunho}>
            <SaveIcon aria-hidden="true" />
            Salvar rascunho
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 flex-1 sm:flex-none"
            disabled
            title="A pré-visualização aparece quando a vitrine existir."
          >
            <EyeIcon aria-hidden="true" />
            Pré-visualizar
          </Button>
          <Button type="button" className="h-11 flex-1 sm:flex-none" onClick={onPublicar}>
            <UploadIcon aria-hidden="true" />
            Salvar &amp; publicar
          </Button>
        </div>
      </div>
    </div>
  );
}
