import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRest } from "@/lib/supabase-rest";
import { contentUploads, isStorageConfigured } from "@/lib/supabase-storage";
import { checkAdminSecret } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const VALID_SECTIONS = ["certificates", "skills", "experience"] as const;
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

function sanitiseFileName(name: string) {
  const withoutPath = name.split(/[/\\\\]/).pop() ?? "file";
  return withoutPath.replace(/[^a-zA-Z0-9.\\-_ ]/g, "").trim() || "file";
}

const DOCUMENT_TYPES: Record<string, string[]> = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword", "application/octet-stream"],
  ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/octet-stream"],
};
const IMAGE_TYPES: Record<string, string[]> = {
  ".png": ["image/png"], ".jpg": ["image/jpeg"], ".jpeg": ["image/jpeg"],
  ".webp": ["image/webp"], ".gif": ["image/gif"],
};
function extensionOf(name: string) {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}
async function hasExpectedSignature(file: File, extension: string): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (extension === ".pdf") return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
  if (extension === ".png") return [137,80,78,71,13,10,26,10].every((byte,index) => bytes[index] === byte);
  if (extension === ".jpg" || extension === ".jpeg") return bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (extension === ".gif") return ["GIF87a","GIF89a"].includes(String.fromCharCode(...bytes.slice(0,6)));
  if (extension === ".webp") return String.fromCharCode(...bytes.slice(0,4)) === "RIFF" && String.fromCharCode(...bytes.slice(8,12)) === "WEBP";
  if (extension === ".doc") return bytes.length >= 4 && bytes[0] === 208 && bytes[1] === 207 && bytes[2] === 17 && bytes[3] === 224;
  if (extension === ".docx") return bytes.length >= 4 && bytes[0] === 80 && bytes[1] === 75 && bytes[2] === 3 && bytes[3] === 4;
  return false;
}

export async function GET(req: NextRequest) {
  if (!checkAdminSecret(req)) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  if (!isSupabaseConfigured("service")) return NextResponse.json({ configured: false, items: [] });

  try {
    const rows = await supabaseRest.adminSelect("content_items", "select=id,section,name,description,tools,file_name,image_name,created_at&order=created_at.desc");
    return NextResponse.json({ configured: true, items: rows });
  } catch (error) {
    return NextResponse.json({ configured: true, items: [], error: "Unable to load content items." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAdminSecret(req)) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  if (!isSupabaseConfigured("service")) return NextResponse.json({ error: "Supabase is not configured on this deployment yet." }, { status: 503 });

  const formData = await req.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid submission." }, { status: 400 });

  const section = String(formData.get("section") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const tools = String(formData.get("tools") ?? "").trim();
  const file = formData.get("file");
  const image = formData.get("image");

  if (!VALID_SECTIONS.includes(section as (typeof VALID_SECTIONS)[number])) {
    return NextResponse.json({ error: "Invalid section." }, { status: 400 });
  }
  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });

  let fileName: string | null = null;
  let imageName: string | null = null;

  try {
    if (file instanceof File && file.size > 0) {
      const extension = extensionOf(file.name);
      if (!DOCUMENT_TYPES[extension] || !DOCUMENT_TYPES[extension].includes(file.type)) return NextResponse.json({ error: "Document must be a PDF, DOC or DOCX file." }, { status: 400 });
      if (file.size > MAX_SIZE_BYTES) return NextResponse.json({ error: "Document is larger than 10MB." }, { status: 400 });
      if (!(await hasExpectedSignature(file, extension))) return NextResponse.json({ error: "Document content does not match its file type." }, { status: 400 });
      if (!isStorageConfigured()) return NextResponse.json({ error: "Storage is not configured on this deployment yet." }, { status: 503 });
      fileName = `${Date.now()}-${sanitiseFileName(file.name)}`;
      await contentUploads.upload(fileName, file);
    }
    if (image instanceof File && image.size > 0) {
      const extension = extensionOf(image.name);
      if (!IMAGE_TYPES[extension] || !IMAGE_TYPES[extension].includes(image.type)) return NextResponse.json({ error: "Image must be PNG, JPG, GIF or WebP." }, { status: 400 });
      if (!(await hasExpectedSignature(image, extension))) return NextResponse.json({ error: "Image content does not match its file type." }, { status: 400 });
      if (image.size > MAX_SIZE_BYTES) return NextResponse.json({ error: "Image is larger than 10MB." }, { status: 400 });
      if (!isStorageConfigured()) return NextResponse.json({ error: "Storage is not configured on this deployment yet." }, { status: 503 });
      imageName = `${Date.now()}-${sanitiseFileName(image.name)}`;
      await contentUploads.upload(imageName, image);
    }

    await supabaseRest.adminInsert("content_items", {
      section,
      name,
      description: description || null,
      tools: tools || null,
      file_name: fileName,
      image_name: imageName,
      display_order: 0,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save content item." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdminSecret(req)) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { id?: string; fileName?: string | null; imageName?: string | null } | null;
  if (!body?.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  try {
    await supabaseRest.adminDelete("content_items", body.id);
    if (body.fileName) await contentUploads.remove(body.fileName).catch(() => null);
    if (body.imageName) await contentUploads.remove(body.imageName).catch(() => null);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to delete content item." }, { status: 500 });
  }
}
