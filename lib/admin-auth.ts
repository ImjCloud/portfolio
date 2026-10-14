import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60;

function secretBuffer(value: string) {
  return Buffer.from(value, "utf8");
}

export function verifyAdminSecret(provided: unknown): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (typeof provided !== "string" || !expected) return false;
  const actualBytes = secretBuffer(provided);
  const expectedBytes = secretBuffer(expected);
  return actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes);
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createAdminSessionToken(now = Date.now()): string | null {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  const payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(now / 1000) + ADMIN_SESSION_TTL_SECONDS, nonce: randomBytes(16).toString("base64url") }),
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSessionToken(token: string | undefined, now = Date.now()): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return false;
  const expected = Buffer.from(sign(payload, secret));
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: unknown; nonce?: unknown };
    return Number.isInteger(decoded.exp) && (decoded.exp as number) > Math.floor(now / 1000) &&
      typeof decoded.nonce === "string" && decoded.nonce.length >= 16;
  } catch {
    return false;
  }
}

export function checkAdminSession(req: NextRequest): boolean {
  return verifyAdminSessionToken(req.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

/** Reject state-changing browser requests without a same-origin Origin header. */
export function checkSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === req.nextUrl.origin;
  } catch {
    return false;
  }
}
