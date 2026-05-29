import { NextRequest, NextResponse } from "next/server";

import { wrapApiHandler } from "@/helpers";

export const GET = wrapApiHandler(
  async (_request: NextRequest, _body: unknown, _context: unknown) => {
    return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
  },
);
