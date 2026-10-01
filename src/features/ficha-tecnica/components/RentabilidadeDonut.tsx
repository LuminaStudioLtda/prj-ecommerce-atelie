import { formatarMoeda, formatarPercentual } from "@/features/ficha-tecnica/services/precificacao";
import type { ResultadoDePrecificacao } from "@/features/ficha-tecnica/services/precificacao";

type RentabilidadeDonutProps = {
  resultado: ResultadoDePrecificacao;
};

const CIRCUNFERENCIA = 100;

/** Composição do preço final: custo direto, perdas e lucro limpo (lucro negativo vira 0 no gráfico). */
export function RentabilidadeDonut({ resultado }: RentabilidadeDonutProps) {
  const { precoFinal, custoDireto, valorPerdas, lucro, margemReal } = resultado;
  const lucroPositivo = Math.max(0, lucro);

  const fatias = [
    { rotulo: "Custo direto", valor: custoDireto, traco: "stroke-ink", ponto: "bg-ink" },
    { rotulo: "Taxa de perdas", valor: valorPerdas, traco: "stroke-ochre", ponto: "bg-ochre" },
    { rotulo: "Lucro limpo", valor: lucroPositivo, traco: "stroke-sage", ponto: "bg-sage" },
  ];
  const total = fatias.reduce((soma, fatia) => soma + fatia.valor, 0);

  let acumulado = 0;
  const arcos = fatias.map((fatia) => {
    const fracao = total > 0 ? (fatia.valor / total) * CIRCUNFERENCIA : 0;
    const arco = { ...fatia, fracao, deslocamento: -acumulado };
    acumulado += fracao;
    return arco;
  });

  return (
    <div className="flex items-center gap-5">
      <div className="relative size-28 shrink-0">
        <svg viewBox="0 0 36 36" className="size-full -rotate-90" role="img" aria-label="Composição do preço final">
          <circle cx="18" cy="18" r="15.9155" fill="none" strokeWidth="4" className="stroke-border" />
          {arcos.map((arco) =>
            arco.fracao > 0 ? (
              <circle
                key={arco.rotulo}
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                strokeWidth="4"
                pathLength={CIRCUNFERENCIA}
                strokeDasharray={`${arco.fracao} ${CIRCUNFERENCIA - arco.fracao}`}
                strokeDashoffset={arco.deslocamento}
                className={arco.traco}
              />
            ) : null,
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
          <span className="font-mono text-sm font-semibold text-ink">
            {precoFinal > 0 ? formatarPercentual(margemReal) : "—"}
          </span>
          <span className="text-[10px] text-muted-foreground">margem real</span>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-2 text-xs">
        {arcos.map((arco) => (
          <li key={arco.rotulo} className="flex flex-col gap-0.5">
            <span className="flex items-center gap-2 whitespace-nowrap text-muted-foreground">
              <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${arco.ponto}`} />
              {arco.rotulo}
            </span>
            <span className="pl-4.5 font-mono whitespace-nowrap text-ink">
              {formatarMoeda(arco.valor)}
              <span className="text-muted-foreground">
                {" "}
                · {precoFinal > 0 ? formatarPercentual(arco.valor / precoFinal) : "—"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
