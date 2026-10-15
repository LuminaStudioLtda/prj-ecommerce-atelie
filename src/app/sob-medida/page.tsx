import Image from "next/image";
import { MaterialIcon } from "@/components/MaterialIcon";
import { SiteHeader } from "@/components/site-header";
import { InicioFooter } from "@/features/inicio/components/InicioFooter";
import { CustomOrderForm } from "@/features/sob-medida/components/CustomOrderForm";
import { CUSTOM_ORDER_SHOWCASE, CUSTOM_ORDER_STEPS } from "@/features/sob-medida/constants";

export default function SobMedidaPage() {
  return (
    <div className="tema-inicio flex min-h-[100dvh] flex-1 flex-col bg-surface font-body text-body-md text-on-surface selection:bg-primary-fixed">
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col bg-surface">
        <section className="w-full bg-surface-container-low">
          <div className="mx-auto max-w-7xl px-margin py-space-xl lg:py-20">
            <span className="text-label-sm font-semibold tracking-widest text-primary uppercase">
              Projetos Exclusivos &amp; Lembranças
            </span>
            <h1 className="mt-space-xs mb-space-md max-w-3xl font-headline text-display-lg text-on-surface">
              Peças criadas <span className="text-primary italic">sob medida</span> para o seu momento.
            </h1>
            <p className="max-w-2xl text-body-lg text-on-surface-variant">
              Casamentos, maternidade, kits presente e projetos corporativos. Cada encomenda é desenhada
              com você e feita à mão, em pequenos lotes.
            </p>
          </div>
        </section>

        <section className="w-full bg-surface-container-lowest py-space-lg shadow-sm">
          <div className="mx-auto max-w-7xl px-margin">
            <ol className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
              {CUSTOM_ORDER_STEPS.map(({ icon, title, description }, index) => (
                <li key={title} className="flex items-start gap-space-sm">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[0.75rem] bg-surface-container-low text-primary shadow-sm">
                    <MaterialIcon name={icon} className="text-[24px]" />
                  </div>
                  <div>
                    <h2 className="text-label-lg font-semibold text-on-surface">
                      {index + 1}. {title}
                    </h2>
                    <p className="text-body-sm text-on-surface-variant">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="w-full py-space-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-space-xl px-margin lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="mb-space-xs font-headline text-headline-lg text-on-surface">
                Solicite um orçamento
              </h2>
              <p className="mb-space-lg max-w-xl text-body-md text-on-surface-variant">
                Quanto mais detalhes, melhor a nossa proposta. Respondemos por e-mail.
              </p>
              <div className="rounded-[1rem] bg-surface-container-lowest p-space-lg shadow-sm md:p-space-xl">
                <CustomOrderForm />
              </div>
            </div>

            <aside className="flex flex-col gap-space-md lg:col-span-5">
              <h2 className="font-headline text-headline-md text-on-surface">O que já criamos</h2>
              <div className="grid grid-cols-3 gap-space-sm">
                {CUSTOM_ORDER_SHOWCASE.map(({ title, image, imageAlt }) => (
                  <figure key={title} className="flex flex-col gap-space-xs">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[0.5rem] bg-surface-container-high">
                      <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        sizes="(min-width: 1024px) 14vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="text-label-md text-on-surface-variant">{title}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="text-body-sm text-on-surface-variant">
                O prazo e o valor dependem da peça, dos fios escolhidos e da quantidade, e são
                confirmados na proposta antes de qualquer pagamento.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <InicioFooter />
    </div>
  );
}
