import { SiteHeader } from "@/components/site-header";
import { BestSellers } from "@/features/inicio/components/BestSellers";
import { CategoryGrid } from "@/features/inicio/components/CategoryGrid";
import { CustomOrderInvite } from "@/features/inicio/components/CustomOrderInvite";
import { HeroSection } from "@/features/inicio/components/HeroSection";
import { InicioFooter } from "@/features/inicio/components/InicioFooter";
import { SeasonalOffer } from "@/features/inicio/components/SeasonalOffer";
import { Testimonials } from "@/features/inicio/components/Testimonials";
import { ValuePropositions } from "@/features/inicio/components/ValuePropositions";

export default function InicioPage() {
  return (
    <div className="tema-inicio flex min-h-[100dvh] flex-1 flex-col bg-surface font-body text-body-md text-on-surface selection:bg-primary-fixed">
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col bg-surface">
        <HeroSection />
        <ValuePropositions />
        <CategoryGrid />
        <SeasonalOffer />
        <BestSellers />
        <Testimonials />
        <CustomOrderInvite />
      </main>
      <InicioFooter />
    </div>
  );
}
