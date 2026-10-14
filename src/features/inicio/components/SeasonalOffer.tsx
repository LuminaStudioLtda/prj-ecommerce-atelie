import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";

export function SeasonalOffer() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="mx-auto max-w-7xl px-margin">
        <div className="grid grid-cols-1 overflow-hidden rounded-[1rem] shadow-xl lg:grid-cols-12">
          <div className="relative flex flex-col items-start justify-center bg-primary p-space-xl text-on-primary lg:col-span-5">
            <div className="pointer-events-none absolute top-0 right-0 p-6 opacity-10">
              <MaterialIcon name="local_fire_department" className="text-[120px]" />
            </div>
            <div className="mb-space-md inline-flex items-center gap-space-xs rounded-[0.125rem] bg-primary-container px-space-sm py-1 text-label-sm tracking-wider text-primary-fixed uppercase">
              <MaterialIcon name="auto_awesome" className="text-[14px]" />
              <span>Edição Limitada de Temporada</span>
            </div>
            <h3 className="mb-space-sm font-headline text-headline-lg leading-tight font-medium text-on-primary">
              Até 20% OFF na Coleção Outono &amp; Aconchego
            </h3>
            <p className="mb-space-lg text-body-md text-primary-fixed">
              Kits presente unindo velas, sousplats e peças de home &amp; decor artesanais em tons terrosos. Calor e harmonia para os seus rituais em casa.
            </p>
            <div className="mb-space-lg flex items-baseline gap-space-sm">
              <span className="text-label-sm tracking-wider text-primary-fixed uppercase">Cupom no Carrinho:</span>
              <span className="rounded-[0.125rem] bg-surface px-space-sm py-1 text-label-md font-bold tracking-widest text-primary">OUTONOAFETO</span>
            </div>
            <Link
              href="/loja"
              className="rounded-[0.25rem] bg-surface px-8 py-3.5 text-label-lg text-primary shadow-md transition-all duration-300 hover:bg-surface-container-lowest hover:text-primary-container"
            >
              Ver Coleção Especial
            </Link>
          </div>
          <div className="relative min-h-[360px] lg:col-span-7 lg:min-h-full">
            <Image
              src="/inicio/oferta-outono.jpg"
              alt="Composição de outono com vela âmbar, xícara de crochê terracota e especiarias sobre mesa de madeira."
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/20 to-transparent" />
            <div className="absolute top-space-md right-space-md flex items-center gap-1 rounded-[0.75rem] bg-surface-container-lowest/90 px-space-md py-1.5 text-label-sm font-semibold text-secondary shadow-sm backdrop-blur-md">
              <MaterialIcon name="nest_clock_farsight_analog" className="text-[14px]" />
              <span>Disponível enquanto durar o lote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
