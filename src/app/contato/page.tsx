import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/features/contato/components/ContactForm";
import { CONTACT_FAQ } from "@/features/contato/constants";
import { InicioFooter } from "@/features/inicio/components/InicioFooter";

export default function ContatoPage() {
  return (
    <div className="tema-inicio flex min-h-[100dvh] flex-1 flex-col bg-surface font-body text-body-md text-on-surface selection:bg-primary-fixed">
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col bg-surface">
        <section className="w-full bg-surface-container-low">
          <div className="mx-auto max-w-7xl px-margin py-space-xl lg:py-20">
            <span className="text-label-sm font-semibold tracking-widest text-primary uppercase">
              Atendimento
            </span>
            <h1 className="mt-space-xs mb-space-md max-w-3xl font-headline text-display-lg text-on-surface">
              Fale com o <span className="text-primary italic">ateliê.</span>
            </h1>
            <p className="max-w-2xl text-body-lg text-on-surface-variant">
              Dúvidas sobre uma peça, um pedido ou uma encomenda? Escreva e respondemos por e-mail.
            </p>
          </div>
        </section>

        <section className="w-full py-space-xl">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-space-xl px-margin lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="mb-space-lg font-headline text-headline-lg text-on-surface">
                Envie uma mensagem
              </h2>
              <div className="rounded-[1rem] bg-surface-container-lowest p-space-lg shadow-sm md:p-space-xl">
                <ContactForm />
              </div>
            </div>

            <aside className="flex flex-col gap-space-lg lg:col-span-5">
              <div className="rounded-[1rem] bg-surface-container p-space-lg">
                <div className="mb-space-sm flex size-12 items-center justify-center rounded-[0.75rem] bg-surface-container-lowest text-primary shadow-sm">
                  <MaterialIcon name="draw" className="text-[24px]" />
                </div>
                <h2 className="mb-space-xs font-headline text-headline-sm text-on-surface">
                  Quer uma peça exclusiva?
                </h2>
                <p className="mb-space-md text-body-sm text-on-surface-variant">
                  Para casamentos, lembranças e projetos corporativos, use o formulário de encomenda.
                </p>
                <Link
                  href="/sob-medida"
                  className="inline-flex items-center gap-space-xs text-label-lg text-primary transition-colors hover:text-primary-container"
                >
                  <span>Ir para Sob Medida</span>
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>

              <div id="faq" className="scroll-mt-40">
                <h2 className="mb-space-md font-headline text-headline-md text-on-surface">
                  Perguntas frequentes
                </h2>
                <div className="flex flex-col divide-y divide-outline-variant/40 border-y border-outline-variant/40">
                  {CONTACT_FAQ.map(({ question, answer }) => (
                    <details key={question} className="group py-space-md">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-space-md text-label-lg font-semibold text-on-surface marker:content-none">
                        {question}
                        <MaterialIcon
                          name="expand_more"
                          className="text-[20px] text-primary transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <p className="mt-space-sm text-body-sm text-on-surface-variant">{answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <InicioFooter />
    </div>
  );
}
