"use client";

import { useHasPermission, type Permission } from "@/hooks/use-acl";

import type { ReactElement, ReactNode } from "react";

interface RequirePermissionProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export function RequirePermission({
  permission,
  children,
  fallback = null,
}: Readonly<RequirePermissionProps>): ReactElement {
  const hasPermission = useHasPermission(permission);
  if (!hasPermission) return <>{fallback}</>;
  return <>{children}</>;
}
