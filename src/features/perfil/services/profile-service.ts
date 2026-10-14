import { validateEmail } from "@/features/auth/services/auth-service";
import { isValidCep } from "@/features/loja/services/delivery-service";
import type { UserProfile } from "@/store/use-session-store";

export type ProfileErrors = Partial<Record<keyof UserProfile, string>>;

const PHONE_DIGITS_MIN = 10;
const PHONE_DIGITS_MAX = 11;

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, PHONE_DIGITS_MAX);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  const splitAt = digits.length === PHONE_DIGITS_MAX ? 7 : 6;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, splitAt)}-${digits.slice(splitAt)}`;
}

export function validateProfile(profile: UserProfile): ProfileErrors {
  const errors: ProfileErrors = {};

  if (!profile.name.trim()) {
    errors.name = "Informe seu nome.";
  }

  const emailError = validateEmail(profile.email);
  if (emailError) {
    errors.email = emailError;
  }

  const phoneDigits = profile.phone.replace(/\D/g, "").length;
  if (phoneDigits > 0 && (phoneDigits < PHONE_DIGITS_MIN || phoneDigits > PHONE_DIGITS_MAX)) {
    errors.phone = "Informe um telefone com DDD.";
  }

  if (profile.cep && !isValidCep(profile.cep)) {
    errors.cep = "Informe um CEP válido com 8 dígitos.";
  }

  return errors;
}
