"use client";

import { startTransition, useEffect, useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/utils";

/** Delay before entrance animation settles to the “hold” phase. */
const SPLASH_PHASE_SETTLE_MS = 280;

type SplashPhase = "enter" | "hold";

function splashPhaseClass(phase: SplashPhase): string {
  switch (phase) {
    case "enter":
      return "opacity-0 translate-y-5 scale-[0.97]";
    case "hold":
      return "opacity-100 translate-y-0 scale-100";
  }
}

function SplashLoaderMark(): ReactElement {
  return (
    <div aria-hidden className="splash-loader-mark">
      <div className="splash-loader-glow" />
      <div className="splash-loader-ring-outer" />
      <div className="splash-loader-ring-inner" />
      <div className="splash-loader-core" />
    </div>
  );
}

export type SplashScreenVariant = "overlay" | "segment";

export interface SplashScreenProps {
  /**
   * `overlay` — fixed full viewport (e.g. global busy state).
   * `segment` — in-flow min height (e.g. `loading.tsx`, `<Suspense fallback={…}>`).
   */
  variant?: SplashScreenVariant;
  /** When `false`, nothing is rendered. Defaults to `true` (always visible while mounted). */
  open?: boolean;
}

interface SplashScreenContentProps {
  phase: SplashPhase;
  variant: SplashScreenVariant;
}

function SplashScreenContent({ phase, variant }: Readonly<SplashScreenContentProps>): ReactElement {
  const { t } = useTranslation();

  const rootClass =
    variant === "overlay"
      ? "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
      : "relative flex min-h-[55vh] w-full flex-col items-center justify-center bg-background text-foreground py-16";

  return (
    <div aria-busy="true" aria-live="polite" className={rootClass} role="status">
      <span className="sr-only">{t("common.loading")}</span>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,hsl(var(--muted))_0%,transparent_58%)] opacity-85 dark:opacity-65",
          "splash-ambient",
        )}
      />
      <div
        className={cn(
          "relative z-10 flex flex-col items-center gap-8 px-8 text-center transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          splashPhaseClass(phase),
        )}
      >
        <SplashLoaderMark />
        <div className="flex max-w-md flex-col gap-3">
          <p
            className={cn(
              "font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl",
              "splash-title-float",
            )}
          >
            {t("splash.title")}
          </p>
          <p className="max-w-sm text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            {t("splash.subtitle")}
          </p>
        </div>
      </div>
      <div className="absolute bottom-[13%] left-1/2 z-10 w-[min(300px,70vw)] -translate-x-1/2 px-6">
        <div className="splash-track relative">
          <div className="splash-shimmer-bar" />
        </div>
      </div>
    </div>
  );
}

/**
 * Presentational splash / loading shell. Wire visibility from your app (e.g. Zustand, TanStack Query) via `open`.
 */
export function SplashScreen({
  variant = "overlay",
  open = true,
}: Readonly<SplashScreenProps>): ReactElement | null {
  const [phase, setPhase] = useState<SplashPhase>("enter");

  useEffect(() => {
    if (!open) {
      startTransition(() => {
        setPhase("enter");
      });
      return undefined;
    }

    startTransition(() => {
      setPhase("enter");
    });
    const holdTimer = globalThis.setTimeout(() => setPhase("hold"), SPLASH_PHASE_SETTLE_MS);
    return () => globalThis.clearTimeout(holdTimer);
  }, [open]);

  if (!open) {
    return null;
  }

  return <SplashScreenContent phase={phase} variant={variant} />;
}
