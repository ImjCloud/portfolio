"use client";

import { useEffect, useState } from "react";
import { Download, FileText, ImageIcon } from "lucide-react";

type Letter = { name: string; url: string; size: number | null; uploadedAt: string | null };
type ApiResponse = { configured: boolean; letters: Letter[] };

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

/** Strips the internal timestamp prefix we add on upload for a friendlier display name. */
function displayName(fileName: string) {
  return fileName.replace(/^\d+-/, "").replace(/\.(pdf|jpe?g|png|webp)$/i, "");
}

function isImageFile(fileName: string) {
  return /\.(jpe?g|png|webp)$/i.test(fileName);
}

export function ReferenceLettersList() {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [data, setData] = useState<ApiResponse>({ configured: true, letters: [] });

  useEffect(() => {
    fetch("/api/references/")
      .then((response) => response.json())
      .then((result: ApiResponse) => {
        setData(result);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, []);

  if (state === "loading") {
    return <div className="grid gap-4 sm:grid-cols-2">{[0, 1].map((key) => <div key={key} className="h-24 animate-pulse rounded-3xl border border-line bg-surface" />)}</div>;
  }

  if (state === "error" || !data.configured || data.letters.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 grid gap-4 sm:grid-cols-2">
      {data.letters.map((letter) => (
        <a key={letter.name} href={letter.url} download className="group flex items-center gap-4 rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">{isImageFile(letter.name) ? <ImageIcon size={20} /> : <FileText size={20} />}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{displayName(letter.name)}</p>
            <p className="mt-1 text-xs text-muted">{formatSize(letter.size)}</p>
          </div>
          <Download size={16} className="shrink-0 text-muted transition group-hover:text-brand" />
        </a>
      ))}
    </div>
  );
}
