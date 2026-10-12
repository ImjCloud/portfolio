"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, FileText } from "lucide-react";

type ContentItem = {
  id: string;
  name: string;
  description: string | null;
  tools: string | null;
  fileUrl: string | null;
  fileName: string | null;
  imageUrl: string | null;
};

type ApiResponse = { configured: boolean; items: ContentItem[] };

export function DynamicContentList({ section }: { section: "certificates" | "skills" | "experience" }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [data, setData] = useState<ApiResponse>({ configured: true, items: [] });

  useEffect(() => {
    fetch(`/api/content/?section=${section}`)
      .then((response) => response.json())
      .then((result: ApiResponse) => {
        setData(result);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, [section]);

  if (state === "loading") {
    return <div className="grid gap-4 sm:grid-cols-2">{[0, 1].map((key) => <div key={key} className="h-40 animate-pulse rounded-3xl border border-line bg-surface" />)}</div>;
  }

  if (state === "error" || !data.configured || data.items.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {data.items.map((item) => (
        <article key={item.id} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-card transition duration-300 hover:-translate-y-1ֻǱ˞