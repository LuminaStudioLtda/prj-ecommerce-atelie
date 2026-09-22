"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/use-session-store";

export default function HomePage() {
  const router = useRouter();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const logout = useSessionStore((state) => state.logout);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-muted/40 p-6 text-center">
      <h1 className="text-2xl font-semibold">Bem-vindo(a)!</h1>
      <p className="text-sm text-muted-foreground">
        Você está autenticado(a) no Ateliê.
      </p>
      <Button variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
}
