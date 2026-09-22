import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

const PLACEHOLDER_NAV_LINKS = ["Loja", "Coleções", "Sob Medida", "Sobre", "Contato"];

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="bg-primary/10 px-4 py-2 text-center text-xs font-medium tracking-wide text-primary">
        FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 350 • PEÇAS FEITAS À MÃO SOB DEMANDA
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
        <Link href="/home" className="font-serif text-2xl italic text-foreground">
          Ateliê
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/home" className="text-foreground hover:text-primary">
            Início
          </Link>
          {PLACEHOLDER_NAV_LINKS.map((label) => (
            <span key={label} className="text-muted-foreground">
              {label}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Search className="size-5 text-foreground" aria-label="Buscar" />
          <Heart className="size-5 text-foreground" aria-label="Favoritos" />
          <div className="relative">
            <ShoppingBag className="size-5 text-foreground" aria-label="Carrinho" />
            <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              0
            </span>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="size-4" aria-label="Conta" />
          </div>
        </div>
      </div>
    </header>
  );
}
