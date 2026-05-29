"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { SCROLL_SECTION } from "@/constants";
import type { JournalArticle } from "@/helpers/home-content";
import { cn } from "@/utils";

import type { RefCallback } from "react";

export interface JournalSectionProps {
  journalRef: RefCallback<HTMLDivElement>;
  journalRevealed: boolean;
  journalArticles: JournalArticle[];
  onSelectArticle: (article: JournalArticle) => void;
}

export function JournalSection({
  journalRef,
  journalRevealed,
  journalArticles,
  onSelectArticle,
}: Readonly<JournalSectionProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className="bg-background py-32 px-6 md:px-12" id={SCROLL_SECTION.Journal}>
      <div
        ref={journalRef}
        className={`max-w-[1800px] mx-auto transition-all duration-1000 transform ${
          journalRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b">
          <div>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 font-sans">
              {t("homepage.journal.sectionEyebrow")}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground">
              {t("homepage.journal.sectionTitle")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {journalArticles.map((article) => {
            const activate = (): void => {
              globalThis.scrollTo({ top: 0, behavior: "smooth" });
              onSelectArticle(article);
            };
            return (
              <button
                aria-label={article.title}
                key={article.id}
                type="button"
                className={cn(
                  "group flex w-full cursor-pointer flex-col border-0 bg-transparent p-0 text-left font-inherit text-inherit",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                onClick={activate}
              >
                <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    fill
                    alt={article.imageAlt}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={article.image}
                  />
                </div>
                <div className="flex flex-1 flex-col text-left">
                  <span className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {article.date}
                  </span>
                  <span className="mb-4 block text-2xl font-serif font-medium leading-tight text-foreground decoration-1 underline-offset-4 group-hover:underline">
                    {article.title}
                  </span>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">
                    {article.excerpt}
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
