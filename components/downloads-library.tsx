"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Download, ExternalLink, FileText, ImageIcon, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { documentMetadata } from "@/data/downloads";
import { generatedDownloads } from "@/data/downloads.generated";
import { publishedProjects } from "@/data/projects";
import { cn, formatDate } from "@/lib/utils";

type DocumentItem = {
  fileName: string;
  href: string;
  title: string;
  description: string;
  type: string;
  size: string | null;
  updatedAt: string | null;
};

type UploadedDocument = { id: string; title: string; description: string; url: string; source: string; kind: "document" | "image" };

const documents: DocumentItem[] = generatedDownloads.map((document) => {
  const metadata = documentMetadata[document.fileName];
  return {
    ...document,
    title: metadata?.title ?? document.title,
    description: metadata?.description ?? "Downloadable file.",
  };
});

export function DownloadsLibrary({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [uploaded, setUploaded] = useState<UploadedDocument[]>([]);

  useEffect(() => {
    fetch("/api/documents/")
      .then((response) => response.json())
      .then((result: { documents: UploadedDocument[] }) => setUploaded(result.documents ?? []))
      .catch(() => setUploaded([]));
  }, []);

  const visibleDocuments = useMemo(
    () => dֻǱ˞