"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { paths } from "@/routes";
import { useAuthStore } from "@/store/auth-store";

import type { ReactNode } from "react";

interface GuestGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Only allows unauthenticated users. Redirects to app when already logged in.
 */
export function GuestGuard({ children, fallback }: Readonly<GuestGuardProps>) {
  const router = useRouter();
  const { user, loading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      router.replace(paths.home);
    }
  }, [user, router]);

  if (loading && !user && fallback) return <>{fallback}</>;
  if (loading && !user) return null;
  if (user) return null;

  return <>{children}</>;
}
