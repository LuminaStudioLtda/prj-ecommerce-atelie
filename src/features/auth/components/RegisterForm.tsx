"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useSessionStore } from "@/store/use-session-store";
import { mockAuthenticate, validateEmail, validatePassword } from "@/features/auth/services/auth-service";

type FormErrors = Partial<Record<"name" | "email" | "password", string>>;

function validate(name: string, email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  const trimmedName = name.trim();

  if (!trimmedName) {
    errors.name = "Informe seu nome.";
  }

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function RegisterForm() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(name, email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await mockAuthenticate();
    login();
    router.push("/home");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>Cadastre-se para acessar o Ateliê.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? (
              <p className="text-sm text-destructive" id="name-error">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <p className="text-sm text-destructive" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password ? (
              <p className="text-sm text-destructive" id="password-error">
                {errors.password}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link
            href="/"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
