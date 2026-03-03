"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { paths } from "@/routes";

interface GuestGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Only allows unauthenticated users. Redirects to app when already logged in.
 */
export function GuestGuard({ children, fallback }: Readonly<GuestGuardProps>) {
  const router = useRouter();
  const { user, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      router.replace(paths.app());
    }
  }, [user, isLoading, router]);

  if (isLoading && fallback) return <>{fallback}</>;
  if (isLoading) return null;
  if (user) return null;

  return <>{children}</>;
}
