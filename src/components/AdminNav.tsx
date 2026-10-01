"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BookOpenIcon,
  CalculatorIcon,
  LayoutDashboardIcon,
  Package2Icon,
  StoreIcon,
  TimerIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ItemDeNavegacao = {
  rotulo: string;
  icone: typeof LayoutDashboardIcon;
  href?: string;
};

/**
 * Seções do admin. Somente as que têm `href` já foram construídas; as demais
 * aparecem desabilitadas até suas trilhas (docs/TRILHAS_DESENVOLVIMENTO.md) saírem.
 */
const ITENS: ItemDeNavegacao[] = [
  { rotulo: "Dashboard Geral", icone: LayoutDashboardIcon },
  { rotulo: "Gestão de Insumos", icone: Package2Icon, href: "/admin/insumos" },
  { rotulo: "Receitas & Produtos", icone: BookOpenIcon, href: "/admin/receitas" },
  { rotulo: "Motor de Precificação", icone: CalculatorIcon },
  { rotulo: "Fila de Produção", icone: TimerIcon },
  { rotulo: "Catálogo & Vitrine", icone: StoreIcon },
  { rotulo: "Alertas de Estoque", icone: TriangleAlertIcon },
];

export function AdminNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {ITENS.map(({ rotulo, icone: Icone, href }) => {
        const ativo = href !== undefined && pathname.startsWith(href);

        if (!href) {
          return (
            <span
              key={rotulo}
              aria-disabled="true"
              title="Em breve"
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground/60"
            >
              <Icone className="size-5" aria-hidden="true" />
              {rotulo}
            </span>
          );
        }

        return (
          <Link
            key={rotulo}
            href={href}
            aria-current={ativo ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-canvas",
              ativo && "bg-terracotta/10 font-semibold text-terracotta hover:bg-terracotta/10",
            )}
          >
            <Icone className="size-5" aria-hidden="true" />
            {rotulo}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminLogo() {
  return (
    <div className="flex items-center gap-3 px-1">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-terracotta text-sm font-bold text-surface">
        S&amp;S
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-terracotta">Stitch &amp; Soul</span>
        <span className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
          Ateliê de Crochê
        </span>
      </div>
    </div>
  );
}
