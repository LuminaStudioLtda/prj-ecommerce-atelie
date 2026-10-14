"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useSessionStore } from "@/store/use-session-store";
import { useCartStore } from "@/store/use-cart-store";

const NAV_LINKS = [
  { label: "Início", href: "/inicio" },
  { label: "Loja", href: "/loja" },
  { label: "Coleções", href: "/colecoes" },
  { label: "Sob Medida", href: "/sob-medida" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const profileHref = isAuthenticated ? "/home" : "/perfil";
  const cartItemCount = useCartStore((state) => state.itemCount);

  return (
    <header className="w-full">
      <div className="bg-secondary px-4 py-2 text-center text-xs font-medium tracking-wide text-secondary-foreground">
        FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 350 • PEÇAS FEITAS À MÃO SOB DEMANDA
      </div>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
        <Link href="/inicio" className="font-serif text-2xl italic text-primary">
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
              {cartItemCount}
            </span>
          </Link>
          <Link
            href={profileHref}
            className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label={isAuthenticated ? "Minha conta" : "Perfil"}
          >
            <User className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
