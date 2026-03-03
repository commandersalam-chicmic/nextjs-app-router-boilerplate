import Link from "next/link";
import { ROUTES } from "@/constants";
import { Button } from "@/components";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">
        Next.js App Router Boilerplate
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Barebone setup with Next 16, Zustand, Tailwind, and App Router. No MUI.
      </p>
      <div className="flex gap-4">
        <Link href={ROUTES.APP}>
          <Button>App</Button>
        </Link>
        <Link href={ROUTES.LOGIN}>
          <Button variant="secondary">Login</Button>
        </Link>
      </div>
    </main>
  );
}
