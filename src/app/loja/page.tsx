import { SiteHeader } from "@/components/site-header";
import { LojaCatalog } from "@/features/loja/components/LojaCatalog";

export default function LojaPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <LojaCatalog />
    </div>
  );
}
