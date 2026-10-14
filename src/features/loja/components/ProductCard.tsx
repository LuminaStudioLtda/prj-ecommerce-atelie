"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ImageIcon } from "lucide-react";
import { BADGE_STYLE_CLASS, COLOR_TONE_SWATCH_CLASS } from "@/features/loja/constants";
import type { Product } from "@/features/loja/types";
import { useFavorite } from "@/hooks/use-favorite";
import { formatPrice } from "@/lib/format-price";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { isFavorited, toggle: toggleFavorite } = useFavorite(product.id);

  return (
    <div className="relative overflow-hidden rounded-sm border border-border/60 bg-card">
      <button
        type="button"
        onClick={toggleFavorite}
        aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={isFavorited}
        className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-background"
      >
        <Heart
          className={isFavorited ? "size-3.5 text-primary" : "size-3.5 text-foreground"}
          aria-hidden="true"
          fill={isFavorited ? "currentColor" : "none"}
        />
      </button>
      <Link href={`/loja/${product.id}`} className="flex flex-col">
        <div className="relative flex aspect-[4/5] items-center justify-center bg-accent">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          ) : (
            <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
          )}
          {product.badge ? (
            <span
              className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[9px] font-medium tracking-wider uppercase ${BADGE_STYLE_CLASS[product.badge]}`}
            >
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col items-center gap-1.5 px-4 pt-4 text-center">
          <p className="text-[9px] tracking-wider text-muted-foreground uppercase">
            {product.fiberDescription}
          </p>
          <p className="font-serif text-lg text-foreground">{product.name}</p>
          <p className="text-xs font-medium text-foreground">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <div className="flex justify-center gap-1.5 px-4 pt-2.5 pb-4">
        {product.colorTones.map((tone) => (
          <span
            key={tone}
            className={`size-2.5 rounded-full ${COLOR_TONE_SWATCH_CLASS[tone]}`}
            title={tone}
          />
        ))}
      </div>
    </div>
  );
}
