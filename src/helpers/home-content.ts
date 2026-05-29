import { ASSETS, FEATURE_CATEGORY, type FeatureCategoryKey } from "@/constants";

import type { TFunction } from "i18next";

export const STACK_FEATURE_IDS = ["f1", "f2", "f3", "f4", "f5", "f6"] as const;
export type StackFeatureId = (typeof STACK_FEATURE_IDS)[number];

export const JOURNAL_IDS = ["j1", "j2", "j3"] as const;
export type JournalId = (typeof JOURNAL_IDS)[number];

const FEATURE_CATEGORY_BY_ID: Record<StackFeatureId, FeatureCategoryKey> = {
  f1: FEATURE_CATEGORY.Core,
  f2: FEATURE_CATEGORY.State,
  f3: FEATURE_CATEGORY.Ui,
  f4: FEATURE_CATEGORY.Security,
  f5: FEATURE_CATEGORY.Testing,
  f6: FEATURE_CATEGORY.Tooling,
};

const STACK_IMAGE: Record<StackFeatureId, string> = {
  f1: ASSETS.stackF1,
  f2: ASSETS.stackF2,
  f3: ASSETS.stackF3,
  f4: ASSETS.stackF4,
  f5: ASSETS.stackF5,
  f6: ASSETS.stackF6,
};

const JOURNAL_IMAGE: Record<JournalId, string> = {
  j1: ASSETS.journalJ1,
  j2: ASSETS.journalJ2,
  j3: ASSETS.journalJ3,
};

const JOURNAL_NUMERIC_ID: Record<JournalId, number> = {
  j1: 1,
  j2: 2,
  j3: 3,
};

export interface StackFeature {
  id: StackFeatureId;
  categoryKey: FeatureCategoryKey;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  features: string[];
  imageAlt: string;
}

export interface JournalArticle {
  id: number;
  journalKey: JournalId;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  imageAlt: string;
}

export function buildStackFeatures(t: TFunction): StackFeature[] {
  return STACK_FEATURE_IDS.map((id) => ({
    id,
    categoryKey: FEATURE_CATEGORY_BY_ID[id],
    name: t(`homepage.features.${id}.name`),
    tagline: t(`homepage.features.${id}.tagline`),
    description: t(`homepage.features.${id}.description`),
    longDescription: t(`homepage.features.${id}.longDescription`),
    imageUrl: STACK_IMAGE[id],
    features: [
      t(`homepage.features.${id}.spec0`),
      t(`homepage.features.${id}.spec1`),
      t(`homepage.features.${id}.spec2`),
    ],
    imageAlt: t(`homepage.features.${id}.imageAlt`),
  }));
}

export function buildJournalArticles(t: TFunction): JournalArticle[] {
  return JOURNAL_IDS.map((journalKey) => ({
    id: JOURNAL_NUMERIC_ID[journalKey],
    journalKey,
    title: t(`homepage.journal.${journalKey}.title`),
    date: t(`homepage.journal.${journalKey}.date`),
    excerpt: t(`homepage.journal.${journalKey}.excerpt`),
    image: JOURNAL_IMAGE[journalKey],
    content: t(`homepage.journal.${journalKey}.content`),
    imageAlt: t(`homepage.journal.${journalKey}.imageAlt`),
  }));
}
