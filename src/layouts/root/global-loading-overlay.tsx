"use client";

import { SplashScreen } from "@/components/custom/splash-screen";
import { useAuthStore } from "@/store/auth-store";

import type { ReactElement } from "react";

/** Renders `SplashScreen` as a full-screen overlay while auth `loading` is true. */
export function GlobalLoadingOverlay(): ReactElement | null {
  const loading = useAuthStore((s) => s.loading);
  return <SplashScreen open={loading} variant="overlay" />;
}
