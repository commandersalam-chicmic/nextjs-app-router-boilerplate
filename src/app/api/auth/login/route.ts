import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json(
      { error: "email and password required" },
      { status: 400 }
    );
  }
  const token = "dummy-jwt-" + Date.now();
  return NextResponse.json({
    token,
    user: { id: "1", email, name: email.split("@")[0] },
  });
}
