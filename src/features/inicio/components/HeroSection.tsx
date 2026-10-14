import Image from "next/image";
import { MaterialIcon } from "@/components/MaterialIcon";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface">
      <div className="mx-auto max-w-7xl px-margin py-space-xl lg:py-24">
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
          <div className="z-10 flex flex-col items-start lg:col-span-6">
            <div className="mb-space-md inline-flex items-center gap-space-xs rounded-[0.75rem] bg-surface-container px-space-md py-1.5 shadow-sm">
              <span className="size-2 animate-pulse rounded-[0.75rem] bg-primary" />
              <span className="text-label-sm font-semibold tracking-wider text-tertiary uppercase">
                Nova Coleção de Outono • Lote 04
              </span>
            </div>
            <h1 className="mb-space-md font-headline text-display-lg leading-none tracking-tight text-on-surface">
              Arte que Acolhe.
              <br />
              <span className="font-headline font-normal text-primary italic">Aromas que Marcam.</span>
            </h1>
            <p className="mb-space-lg max-w-lg text-body-lg text-on-surface-variant">
              Sousplats, bolsas, amigurumis, velas e tapetes feitos à mão em pequenos lotes, com o ritmo calmo e a sensibilidade de quem cria cada peça com afeto.
            </p>
            <div className="mb-space-xl flex flex-wrap items-center gap-space-md">
              <a
                href="#mais-amados"
                className="inline-flex items-center justify-center gap-space-xs rounded-[0.25rem] bg-primary px-8 py-3.5 text-label-lg text-on-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container"
              >
                <span>Explorar Coleção</span>
                <MaterialIcon name="arrow_forward" className="text-[18px]" />
              </a>
              <a
                href="#categorias"
                className="inline-flex items-center justify-center gap-space-xs rounded-[0.25rem] bg-surface-container-lowest/80 px-7 py-3.5 text-label-lg text-on-surface shadow-sm transition-all duration-300 hover:bg-surface-container-lowest hover:text-primary"
              >
                <MaterialIcon name="spa" className="text-[18px]" />
                <span>Conhecer o Ateliê</span>
              </a>
            </div>
            <div className="grid w-full max-w-lg grid-cols-3 gap-space-md border-t border-outline-variant/30 pt-space-md">
              <div className="flex flex-col">
                <span className="font-headline text-headline-sm text-primary">7</span>
                <span className="text-label-sm text-on-surface-variant">Categorias de Peças</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-headline-sm text-secondary">Autoral</span>
                <span className="text-label-sm text-on-surface-variant">Design &amp; Pontos</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-headline-sm text-tertiary">Feito</span>
                <span className="text-label-sm text-on-surface-variant">à Mão com Afeto</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-6">
            <div className="pointer-events-none absolute -top-12 -right-12 size-96 rounded-[0.75rem] bg-primary-fixed/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 size-80 rounded-[0.75rem] bg-secondary-container/40 blur-3xl" />
            <div className="relative w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-surface-container-high shadow-2xl">
                <Image
                  src="/inicio/hero.jpg"
                  alt="Vela artesanal em pote âmbar ao lado de descansos de copo em crochê e eucalipto seco."
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/50 via-transparent to-transparent" />
                <div className="absolute right-space-md bottom-space-md left-space-md flex items-center justify-between rounded-[0.5rem] bg-surface-container-lowest/95 p-space-md shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex size-10 items-center justify-center rounded-[0.75rem] bg-secondary-container text-secondary">
                      <MaterialIcon name="local_florist" className="text-[20px]" />
                    </div>
                    <div>
                      <p className="text-label-md leading-tight font-semibold text-on-surface">Vela Canela &amp; Figo Silvestre</p>
                      <p className="text-body-sm leading-tight text-outline">Pavio de madeira de reflorestamento</p>
                    </div>
                  </div>
                  <span className="font-headline text-headline-sm font-bold text-primary">R$ 79,90</span>
                </div>
              </div>
              <div
                className="absolute -bottom-6 -left-8 hidden max-w-xs animate-bounce items-center gap-space-sm rounded-[0.5rem] bg-surface-container-lowest p-space-md shadow-xl sm:flex"
                style={{ animationDuration: "4s" }}
              >
                <div className="flex size-9 items-center justify-center rounded-[0.75rem] bg-primary text-on-primary">
                  <MaterialIcon name="favorite" className="text-[20px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-label-sm text-outline">Feito com Afeto</span>
                  <span className="text-label-md font-semibold text-on-surface">+1.400 lares aquecidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
