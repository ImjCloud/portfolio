// Minimal server-side Supabase REST client built on plain fetch.
// Avoids adding @supabase/supabase-js as a dependency; talks to PostgREST directly.
// All functions here must only ever be called from server code (API routes),
// never imported into a "use client" component, since the service-role key
// must never reach the browser.

type SupabaseCreds = { url: string; key: string };

function getCreds(role: "anon" | "service"): SupabaseCreds | null {
  const url = process.env.SUPABASE_URL;
  const key = role === "service" ? process.env.SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export function isSupabaseConfigured(role: "anon" | "service" = "anon") {
  return getCreds(role) !== null;
}

async function request(role: "anon" | "service", path: string, init: RequestInit = {}) {
  const creds = getCreds(role);
  if (!creds) throw new Error("Supabase is not configured on this deployment yet.");

  const response = await fetch(`${creds.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: creds.key,
      Authorization: `Bearer ${creds.key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Supabase request failed (${response.status}): ${text}`);
  }

  const text = await response.text();
  if (!text) return nulֻǱ˞