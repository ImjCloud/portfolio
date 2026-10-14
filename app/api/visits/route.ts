import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// The count is a lightweight display metric, not tamper-proof analytics.
// Shared IP-based limiting reduces casual abuse of the public increment endpoint.

export async function GET() {
  if (!isSupabaseConfigured("anon")) return NextResponse.json({ configured: false, visits: null });
  try {
    const rows = (await supabaseRest.select("site_stats", "select=visits&id=eq.1")) as Array<{ visits: number }>;
    return NextResponse.json({ configured: true, visits: rows?.[0]?.visits ?? 0 });
  } catch {
    return NextResponse.json({ configured: true, visits: null, error: "Unable to retrieve visit count." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const rate = await consumeRateLimit(req, "visit-counter", 30, 60);
  if (!rate.configured) {
    return NextResponse.json({ error: "Visit counter protection is not configured." }, { status: 503 });
  }
  if (!rate.allowed) {
    return NextResponse.json({ error: "Too many visit-count requests." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  if (!isSupabaseConfigured("anon")) return NextResponse.json({ configured: false, visits: null });
  try {
    const result = await supabaseRest.rpc("increment_visits");
    return NextResponse.json({ configured: true, visits: result });
  } catch {
    return NextResponse.json({ configured: true, visits: null, error: "Unable to retrieve visit count." }, { status: 500 });
  }
}
