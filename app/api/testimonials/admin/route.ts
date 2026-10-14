import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import { checkAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!checkAdminSession(req)) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  if (!isSupabaseConfigured("service")) return NextResponse.json({ configured: false, testimonials: [] });

  try {
    const rows = await supabaseRest.adminSelect(
      "testimonials",
      "select=id,name,role,company,linkedin_url,rating,recommendation,email,created_at&approved=eq.false&order=created_at.desc",
    );
    return NextResponse.json({ configured: true, testimonials: rows });
  } catch {
    return NextResponse.json({ configured: true, testimonials: [], error: "Unable to load pending recommendations." }, { status: 500 });
  }
}
