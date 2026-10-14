import Link from "next/link";
import { Camera, Mail, Palette } from "lucide-react";
import { FooterNewsletterForm } from "@/components/footer-newsletter-form";

const FOOTER_COLUMNS = [
  {
    title: "Navegação & Coleções",
    links: [
      { label: "Lançamentos Sazonais", href: "/loja" },
      { label: "Vestuário em Linho & Algodão", href: "/loja" },
      { label: "Acessórios & Bolsas", href: "/loja" },
      { label: "Encomendas Especiais", href: "/sob-medida" },
      { label: "Guia de Fios e Cuidados", href: "/sobre" },
    ],
  },
  {
    title: "Atendimento & Suporte",
    links: [
      { label: "Fale com o Ateliê", href: "/contato" },
      { label: "Prazos de Produção & Frete", href: "/contato" },
      { label: "Trocas e Ajustes Manuais", href: "/contato" },
      { label: "Política de Sustentabilidade", href: "/sobre" },
      { label: "Perguntas Frequentes", href: "/contato" },
    ],
  },
];

const LEGAL_LINKS = ["Privacidade", "Termos do Ateliê", "Transparência Ecológica"];

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low">
      <div className="mx-auto w-full max-w-7xl px-6 pt-14 pb-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-3">
            <p className="font-serif text-xl text-primary">Stitch &amp; Soul</p>
            <p className="max-w-56 text-[11px] leading-relaxed text-muted-foreground">
              Celebrando o ritmo do artesanato consciente. Peças em crochê e afeto manual,
              concebidas com fios naturais e sobriedade contemporânea.
            </p>
            <p className="mt-2 text-[9px] tracking-wider text-muted-foreground uppercase">
              Slow Craft • Ateliê Autoral
            </p>
          </div>

          {FOOTER_COLUMNS.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-3">
              <p className="text-[9px] font-medium tracking-wider text-muted-foreground uppercase">
                {title}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[11px] text-foreground transition-colors hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <p className="text-[9px] font-medium tracking-wider text-muted-foreground uppercase">
              Jornal do Ateliê
            </p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Receba ensaios sobre criação têxtil e lançamentos em lotes limitados.
            </p>
            <FooterNewsletterForm />
            <div className="flex items-center gap-3 text-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-primary">
                <Camera className="size-4" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Pinterest" className="hover:text-primary">
                <Palette className="size-4" aria-hidden="true" />
              </a>
              <a href="#" aria-label="E-mail" className="hover:text-primary">
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-5 text-[9px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2025 Stitch &amp; Soul Ateliê. Todos os direitos reservados. Feito à mão no Brasil.</p>
          <ul className="flex flex-wrap gap-5">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-primary">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
