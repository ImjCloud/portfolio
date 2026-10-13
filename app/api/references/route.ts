import { NextResponse } from "next/server";
import { isStorageConfigured } from "@/lib/supabase-storage";

export const dynamic = "force-dynamic";

// Reference letters are private. Only the authenticated admin API may list them.
export async function GET() {
  return NextResponse.json({
    configured: isStorageConfigured(),
    letters: [],
  });
}
