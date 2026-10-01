import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { roles, type AuthenticatedUser, type Role } from "@/features/rbac/types";

const SESSION_COOKIE = "atelie_session";

type SessionClaims = {
  sub: string;
  name: string;
  role: Role;
  exp: number;
};

function decodeBase64Url(value: string): string | null {
  if (!/^[\w-]+$/.test(value)) return null;

  try {
    return Buffer.from(value, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

function isSessionClaims(value: unknown): value is SessionClaims {
  if (typeof value !== "object" || value === null) return false;

  const claims = value as Record<string, unknown>;
  return (
    typeof claims.sub === "string" &&
    claims.sub.length > 0 &&
    typeof claims.name === "string" &&
    claims.name.length > 0 &&
    typeof claims.role === "string" &&
    roles.includes(claims.role as Role) &&
    typeof claims.exp === "number" &&
    Number.isSafeInteger(claims.exp)
  );
}

function verifySessionToken(token: string, secret: string): AuthenticatedUser | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  const headerText = decodeBase64Url(encodedHeader);
  const payloadText = decodeBase64Url(encodedPayload);
  if (!headerText || !payloadText || !/^[\w-]+$/.test(signature)) return null;

  try {
    const header: unknown = JSON.parse(headerText);
    if (
      typeof header !== "object" ||
      header === null ||
      (header as Record<string, unknown>).alg !== "HS256"
    ) {
      return null;
    }

    const expected = createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();
    const received = Buffer.from(signature, "base64url");
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
      return null;
    }

    const claims: unknown = JSON.parse(payloadText);
    if (!isSessionClaims(claims) || claims.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return { id: claims.sub, name: claims.name, role: claims.role };
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  return verifySessionToken(token, secret);
}
