import { validateEmail } from "@/features/auth/services/auth-service";

export type CustomOrderFields = {
  name: string;
  email: string;
  category: string;
  quantity: string;
  description: string;
};

export type CustomOrderErrors = Partial<Record<keyof CustomOrderFields, string>>;

const MIN_DESCRIPTION_LENGTH = 20;
const MOCK_SUBMIT_DELAY_MS = 800;

export function validateCustomOrder(fields: CustomOrderFields): CustomOrderErrors {
  const errors: CustomOrderErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Informe seu nome.";
  }

  const emailError = validateEmail(fields.email);
  if (emailError) {
    errors.email = emailError;
  }

  if (!fields.category) {
    errors.category = "Escolha o tipo de projeto.";
  }

  const quantity = Number(fields.quantity);
  if (!fields.quantity.trim() || !Number.isInteger(quantity) || quantity < 1) {
    errors.quantity = "Informe uma quantidade inteira maior que zero.";
  }

  if (fields.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `Descreva a ideia com pelo menos ${MIN_DESCRIPTION_LENGTH} caracteres.`;
  }

  return errors;
}

export async function mockSubmitCustomOrder(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
}
