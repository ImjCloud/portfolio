import { NextRequest, NextResponse } from "next/server";
import { supabaseRest } from "@/lib/supabase-rest";
import { checkAdminSecret } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  if (!checkAdminSecret(req)) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  if (!UUID_PATTERN.test(id)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  try {
    await supabaseRest.adminUpdate("testimonials", id, { approved: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process recommendation action." }, { status: 500 });
  }
}
