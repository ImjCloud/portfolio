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
  if (!teֻǱ˞