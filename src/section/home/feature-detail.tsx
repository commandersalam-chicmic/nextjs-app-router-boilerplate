"use client";

import { ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { Button } from "@/components";
import type { StackFeature } from "@/helpers/home-content";

export interface FeatureDetailProps {
  feature: StackFeature;
  onClose: () => void;
}

export function FeatureDetail({
  feature,
  onClose,
}: Readonly<FeatureDetailProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-700 ease-in-out font-sans select-none">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md py-4 border-b">
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
          <button
            className="text-sm font-medium uppercase tracking-widest flex items-center gap-2 hover:opacity-60 transition-opacity"
            type="button"
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t("homepage.featureDetail.backToStack")}</span>
          </button>
          <span className="text-xl font-serif tracking-tight font-medium">
            {t("homepage.brand")}
          </span>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="relative w-full lg:w-1/2 aspect-[4/5] bg-muted overflow-hidden">
            <Image
              fill
              alt={feature.imageAlt}
              className="object-cover grayscale-[0.1] contrast-[0.9]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={feature.imageUrl}
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-8 lg:pt-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                {t(`homepage.categories.${feature.categoryKey}`)}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
                {feature.name}
              </h1>
              <p className="text-lg italic text-muted-foreground font-serif">{feature.tagline}</p>
            </div>

            <div className="border-t border-b py-6 text-base md:text-lg font-light text-muted-foreground leading-relaxed">
              {feature.longDescription}
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground">
                {t("homepage.featureDetail.keySpecs")}
              </h4>
              <ul className="space-y-2.5">
                {feature.features.map((line, i) => (
                  <li className="flex items-center gap-3 text-sm text-muted-foreground" key={i}>
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Button
                className="rounded-full px-8 py-6 text-sm uppercase tracking-widest font-medium"
                type="button"
                onClick={onClose}
              >
                {t("homepage.featureDetail.backToStack")}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
