import "server-only";
import type { NextRequest } from "next/server";

type RateLimitResult = { allowed: boolean; configured: boolean; remaining?: number };

const INCREMENT_SCRIPT = [
  "local count = redis.call('INCR', KEYS[1])",
  "if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end",
  "return count",
].join("\n");

function requestKey(req: NextRequest) {
  const direct = req.headers.get("x-real-ip")?.trim();
  if (direct) return direct.slice(0, 100);
  const forwarded = req.headers.get("x-forwarded-for")?.split(",").map((part) => part.trim()).filter(Boolean);
  return (forwarded?.at(-1) || "unknown").slice(0, 100);
}

/** Shared fixed-window limiter backed by Upstash Redis REST. Fails closed if not configured. */
export async function consumeRateLimit(
  req: NextRequest,
  namespace: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { allowed: false, configured: false };

  const key = `portfolio:ratelimit:${namespace}:${requestKey(req)}`;
  try {
    const response = await fetch(`${url}/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", INCREMENT_SCRIPT, "1", key, String(windowSeconds)]),
      cache: "no-store",
    });
    if (!response.ok) return { allowed: false, configured: true };
    const result = (await response.json()) as { result?: unknown };
    const count = Number(result.result);
    if (!Number.isFinite(count)) return { allowed: false, configured: true };
    return { allowed: count <= limit, configured: true, remaining: Math.max(0, limit - count) };
  } catch {
    return { allowed: false, configured: true };
  }
}
