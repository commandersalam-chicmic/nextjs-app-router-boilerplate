"use client";

import { useTheme } from "next-themes";
import { startTransition, useEffect, useState, type JSX } from "react";
import { Toaster as SonnerToaster } from "sonner";

import { cn } from "@/utils";

import "./sonner-theme.css";

const TOAST_POSITION = "top-right" as const;

const toastBase = cn(
  "group flex w-full items-start gap-3 border p-4 pr-10",
  "rounded-lg border-border bg-popover text-popover-foreground",
  "font-sans text-sm font-light antialiased tracking-tight",
  "shadow-md",
);

export function ToastProvider(): JSX.Element {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  const sonnerTheme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <SonnerToaster
      closeButton
      gap={12}
      offset={16}
      position={TOAST_POSITION}
      theme={sonnerTheme}
      toastOptions={{
        duration: 4000,
        classNames: {
          toast: toastBase,
          title: "text-sm font-medium leading-snug text-foreground",
          description: "text-xs font-light leading-relaxed text-muted-foreground mt-1",
          content: "gap-1",
          icon: "mt-0.5",
          actionButton: cn(
            "rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
            "bg-primary text-primary-foreground shadow-sm transition-opacity hover:opacity-90",
          ),
          cancelButton: cn(
            "rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium",
            "text-secondary-foreground transition-colors hover:bg-accent",
          ),
          closeButton: cn(
            "left-auto right-2 top-2 border border-border bg-background/90 text-foreground",
            "h-7 w-7 rounded-md transition-colors hover:bg-muted",
          ),
          success: "border-emerald-600/25 bg-card dark:border-emerald-400/25",
          error: "border-destructive/45 bg-destructive/10",
          warning: "border-amber-600/30 bg-amber-500/[0.06] dark:border-amber-400/25",
          info: "border-border bg-muted/40",
          loading: "border-border bg-muted/30",
          default: "border-border bg-popover",
        },
      }}
    />
  );
}
