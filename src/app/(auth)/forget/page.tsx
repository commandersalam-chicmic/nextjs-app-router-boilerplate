import Link from "next/link";
import { ROUTES } from "@/constants";
import { Button, Card } from "@/components";

export default function ForgetPage() {
  return (
    <Card className="w-full max-w-sm space-y-6">
      <h2 className="text-center text-2xl font-semibold">Forgot password</h2>
      <p className="text-center text-sm text-muted-foreground">
        Enter your email to receive a reset link. Wire to your API.
      </p>
      <div className="flex flex-col gap-2">
        <Link href={ROUTES.LOGIN} className="block">
          <Button className="w-full">Back to login</Button>
        </Link>
        <Link
          href={ROUTES.HOME}
          className="text-center text-sm text-muted-foreground hover:underline"
        >
          Home
        </Link>
      </div>
    </Card>
  );
}
