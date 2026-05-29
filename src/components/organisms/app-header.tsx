"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils";

interface AppHeaderProps {
  title?: string;
  className?: string;
}

export function AppHeader({ title = "App", className }: Readonly<AppHeaderProps>) {
  const { t } = useTranslation();
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.LOGIN);
  };

  return (
    <header className={cn("border-b bg-card", className)}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <span className="font-semibold text-lg">{title}</span>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            aria-label={t("button.logout")}
            className="flex items-center justify-center rounded-full bg-transparent p-2 text-palette-charcoal transition-all duration-300 hover:bg-palette-charcoal/5 focus:outline-none focus:ring-0 dark:text-palette-sandstone dark:hover:bg-palette-sandstone/5"
            type="button"
            onClick={handleLogout}
          >
            <LogOut className="h-[18px] w-[18px] transition-transform duration-500 hover:scale-110" />
          </button>
        </div>
      </div>
    </header>
  );
}
