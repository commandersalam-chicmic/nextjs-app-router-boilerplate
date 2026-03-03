"use client";

import type { JSX } from "react";
import { Toaster as SonnerToaster } from "sonner";

const TOAST_POSITION = "top-right" as const;

export function ToastProvider(): JSX.Element {
  return (
    <SonnerToaster
      position={TOAST_POSITION}
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
      }}
    />
  );
}
