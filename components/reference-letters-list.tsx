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

  if (state === "error" || !data.configured || data.letters.lengthֻǱ˞