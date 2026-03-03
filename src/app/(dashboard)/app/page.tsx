"use client";

import { Button, Card, When } from "@/components";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import type { ReactElement } from "react";
import { useState } from "react";

interface UserInfoProps {
  name?: string;
  email?: string;
}

function UserInfo({ name, email }: Readonly<UserInfoProps>): ReactElement {
  return (
    <p className="text-sm text-muted-foreground">
      {name} ({email})
    </p>
  );
}

interface ErrorDisplayProps {
  message: string;
}

function ErrorDisplay({ message }: Readonly<ErrorDisplayProps>): ReactElement {
  return <p className="text-sm text-destructive">{message}</p>;
}

export default function AppPage() {
  const [count, setCount] = useState(0);
  const { user, isLoading, error, fetchUser } = useAuthStore();

  const handleFetchUser = (): void => {
    fetchUser();
  };

  const fetchButtonLabel = isLoading ? "Loading…" : "Fetch user";

  const renderUserInfo = (): ReactElement => (
    <UserInfo name={user?.name} email={user?.email} />
  );
  const renderError = (): ReactElement => (
    <ErrorDisplay message={error ?? ""} />
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">App</h1>
      <p className="text-muted-foreground">
        Protected area. Add sidebar, nav, and feature routes here.
      </p>
      <Card className="flex items-center gap-4 p-4">
        <span className="text-sm font-medium">Zustand counter:</span>
        <Button
          variant="ghost"
          type="button"
          onClick={() => setCount((c) => c - 1)}
          className="px-3 py-1"
        >
          -
        </Button>
        <span className="min-w-[2rem] text-center font-mono">{count}</span>
        <Button
          variant="ghost"
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="px-3 py-1"
        >
          +
        </Button>
      </Card>
      <Card className="p-4 space-y-2">
        <span className="text-sm font-medium">
          Auth store (uses userService → /api/user/me):
        </span>
        <Button
          variant="secondary"
          type="button"
          onClick={handleFetchUser}
          disabled={isLoading}
        >
          {fetchButtonLabel}
        </Button>
        <When condition={user != null}>{renderUserInfo}</When>
        <When condition={error != null}>{renderError}</When>
      </Card>
      <Link href={ROUTES.HOME} className="text-primary hover:underline">
        Back to home
      </Link>
    </div>
  );
}
