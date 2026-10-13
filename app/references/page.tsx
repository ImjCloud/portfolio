import type { Metadata } from "next";
import { Download, Linkedin, Mail, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";
import { documentMetadata } from "@/data/downloads";
import { generatedDownloads } from "@/data/downloads.generated";
import { formatDate } from "@/lib/utils";
import { ReferenceLettersList } from "@/components/reference-letters-list";

export const metadata: Metadata = { title: "References" };

const staticReferenceFiles = generatedDownloads.filter((file) => documentMetadata[file.fileName]?.category === "References");

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="References"
        title="Built for verified evidence, not invented praise."
        description="Professional references, recommendation letters and LinkedIn recommendations, shared directly rather than posted here without permission."
      />
      <section className="section container">
        <ReferenceLettersList />

        {staticReferenceFiles.length > 0 ? (
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {staticReferenceFiles.map((file) => {
              const meta = documentMetadata[file.fileName];
              return (
                <a key={file.fileName} href={file.href} download className="group flex items-center gap-4 rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand"><Download size={20} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{meta?.title ?? file.title}</p>
                    <p className="mt-1 text-xs text-muted">Updated {formatDate(file.updatedAt)}</p>
                  </div>
                </a>
              );
            })}
          </div>
        ) : null}

        <div className="mx-auto max-w-2xl rounded-4xl border border-line bg-paper p-8 text-center shadow-card sm:p-12">
          <ShieldCheck size={34} className="mx-auto text-brand" />
          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-ink">Happy to connect you directly with former managers and colleagues.</h2>
          <p className="mt-4 leading-7 text-muted">Rather than publish quotes here without the person&apos;s sign-off, I share verified references, recommendation letters and contact details for former managers directly with hiring teams during the interview process.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"><Mail size={16} /> Request references</a>
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:border-brand/40"><Linkedin size={16} /> View LinkedIn recommendations</a>
          </div>
        </div>
      </section>
    </>
  );
}
