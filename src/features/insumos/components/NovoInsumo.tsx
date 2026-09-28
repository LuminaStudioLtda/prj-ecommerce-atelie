"use client";

import { useState } from "react";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsumoForm } from "@/features/insumos/components/InsumoForm";
import {
  SUFIXO_CUSTO,
  calcularCustoUnitario,
  formatarCustoUnitario,
} from "@/features/insumos/services/insumo-custo";
import { ROTULO_CATEGORIA, type InsumoInput } from "@/features/insumos/types";

type NovoInsumoProps = {
  /** Quando informado, mostra um botão "Fechar" ao lado das ações (ex.: dentro de um modal). */
  onFechar?: () => void;
  /** Chamado com o insumo validado, para que a tela que hospeda o formulário o inclua na lista mocada. */
  onRegistrar?: (insumo: InsumoInput) => void;
};

export function NovoInsumo({ onFechar, onRegistrar }: NovoInsumoProps) {
  const [registrado, setRegistrado] = useState<InsumoInput | null>(null);
  const [tentativa, setTentativa] = useState(0);

  function registrar(insumo: InsumoInput) {
    setRegistrado(insumo);
    onRegistrar?.(insumo);
  }

  function cadastrarOutro() {
    setRegistrado(null);
    setTentativa((atual) => atual + 1);
  }

  if (registrado) {
    return (
      <ResumoDoRegistro insumo={registrado} onCadastrarOutro={cadastrarOutro} onFechar={onFechar} />
    );
  }

  return <InsumoForm key={tentativa} onSubmit={registrar} onCancel={onFechar} />;
}

type ResumoDoRegistroProps = {
  insumo: InsumoInput;
  onCadastrarOutro: () => void;
  onFechar?: () => void;
};

function ResumoDoRegistro({ insumo, onCadastrarOutro, onFechar }: ResumoDoRegistroProps) {
  const custo = calcularCustoUnitario(insumo);

  return (
    <section
      role="status"
      aria-labelledby="resumo-insumo-titulo"
      className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-5 md:p-8"
    >
      <header className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-canvas text-terracotta">
          <CircleCheckIcon className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 id="resumo-insumo-titulo" className="text-lg leading-tight font-semibold text-ink">
            Insumo adicionado
          </h2>
          <p className="text-sm text-muted-foreground">
            Já aparece na tabela abaixo. Como o banco de dados ainda não existe, isto é um
            dado de demonstração e não sobrevive a um recarregar da página.
          </p>
        </div>
      </header>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
        <Item rotulo="Categoria" valor={ROTULO_CATEGORIA[insumo.categoria]} />
        <Item rotulo="SKU" valor={insumo.sku} mono />
        <Item rotulo="Nome comercial" valor={insumo.nomeComercial} />
        <Item rotulo="Marca" valor={insumo.marca || "—"} />
        <Item rotulo="Cor" valor={insumo.cor || "—"} />
        <Item rotulo="Lote" valor={insumo.lote} mono />
        <Item
          rotulo="Preço de aquisição"
          valor={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            insumo.precoAquisicao,
          )}
          mono
        />
        <Item
          rotulo="Custo unitário"
          valor={custo ? `R$ ${formatarCustoUnitario(custo.valor)} ${SUFIXO_CUSTO[custo.unidade]}` : "—"}
          mono
        />
      </dl>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onFechar ? (
          <Button
            type="button"
            variant="outline"
            onClick={onFechar}
            className="h-11 px-5 md:h-10"
          >
            Fechar
          </Button>
        ) : null}
        <Button
          type="button"
          onClick={onCadastrarOutro}
          className="h-11 px-5 text-xs font-semibold tracking-wider uppercase md:h-10"
        >
          Cadastrar outro insumo
        </Button>
      </div>
    </section>
  );
}

function Item({ rotulo, valor, mono = false }: { rotulo: string; valor: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {rotulo}
      </dt>
      <dd className={mono ? "font-mono text-ink" : "text-ink"}>{valor}</dd>
    </div>
  );
}
