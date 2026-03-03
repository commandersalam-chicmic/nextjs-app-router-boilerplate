"use client";

import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { paths } from "@/routes";
import { useEffect } from "react";

export function withGuest<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  function WithGuest(props: P) {
    const router = useRouter();
    const { user, isLoading, fetchUser } = useAuthStore();

    useEffect(() => {
      fetchUser();
    }, [fetchUser]);

    useEffect(() => {
      if (isLoading) return;
      if (user) router.replace(paths.app());
    }, [user, isLoading, router]);

    if (isLoading || user) return null;
    return <WrappedComponent {...props} />;
  }

  WithGuest.displayName = `WithGuest(${WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"})`;
  return WithGuest;
}
