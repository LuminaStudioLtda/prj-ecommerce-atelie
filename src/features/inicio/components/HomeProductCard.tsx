"use client";

import Image from "next/image";
import { MaterialIcon } from "@/components/MaterialIcon";
import { BADGE_TONE_CLASS } from "@/features/inicio/constants";
import { formatPrice, getStarStates } from "@/features/inicio/services/home-service";
import type { HomeProduct, StarState } from "@/features/inicio/types";
import { useFavorite } from "@/hooks/use-favorite";
import { useCartStore } from "@/store/use-cart-store";

type HomeProductCardProps = {
  product: HomeProduct;
};

const STAR_ICON: Record<StarState, string> = {
  full: "star",
  half: "star_half",
  empty: "star",
};

export function HomeProductCard({ product }: HomeProductCardProps) {
  const { isFavorited, toggle: toggleFavorite } = useFavorite(product.id);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-[0.5rem] bg-surface-container-lowest shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          className={`absolute top-space-sm left-space-sm rounded-[0.125rem] px-space-sm py-1 text-label-sm font-semibold tracking-wider uppercase ${BADGE_TONE_CLASS[product.badgeTone]}`}
        >
          {product.badge}
        </span>
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorited ? "Remover dos favoritos" : "Favoritar"}
          aria-pressed={isFavorited}
          className="absolute top-space-sm right-space-sm flex size-9 items-center justify-center rounded-[0.75rem] bg-surface/90 text-on-surface shadow-sm transition-colors hover:bg-surface hover:text-primary"
        >
          <MaterialIcon name="favorite" filled={isFavorited} className="text-[18px]" />
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between p-space-md">
        <div>
          <div className="mb-1 flex items-center gap-space-xs">
            <div className="flex text-tertiary">
              {getStarStates(product.rating).map((state, index) => (
                <MaterialIcon
                  key={index}
                  name={STAR_ICON[state]}
                  filled={state !== "empty"}
                  className="text-[16px]"
                />
              ))}
            </div>
            <span className="text-label-sm text-outline">({product.reviewCount})</span>
          </div>
          <h3 className="font-headline text-headline-sm leading-snug font-medium text-on-surface transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mt-1 text-body-sm text-outline">{product.tagline}</p>
        </div>
        <div className="mt-space-md flex items-center justify-between border-t border-surface-container pt-space-sm">
          <div className="flex flex-col">
            <span className="text-label-sm leading-tight text-outline">Valor artesanal</span>
            <span className="font-headline text-headline-sm leading-tight font-bold text-on-surface">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, image: product.image }, 1)}
            className="flex items-center gap-1 rounded-[0.25rem] bg-primary px-space-md py-2 text-label-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
          >
            <MaterialIcon name="add_shopping_cart" className="text-[16px]" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
