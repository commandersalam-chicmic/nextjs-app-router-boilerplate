import { isProtectedPath, ROUTES } from "@/routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isProtectedPath(pathname)) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      const loginUrl = new URL(ROUTES.LOGIN, request.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [String.raw`/((?!_next/static|_next/image|favicon.ico|api/|.*\..*).*)`],
};
