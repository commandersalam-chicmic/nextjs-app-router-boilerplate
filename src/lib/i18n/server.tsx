import { createInstance } from "i18next";

import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

import type { i18n } from "i18next";

async function initI18next(lng = "en"): Promise<i18n> {
  const i18nInstance = createInstance();

  await i18nInstance.init({
    debug: false,
    defaultNS: "translation",
    ns: ["translation"],
    lng: lng,
    fallbackLng: "en",
    supportedLngs: ["en", "hi"],
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
  });

  return i18nInstance;
}

export async function getTranslation(lng = "en"): Promise<{ t: i18n["t"]; i18n: i18n }> {
  const i18nextInstance = await initI18next(lng);

  return {
    t: i18nextInstance.t,
    i18n: i18nextInstance,
  };
}
