import { useHydrated } from "@/hooks/use-hydrated";
import { useFavoritesStore } from "@/store/use-favorites-store";

export function useFavorite(productId: string): { isFavorited: boolean; toggle: () => void } {
  const hydrated = useHydrated();
  const isInStore = useFavoritesStore((state) => state.ids.includes(productId));
  const toggleFavorite = useFavoritesStore((state) => state.toggle);

  return { isFavorited: hydrated && isInStore, toggle: () => toggleFavorite(productId) };
}
