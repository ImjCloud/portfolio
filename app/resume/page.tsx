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

      <section className="section container">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="grid gap-5">
            <article className="rounded-4xl border border-line bg-paper p-7 shadow-card sm:p-9">
              <p className="eyebrow">Professional experience</p>
              <div className="mt-7 grid gap-7">
                {experience.map((item) => (
                  <div key={item.company}>
                    <p className="font-semibold text-ink">{item.role}</p>
                    <p className="mt-1 text-sm text-brand">{item.company}, {item.period}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="overflow-hidden rounded-4xl border border-line bg-paper shadow-card print:hidden">
              <div className="border-b border-line p-6"><p className="eyebrow">Embedded resume</p><p className="mt-2 text-sm text-muted">A live preview of the current PDF. Use the download button above to save your own copy.</p></div>
              <iframe src="/downloads/resume.pdf" title="Oluwadamilola Joseph resume preview" className="h-[70vh] w-full bg-surface" />
            </article>
          </div>

          <div className="grid gap-5">
            <article className="rounded-4xl border border-line bg-paper p-7 shadow-card">
              <GraduationCap className="text-brand" />
              <h2 className="mt-4 text-xl font-semibold text-ink">Education</h2>
              <div className="mt-5 grid gap-4">
                {education.map((item) => (
                  <div key={item.school}>
                    <p className="text-sm font-semibold text-ink">{item.school}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{item.qualification}<br />{item.period}</p>
                    {"note" in item && item.note ? <p className="mt-1 text-xs leading-5 text-muted italic">{item.note}</p> : null}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-4xl border border-line bg-paper p-7 shadow-card">
              <Award className="text-brand" />
              <h2 className="mt-4 text-xl font-semibold text-ink">Credentials</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {certifications.map((item) => <span key={item.name} className="rounded-full bg-brand/10 px-3 py-2 text-xs font-medium text-brand">{item.name}</span>)}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-4xl bg-brand-gradient p-7 text-white">
              <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/15 blur-2xl" />
              <Trophy className="text-accent" />
              <h2 className="mt-4 text-xl font-semibold">Leadership & recognition</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/80">
                {leadership.slice(0, 3).map((item) => <li key={item.title}>{item.title}</li>)}
              </ul>
            </article>

            <article className="flex items-center gap-5 rounded-4xl border border-line bg-paper p-6 shadow-card print:hidden">
              {/* Rendered client-side by a public QR service; no personal data beyond the public resume URL is sent. */}
              <Image src={qrCodeSrc} alt="QR code linking to the online resume" width={88} height={88} unoptimized className="rounded-xl border border-line" />
              <div>
                <p className="text-sm font-semibold text-ink">Scan to open on another device</p>
                <p className="mt-1 text-xs leading-5 text-muted">Links straight to the PDF at {resumeUrl.replace("https://", "")}</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
