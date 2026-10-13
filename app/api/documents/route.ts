import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import { contentUploads, isStorageConfigured } from "@/lib/supabase-storage";

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<string, string> = {
  certificates: "Certificate",
  skills: "Skill",
  experience: "Work Experience",
};

type DocumentEntry = {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  kind: "document" | "image";
  createdAt: string;
};

// Public downloads include portfolio documents and images, but never private reference letters.
export async function GET() {
  const documents: DocumentEntry[] = [];

  if (isSupabaseConfigured("anon") && isStorageConfigured()) {
    try {
      const rows = (await supabaseRest.select(
        "content_items",
        "select=id,section,name,description,file_name,image_name,created_at&or=(file_name.not.is.null,image_name.not.is.null)&order=created_at.desc",
      )) as Array<Record<string, unknown>>;

      for (const row of rows) {
        const label = SECTION_LABELS[row.section as string] ?? "Upload";
        const fileName = row.file_name as string | null;
        const imageName = row.image_name as string | null;

        if (fileName) {
          const url = await contentUploads.signedUrl(fileName).catch(() => null);
          if (url) {
            documents.push({
              id: `${row.id}-doc`,
              title: row.name as string,
              description: (row.description as string) || `Uploaded under ${label}`,
              url,
              source: label,
              kind: "document",
              createdAt: row.created_at as string,
            });
          }
        }

        if (imageName) {
          const url = await contentUploads.signedUrl(imageName).catch(() => null);
          if (url) {
            documents.push({
              id: `${row.id}-img`,
              title: row.name as string,
              description: (row.description as string) || `Uploaded under ${label}`,
              url,
              source: label,
              kind: "image",
              createdAt: row.created_at as string,
            });
          }
        }
      }
    } catch {
      // Non-fatal: the content_items table may not exist on this deployment.
    }
  }

  documents.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return NextResponse.json({ documents });
}
