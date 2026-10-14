import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProfileView } from "@/features/perfil/components/ProfileView";

export default function PerfilPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ProfileView />
      </main>
      <SiteFooter />
    </div>
  );
}
