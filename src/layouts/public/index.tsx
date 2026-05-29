"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components";
import { ASSETS, ROUTES } from "@/constants";

export interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: Readonly<PublicLayoutProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-dvh min-h-screen select-none flex-col justify-between overflow-hidden bg-muted text-palette-ivory">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          fill
          priority
          alt={t("auth.backgroundImageAlt")}
          className="object-cover grayscale contrast-[0.7] brightness-[0.4] lg:brightness-[0.45]"
          sizes="100vw"
          src={ASSETS.authBackground}
        />
        <div className="absolute inset-0 bg-palette-hero-warm/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <header className="relative z-30 mx-auto flex w-full max-w-[1800px] shrink-0 items-center justify-between px-8 py-6 md:py-8">
        <Link
          className="font-serif text-3xl font-medium tracking-tight text-palette-sandstone transition-opacity hover:opacity-85"
          href={ROUTES.HOME}
        >
          {t("auth.brand")}
        </Link>

        <div className="flex items-center gap-6">
          <LanguageSwitcher className="text-palette-sandstone hover:bg-white/10" />
        </div>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 select-text items-center justify-center px-4 py-4 md:py-8">
        {children}
      </main>

      <footer className="relative z-30 mx-auto w-full max-w-[1800px] shrink-0 px-8 py-6 md:py-10">
        <p className="text-center text-[13px] font-normal tracking-[-0.01em] text-palette-sandstone/50">
          {t("auth.footerLine")}
        </p>
      </footer>
    </div>
  );
}
