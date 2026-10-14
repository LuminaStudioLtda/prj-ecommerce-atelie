export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 6;

const MOCK_AUTH_DELAY_MS = 800;

export function validateEmail(email: string): string | undefined {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Informe seu email.";
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return "Informe um email válido.";
  }
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return "Informe sua senha.";
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  return undefined;
}

export async function mockAuthenticate(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_AUTH_DELAY_MS));
}
