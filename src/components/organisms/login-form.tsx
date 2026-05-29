"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Alert, Button, Card, Form, FormField } from "@/components";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils";

import type { ReactElement } from "react";

const loginInputClassName = cn(
  "h-12 rounded-xl px-4 transition-all",
  "border-palette-sandstone-border/80 dark:border-neutral-800/60",
  "bg-palette-ivory/50 dark:bg-palette-charcoal/30",
  "text-palette-charcoal dark:text-palette-sandstone",
  "placeholder:text-muted-foreground/50",
  "focus-visible:ring-1 focus-visible:ring-palette-charcoal dark:focus-visible:ring-palette-sandstone",
);

const loginLabelClassName =
  "block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase";

export function LoginForm(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Define schema dynamically inside the component to respond to locale changes
  const loginSchema = z.object({
    email: z.string().min(1, t("login.error.emailRequired")).email(t("login.error.emailInvalid")),
    password: z.string().min(1, t("login.error.passwordRequired")),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const login = useAuthStore((s) => s.login);

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    try {
      await login(data);
      router.push(ROUTES.HOME);
    } catch {
      // Toast and state handled in store/service
    }
  };

  return (
    <Card
      className={cn(
        "flex max-h-full w-full max-w-[440px] flex-col space-y-8 overflow-y-auto rounded-[2rem] border border-palette-sandstone-border/30 p-8 shadow-2xl backdrop-blur-md md:rounded-[2.5rem] md:p-12",
        "bg-palette-sandstone/95 text-palette-charcoal dark:border-neutral-800/80 dark:bg-palette-charcoal/95 dark:text-palette-sandstone",
      )}
    >
      {/* Title & Subtitle */}
      <div className="space-y-2.5 text-center">
        <h2 className="font-serif text-4xl tracking-tight text-palette-charcoal dark:text-palette-sandstone md:text-5xl">
          {t("login.title")}
        </h2>
        <p className="text-center text-xs font-light tracking-wide text-muted-foreground md:text-sm">
          {t("login.subTitle")}
        </p>
      </div>

      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-6">
          <FormField
            autoComplete="off"
            control={form.control}
            inputClassName={loginInputClassName}
            label={t("login.emailLabel")}
            labelClassName={loginLabelClassName}
            name="email"
            placeholder={t("login.emailPlaceholder")}
            type="email"
          />

          <FormField
            autoComplete="new-password"
            control={form.control}
            inputClassName={loginInputClassName}
            label={t("login.passwordLabel")}
            labelClassName={loginLabelClassName}
            name="password"
            placeholder={t("login.passwordPlaceholder")}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <button
                aria-label={t(showPassword ? "login.hidePassword" : "login.showPassword")}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:text-palette-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:text-palette-sandstone"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            labelEnd={
              <Link
                className="text-[10px] font-medium tracking-wider text-muted-foreground transition-all hover:underline"
                href={ROUTES.FORGET}
              >
                {t("button.forgotPassword")}
              </Link>
            }
          />

          {/* Demo Credentials Alert component */}
          <Alert
            className="rounded-2xl border border-palette-sandstone-border/40 bg-palette-sandstone/60 p-4 text-neutral-800 shadow-sm dark:border-neutral-800/50 dark:bg-palette-charcoal/40 dark:text-neutral-200"
            severity="info"
          >
            <span className="mb-1 block text-xs font-semibold text-palette-charcoal dark:text-palette-sandstone">
              {t("common.demoCredentials")}
            </span>
            <span className="block text-[11px] text-muted-foreground">
              {t("common.email")}:{" "}
              <code className="rounded bg-palette-charcoal/5 px-1 py-0.5 font-mono text-xs font-semibold text-palette-charcoal dark:bg-palette-sandstone/5 dark:text-palette-sandstone">
                demo@example.com
              </code>
            </span>
            <span className="mt-0.5 block text-[11px] text-muted-foreground">
              {t("common.password")}:{" "}
              <code className="rounded bg-palette-charcoal/5 px-1 py-0.5 font-mono text-xs font-semibold text-palette-charcoal dark:bg-palette-sandstone/5 dark:text-palette-sandstone">
                N7$vQ2!mX9@Lp4#Zd8
              </code>
            </span>
          </Alert>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-2">
            <Button
              hoverAnimation
              className="h-12 w-full text-xs uppercase tracking-widest"
              type="submit"
              variant="secondary"
            >
              {t("button.signIn")}
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}
