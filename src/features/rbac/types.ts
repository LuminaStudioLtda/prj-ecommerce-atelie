export const roles = ["CLIENT", "ADMIN"] as const;

export type Role = (typeof roles)[number];
export type ActorRole = Role | "ANONYMOUS";

export type Permission =
  | "catalog:read"
  | "own-profile:read"
  | "own-profile:write"
  | "own-orders:read"
  | "inventory:read"
  | "inventory:write"
  | "margins:read"
  | "margins:write"
  | "admin:access";

export type AuthenticatedUser = {
  id: string;
  name: string;
  role: Role;
};
