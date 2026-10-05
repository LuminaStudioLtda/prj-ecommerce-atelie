import type { ActorRole, Permission } from "@/features/rbac/types";

const permissionsByRole: Record<ActorRole, readonly Permission[]> = {
  ANONYMOUS: ["catalog:read"],
  CLIENT: [
    "catalog:read",
    "own-profile:read",
    "own-profile:write",
    "own-orders:read",
  ],
  ADMIN: [
    "catalog:read",
    "own-profile:read",
    "own-profile:write",
    "own-orders:read",
    "inventory:read",
    "inventory:write",
    "margins:read",
    "margins:write",
    "admin:access",
  ],
};

export function hasPermission(
  role: ActorRole,
  permission: Permission,
): boolean {
  return permissionsByRole[role].includes(permission);
}

export function canAccessAdmin(role: ActorRole): boolean {
  return hasPermission(role, "admin:access");
}
