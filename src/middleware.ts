import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isProtectedPath, ROUTES } from "@/routes";

export function middleware(request: NextRequest) {
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};
