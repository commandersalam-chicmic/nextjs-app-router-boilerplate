import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { wrapApiHandler } from "@/helpers";
import mockUser from "@/mocks/mock-user.json";

export const GET = wrapApiHandler(
  async (_request: NextRequest, _body: unknown, _context: unknown) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(mockUser);
  },
);
