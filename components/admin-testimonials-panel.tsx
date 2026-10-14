"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRatingDisplay } from "@/components/star-rating";

type PendingItem = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  linkedin_url: string | null;
  rating: number;
  recommendation: string;
  email: string | null;
  created_at: string;
};

export function AdminTestimonialsPanel() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState<PendingItem[]>([]);
  const [configured, setConfigured] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/testimonials/admin/", { cache: "no-store" });
      if (response.status === 401) {
        setStatus("idle");
        setUnlocked(false);
        return;
      }
      const result = await response.json();
      setConfigured(result.configured !== false);
      setItems(result.testimonials ?? []);
      setUnlocked(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  async function act(id: string, action: "approve" | "reject") {
    setBusyId(id);
    setActionError(null);
    try {
      const response = await fetch(`/api/testimonials/admin/${action}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error ?? `Request failed (${response.status}).`);
      }
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setBusyId(null);
    }
  }


  async function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setSecret("");
      await load();
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    void load();
  }, [load]);

  if (!unlocked) {
    return (
      <form
        onSubmit={handleUnlock}
        className="max-w-sm rounded-3xl border border-line bg-paper p-6 shadow-card"
      >
        <label className="block text-sm font-semibold text-ink">Admin secret
          <input type="password" value={secret} onChange={(event) => setSecret(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
        </label>
        <Button type="submit" variant="brand" className="mt-4">Unlock</Button>
        {status === "error" ? <p className="mt-3 text-sm text-red-600" role="alert">Login failed. Check the credential and server configuration.</p> : null}
      </form>
    );
  }

  if (!configured) {
    return <p className="rounded-3xl border border-dashed border-line p-8 text-sm text-muted">Supabase environment variables are not set on this deployment yet.</p>;
  }

  if (status === "loading") return <Loader2 className="animate-spin-slow text-brand" />;

  if (items.length === 0) return <p className="rounded-3xl border border-dashed border-line p-8 text-sm text-muted">Nothing pending review.</p>;

  return (
    <div className="grid gap-4">
      {actionError ? <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600" role="alert">{actionError}</p> : null}
      {items.map((item) => (
        <article key={item.id} className="rounded-3xl border border-line bg-paper p-6 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="text-xs text-muted">{[item.role, item.company].filter(Boolean).join(", ")}{item.email ? ` · ${item.email}` : ""}</p>
            </div>
            <StarRatingDisplay value={item.rating} />
          </div>
          <p className="mt-3 text-sm leading-6 text-ink">{item.recommendation}</p>
          {item.linkedin_url ? <a href={item.linkedin_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-brand hover:underline">{item.linkedin_url}</a> : null}
          <div className="mt-4 flex gap-3">
            <Button size="sm" variant="brand" disabled={busyId === item.id} onClick={() => act(item.id, "approve")}><Check size={14} /> Approve</Button>
            <Button size="sm" variant="secondary" disabled={busyId === item.id} onClick={() => act(item.id, "reject")}><X size={14} /> Reject</Button>
          </div>
        </article>
      ))}
    </div>
  );
}
