import { ImageIcon } from "lucide-react";

type ProductArtisanProps = {
  productName: string;
};

export function ProductArtisan({ productName }: ProductArtisanProps) {
  return (
    <section className="bg-surface-container-low">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-12">
        <div className="grid overflow-hidden rounded-sm bg-background lg:grid-cols-2">
          <figure className="flex flex-col">
            <div className="flex min-h-72 flex-1 items-center justify-center bg-primary/20">
              <ImageIcon className="size-16 text-muted-foreground" aria-hidden="true" />
            </div>
            <figcaption className="bg-foreground px-6 py-4 text-background">
              <p className="text-[9px] font-medium tracking-wider uppercase">Mestra Crocheteira</p>
              <p className="font-serif text-lg">Dona Clarice Santana</p>
              <p className="text-[10px]">
                34 anos de prática têxtil manual • Serra Negra do Norte
              </p>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
            <p className="flex items-center gap-2 text-[9px] font-medium tracking-wider text-muted-foreground uppercase">
              <span className="size-2 rounded-full bg-border" aria-hidden="true" />
              Rastreabilidade Humana
            </p>
            <blockquote className="font-serif text-xl leading-snug text-foreground md:text-2xl">
              &ldquo;Cada ponto traz a calma de quem sabe que a beleza não tem pressa.&rdquo;
            </blockquote>
            <p className="text-xs leading-relaxed text-muted-foreground">
              O modelo {productName} foi desenhado em nosso estúdio e tecido pelas mãos experientes
              de Dona Clarice e de sua filha Mariana. Ao escolher essa peça, você remunera de forma
              justa o ofício artesanal e viabiliza a preservação de técnicas ancestrais passadas por
              três gerações.
            </p>
            <ul className="flex flex-col gap-2 text-[11px] text-foreground">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
                Pagamento 100% Acima do Piso
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                Selo de Autoria Assinado na Etiqueta
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
