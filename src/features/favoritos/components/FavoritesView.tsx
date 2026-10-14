"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ImageIcon } from "lucide-react";
import { resolveFavorites } from "@/features/favoritos/services/favorites-service";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/format-price";
import { useFavoritesStore } from "@/store/use-favorites-store";

export function FavoritesView() {
  const hydrated = useHydrated();
  const ids = useFavoritesStore((state) => state.ids);
  const toggle = useFavoritesStore((state) => state.toggle);

  if (!hydrated) {
    return <div className="mx-auto min-h-96 w-full max-w-7xl px-6 py-10 md:px-12" aria-busy="true" />;
  }

  const favorites = resolveFavorites(ids);

  if (favorites.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-6 py-24 text-center md:px-12">
        <Heart className="size-10 text-muted-foreground" aria-hidden="true" />
        <h1 className="font-serif text-3xl text-foreground">Nenhum favorito ainda</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Toque no coração de uma peça para guardá-la aqui.
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

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-12">
      <h1 className="mb-8 font-serif text-3xl text-foreground">Seus Favoritos</h1>
      <ul className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {favorites.map((entry) => {
          const media = (
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-accent">
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.name}
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
              )}
            </div>
          );
          const details = (
            <>
              <p className="mt-2 text-[10px] text-muted-foreground">{entry.subtitle}</p>
              <p className="font-serif text-sm text-foreground">{entry.name}</p>
              <p className="text-xs font-medium text-foreground">{formatPrice(entry.price)}</p>
            </>
          );
          return (
            <li key={entry.id} className="relative flex flex-col">
              <button
                type="button"
                onClick={() => toggle(entry.id)}
                aria-label={`Remover ${entry.name} dos favoritos`}
                className="absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full bg-background"
              >
                <Heart className="size-3.5 text-primary" fill="currentColor" aria-hidden="true" />
              </button>
              {entry.href ? (
                <Link href={entry.href} className="flex flex-col gap-0.5">
                  {media}
                  {details}
                </Link>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {media}
                  {details}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
