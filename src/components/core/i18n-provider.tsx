"use client";

import i18next from "i18next";
import * as React from "react";
import { initReactI18next, useTranslation } from "react-i18next";

import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

i18next.use(initReactI18next).init({
  debug: false,
  defaultNS: "translation",
  ns: ["translation"],
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
});

export interface I18nProviderProps {
  children: React.ReactNode;
  lng?: string;
}

export function I18nProvider({
  children,
  lng = "en",
}: Readonly<I18nProviderProps>): React.JSX.Element {
  const { i18n } = useTranslation();

  if (globalThis.window === undefined) {
    i18n.changeLanguage(lng).catch(() => {
      console.error(`Failed to change language to ${lng}`);
    });
  }

  React.useEffect(() => {
    const win = globalThis.window;
    const savedLng = win === undefined ? null : win.localStorage.getItem("language");
    const finalLng = savedLng || lng;

    i18n.changeLanguage(finalLng).catch(() => {
      console.error(`Failed to change language to ${finalLng}`);
    });
  }, [i18n, lng]);

  return <React.Fragment>{children}</React.Fragment>;
}
