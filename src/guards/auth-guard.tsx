"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { paths, ROUTES } from "@/routes";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Protects content for authenticated users only. Redirects to login when not authenticated.
 */
export function AuthGuard({ children, fallback }: Readonly<AuthGuardProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace(paths.login({ returnTo: pathname ?? ROUTES.HOME }));
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading && fallback) return <>{fallback}</>;
  if (isLoading) return null;
  if (!user) return null;

  return <>{children}</>;
}
