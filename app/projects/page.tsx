import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FileCheck2, GitBranch, Workflow } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "Projects" };

const evidencePath = [
  {
    number: "01",
    title: "Production validation",
    project: "Withholding tax receipt automation",
    slug: "leadway-withholding-tax-automation",
    evidence: "13 UAT scenarios marked passed and client production sign-off documented.",
    icon: CheckCircle2,
  },
  {
    number: "02",
    title: "Requirements engineering",
    project: "Pre-Check verification platform",
    slug: "pre-check-verification-platform",
    evidence: "Functional specifications, data-flow diagrams, integration acceptance criteria and UAT support.",
    icon: FileCheck2,
  },
  {
    number: "03",
    title: "Delivery stabilisation",
    project: "EkoFresh delivery stabilisation",
    slug: "ekofresh-delivery-stabilisation",
    evidence: "40+ requirements revalidated and prioritised. The reported cycle-time improvement is clearly qualified in the case study.",
    icon: GitBranch,
  },
  {
    number: "04",
    title: "Digital workflow design",
    project: "DocFlow digitisation",
    slug: "docflow-digitisation",
    evidence: "Workflow definition, UAT support and end-user documentation, without unsupported percentage claims.",
    icon: Workflow,
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected work across digital transformation and delivery."
        description="Case studies written to show the business context, the work behind the scenes and the outcome, while respecting client confidentiality."
      />
      <section className="section container">
        <SectionHeading
          eyebrow="A guided reading path"
          title="Hiring managers: start with the evidence."
          description="A quick route through four examples of production validation, requirements engineering, delivery stabilisation and workflow digitisation."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {evidencePath.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}/`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-[0.14em] text-brand">{item.number}</span>
                  <Icon size={19} className="text-brand" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-base font-semibold text-ink">{item.title}</h2>
                <p className="mt-1 text-sm font-medium text-muted">{item.project}</p>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted">{item.evidence}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Read case study <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-16">
          <SectionHeading
            eyebrow="Case-study library"
            title="Explore the full delivery story."
            description="Each case study separates the business problem, my contribution, the delivery approach and the evidence available for the outcome."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>
    </>
  );
}
