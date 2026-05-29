import { NextRequest, NextResponse } from "next/server";

import { wrapApiHandler } from "@/helpers";

export const POST = wrapApiHandler(
  async (_request: NextRequest, _body: unknown, _context: unknown) => {
    const response = NextResponse.json({ ok: true });

    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  },
);
