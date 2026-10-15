import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { SiteHeader } from "@/components/site-header";
import { InicioFooter } from "@/features/inicio/components/InicioFooter";
import { ABOUT_CRAFT_STEPS, ABOUT_PRINCIPLES } from "@/features/sobre/constants";

export default function SobrePage() {
  return (
    <div className="tema-inicio flex min-h-[100dvh] flex-1 flex-col bg-surface font-body text-body-md text-on-surface selection:bg-primary-fixed">
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col bg-surface">
        <section className="w-full bg-surface-container-low">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-gutter px-margin py-space-xl lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-6">
              <span className="text-label-sm font-semibold tracking-widest text-primary uppercase">
                Sobre o Ateliê
              </span>
              <h1 className="mt-space-xs mb-space-md font-headline text-display-lg text-on-surface">
                Cada ponto carrega <span className="text-primary italic">intenção e afeto.</span>
              </h1>
              <p className="max-w-lg text-body-lg text-on-surface-variant">
                O Fio de Afeto é um ateliê independente de crochê e velas artesanais. Criamos peças com
                alma para acolher o lar e o espírito, no ritmo calmo de quem faz à mão.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-surface-container-high shadow-xl">
                <Image
                  src="/inicio/hero.jpg"
                  alt="Vela artesanal em pote âmbar ao lado de descansos de copo em crochê e eucalipto seco."
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-space-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-space-xl px-margin lg:grid-cols-12">
            <h2 className="font-headline text-headline-lg text-on-surface lg:col-span-5">
              Slow craft: fazer devagar para durar mais.
            </h2>
            <div className="flex flex-col gap-space-md text-body-lg text-on-surface-variant lg:col-span-7">
              <p>
                Acreditamos que uma peça feita com tempo se nota no toque, na trama firme e no cuidado
                com o acabamento. Por isso trabalhamos em pequenos lotes e aceitamos encomendas sob
                medida.
              </p>
              <p>
                Do sousplat ao tapete, do amigurumi à vela aromática, cada item nasce no ateliê com fios
                naturais, pavio de madeira de reflorestamento e embalagem sem plástico.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface-container-lowest py-space-xl shadow-sm">
          <div className="mx-auto max-w-7xl px-margin">
            <h2 className="mb-space-lg font-headline text-headline-md text-on-surface">No que acreditamos</h2>
            <div className="grid grid-cols-1 gap-space-lg sm:grid-cols-2 lg:grid-cols-4">
              {ABOUT_PRINCIPLES.map(({ icon, iconClass, title, description }) => (
                <div key={title} className="flex flex-col gap-space-sm">
                  <div
                    className={`flex size-12 items-center justify-center rounded-[0.75rem] bg-surface-container-low shadow-sm ${iconClass}`}
                  >
                    <MaterialIcon name={icon} className="text-[24px]" />
                  </div>
                  <h3 className="text-label-lg font-semibold text-on-surface">{title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-space-xl">
          <div className="mx-auto max-w-7xl px-margin">
            <h2 className="mb-space-lg font-headline text-headline-md text-on-surface">Como uma peça nasce</h2>
            <ol className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-4">
              {ABOUT_CRAFT_STEPS.map(({ title, description }, index) => (
                <li key={title} className="border-t border-outline-variant/40 pt-space-md">
                  <span className="font-headline text-headline-sm text-primary">0{index + 1}</span>
                  <h3 className="mt-space-xs text-label-lg font-semibold text-on-surface">{title}</h3>
                  <p className="mt-space-xs text-body-sm text-on-surface-variant">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="w-full bg-surface py-space-xl">
          <div className="mx-auto max-w-7xl px-margin">
            <div className="flex flex-col items-start justify-between gap-space-lg rounded-[1rem] bg-surface-container p-space-xl md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="mb-space-xs font-headline text-headline-md text-on-surface">
                  Conheça as peças do ateliê
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Explore o catálogo ou peça algo feito especialmente para você.
                </p>
              </div>
              <div className="flex flex-col gap-space-sm sm:flex-row">
                <Link
                  href="/loja"
                  className="inline-flex items-center justify-center rounded-[0.25rem] bg-primary px-space-lg py-3.5 text-label-lg text-on-primary shadow-md transition-all hover:bg-primary-container"
                >
                  Ver catálogo
                </Link>
                <Link
                  href="/sob-medida"
                  className="inline-flex items-center justify-center rounded-[0.25rem] bg-surface-container-lowest px-space-lg py-3.5 text-label-lg text-on-surface shadow-sm transition-all hover:text-primary"
                >
                  Encomendar sob medida
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <InicioFooter />
    </div>
  );
}
