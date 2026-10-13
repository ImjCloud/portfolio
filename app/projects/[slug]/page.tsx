import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Layers3,
} from "lucide-react";
import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ProjectCover } from "@/components/project-cover";
import { AuroraBackground } from "@/components/aurora-background";
import { Reveal } from "@/components/motion/reveal";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}/`;

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: `${project.title} | ${siteConfig.shortName}`,
      description: project.summary,
      siteName: siteConfig.shortName,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line py-14 sm:py-20">
        <AuroraBackground variant="subtle" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_65%_60%_at_20%_0%,black,transparent)]" />
        <div className="container relative">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            <ArrowLeft size={16} />
            All projects
          </Link>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <Reveal>
              <p className="eyebrow">{project.category}</p>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
                {project.title}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
                {project.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <span className="rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand">
                  {project.role}
                </span>

                <span className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-muted">
                  {project.period}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ProjectCover category={project.category} className="aspect-[16/10] shadow-glass-lg" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Metric strip */}
      <section className="border-b border-line bg-surface">
        <div className="container grid gap-4 py-8 sm:grid-cols-3">
          <MetricCard label="Key indicator" value={project.kpi} />
          <MetricCard label="Role" value={project.role} />
          <MetricCard label="Timeframe" value={project.period} />
        </div>
      </section>

      <section className="section container">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.75fr]">
          <div className="grid gap-10">
            <CaseSection
              icon={Gauge}
              label="The challenge"
              content={project.problem}
            />

            <CaseSection
              icon={Layers3}
              label="Approach"
              content={project.approach}
            />

            <CaseSection
              icon={CheckCircle2}
              label="Outcome"
              content={project.outcome}
              highlight
            />
          </div>

          <aside className="h-fit glass-strong rounded-4xl p-6 shadow-glass-lg lg:sticky lg:top-24">
            <ClipboardList className="text-brand" />

            <h2 className="mt-4 text-xl font-semibold text-ink">
              Project snapshot
            </h2>

            <dl className="mt-6 grid gap-5 text-sm">
              <div>
                <dt className="font-semibold text-ink">Role</dt>

                <dd className="mt-1 leading-6 text-muted">
                  {project.role}
                </dd>
              </div>

              <div>
                <dt className="font-semibold text-ink">
                  Tools & methods
                </dt>

                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-brand/10 px-2.5 py-1 text-xs text-brand"
                    >
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="font-semibold text-ink">
                  Key indicator
                </dt>

                <dd className="mt-1 text-brand">{project.kpi}</dd>
              </div>

              <div>
                <dt className="font-semibold text-ink">
                  Deliverables
                </dt>

                <dd className="mt-2 grid gap-2">
                  {project.deliverables.map((item) => (
                    <span key={item} className="flex items-start gap-2 text-muted">
                      <CheckCircle2 size={14} className="mt-1 shrink-0 text-brand" /> {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <Button
              asChild
              variant="brand"
              className="mt-7 w-full"
            >
              <Link href="/contact">
                Discuss a similar challenge
                <ArrowRight size={16} />
              </Link>
            </Button>
          </aside>
        </div>
      </section>
    </>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl px-5 py-4">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-brand">{label}</p>
      <p className="mt-1.5 text-sm font-semibold leading-6 text-ink">{value}</p>
    </div>
  );
}

function CaseSection({
  icon: Icon,
  label,
  content,
  highlight = false,
}: {
  icon: typeof Gauge;
  label: string;
  content: string;
  highlight?: boolean;
}) {
  return (
    <article className={highlight ? "rounded-4xl border border-brand/20 bg-brand/[0.04] p-6" : undefined}>
      <span className="grid size-10 place-items-center rounded-2xl bg-brand/10 text-brand">
        <Icon size={19} />
      </span>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        {label}
      </p>

      <p className="mt-3 text-xl leading-8 text-ink sm:text-2xl">
        {content}
      </p>
    </article>
  );
}
