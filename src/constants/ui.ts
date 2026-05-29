/** UI / domain string constants — compare to these instead of raw literals. */

export const SUBSCRIBE_STATUS = {
  Idle: "idle",
  Loading: "loading",
  Success: "success",
} as const;

export type SubscribeStatus = (typeof SUBSCRIBE_STATUS)[keyof typeof SUBSCRIBE_STATUS];

export const SCROLL_SECTION = {
  Products: "products",
  About: "about",
  Journal: "journal",
} as const;

export type ScrollSectionId = (typeof SCROLL_SECTION)[keyof typeof SCROLL_SECTION];

export const LANGUAGE_CODE = {
  En: "en",
  Hi: "hi",
} as const;

export type LanguageCode = (typeof LANGUAGE_CODE)[keyof typeof LANGUAGE_CODE];

/** Filter "All" plus feature category keys (matches i18n `home.categories.*`). */
export const FEATURE_CATEGORY = {
  All: "all",
  Core: "core",
  State: "state",
  Ui: "ui",
  Security: "security",
  Testing: "testing",
  Tooling: "tooling",
} as const;

export type FeatureCategoryFilter = (typeof FEATURE_CATEGORY)[keyof typeof FEATURE_CATEGORY];

export type FeatureCategoryKey = Exclude<FeatureCategoryFilter, typeof FEATURE_CATEGORY.All>;

export const FEATURE_CATEGORY_ORDER: FeatureCategoryFilter[] = [
  FEATURE_CATEGORY.All,
  FEATURE_CATEGORY.Core,
  FEATURE_CATEGORY.State,
  FEATURE_CATEGORY.Ui,
  FEATURE_CATEGORY.Security,
  FEATURE_CATEGORY.Testing,
  FEATURE_CATEGORY.Tooling,
];
