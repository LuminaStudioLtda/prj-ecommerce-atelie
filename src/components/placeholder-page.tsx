import { SiteHeader } from "@/components/site-header";

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-muted/40 p-6 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">Conteúdo em breve.</p>
      </div>
    </div>
  );
}
