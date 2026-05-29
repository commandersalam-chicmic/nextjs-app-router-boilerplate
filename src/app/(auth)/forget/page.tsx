"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button, Card, LanguageSwitcher } from "@/components";
import { ROUTES } from "@/constants";

export default function ForgetPage() {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-sm p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold">{t("button.forgotPassword")}</h2>
        <LanguageSwitcher />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Enter your email to receive a reset link. Wire to your API.
      </p>
      <div className="flex flex-col gap-2">
        <Link className="block" href={ROUTES.LOGIN}>
          <Button className="w-full">{t("button.backToLogin")}</Button>
        </Link>
        <Link
          className="text-center text-sm text-muted-foreground hover:underline"
          href={ROUTES.HOME}
        >
          {t("button.backToHome")}
        </Link>
      </div>
    </Card>
  );
}
