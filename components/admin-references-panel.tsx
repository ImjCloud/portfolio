"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Letter = { name: string; url: string; size: number | null; uploadedAt: string | null };

function displayName(fileName: string) {
  return fileName.replace(/^\d+-/, "").replace(/\.(pdf|jpe?g|png|webp)$/i, "");
}

function isImageFile(fileName: string) {
  return /\.(jpe?g|png|webp)$/i.test(fileName);
}

export function AdminReferencesPanel() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [configured, setConfigured] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (key: string) => {
    setStatus("loading");
    setUploadError(null);

    try {
      const response = await fetch("/api/references/admin/", {
        headers: { "x-admin-secret": key },
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok) {
        setUnlocked(false);
        setLetters([]);
        setStatus("error");
        setUploadError(response.status === 401 ? "Invalid admin secret." : (result.error ?? "Could not load reference letters."));
        return false;
      }

      setConfigured(result.configured !== false);
      setLetters(result.letters ?? []);
      setUnlocked(true);
      setStatus("idle");
      return true;
    } catch {
      setStatus("error");
      setUploadError("Could not connect to the server. Please try again.");
      return false;
    }
  }, []);

  // The admin secret stays in component memory only; do not persist it in browser storage.
  useEffect(() => {
    setSecret("");
  }, []);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/references/admin/", {
        method: "POST",
        headers: { "x-admin-secret": secret },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error ?? "Upload failed.");

      await load(secret);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(fileName: string) {
    setUploadError(null);

    try {
      const response = await fetch("/api/references/admin/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ fileName }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error ?? "Could not delete that file.");

      setLetters((current) => current.filter((letter) => letter.name !== fileName));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Could not delete that file.");
    }
  }

  if (!unlocked) {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void load(secret);
        }}
        className="max-w-sm rounded-3xl border border-line bg-paper p-6 shadow-card"
      >
        <label className="block text-sm font-semibold text-ink">
          Admin secret
          <input
            type="password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            autoComplete="current-password"
            required
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <Button type="submit" variant="brand" disabled={status === "loading"} className="mt-4">
          {status === "loading" ? "Checking..." : "Unlock"}
        </Button>
        {uploadError ? <p className="mt-3 text-sm text-red-600" role="alert">{uploadError}</p> : null}
      </form>
    );
  }

  if (!configured) {
    return <p className="rounded-3xl border border-dashed border-line p-8 text-sm text-muted">Supabase storage environment variables are not set on this deployment yet. See the README.</p>;
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-dashed border-brand/35 bg-brand/5 p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/jpeg,image/png,image/webp"
          onChange={handleUpload}
          className="hidden"
          id="letter-upload"
        />
        <label htmlFor="letter-upload" className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5">
          {uploading ? <Loader2 size={16} className="animate-spin-slow" /> : <Upload size={16} />}
          {uploading ? "Uploading..." : "Upload a file"}
        </label>
        <p className="mt-3 text-xs text-muted">PDF, JPG, PNG or WEBP, up to 10MB. Reference letters remain private to authenticated admin access.</p>
        {uploadError ? <p className="mt-3 text-sm text-red-600" role="alert">{uploadError}</p> : null}
      </div>

      {status === "loading" ? <Loader2 className="animate-spin-slow text-brand" /> : null}

      {status === "idle" && letters.length === 0 ? <p className="rounded-3xl border border-dashed border-line p-8 text-sm text-muted">No reference letters uploaded yet.</p> : null}

      <div className="grid gap-3">
        {letters.map((letter) => (
          <div key={letter.name} className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-4 shadow-card">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
              {isImageFile(letter.name) ? <ImageIcon size={18} /> : <FileText size={18} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{displayName(letter.name)}</p>
              <a href={letter.url} target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline">Preview</a>
            </div>
            <Button size="sm" variant="secondary" onClick={() => void handleDelete(letter.name)}>
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
