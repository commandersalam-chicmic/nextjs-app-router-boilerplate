"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import type { JournalArticle } from "@/helpers/home-content";

export interface JournalDetailProps {
  article: JournalArticle;
  onClose: () => void;
}

export function JournalDetail({
  article,
  onClose,
}: Readonly<JournalDetailProps>): React.JSX.Element {
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
            <span>{t("homepage.featureDetail.backToJournal")}</span>
          </button>
          <span className="text-xl font-serif tracking-tight font-medium">
            {t("homepage.brand")}
          </span>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <article className="space-y-8">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
              {article.date}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
              {article.title}
            </h1>
          </div>

          <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
            <Image
              fill
              alt={article.imageAlt}
              className="object-cover grayscale-[0.2]"
              sizes="(max-width: 768px) 100vw, 768px"
              src={article.image}
            />
          </div>

          <div className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed pt-6 font-serif">
            {article.content}
          </div>
        </article>
      </main>
    </div>
  );
}
