import type { Metadata } from "next";
import { ArrowDownToLine, FileStack } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { DownloadsLibrary } from "@/components/downloads-library";

export const metadata: Metadata = { title: "Downloads" };

export default function DownloadsPage() {
  return (
    <>
      <PageHero eyebrow="Downloads" title="Resume and case studies in one place." description="The current CV and every published case study, kept in sync with the rest of this site.">
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-2"><ArrowDownToLine size={16} className="text-brand" /> Native browser downloads</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-2"><FileStack size={16} className="text-brand" /> PDF preview supported</span>
        </div>
      </PageHero>
      <section className="section container">
        <DownloadsLibrary />
      </section>
    </>
  );
}
