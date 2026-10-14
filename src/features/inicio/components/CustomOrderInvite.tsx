import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";

export function CustomOrderInvite() {
  return (
    <section className="w-full bg-surface py-space-xl">
      <div className="mx-auto max-w-7xl px-margin">
        <div className="relative overflow-hidden rounded-[1rem] bg-surface-container p-space-xl shadow-sm md:p-14">
          <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="text-label-sm font-semibold tracking-widest text-primary uppercase">Projetos Exclusivos &amp; Lembranças</span>
              <h2 className="mt-space-xs mb-space-md font-headline text-headline-lg font-normal text-on-surface">
                Sonha com peças sob medida para casamentos ou datas especiais?
              </h2>
              <p className="max-w-2xl text-body-lg text-on-surface-variant">
                Criamos lembrancinhas personalizadas em kits presente, amigurumis e velas exclusivos para celebrações, maternidade e projetos corporativos de bom gosto.
              </p>
            </div>
            <div className="flex flex-col gap-space-md sm:flex-row lg:col-span-4 lg:flex-col">
              <Link
                href="/sob-medida"
                className="inline-flex items-center justify-center gap-space-xs rounded-[0.25rem] bg-primary px-space-lg py-3.5 text-center text-label-lg text-on-primary shadow-md transition-all hover:bg-primary-container"
              >
                <MaterialIcon name="chat" className="text-[20px]" />
                <span>Falar via WhatsApp</span>
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-space-xs rounded-[0.25rem] bg-surface-container-lowest px-space-lg py-3.5 text-center text-label-lg text-on-surface shadow-sm transition-all hover:bg-surface"
              >
                <MaterialIcon name="download" className="text-[20px]" />
                <span>Baixar Catálogo Corporativo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
