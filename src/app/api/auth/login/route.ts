import { NextResponse } from "next/server";

import { wrapApiHandler } from "@/helpers";
import mockUser from "@/mocks/mock-user.json";

interface LoginBody {
  email?: string;
  password?: string;
}

function parseLoginBody(body: unknown): LoginBody | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }
  const { email, password } = body as Record<string, unknown>;
  return {
    email: typeof email === "string" ? email : undefined,
    password: typeof password === "string" ? password : undefined,
  };
}

export const POST = wrapApiHandler<LoginBody | undefined>(async (_request, body) => {
  const parsed = parseLoginBody(body);
  const email = parsed?.email;
  const password = parsed?.password;

  if (!email || !password) {
    return NextResponse.json({ error: "email and password required" }, { status: 400 });
  }

  const token = `dummy-jwt-${Date.now()}`;
  const user = {
    ...mockUser,
    email,
    name: email.split("@")[0] || mockUser.name,
  };

  const response = NextResponse.json({
    token,
    user,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
});
