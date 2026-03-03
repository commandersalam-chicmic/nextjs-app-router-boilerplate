"use client";

import { useAuthStore } from "@/store/auth-store";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
} as const;

export const PERMISSIONS = {
  USER_READ: "user:read",
  USER_WRITE: "user:write",
  ADMIN_ACCESS: "admin:access",
  SETTINGS_READ: "settings:read",
  SETTINGS_WRITE: "settings:write",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  [ROLES.ADMIN]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.ADMIN_ACCESS,
    PERMISSIONS.SETTINGS_READ,
    PERMISSIONS.SETTINGS_WRITE,
  ],
  [ROLES.USER]: [PERMISSIONS.USER_READ, PERMISSIONS.SETTINGS_READ],
  [ROLES.GUEST]: [],
};

export function hasPermission(
  role: Role | undefined,
  permission: Permission,
): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role];
  return permissions?.includes(permission) ?? false;
}

export function useRole(): Role | undefined {
  const user = useAuthStore((s) => s.user);
  const role = user?.role as Role | undefined;
  return role ?? undefined;
}

export function useAcl(): {
  role: Role | undefined;
  permissions: readonly Permission[];
  isAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;
} {
  const role = useRole();
  const permissions = role ? (ROLE_PERMISSIONS[role] ?? []) : [];

  return {
    role,
    permissions,
    isAdmin: role === ROLES.ADMIN,
    isUser: role === ROLES.USER,
    isGuest: role === ROLES.GUEST || !role,
  };
}

export function useHasPermission(permission: Permission): boolean {
  const role = useRole();
  return hasPermission(role, permission);
}
