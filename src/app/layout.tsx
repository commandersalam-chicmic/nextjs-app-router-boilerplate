import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, ToastProvider } from "@/components";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Next.js App Router Boilerplate",
  description:
    "Barebone Next.js 16 App Router boilerplate with Zustand, Tailwind, and best practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
