import RootLayout from "@/layouts/root";

import "@/app/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Next.js App Router Boilerplate",
  description:
    "Barebone Next.js 16 App Router boilerplate with Zustand, Tailwind, and best practices",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="font-sans antialiased">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
