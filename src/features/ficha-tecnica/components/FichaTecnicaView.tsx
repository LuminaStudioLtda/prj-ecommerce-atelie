"use client";

import { AcoesDaFichaBar } from "@/features/ficha-tecnica/components/AcoesDaFichaBar";
import { DadosDoProdutoSection } from "@/features/ficha-tecnica/components/DadosDoProdutoSection";
import { MaoDeObraSection } from "@/features/ficha-tecnica/components/MaoDeObraSection";
import { MotorDePrecificacao } from "@/features/ficha-tecnica/components/MotorDePrecificacao";
import { PublicationStatusSelect } from "@/features/ficha-tecnica/components/PublicationStatusSelect";
import { ReceitaTecnicaSection } from "@/features/ficha-tecnica/components/ReceitaTecnicaSection";
import { useFichaTecnicaForm } from "@/features/ficha-tecnica/hooks/use-ficha-tecnica-form";
import type { ConfiguracaoDePrecificacao } from "@/features/ficha-tecnica/services/precificacao";
import type { ItemDoCatalogo } from "@/features/ficha-tecnica/types";

type FichaTecnicaViewProps = {
  catalogo: ItemDoCatalogo[];
  configuracao: ConfiguracaoDePrecificacao;
};

export function FichaTecnicaView({ catalogo, configuracao }: FichaTecnicaViewProps) {
  const form = useFichaTecnicaForm(catalogo, configuracao);
  const { valores, erros, precificacao, alterarCampo } = form;

  return (
    <div className="flex flex-col gap-8 pb-40 sm:pb-24">
      <header className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-terracotta uppercase">
            Motor de fórmulas &amp; modelagem
          </span>
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Criar / editar peça autoral
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Defina a composição física, o rendimento dos novelos, as horas de tecitura e o
            algoritmo de precificação inteligente.
          </p>
        </div>
        <PublicationStatusSelect
          valor={valores.status}
          destaque={valores.destaqueNaVitrine}
          onAlterarStatus={(status) => alterarCampo("status", status)}
          onAlterarDestaque={(destaque) => alterarCampo("destaqueNaVitrine", destaque)}
        />
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-start">
        <div className="flex flex-col gap-6">
          <DadosDoProdutoSection
            valores={valores}
            erros={erros}
            fotos={form.fotos}
            onAlterar={alterarCampo}
          />
          <ReceitaTecnicaSection
            catalogo={catalogo}
            itens={valores.itens}
            linhas={form.linhas}
            custoInsumos={form.custoInsumos}
            erro={erros.itens}
            onAdicionar={form.adicionarItem}
            onAlterarQuantidade={form.alterarQuantidade}
            onRemover={form.removerItem}
          />
          <MaoDeObraSection
            valores={valores}
            erro={erros.tempo}
            valorHora={configuracao.valorHoraTrabalhada}
            custoMaoDeObra={precificacao.custoMaoDeObra}
            onAlterar={alterarCampo}
          />
        </div>

        <aside className="xl:sticky xl:top-24">
          <MotorDePrecificacao
            valores={valores}
            erros={erros}
            resultado={precificacao}
            configuracao={configuracao}
            onAlterar={alterarCampo}
          />
        </aside>
      </div>

      <AcoesDaFichaBar
        ultimaAcao={form.ultimaAcao}
        onSalvarRascunho={form.salvarRascunho}
        onPublicar={form.publicar}
      />
    </div>
  );
}
