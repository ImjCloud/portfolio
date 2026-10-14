import { NextRequest, NextResponse } from "next/server";
import { isStorageConfigured, referenceLetters } from "@/lib/supabase-storage";
import { checkAdminSession, checkSameOrigin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const MAX_SIZE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function sanitiseFileName(name: string) {
  const withoutPath = name.split(/[/\\]/).pop() ?? "file";
  return withoutPath.replace(/[^a-zA-Z0-9.\\-_ ]/g, "").trim() || "file";
}

function extensionOf(name: string) {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}

async function hasExpectedSignature(file: File, extension: string): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (extension === ".pdf") return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
  if (extension === ".png") return [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte);
  if (extension === ".jpg" || extension === ".jpeg") return bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (extension === ".webp") return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
}

export async function GET(req: NextRequest) {
  if (!checkAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  if (!isStorageConfigured()) {
    return NextResponse.json({ configured: false, letters: [] });
  }

  try {
    const objects = await referenceLetters.list();
    const letters = await Promise.all(
      objects.map(async (object) => ({
        name: object.name,
        url: await referenceLetters.signedUrl(object.name),
        size: object.metadata?.size ?? null,
        uploadedAt: object.created_at ?? null,
      })),
    );

    return NextResponse.json({ configured: true, letters });
  } catch {
    return NextResponse.json(
      { configured: true, letters: [], error: "Unable to load reference letters." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (!checkSameOrigin(req)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!checkAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  if (!isStorageConfigured()) {
    return NextResponse.json({ error: "Storage is not configured on this deployment yet." }, { status: 503 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const extension = extensionOf(file.name);
  if (!ACCEPTED_TYPES[extension] || ACCEPTED_TYPES[extension] !== file.type) {
    return NextResponse.json({ error: "Only matching PDF, JPG, PNG or WEBP files are accepted." }, { status: 400 });
  }

  if (file.size === 0 || file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File must be larger than 0 bytes and no larger than 10MB." }, { status: 400 });
  }

  if (!(await hasExpectedSignature(file, extension))) {
    return NextResponse.json({ error: "File content does not match its file type." }, { status: 400 });
  }

  const fileName = `${Date.now()}-${sanitiseFileName(file.name)}`;

  try {
    await referenceLetters.upload(fileName, file);
    return NextResponse.json({ ok: true, fileName });
  } catch {
    return NextResponse.json({ error: "Unable to upload reference letter." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkSameOrigin(req)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!checkAdminSession(req)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  if (!isStorageConfigured()) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  const body = (await req.json().catch(() => null)) as { fileName?: string } | null;
  if (!body?.fileName || body.fileName.includes("/") || body.fileName.includes("\\\\")) {
    return NextResponse.json({ error: "A valid fileName is required." }, { status: 400 });
  }

  try {
    await referenceLetters.remove(body.fileName);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete reference letter." }, { status: 500 });
  }
}
