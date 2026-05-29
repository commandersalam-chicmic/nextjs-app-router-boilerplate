"use client";

import { Globe } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { Menu, MenuItem } from "@/components";
import { LANGUAGE_CODE } from "@/constants";
import { cn } from "@/utils";

import type { ReactElement } from "react";

export interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: Readonly<LanguageSwitcherProps>): ReactElement {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const selectLanguage = (newLng: (typeof LANGUAGE_CODE)[keyof typeof LANGUAGE_CODE]): void => {
    i18n.changeLanguage(newLng).catch(() => {});
    if (globalThis.window !== undefined) {
      globalThis.localStorage.setItem("language", newLng);
    }
    setIsOpen(false);
  };

  const currentLang = i18n.language || LANGUAGE_CODE.En;

  const renderTrigger = (): ReactElement => (
    <button
      aria-label={t("common.language")}
      type="button"
      className={cn(
        "flex items-center justify-center rounded-full bg-transparent p-2 transition-all duration-300 focus:outline-none focus:ring-0",
        "hover:bg-palette-charcoal/5 dark:hover:bg-palette-sandstone/5",
        className ?? "text-palette-charcoal dark:text-palette-sandstone",
      )}
      onClick={() => {
        setIsOpen((open) => !open);
      }}
    >
      <Globe className="h-[18px] w-[18px] transition-transform duration-500 hover:scale-110" />
    </button>
  );

  const renderMenu = (): ReactElement => (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuItem
        active={currentLang === LANGUAGE_CODE.En}
        onClick={() => selectLanguage(LANGUAGE_CODE.En)}
      >
        English
      </MenuItem>
      <MenuItem
        active={currentLang === LANGUAGE_CODE.Hi}
        onClick={() => selectLanguage(LANGUAGE_CODE.Hi)}
      >
        हिंदी (Hindi)
      </MenuItem>
    </Menu>
  );

  return (
    <div className="relative inline-block text-left">
      {renderTrigger()}
      {renderMenu()}
    </div>
  );
}
