export default function AdminPage() {
  return (
    <main className="min-h-[100dvh] bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-muted-foreground">Ateliê · Administração</p>
        <h1 className="mt-2 text-3xl font-semibold">Painel administrativo</h1>
        <p className="mt-3 text-muted-foreground">
          A área administrativa está protegida por sessão e papel de acesso.
        </p>
      </div>
    </main>
  );
}
