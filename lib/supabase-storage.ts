// Server-only helper for Supabase Storage, built on plain fetch (same approach
// as lib/supabase-rest.ts). Every operation here uses the service role key,
// so buckets can stay fully private, with no Storage RLS policies to
// configure. Public visitors never talk to Supabase directly for files;
// they always go through our own API routes, which generate short-lived
// signed URLs on demand.

function getServiceCreds() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export function isStorageConfigured() {
  return getServiceCreds() !== null;
}

type StorageObject = { name: string; id: string | null; updated_at: string | null; created_at: string | null; metadata: { size?: number; mimetype?: string } | null };

async function storageRequest(path: string, init: RequestInit = {}) {
  const creds = getServiceCreds();
  if (!creds) throw new Error("Supabase storage is not configured on this deployment yet.");

  const response = await fetch(`${creds.url}/storage/v1${path}`, {
    ...init,
    headers: {
      apikey: creds.key,
      Authorization: `Bearer ${creds.key}`,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Supabase storage request failed (${response.status}): ${text}`);
  }

  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Creates a small client scoped to one Storage bucket. */
function createBucketClient(bucket: string) {
  return {
    async list(): Promise<StorageObject[]> {
      const result = await storageRequest(`/object/list/${bucket}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 200, sortBy: { column: "created_at", order: "desc" } }),
      });
      const objects = (result as StorageObject[]) ?? [];
      // Supabase Storage's "list" can include a placeholder entry for empty folders; filter that out.
      return objects.filter((item) => item.id !== null);
    },

    async signedUrl(fileName: string, expiresInSeconds = 3600): Promise<string> {
      const creds = getServiceCreds();
      if (!creds) throw new Error("Supabase storage is not configured on this deployment yet.");
      const result = (await storageRequest(`/object/sign/${bucket}/${encodeURIComponent(fileName)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expiresIn: expiresInSeconds }),
      })) as { signedURL: string };
      return `${creds.url}/storage/v1${result.signedURL}`;
    },

    async upload(fileName: string, file: File): Promise<void> {
      const buffer = await file.arrayBuffer();
      await storageRequest(`/object/${bucket}/${encodeURIComponent(fileName)}`, {
        method: "POST",
        headers: { "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
        body: buffer,
      });
    },

    async remove(fileName: string): Promise<void> {
      await storageRequest(`/object/${bucket}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefixes: [fileName] }),
      });
    },
  };
}

/** Signed reference letters (PDFs), private bucket "reference-letters". */
export const referenceLetters = createBucketClient("reference-letters");

/** General content uploads (documents + images) for Certificates, Skills and
 * Experience entries added through /admin/content. Private bucket "content-uploads". */
export const contentUploads = createBucketClient("content-uploads");
