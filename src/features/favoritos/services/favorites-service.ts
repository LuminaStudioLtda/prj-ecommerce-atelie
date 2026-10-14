import { FEATURED_PRODUCTS } from "@/features/inicio/constants";
import { PRODUCTS } from "@/features/loja/services/product-service";

export type FavoriteEntry = {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  href?: string;
  image?: string;
};

const CATALOG: FavoriteEntry[] = [
  ...PRODUCTS.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    subtitle: product.fiberDescription,
    href: `/loja/${product.id}`,
    image: product.images?.[0],
  })),
  ...FEATURED_PRODUCTS.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    subtitle: product.tagline,
    image: product.image,
  })),
];

export function resolveFavorites(ids: string[]): FavoriteEntry[] {
  return ids
    .map((id) => CATALOG.find((entry) => entry.id === id))
    .filter((entry): entry is FavoriteEntry => entry !== undefined);
}
