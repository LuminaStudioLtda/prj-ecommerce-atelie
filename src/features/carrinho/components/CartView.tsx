"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ImageIcon, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  FREE_SHIPPING_THRESHOLD,
  getFreeShippingRemaining,
  getItemCount,
  getSubtotal,
} from "@/features/carrinho/services/cart-service";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/use-cart-store";

export function CartView() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  function handleCheckout() {
    clear();
    setIsOrderPlaced(true);
  }

  if (!hydrated) {
    return <div className="mx-auto min-h-96 w-full max-w-7xl px-6 py-10 md:px-12" aria-busy="true" />;
  }

  if (isOrderPlaced) {
    return (
      <div
        role="status"
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-6 py-24 text-center md:px-12"
      >
        <CheckCircle2 className="size-10 text-secondary" aria-hidden="true" />
        <h1 className="font-serif text-3xl text-foreground">Pedido recebido</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Esta é uma demonstração do fluxo de compra: nenhum pagamento foi processado e nenhum pedido
          foi gerado.
        </p>
        <Link
          href="/loja"
          className="rounded-sm bg-primary px-6 py-3 text-xs font-semibold tracking-wider text-primary-foreground uppercase"
        >
          Voltar à loja
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-6 py-24 text-center md:px-12">
        <ShoppingBag className="size-10 text-muted-foreground" aria-hidden="true" />
        <h1 className="font-serif text-3xl text-foreground">Sua sacola está vazia</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Escolha peças feitas à mão no catálogo e elas aparecem aqui.
        </p>
        <Link
          href="/loja"
          className="rounded-sm bg-primary px-6 py-3 text-xs font-semibold tracking-wider text-primary-foreground uppercase"
        >
          Explorar a loja
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal(items);
  const itemCount = getItemCount(items);
  const remaining = getFreeShippingRemaining(subtotal);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h1 className="font-serif text-3xl text-foreground">Sua Sacola</h1>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-muted-foreground underline-offset-4 hover:text-critical hover:underline"
        >
          Esvaziar sacola
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {items.map((item) => {
            const media = (
              <div className="relative flex aspect-[4/5] w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-accent">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                ) : (
                  <ImageIcon className="size-6 text-muted-foreground" aria-hidden="true" />
                )}
              </div>
            );
            return (
              <li key={item.key} className="flex gap-4 py-5">
                {item.href ? <Link href={item.href}>{media}</Link> : media}
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <p className="font-serif text-base text-foreground">{item.name}</p>
                      {item.tone || item.size ? (
                        <p className="text-xs text-muted-foreground">
                          {[item.tone, item.size ? `Tamanho ${item.size}` : null]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      ) : null}
                      <p className="text-xs text-muted-foreground">{formatPrice(item.price)} cada</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-sm border border-border bg-card">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.key, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                        className="flex size-10 items-center justify-center text-foreground disabled:opacity-40"
                      >
                        <Minus className="size-3" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-xs text-foreground" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.key, item.quantity + 1)}
                        aria-label={`Aumentar quantidade de ${item.name}`}
                        className="flex size-10 items-center justify-center text-foreground"
                      >
                        <Plus className="size-3" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remover ${item.name}`}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-critical"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="flex h-fit flex-col gap-4 rounded-sm border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground">Resumo</h2>
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})
              </dt>
              <dd className="text-foreground">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd className="text-foreground">
                {remaining === 0 ? "Grátis" : "Calculado no checkout"}
              </dd>
            </div>
          </dl>
          <p className="text-xs text-muted-foreground">
            {remaining === 0
              ? "Você ganhou frete grátis neste pedido."
              : `Faltam ${formatPrice(remaining)} para frete grátis (acima de ${formatPrice(FREE_SHIPPING_THRESHOLD)}).`}
          </p>
          <div className="flex justify-between border-t border-border pt-4 text-base font-medium text-foreground">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            className="h-11 rounded-sm bg-primary text-xs font-semibold tracking-wider text-primary-foreground uppercase transition-transform hover:bg-primary/90 active:scale-[0.98]"
          >
            Finalizar compra
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Demonstração: nenhum pagamento é processado.
          </p>
          <Link
            href="/loja"
            className="text-center text-xs text-primary underline-offset-4 hover:underline"
          >
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}
