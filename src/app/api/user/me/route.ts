import { NextResponse } from "next/server";

export async function GET() {
  const user = {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    role: "user",
  };
  return NextResponse.json(user);
}
