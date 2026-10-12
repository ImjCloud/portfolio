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

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/references/");
      const result = await response.json();
      setConfigured(result.configured !== false);
      setLetters(result.letters ?? []);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("admin-secret") : null;
    if (saveֻǱ˞