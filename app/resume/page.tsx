import type { Metadata } from "next";
import Image from "next/image";
import { Award, Download, GraduationCap, Trophy } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/print-button";
import { certifications, education, experience, leadership, siteConfig } from "@/data/site";
import { generatedDownloads } from "@/data/downloads.generated";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Resume" };

const resumeFile = generatedDownloads.find((file) => file.fileName === "resume.pdf");
const resumeUrl = `${siteConfig.url}/downloads/resume.pdf`;
const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(resumeUrl)}`;

export default function ResumePage() {
  return (
    <>
      <PageHero eyebrow="Resume" title="A concise record of delivery, analysis and leadership." description="Download the full CV, print it, or scan the QR code to open it on another device.">
        <div className="mt-7 flex flex-wrap items-center gap-3 print:hidden">
          <Button asChild size="lg" variant="brand"><a href="/downloads/resume.pdf" download><Download size={18} /> Download PDF resume</a></Button>
          <PrintButton />
          {resumeFile ? <span className="text-sm text-muted">Last updated {formatDate(resumeFile.updatedAt)}</span> : null}
        </div>
      </PageHero>

      <sectiֻǱ˞