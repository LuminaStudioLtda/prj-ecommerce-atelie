import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FavoritesView } from "@/features/favoritos/components/FavoritesView";

export default function FavoritosPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <FavoritesView />
      </main>
      <SiteFooter />
    </div>
  );
}
