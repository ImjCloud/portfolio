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
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const supabaseRest = {
  /** Calls a Postgres function (RPC) with the anon key, restricted by that function's own permissions. */
  rpc: (fnName: string, payload: Record<string, unknown> = {}) =>
    request("anon", `rpc/${fnName}`, { method: "POST", body: JSON.stringify(payload) }),
  /** Public read, restricted by the table's row-level security policy. */
  select: (table: string, query: string) => request("anon", `${table}?${query}`, { method: "GET" }),
  /** Public insert, restricted by the table's row-level security policy.
   * Deliberately uses return=minimal: asking Postgres to hand back the
   * inserted row (return=representation) requires it to pass the table's
   * SELECT policy too, and a brand-new submission is unapproved, so the
   * SELECT policy correctly can't see it yet. That combination raises a
   * misleading "violates row-level security policy" error even though the
   * insert itself succeeded. We only need success/failure here, not the row. */
  insert: (table: string, payload: Record<string, unknown>) =>
    request("anon", table, { method: "POST", body: JSON.stringify(payload), headers: { Prefer: "return=minimal" } }),
  /** Admin-only insert using the service role key, bypasses RLS entirely. Never call from client code. */
  adminInsert: (table: string, payload: Record<string, unknown>) =>
    request("service", table, { method: "POST", body: JSON.stringify(payload), headers: { Prefer: "return=minimal" } }),
  /** Admin-only read using the service role key. Never call from client code. */
  adminSelect: (table: string, query: string) => request("service", `${table}?${query}`, { method: "GET" }),
  /** Admin-only update using the service role key. Never call from client code. */
  adminUpdate: (table: string, id: string, payload: Record<string, unknown>) =>
    request("service", `${table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  /** Admin-only delete using the service role key. Never call from client code. */
  adminDelete: (table: string, id: string) => request("service", `${table}?id=eq.${id}`, { method: "DELETE" }),
};
