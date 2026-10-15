import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/MaterialIcon";
import { NewsletterForm } from "@/features/inicio/components/NewsletterForm";
import { FOOTER_CARE_LINKS, FOOTER_NAVIGATION_LINKS } from "@/features/inicio/constants";
import { FAQ_HREF, SOCIAL_LINKS } from "@/lib/social-links";

const LINK_CLASS = "text-body-sm text-on-surface-variant transition-colors hover:text-primary";
const SOCIAL_CLASS =
  "flex size-8 items-center justify-center rounded-[0.5rem] bg-surface-container transition-colors hover:bg-primary hover:text-on-primary";

export function InicioFooter() {
  return (
    <footer className="mt-space-xl w-full bg-surface-container-low pt-space-xl pb-space-lg text-on-surface">
      <div className="mx-auto max-w-7xl px-margin">
        <div className="mb-space-xl flex flex-col items-center justify-between gap-space-lg rounded-[0.5rem] bg-surface-container-lowest p-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] md:flex-row">
          <div className="max-w-md">
            <div className="mb-space-xs flex items-center gap-space-xs text-label-sm tracking-wider text-primary uppercase">
              <MaterialIcon name="mail" className="text-[16px]" />
              <span>Cartas de Afeto &amp; Descontos</span>
            </div>
            <h4 className="mb-space-xs font-headline text-headline-sm text-on-surface">Receba novidades do ateliê</h4>
            <p className="text-body-sm text-on-surface-variant">
              Inscreva-se para lançamentos de pequenos lotes, receitas aromáticas e ganhe 10% OFF na primeira compra.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 gap-space-xl border-b border-surface-container-highest pb-space-xl md:grid-cols-4">
          <div className="flex flex-col gap-space-md md:col-span-1">
            <div className="flex items-center gap-space-sm">
              <Image src="/inicio/logo.png" alt="Logo Fio de Afeto" width={120} height={32} className="h-8 w-auto object-contain" />
              <span className="font-headline text-headline-sm text-on-surface">Fio de Afeto</span>
            </div>
            <p className="text-body-sm text-on-surface-variant italic">
              &ldquo;Fio de Afeto — Cada ponto e cada chama carregam intenção e afeto.&rdquo;
            </p>
            <p className="text-body-sm text-on-surface-variant">
              Ateliê independente dedicado ao cultivo de peças com alma para acolher o lar e o espírito.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs text-primary">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram"
                className={SOCIAL_CLASS}
              >
                <MaterialIcon name="photo_camera" className="text-[18px]" />
              </a>
              <a
                href={SOCIAL_LINKS.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                title="Pinterest"
                aria-label="Pinterest"
                className={SOCIAL_CLASS}
              >
                <MaterialIcon name="push_pin" className="text-[18px]" />
              </a>
              <Link href="/contato" title="Fale conosco" aria-label="Fale conosco" className={SOCIAL_CLASS}>
                <MaterialIcon name="chat" className="text-[18px]" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h5 className="mb-space-xs text-label-lg tracking-wider text-on-surface uppercase">Navegação</h5>
            {FOOTER_NAVIGATION_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className={LINK_CLASS}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-space-sm">
            <h5 className="mb-space-xs text-label-lg tracking-wider text-on-surface uppercase">Cuidado &amp; Informação</h5>
            {FOOTER_CARE_LINKS.map((label) => (
              <Link key={label} href={FAQ_HREF} className={LINK_CLASS}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-space-md">
            <h5 className="text-label-lg tracking-wider text-on-surface uppercase">Pagamento Seguro</h5>
            <div className="flex flex-wrap gap-space-xs">
              <span className="rounded-[0.125rem] border border-outline-variant/40 bg-surface px-space-sm py-1 text-label-sm font-semibold text-secondary">Pix (5% OFF)</span>
              <span className="rounded-[0.125rem] border border-outline-variant/40 bg-surface px-space-sm py-1 text-label-sm font-semibold text-on-surface-variant">Cartão até 12x</span>
              <span className="rounded-[0.125rem] border border-outline-variant/40 bg-surface px-space-sm py-1 text-label-sm font-semibold text-on-surface-variant">Boleto Bancário</span>
            </div>
            <h5 className="mt-space-xs text-label-lg tracking-wider text-on-surface uppercase">Segurança &amp; Sustentabilidade</h5>
            <div className="flex items-center gap-space-md text-label-sm text-on-surface-variant">
              <div className="flex items-center gap-space-xs text-secondary">
                <MaterialIcon name="lock" className="text-[18px]" />
                <span>SSL 256-Bit</span>
              </div>
              <div className="flex items-center gap-space-xs text-secondary">
                <MaterialIcon name="recycling" className="text-[18px]" />
                <span>Embalagem Afetiva</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-space-sm pt-space-md text-body-sm text-outline md:flex-row">
          <p>© 2025 Fio de Afeto Ateliê Artesanal. Todos os direitos reservados. CNPJ 00.000.000/0001-00.</p>
          <div className="flex items-center gap-space-md">
            <Link href="/contato" className="transition-colors hover:text-primary">Termos de Uso</Link>
            <Link href="/contato" className="transition-colors hover:text-primary">Privacidade</Link>
            <Link href="/contato" className="transition-colors hover:text-primary">Atendimento</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
