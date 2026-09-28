"use client";

import { AcessoriosSection } from "@/features/insumos/components/AcessoriosSection";
import { CadastrarInsumoDialog } from "@/features/insumos/components/CadastrarInsumoDialog";
import { FichaTecnicaSyncFooter } from "@/features/insumos/components/FichaTecnicaSyncFooter";
import { InsumoKpiCards } from "@/features/insumos/components/InsumoKpiCards";
import { InventoryTable } from "@/features/insumos/components/InventoryTable";
import { useInsumosMockStore } from "@/features/insumos/hooks/use-insumos-mock-store";
import type { AcessorioEmEstoque, InsumoEmEstoque } from "@/features/insumos/types";

type GestaoDeInsumosViewProps = {
  insumosIniciais: InsumoEmEstoque[];
  acessoriosIniciais: AcessorioEmEstoque[];
};

/**
 * Único ponto com estado mutável da tela: guarda insumos/acessórios em memória (React
 * state) a partir dos dados de exemplo do service, para que cadastrar um insumo ou um
 * acessório atualize KPIs, tabela e cartões na hora — sem banco de dados nem API. Não
 * sobrevive a um recarregar de página; isso é esperado enquanto a Trilha 0 não existe.
 */
export function GestaoDeInsumosView({
  insumosIniciais,
  acessoriosIniciais,
}: GestaoDeInsumosViewProps) {
  const { insumos, acessorios, kpis, adicionarInsumo, adicionarAcessorio } = useInsumosMockStore(
    insumosIniciais,
    acessoriosIniciais,
  );

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-terracotta uppercase">
            Estoque de Fibras &amp; Aviamentos · Ciclo Outono / Inverno
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Almoxarifado &amp; Insumos Têxteis
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Rastreabilidade meticulosa de cones, novelos e acabamentos artesanais com cálculo
            milimétrico de custo por grama.
          </p>
        </div>
        <CadastrarInsumoDialog onRegistrar={adicionarInsumo} />
      </header>

      <InsumoKpiCards kpis={kpis} />
      <InventoryTable insumos={insumos} />
      <AcessoriosSection acessorios={acessorios} onAdicionar={adicionarAcessorio} />
      <FichaTecnicaSyncFooter insumos={insumos} acessorios={acessorios} />
    </div>
  );
}
