"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { paths, ROUTES } from "@/routes";
import { useAuthStore } from "@/store/auth-store";

import type { ReactNode } from "react";

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
  const { user, loading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (loading && !user) return;
    if (!user) {
      router.replace(paths.login({ returnTo: pathname ?? ROUTES.HOME }));
    }
  }, [user, loading, router, pathname]);

  if (loading && !user && fallback) return <>{fallback}</>;
  if (loading && !user) return null;
  if (!user) return null;

  return <>{children}</>;
}
