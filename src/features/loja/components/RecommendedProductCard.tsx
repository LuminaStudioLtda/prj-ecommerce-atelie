"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ImageIcon } from "lucide-react";
import type { Product } from "@/features/loja/types";
import { useFavorite } from "@/hooks/use-favorite";
import { formatPrice } from "@/lib/format-price";

type RecommendedProductCardProps = {
  product: Product;
};

export function RecommendedProductCard({ product }: RecommendedProductCardProps) {
  const { isFavorited, toggle: toggleFavorite } = useFavorite(product.id);

  return (
    <div className="relative flex flex-col gap-2">
      <button
        type="button"
        onClick={toggleFavorite}
        aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        aria-pressed={isFavorited}
        className="absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full bg-background"
      >
        <Heart
          className={isFavorited ? "size-3.5 text-primary" : "size-3.5 text-foreground"}
          aria-hidden="true"
          fill={isFavorited ? "currentColor" : "none"}
        />
      </button>
      <Link href={`/loja/${product.id}`} className="flex flex-col gap-1.5">
        <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-accent">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 22vw, 45vw"
              className="object-cover"
            />
          ) : (
            <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <p className="mt-1 text-[9px] tracking-wider text-muted-foreground uppercase">
          {product.category}
        </p>
        <p className="font-serif text-sm text-foreground">{product.name}</p>
        <p className="text-[11px] font-medium text-foreground">{formatPrice(product.price)}</p>
      </Link>
    </div>
  );
}
