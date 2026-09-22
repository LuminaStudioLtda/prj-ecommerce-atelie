import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", href: "/inicio" },
  { label: "Loja", href: "/loja" },
  { label: "Coleções", href: "/colecoes" },
  { label: "Sob Medida", href: "/sob-medida" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="bg-primary/10 px-4 py-2 text-center text-xs font-medium tracking-wide text-primary">
        FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 350 • PEÇAS FEITAS À MÃO SOB DEMANDA
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
        <Link href="/inicio" className="font-serif text-2xl italic text-foreground">
          Ateliê
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className="text-foreground hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Search className="size-5 text-foreground" role="img" aria-label="Buscar" />
          <Link href="/favoritos" aria-label="Favoritos">
            <Heart className="size-5 text-foreground" aria-hidden="true" />
          </Link>
          <Link href="/carrinho" className="relative" aria-label="Carrinho">
            <ShoppingBag className="size-5 text-foreground" aria-hidden="true" />
            <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              0
            </span>
          </Link>
          <Link
            href="/perfil"
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Perfil"
          >
            <User className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
