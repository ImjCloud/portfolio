import type { NextRequest } from "next/server";

/** Checks the shared admin secret sent as a header. Server-only. */
export function checkAdminSecret(req: NextRequest) {
  const provided = req.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_SECRET;
  return Boolean(expected) && provided === expected;
}
