import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  checkSameOrigin,
  createAdminSessionToken,
  verifyAdminSecret,
} from "@/lib/admin-auth";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!checkSameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  const rate = await consumeRateLimit(req, "admin-login", 10, 900);
  if (!rate.configured) {
    return NextResponse.json({ error: "Login protection is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "900" } });
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
