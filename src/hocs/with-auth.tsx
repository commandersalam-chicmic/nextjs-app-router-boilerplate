"use client";

import type { ComponentType } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { paths, ROUTES } from "@/routes";
import { useEffect } from "react";

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  function WithAuth(props: P) {
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

    if (isLoading || !user) return null;
    return <WrappedComponent {...props} />;
  }

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"})`;
  return WithAuth;
}
