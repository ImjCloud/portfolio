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
    () => documents.filter((document) => [document.title, document.description].join(" ").toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const visibleUploaded = useMemo(
    () => uploaded.filter((document) => [document.title, document.description].join(" ").toLowerCase().includes(query.toLowerCase())),
    [uploaded, query],
  );

  const caseStudies = compact ? publishedProjects.slice(0, 2) : publishedProjects;
  const uploadedToShow = compact ? visibleUploaded.slice(0, 3) : visibleUploaded;

  return (
    <div>
      {!compact ? (
        <label className="relative block max-w-md">
          <span className="sr-only">Search downloads</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the resume and case studies" className="glass h-12 w-full rounded-2xl pl-11 pr-4 text-base text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20" />
        </label>
      ) : null}

      <div className={cn("mt-7 grid gap-4", compact ? "lg:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3")}>
        {visibleDocuments.map((document) => <DownloadCard key={document.fileName} document={document} />)}
        {uploadedToShow.map((document) => <UploadedDocumentCard key={document.id} document={document} />)}
        {caseStudies.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}/`} className="group flex min-h-72 flex-col rounded-3xl border border-line bg-paper p-5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-glow">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"><ExternalLink size={21} /></span>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">{project.category}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 border-t border-line pt-5 text-sm font-semibold text-brand transition group-hover:gap-2.5">Read case study <ArrowUpRight size={16} /></span>
          </Link>
        ))}
      </div>

      {!compact && visibleDocuments.length === 0 && visibleUploaded.length === 0 ? <p className="mt-8 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">No documents match that search.</p> : null}
      {compact ? <p className="mt-6 text-sm text-muted">Visit the downloads library for the resume and every case study.</p> : null}
    </div>
  );
}

function UploadedDocumentCard({ document }: { document: UploadedDocument }) {
  const isImage = document.kind === "image";
  return (
    <article className="group flex min-h-72 flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-glow">
      {isImage ? (
        <div className="relative aspect-[16/9] w-full bg-surface">
          <Image src={document.url} alt={document.title} fill sizes="(min-width: 640px) 400px, 100vw" className="object-cover" unoptimized />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          {!isImage ? <span className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"><FileText size={21} /></span> : <span />}
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">{document.source}</span>
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">{document.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{document.description}</p>
        <div className="mt-auto flex gap-2 border-t border-line pt-4">
          <a href={document.url} target="_blank" rel="noreferrer" className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-3 text-xs font-semibold text-ink transition hover:border-brand/40 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">{isImage ? <ImageIcon size={14} /> : <ExternalLink size={14} />} Preview</a>
          <a href={document.url} download className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 text-xs font-semibold text-paper transition hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><Download size={14} /> Download</a>
        </div>
      </div>
    </article>
  );
}

function DownloadCard({ document }: { document: DocumentItem }) {
  const isPdf = document.type.toLowerCase() === "pdf";
  return (
    <article className="group flex min-h-72 flex-col rounded-3xl border border-brand/25 bg-paper p-5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-brand/10 text-brand"><FileText size={21} /></span>
        <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">{document.type}</span>
      </div>
      <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">Resume</p>
      <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">{document.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{document.description}</p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-5 text-xs text-muted"><span>{document.size}</span><span>Updated {formatDate(document.updatedAt)}</span></div>
      <div className="mt-4 flex gap-2 border-t border-line pt-4">
        {isPdf ? <a href={document.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-3 text-xs font-semibold text-ink transition hover:border-brand/40 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><ExternalLink size={14} /> Preview</a> : null}
        <a href={document.href} download className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-3 text-xs font-semibold text-paper transition hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><Download size={14} /> Download</a>
      </div>
    </article>
  );
}
