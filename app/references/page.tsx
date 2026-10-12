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
ֻǱ˞