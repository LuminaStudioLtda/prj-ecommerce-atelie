import { CheckCircleIcon, PackageIcon, WalletIcon } from "lucide-react";
import { formatarCustoUnitario } from "@/features/insumos/services/insumo-custo";
import type { KpisDeInsumos } from "@/features/insumos/services/insumo-estoque";

const FORMATO_MOEDA = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function InsumoKpiCards({ kpis }: { kpis: KpisDeInsumos }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <article className="flex flex-col justify-between gap-4 rounded-xl bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Fios &amp; Lãs Selecionadas
          </span>
          <div className="flex size-9 items-center justify-center rounded-lg bg-canvas text-terracotta">
            <PackageIcon className="size-5" aria-hidden="true" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl leading-none font-semibold text-terracotta">
            {kpis.lotesFiosAtivos}
          </span>
          <span className="text-muted-foreground">lotes ativos</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#5c6b47]">
          <CheckCircleIcon className="size-4" aria-hidden="true" />
          {kpis.pctComLoteRegistrado}% com rastreabilidade de tintura
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-xl bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Materiais Secundários
          </span>
          <div className="flex size-9 items-center justify-center rounded-lg bg-canvas text-terracotta">
            <PackageIcon className="size-5" aria-hidden="true" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl leading-none font-semibold text-terracotta">
            {kpis.materiaisSecundarios}
          </span>
          <span className="text-muted-foreground">itens de composição</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Aviamentos, embalagens e enchimentos
        </p>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-xl bg-canvas p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-terracotta uppercase">
            Custo Imobilizado
          </span>
          <div className="flex size-9 items-center justify-center rounded-lg bg-surface text-terracotta">
            <WalletIcon className="size-5" aria-hidden="true" />
          </div>
        </div>
        <span className="text-3xl leading-none font-semibold text-terracotta">
          {FORMATO_MOEDA.format(kpis.custoImobilizado)}
        </span>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Sem dados de movimentação</span>
          <span className="font-semibold text-terracotta">
            {kpis.custoMedioPorGrama !== null
              ? `Custo/g Médio: R$ ${formatarCustoUnitario(kpis.custoMedioPorGrama)}`
              : "Custo/g Médio: —"}
          </span>
        </div>
      </article>
    </section>
  );
}
