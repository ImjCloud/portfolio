import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

// A lightweight public visit counter. GET reads the current count without
// incrementing (used when a visitor has already been counted this browser
// session); POST atomically increments via a Postgres function and returns
// the new count. Being callable by anyone with no auth is an accepted
// trade-off for a simple counter like this, it isn't protecting sensitive
// data, at worst someone could inflate the number, not access anything.

export async function GET() {
  if (!isSupabaseConfigured("anon")) return NextResponse.json({ configured: false, visits: null });
  try {
    const rows = (await supabaseRest.select("site_stats", "select=visits&id=eq.1")) as Array<{ visits: number }>;
    return NextResponse.json({ configured: true, visits: rows?.[0]?.visits ?? 0 });
  } catch {
    return NextResponse.json({ configured: true, visits: null, error: "Unable to retrieve visit count." }, { status: 500 });
  }
}

export async function POST() {
  if (!isSupabaseConfigured("anon")) return NextResponse.json({ configured: false, visits: null });
  try {
    const result = await supabaseRest.rpc("increment_visits");
    return NextResponse.json({ configured: true, visits: result });
  } catch {
    return NextResponse.json({ configured: true, visits: null, error: "Unable to retrieve visit count." }, { status: 500 });
  }
}
