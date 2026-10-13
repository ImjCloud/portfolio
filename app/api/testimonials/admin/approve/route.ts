import { NextRequest, NextResponse } from "next/server";
import { supabaseRest } from "@/lib/supabase-rest";
import { checkAdminSecret } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!checkAdminSecret(req)) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  try {
    await supabaseRest.adminUpdate("testimonials", body.id, { approved: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process recommendation action." }, { status: 500 });
  }
}
