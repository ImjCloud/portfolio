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
        <article key={item.id} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow">
          {item.imageUrl ? (
            <div className="relative aspect-[16/9] w-full bg-surface">
              <Image src={item.imageUrl} alt={item.name} fill sizes="(min-width: 640px) 400px, 100vw" className="object-cover" unoptimized />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
            {item.description ? <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p> : null}
            {item.tools ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tools.split(",").map((tool) => tool.trim()).filter(Boolean).map((tool) => (
                  <span key={tool} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">{tool}</span>
                ))}
              </div>
            ) : null}
            {item.fileUrl ? (
              <a href={item.fileUrl} download className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand transition active:scale-[0.97]">
                <FileText size={15} /> {item.fileName ? item.fileName.replace(/^\d+-/, "") : "Download document"} <Download size={14} />
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
