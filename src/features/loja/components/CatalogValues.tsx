import { Hand, Leaf, Ruler } from "lucide-react";

const VALUES = [
  {
    Icon: Hand,
    title: "Produção 100% Manual",
    description:
      "Cada ponto é tecido por mestras artesãs com remuneração justa e tempo digno.",
  },
  {
    Icon: Leaf,
    title: "Tingimento Botânico",
    description:
      "Cores extraídas da casca de cebola, eucalipto e folhas nativas sem toxinas.",
  },
  {
    Icon: Ruler,
    title: "Ajustes Sob Medida",
    description:
      "Confeccionamos alterações especiais para que sua peça abrace seu corpo com perfeição.",
  },
];

export function CatalogValues() {
  return (
    <section className="mt-16 bg-surface-container-low">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 md:px-12">
        {VALUES.map(({ Icon, title, description }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-card">
              <Icon className="size-5 text-primary" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-serif text-sm text-foreground">{title}</h3>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
