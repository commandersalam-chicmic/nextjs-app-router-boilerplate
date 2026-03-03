"use client";

import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { Button, Card, Form, FormField } from "@/components";
import { useAuthStore } from "@/store/auth-store";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm(): ReactElement {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const login = useAuthStore((s) => s.login);

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    try {
      await login(data);
    } catch {
      // Toast and state handled in store/service
    }
  };

  return (
    <Card className="w-full max-w-sm space-y-6">
      <h2 className="text-center text-2xl font-semibold">Sign in</h2>
      <p className="text-center text-sm text-muted-foreground">
        Boilerplate auth. Wire to your API.
      </p>
      <Form form={form} onSubmit={onSubmit}>
        <FormField control={form.control} name="email" label="Email" type="email" placeholder="you@example.com" />
        <FormField control={form.control} name="password" label="Password" type="password" placeholder="••••••••" />
        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <Link href={ROUTES.FORGET} className="text-center text-sm text-muted-foreground hover:underline">
            Forgot password?
          </Link>
          <Link href={ROUTES.HOME} className="block">
            <Button type="button" variant="secondary" className="w-full">
              Back to home
            </Button>
          </Link>
        </div>
      </Form>
    </Card>
  );
}
