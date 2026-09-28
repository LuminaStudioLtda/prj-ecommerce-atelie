import { PackageIcon } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { AdicionarAcessorioDialog } from "@/features/insumos/components/AdicionarAcessorioDialog";
import { statusDoEstoque } from "@/features/insumos/services/insumo-estoque";
import type { AcessorioEmEstoque, AcessorioInput } from "@/features/insumos/types";

const FORMATO_MOEDA = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

type AcessoriosSectionProps = {
  acessorios: AcessorioEmEstoque[];
  onAdicionar: (acessorio: AcessorioInput) => void;
};

export function AcessoriosSection({ acessorios, onAdicionar }: AcessoriosSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold tracking-widest text-terracotta uppercase">
            Acabamento &amp; Detalhes de Marca
          </span>
          <h2 className="text-xl font-semibold text-ink">Acessórios, Embalagens &amp; Ferragens</h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            Insumos que elevam a experiência de unboxing e conferem selo de qualidade às peças
            prontas.
          </p>
        </div>
        <AdicionarAcessorioDialog onAdicionar={onAdicionar} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {acessorios.map((item) => {
          const status = statusDoEstoque(item.estoqueAtual, item.pontoPedido);
          return (
            <article
              key={item.id}
              className="flex flex-col gap-3 overflow-hidden rounded-xl bg-surface shadow-sm"
            >
              <div className="relative flex h-32 items-center justify-center bg-canvas text-terracotta">
                <PackageIcon className="size-8" aria-hidden="true" />
                <span className="absolute top-2 left-2">
                  <StatusBadge status="ok" rotulo={item.tag} className="bg-surface/90 text-ink" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
                <h3 className="font-medium text-ink">{item.nome}</h3>
                <p className="line-clamp-2 text-xs text-muted-foreground">{item.descricao}</p>
                <dl className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 border-t border-border pt-2 text-xs">
                  <dt className="text-muted-foreground">Estoque Atual</dt>
                  <dd className="text-right font-mono">
                    {item.estoqueAtual} un
                    {status !== "ok" ? (
                      <span className="ml-1">
                        <StatusBadge status={status} />
                      </span>
                    ) : null}
                  </dd>
                  <dt className="text-muted-foreground">Custo por Peça</dt>
                  <dd className="text-right font-mono">{FORMATO_MOEDA.format(item.custoPorPeca)}</dd>
                  <dt className="text-muted-foreground">Fornecedor</dt>
                  <dd className="text-right">{item.fornecedor}</dd>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
