const CEP_DIGITS = 8;

export function formatCep(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, CEP_DIGITS);
  if (digits.length <= 5) {
    return digits;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function isValidCep(value: string): boolean {
  return value.replace(/\D/g, "").length === CEP_DIGITS;
}
