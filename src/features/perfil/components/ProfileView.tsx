"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getItemCount } from "@/features/carrinho/services/cart-service";
import { formatCep } from "@/features/loja/services/delivery-service";
import {
  formatPhone,
  validateProfile,
  type ProfileErrors,
} from "@/features/perfil/services/profile-service";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCartStore } from "@/store/use-cart-store";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { useSessionStore, type UserProfile } from "@/store/use-session-store";

type FieldConfig = {
  name: keyof UserProfile;
  label: string;
  autoComplete: string;
  type?: string;
  placeholder?: string;
  format?: (value: string) => string;
};

const FIELDS: FieldConfig[] = [
  { name: "name", label: "Nome", autoComplete: "name" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  {
    name: "phone",
    label: "Telefone",
    autoComplete: "tel",
    type: "tel",
    placeholder: "(00) 00000-0000",
    format: formatPhone,
  },
  {
    name: "cep",
    label: "CEP",
    autoComplete: "postal-code",
    placeholder: "00000-000",
    format: formatCep,
  },
  {
    name: "address",
    label: "Endereço de entrega",
    autoComplete: "street-address",
    placeholder: "Rua, número, bairro e cidade",
  },
];

export function ProfileView() {
  const router = useRouter();
  const hydrated = useHydrated();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const storedProfile = useSessionStore((state) => state.profile);
  const updateProfile = useSessionStore((state) => state.updateProfile);
  const logout = useSessionStore((state) => state.logout);
  const cartItemCount = useCartStore((state) => getItemCount(state.items));
  const favoriteCount = useFavoritesStore((state) => state.ids.length);

  const [draft, setDraft] = useState<UserProfile | null>(null);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [wasSaved, setWasSaved] = useState(false);

  if (!hydrated) {
    return <div className="mx-auto min-h-96 w-full max-w-3xl px-6 py-10" aria-busy="true" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-foreground">Sua conta</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Entre ou crie uma conta para gerenciar seus dados e endereço de entrega.
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="rounded-sm bg-primary px-6 py-3 text-xs font-semibold tracking-wider text-primary-foreground uppercase"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-sm border border-border px-6 py-3 text-xs font-semibold tracking-wider text-foreground uppercase"
          >
            Criar conta
          </Link>
        </div>
      </div>
    );
  }

  const profile = draft ?? storedProfile;

  function handleChange(field: FieldConfig, value: string) {
    setDraft({ ...profile, [field.name]: field.format ? field.format(value) : value });
    setWasSaved(false);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = { ...profile, email: profile.email.trim().toLowerCase() };
    const validationErrors = validateProfile(normalized);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setWasSaved(false);
      return;
    }
    updateProfile({ ...normalized, name: normalized.name.trim(), address: normalized.address.trim() });
    setDraft(null);
    setWasSaved(true);
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            Minha conta
          </p>
          <h1 className="font-serif text-3xl text-foreground">
            Olá, {storedProfile.name.split(" ")[0] || "bem-vindo(a)"}
          </h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3">
        <Link
          href="/favoritos"
          className="rounded-sm border border-border bg-card p-4 text-sm text-foreground hover:border-primary"
        >
          <span className="block font-serif text-2xl">{favoriteCount}</span>
          Favoritos
        </Link>
        <Link
          href="/carrinho"
          className="rounded-sm border border-border bg-card p-4 text-sm text-foreground hover:border-primary"
        >
          <span className="block font-serif text-2xl">{cartItemCount}</span>
          Itens na sacola
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 rounded-sm border border-border bg-card p-6"
      >
        <h2 className="font-serif text-xl text-foreground">Dados pessoais e entrega</h2>
        {FIELDS.map((field) => {
          const error = errors[field.name];
          const id = `profile-${field.name}`;
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <Label htmlFor={id}>{field.label}</Label>
              <Input
                id={id}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={profile[field.name]}
                onChange={(event) => handleChange(field, event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
              />
              {error ? (
                <p className="text-sm text-destructive" id={`${id}-error`}>
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
        <div className="flex items-center gap-4">
          <Button type="submit">Salvar alterações</Button>
          {wasSaved ? (
            <p role="status" className="text-sm text-muted-foreground">
              Dados salvos.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
