import { withAuthGuard } from "@/hocs/with-auth-guard";
import MainLayout from "@/layouts/private/main-layout";

import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: Readonly<LayoutProps>) {
  return <MainLayout>{children}</MainLayout>;
}

export default withAuthGuard(Layout);
