"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import type { FeatureCategoryFilter } from "@/constants";
import { FEATURE_CATEGORY_ORDER, SCROLL_SECTION } from "@/constants";
import type { StackFeature } from "@/helpers/home-content";
import { cn } from "@/utils";

import type { RefCallback } from "react";

export interface StackSectionProps {
  stackHeaderRef: RefCallback<HTMLDivElement>;
  stackHeaderRevealed: boolean;
  stackGridRef: RefCallback<HTMLDivElement>;
  stackGridRevealed: boolean;
  activeCategory: FeatureCategoryFilter;
  onCategoryChange: (cat: FeatureCategoryFilter) => void;
  filteredFeatures: StackFeature[];
  onSelectFeature: (feat: StackFeature) => void;
}

export function StackSection({
  stackHeaderRef,
  stackHeaderRevealed,
  stackGridRef,
  stackGridRevealed,
  activeCategory,
  onCategoryChange,
  filteredFeatures,
  onSelectFeature,
}: Readonly<StackSectionProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className="py-32 px-6 md:px-12 bg-background" id={SCROLL_SECTION.Products}>
      <div className="max-w-[1800px] mx-auto">
        <div
          ref={stackHeaderRef}
          className={`flex flex-col items-center text-center mb-24 space-y-8 transition-all duration-1000 transform ${
            stackHeaderRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-serif text-foreground">
            {t("homepage.stack.title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t w-full max-w-3xl">
            {FEATURE_CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`text-xs uppercase tracking-widest pb-1 border-b transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => onCategoryChange(cat)}
              >
                {t(`homepage.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={stackGridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 transition-all duration-[1200ms] delay-100 transform ${
            stackGridRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {filteredFeatures.map((feat) => {
            const activate = (): void => {
              globalThis.scrollTo({ top: 0, behavior: "smooth" });
              onSelectFeature(feat);
            };
            return (
              <button
                aria-label={feat.name}
                key={feat.id}
                type="button"
                className={cn(
                  "group flex w-full cursor-pointer flex-col gap-6 border-0 bg-transparent p-0 text-center font-inherit text-inherit",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                onClick={activate}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                  <Image
                    fill
                    alt={feat.imageAlt}
                    className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 grayscale-[0.2]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={feat.imageUrl}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-palette-charcoal/0 transition-colors duration-500 group-hover:bg-palette-charcoal/5">
                    <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 px-6 py-3 text-xs font-medium uppercase tracking-widest text-palette-charcoal">
                        {t("homepage.featureDetail.viewSpecs")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="mb-1 block text-2xl font-serif font-medium text-foreground transition-opacity group-hover:opacity-70">
                    {feat.name}
                  </span>
                  <p className="mb-1 text-xs font-light uppercase tracking-widest text-muted-foreground">
                    {t(`homepage.categories.${feat.categoryKey}`)}
                  </p>
                  <p className="text-sm font-light italic font-serif text-muted-foreground">
                    {feat.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
