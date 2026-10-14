import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  checkSameOrigin,
  createAdminSessionToken,
  verifyAdminSecret,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!checkSameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  const body = (await req.json().catch(() => null)) as { secret?: unknown } | null;
  if (!verifyAdminSecret(body?.secret)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });
  return response;
}
