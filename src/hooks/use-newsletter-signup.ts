"use client";

import { useState, type SubmitEvent } from "react";
import { validateEmail } from "@/features/auth/services/auth-service";

export function useNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    setError(undefined);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateEmail(email);
    setError(validationError);
    if (!validationError) {
      setIsSubscribed(true);
    }
  }

  return { email, error, isSubscribed, handleEmailChange, handleSubmit };
}
