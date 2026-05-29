import { withGuestGuard } from "@/hocs/with-guest-guard";
import { PublicLayout } from "@/layouts/public";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign in",
};

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: Readonly<LayoutProps>) {
  return <PublicLayout>{children}</PublicLayout>;
}

export default withGuestGuard(Layout);
