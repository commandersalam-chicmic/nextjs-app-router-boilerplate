import { DevToolOverlay, ThemeProvider, ToastProvider } from "@/components";
import { I18nProvider } from "@/components/core/i18n-provider";

import { GlobalLoadingOverlay } from "./global-loading-overlay";

import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
      <I18nProvider>
        {children}
        <GlobalLoadingOverlay />
        <ToastProvider />
        {process.env.NODE_ENV === "development" && <DevToolOverlay />}
      </I18nProvider>
    </ThemeProvider>
  );
}
