import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import { contentUploads, isStorageConfigured } from "@/lib/supabase-storage";

export const dynamic = "force-dynamic";

const VALID_SECTIONS = ["certificates", "skills", "experience"] as const;

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section");
  if (!section || !VALID_SECTIONS.includes(section as (typeof VALID_SECTIONS)[number])) {
    return NextResponse.json({ error: "Missing or invalid section." }, { status: 400 });
  }

  if (!isSupabaseConfigured("anon")) {
    return NextResponse.json({ configured: false, items: [] });
  }

  try {
    const rows = await supabaseRest.select(
      "content_items",
      `select=id,name,description,tools,file_name,image_name,created_at&section=eq.${section}&order=display_order.asc,created_at.desc`,
    );

    const items = await Promise.all(
      (rows as Array<Record<string, unknown>>).map(async (row) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        tools: row.tools,
        createdAt: row.created_at,
        fileUrl: row.file_name && isStorageConfigured() ? await contentUploads.signedUrl(row.file_name as string).catch(() => null) : null,
        fileName: row.file_name,
        imageUrl: row.image_name && isStorageConfigured() ? await contentUploads.signedUrl(row.image_name as string).catch(() => null) : null,
      })),
    );

    return NextResponse.json({ configured: true, items });
  } catch {
    return NextResponse.json({ configured: true, items: [], error: "Unable to load portfolio content." }, { status: 500 });
  }
}
