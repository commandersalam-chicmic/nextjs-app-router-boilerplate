"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button, LanguageSwitcher } from "@/components";
import type { ScrollSectionId } from "@/constants";
import { ROUTES, SCROLL_SECTION } from "@/constants";
import type { User } from "@/services";
import { cn } from "@/utils";

import type { MouseEvent } from "react";

export interface NavProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  headerTextColor: string;
  user: User | null;
  onToggleMobileMenu: () => void;
  onLogout: () => void;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>, targetId: ScrollSectionId) => void;
  onBrandClick: () => void;
}

export function Nav({
  scrolled,
  mobileMenuOpen,
  headerTextColor,
  user,
  onToggleMobileMenu,
  onLogout,
  onLinkClick,
  onBrandClick,
}: Readonly<NavProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled || mobileMenuOpen
            ? "bg-background/90 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
          <button
            type="button"
            className={cn(
              "relative z-50 font-serif text-3xl font-medium tracking-tight transition-colors duration-500",
              headerTextColor,
            )}
            onClick={onBrandClick}
          >
            {t("homepage.brand")}
          </button>

          <div
            className={`hidden md:flex items-center gap-12 text-xs font-medium tracking-widest uppercase transition-colors duration-500 ${headerTextColor}`}
          >
            <a
              className="hover:opacity-60 transition-opacity"
              href={`#${SCROLL_SECTION.Products}`}
              onClick={(e) => onLinkClick(e, SCROLL_SECTION.Products)}
            >
              {t("homepage.nav.stack")}
            </a>
            <a
              className="hover:opacity-60 transition-opacity"
              href={`#${SCROLL_SECTION.About}`}
              onClick={(e) => onLinkClick(e, SCROLL_SECTION.About)}
            >
              {t("homepage.nav.philosophy")}
            </a>
            <a
              className="hover:opacity-60 transition-opacity"
              href={`#${SCROLL_SECTION.Journal}`}
              onClick={(e) => onLinkClick(e, SCROLL_SECTION.Journal)}
            >
              {t("homepage.nav.journal")}
            </a>
          </div>

          <div className="flex items-center gap-6 z-50 relative">
            <LanguageSwitcher className={headerTextColor} />

            {user ? (
              <button
                aria-label={t("homepage.nav.signOut")}
                type="button"
                className={cn(
                  "flex items-center justify-center rounded-full bg-transparent p-2 transition-all duration-300 focus:outline-none focus:ring-0",
                  "hover:bg-palette-charcoal/5 dark:hover:bg-palette-sandstone/5",
                  headerTextColor,
                )}
                onClick={onLogout}
              >
                <LogOut className="h-[18px] w-[18px] transition-transform duration-500 hover:scale-110" />
              </button>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button
                  className={`text-xs uppercase tracking-widest font-medium hover:opacity-60 transition-colors duration-500 ${headerTextColor}`}
                  variant="ghost"
                >
                  {t("button.login")}
                </Button>
              </Link>
            )}

            <button
              className={`block md:hidden focus:outline-none transition-colors duration-500 ${headerTextColor}`}
              type="button"
              onClick={onToggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-background z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-8 text-xl font-serif font-medium text-foreground">
          <a
            className="hover:opacity-60 transition-opacity"
            href={`#${SCROLL_SECTION.Products}`}
            onClick={(e) => onLinkClick(e, SCROLL_SECTION.Products)}
          >
            {t("homepage.nav.stack")}
          </a>
          <a
            className="hover:opacity-60 transition-opacity"
            href={`#${SCROLL_SECTION.About}`}
            onClick={(e) => onLinkClick(e, SCROLL_SECTION.About)}
          >
            {t("homepage.nav.philosophy")}
          </a>
          <a
            className="hover:opacity-60 transition-opacity"
            href={`#${SCROLL_SECTION.Journal}`}
            onClick={(e) => onLinkClick(e, SCROLL_SECTION.Journal)}
          >
            {t("homepage.nav.journal")}
          </a>
        </div>
      </div>
    </>
  );
}
