"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Button } from "@/components";
import type { ScrollSectionId } from "@/constants";
import { ASSETS, SCROLL_SECTION } from "@/constants";

import type { MouseEvent } from "react";

export interface HeroProps {
  heroAnimate: boolean;
  onExploreClick: (e: MouseEvent<HTMLButtonElement>, targetId: ScrollSectionId) => void;
}

export function Hero({ heroAnimate, onExploreClick }: Readonly<HeroProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-muted">
      <div className="absolute inset-0 w-full h-full">
        <Image
          fill
          priority
          alt={t("homepage.hero.imageAlt")}
          className="object-cover grayscale contrast-[0.7] brightness-[0.95]"
          sizes="100vw"
          src={ASSETS.heroNature}
        />
        <div className="absolute inset-0 bg-palette-hero-warm/40 mix-blend-multiply dark:bg-palette-hero-dark/60" />
        <div className="absolute inset-0 bg-palette-hero-dark/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-8">
        <div className="w-full md:w-auto">
          <span
            className={`block text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/95 mb-6 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full mx-0 md:mx-auto w-fit transition-all duration-1000 delay-100 transform ${
              heroAnimate
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            {t("homepage.hero.badge")}
          </span>
          <h1
            className={`text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-8 transition-all duration-[1200ms] delay-300 transform ${
              heroAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t("homepage.hero.titleLine1")}{" "}
            <span className="italic text-palette-sandstone">{t("homepage.hero.titleAccent")}</span>
          </h1>
          <p
            className={`max-w-xl mx-0 md:mx-auto text-lg md:text-xl text-white/95 font-light leading-relaxed mb-12 transition-all duration-[1200ms] delay-500 transform ${
              heroAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t("homepage.hero.descriptionLine1")}
            <br />
            {t("homepage.hero.descriptionLine2")}
          </p>
          <div
            className={`transition-all duration-[1200ms] delay-700 transform ${
              heroAnimate
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <Button
              className="group relative px-10 py-4 text-xs uppercase tracking-widest"
              type="button"
              onClick={(e) => onExploreClick(e, SCROLL_SECTION.Products)}
            >
              <span>{t("homepage.hero.exploreCta")}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
          />
        </svg>
      </div>
    </section>
  );
}
