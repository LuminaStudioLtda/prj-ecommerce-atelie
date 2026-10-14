import { ChevronDown, ClipboardList, Hourglass, Palette, Scissors } from "lucide-react";

type ProductManifestoProps = {
  productName: string;
  fiberDescription: string;
};

const DETAIL_SECTIONS = [
  {
    Icon: Palette,
    title: "Tingimento Botânico & Origem Sustentável",
    body: "Os fios são tingidos com pigmentos de origem vegetal em pequenos lotes, reduzindo o consumo de água e preservando a maciez natural da fibra.",
  },
  {
    Icon: ClipboardList,
    title: "Composição & Especificações Técnicas",
    body: null,
  },
  {
    Icon: Hourglass,
    title: "Guia de Longevidade & Lavagem",
    body: "Lave à mão em água fria com sabão neutro, seque na horizontal à sombra e guarde dobrada para preservar o caimento dos pontos.",
  },
];

export function ProductManifesto({ productName, fiberDescription }: ProductManifestoProps) {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:px-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Manifesto Têxtil
          </p>
          <h2 className="font-serif text-2xl leading-snug text-foreground md:text-3xl">
            A respiração do fio natural e o tempo das mãos
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Diferente da produção mecanizada que traciona e tensiona o tecido, o crochê não pode
            ser emulado por nenhuma máquina industrial existente. Cada laçada de {productName} é
            tecida individualmente com agulhas de bambu polidas com cera de abelha, respeitando a
            flexibilidade e a alma da fibra.
          </p>
          <div className="mt-2 flex items-start gap-4 rounded-sm bg-background p-4">
            <Scissors className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-medium text-foreground">Ponto Concha Relevada</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Geometria anatômica desenvolvida pelo ateliê para equilibrar retenção térmica e
                ventilação natural da derme.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 self-start">
          {DETAIL_SECTIONS.map(({ Icon, title, body }) => (
            <details key={title} className="group rounded-sm border border-border bg-background">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3 font-serif text-sm text-foreground">
                  <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                  {title}
                </span>
                <ChevronDown
                  className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground">
                {body ?? `Composição: ${fiberDescription}. Confeccionado à mão, peça a peça.`}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
