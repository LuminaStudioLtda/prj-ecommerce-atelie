"use client";

import { useState, type ReactNode } from "react";
import { LeafIcon, MenuIcon, UserRoundIcon } from "lucide-react";
import { AdminLogo, AdminNav } from "@/components/AdminNav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type AdminShellProps = {
  children: ReactNode;
  /**
   * Operador autenticado. Estático até a Trilha 1 (autenticação) entregar
   * `store/use-session-store.ts`; então isto passa a vir da sessão real.
   */
  operador?: { nome: string; papel: string };
};

const OPERADOR_PADRAO = { nome: "Dona Clarice", papel: "Mestra Artesã / Admin" };

export function AdminShell({ children, operador = OPERADOR_PADRAO }: AdminShellProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col gap-6 border-r border-border bg-surface px-4 py-6 lg:flex">
        <AdminLogo />
        <AdminNav />
      </aside>

      <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
        <SheetContent side="left" className="w-72 gap-6 px-4 py-6">
          <SheetHeader className="p-0">
            <SheetTitle className="sr-only">Menu do admin</SheetTitle>
            <AdminLogo />
          </SheetHeader>
          <AdminNav />
        </SheetContent>
      </Sheet>

      <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-surface/85 px-4 backdrop-blur-xl lg:left-72 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuAberto(true)}
          >
            <MenuIcon aria-hidden="true" />
            <span className="sr-only">Abrir menu</span>
          </Button>
          <div className="hidden items-center gap-2 rounded-full bg-sage/15 px-3 py-1.5 text-xs font-semibold text-[#5c6b47] sm:flex">
            <LeafIcon className="size-4" aria-hidden="true" />
            Ateliê Sustentável &amp; Feito à Mão
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden flex-col text-right leading-tight sm:flex">
            <span className="text-sm font-semibold text-ink">{operador.nome}</span>
            <span className="text-xs text-muted-foreground">{operador.papel}</span>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-terracotta text-surface">
            <UserRoundIcon className="size-4" aria-hidden="true" />
          </div>
        </div>
      </header>

      <main className="px-4 pt-20 pb-8 lg:pt-24 lg:pr-8 lg:pb-10 lg:pl-[19rem]">
        {children}
      </main>
    </div>
  );
}
