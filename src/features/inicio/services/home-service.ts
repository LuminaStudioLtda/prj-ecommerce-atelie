import type { StarState } from "@/features/inicio/types";

const STAR_COUNT = 5;

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getStarStates(rating: number): StarState[] {
  return Array.from({ length: STAR_COUNT }, (_, index) => {
    if (rating >= index + 1) return "full";
    if (rating >= index + 0.5) return "half";
    return "empty";
  });
}
