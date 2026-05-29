"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { ASSETS, SCROLL_SECTION } from "@/constants";

import type { RefCallback } from "react";

export interface PhilosophySectionProps {
  philosophyRef: RefCallback<HTMLDivElement>;
  philosophyRevealed: boolean;
  philosophyBlock1Ref: RefCallback<HTMLDivElement>;
  philosophyBlock1Revealed: boolean;
  philosophyBlock2Ref: RefCallback<HTMLDivElement>;
  philosophyBlock2Revealed: boolean;
}

export function PhilosophySection({
  philosophyRef,
  philosophyRevealed,
  philosophyBlock1Ref,
  philosophyBlock1Revealed,
  philosophyBlock2Ref,
  philosophyBlock2Revealed,
}: Readonly<PhilosophySectionProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className="bg-muted overflow-hidden" id={SCROLL_SECTION.About}>
      <div
        ref={philosophyRef}
        className={`py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32 transition-all duration-1000 transform ${
          philosophyRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
            {t("homepage.philosophy.titleLine1")} <br />
            {t("homepage.philosophy.titleLine2")}
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8">
            {t("homepage.philosophy.introP1")}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8">
            {t("homepage.philosophy.introP2")}
          </p>
          <div className="relative mt-12 h-[400px] w-full">
            <Image
              fill
              alt={t("homepage.philosophy.studioImageAlt")}
              className="object-cover grayscale contrast-[0.9] brightness-110"
              sizes="(max-width: 768px) 100vw, 800px"
              src={ASSETS.philosophyStudio}
            />
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mt-4">
            {t("homepage.philosophy.studioCaption")}
          </p>
        </div>
      </div>

      <div
        ref={philosophyBlock1Ref}
        className={`grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] border-t transition-all duration-1000 transform ${
          philosophyBlock1Revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="order-2 lg:order-1 relative h-[400px] lg:min-h-[60vh] overflow-hidden group">
          <Image
            fill
            alt={t("homepage.philosophy.block1ImageAlt")}
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={ASSETS.philosophyTexture}
          />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-card">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            {t("homepage.philosophy.block1Eyebrow")}
          </span>
          <h3 className="text-4xl md:text-5xl font-serif mb-8 text-foreground leading-tight">
            {t("homepage.philosophy.block1TitleLine1")} <br />
            {t("homepage.philosophy.block1TitleLine2")}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-md">
            {t("homepage.philosophy.block1Body")}
          </p>
        </div>
      </div>

      <div
        ref={philosophyBlock2Ref}
        className={`grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] border-b transition-all duration-1000 transform ${
          philosophyBlock2Revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-foreground text-background">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            {t("homepage.philosophy.block2Eyebrow")}
          </span>
          <h3 className="text-4xl md:text-5xl font-serif mb-8 text-background leading-tight">
            {t("homepage.philosophy.block2Title")}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-md">
            {t("homepage.philosophy.block2Body")}
          </p>
        </div>
        <div className="relative h-[400px] lg:min-h-[60vh] overflow-hidden group">
          <Image
            fill
            alt={t("homepage.philosophy.block2ImageAlt")}
            className="object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-90"
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={ASSETS.philosophyLiving}
          />
        </div>
      </div>
    </section>
  );
}
