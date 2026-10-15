import { validateEmail } from "@/features/auth/services/auth-service";

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const MIN_MESSAGE_LENGTH = 10;
const MOCK_SUBMIT_DELAY_MS = 800;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Informe seu nome.";
  }

  const emailError = validateEmail(fields.email);
  if (emailError) {
    errors.email = emailError;
  }

  if (!fields.subject) {
    errors.subject = "Escolha o assunto.";
  }

  if (fields.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Escreva uma mensagem com pelo menos ${MIN_MESSAGE_LENGTH} caracteres.`;
  }

  return errors;
}

export async function mockSendContact(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
}
