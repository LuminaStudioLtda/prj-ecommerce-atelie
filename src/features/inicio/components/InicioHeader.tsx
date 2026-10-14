"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/MaterialIcon";
import { HEADER_NAV_LINKS } from "@/features/inicio/constants";
import { useCartStore } from "@/store/use-cart-store";

export function InicioHeader() {
  const pathname = usePathname();
  const cartItemCount = useCartStore((state) => state.itemCount);

  return (
    <header className="sticky top-0 z-50 bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="bg-surface-container-high text-label-sm text-on-surface-variant">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-margin">
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs text-secondary">
              <MaterialIcon name="local_shipping" className="text-[14px]" />
              <span>Frete grátis em pedidos acima de R$ 199</span>
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-medium text-primary">Cupom 10% OFF: BEMVINDOAFETO</span>
            <span className="text-outline-variant">•</span>
            <span className="text-secondary">Feito à mão no Brasil</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-space-lg px-margin">
        <Link href="/inicio" className="flex items-center gap-space-md">
          <Image src="/inicio/logo.png" alt="Logo Fio de Afeto" width={120} height={32} className="h-8 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-headline text-headline-sm leading-none tracking-tight text-on-surface">Fio de Afeto</span>
            <span className="mt-0.5 text-label-sm tracking-widest text-secondary uppercase">Ateliê &amp; Décor Afetivo</span>
          </div>
        </Link>

        <div className="mx-space-md max-w-lg flex-1">
          <div className="relative flex w-full items-center">
            <MaterialIcon name="search" className="pointer-events-none absolute left-space-md text-[20px] text-outline" />
            <input
              type="text"
              aria-label="Buscar produtos"
              placeholder="Buscar sousplats, bolsas, amigurumis, velas..."
              className="w-full rounded-[0.5rem] border border-outline-variant/40 bg-surface-container-low py-2.5 pr-space-md pl-11 text-body-sm text-on-surface transition-all placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-space-md">
          <Link
            href="/favoritos"
            title="Lista de Desejos"
            className="relative flex items-center justify-center rounded-[0.5rem] p-2 text-on-surface-variant transition-all hover:bg-surface-container-low hover:text-primary"
          >
            <MaterialIcon name="favorite" className="text-[24px]" />
          </Link>
          <Link
            href="/perfil"
            title="Minha Conta"
            className="flex items-center gap-space-xs rounded-[0.5rem] p-2 text-on-surface-variant transition-all hover:bg-surface-container-low hover:text-primary"
          >
            <div className="flex size-8 items-center justify-center rounded-[0.75rem] bg-primary">
              <MaterialIcon name="person" className="text-[18px] text-on-primary" />
            </div>
            <div className="hidden flex-col text-left xl:flex">
              <span className="text-label-sm leading-tight text-outline">Olá, Entre</span>
              <span className="text-label-sm leading-tight font-semibold text-on-surface">Minha Conta</span>
            </div>
          </Link>
          <Link
            href="/carrinho"
            className="flex items-center gap-space-sm rounded-[0.5rem] bg-primary px-space-md py-2.5 text-on-primary shadow-sm transition-all hover:bg-primary-container"
          >
            <MaterialIcon name="shopping_bag" className="text-[22px]" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] leading-tight font-semibold tracking-wider text-primary-fixed uppercase">Sacola</span>
              <span className="text-label-md leading-tight font-bold">
                {cartItemCount === 0 ? "Vazia" : cartItemCount === 1 ? "1 item" : `${cartItemCount} itens`}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="border-y border-surface-container-high/60 bg-surface-container-lowest/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-margin">
          <nav aria-label="Principal" className="flex items-center justify-between py-2">
            <div className="flex items-center gap-space-md">
              {HEADER_NAV_LINKS.map(({ label, href }) => {
                const isActive = label === "Início" && pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={
                      isActive
                        ? "rounded-[0.25rem] bg-primary-container px-space-sm py-1.5 text-label-md font-bold text-on-primary-container"
                        : "px-space-sm py-1.5 text-label-md text-on-surface-variant transition-colors hover:text-primary"
                    }
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
