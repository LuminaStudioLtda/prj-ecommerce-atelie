import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CatalogValues } from "@/features/loja/components/CatalogValues";
import { LojaCatalog } from "@/features/loja/components/LojaCatalog";

export default async function LojaPage({ searchParams }: PageProps<"/loja">) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <LojaCatalog key={query} query={query} />
        <CatalogValues />
      </main>
      <SiteFooter />
    </div>
  );
}
