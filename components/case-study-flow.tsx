"use client";

import { ArrowRight, CheckCircle2, FileCheck2, Workflow } from "lucide-react";

type FlowStep = {
  title: string;
  detail: string;
};

const flows: Record<string, { eyebrow: string; title: string; steps: FlowStep[] }> = {
  "leadway-withholding-tax-automation": {
    eyebrow: "Illustrative workflow",
    title: "From transaction schedule to retrievable receipt",
    steps: [
      { title: "Receive", detail: "Transaction schedule submitted" },
      { title: "Extract", detail: "Data captured in SharePoint" },
      { title: "Generate", detail: "Receipt produced as PDF" },
      { title: "Distribute", detail: "Receipt sent by email" },
      { title: "Retrieve", detail: "Search, resend and support follow-up" },
    ],
  },
  "docflow-digitisation": {
    eyebrow: "Illustrative workflow",
    title: "A controlled path for document handling",
    steps: [
      { title: "Capture", detail: "Online form or scan-to-digital" },
      { title: "Review", detail: "Check details and completeness" },
      { title: "Assign", detail: "Route to the responsible team" },
      { title: "Correct", detail: "Resolve gaps and resubmit" },
      { title: "Track", detail: "Retain status and audit trail" },
    ],
  },
  "ekofresh-delivery-stabilisation": {
    eyebrow: "Illustrative delivery flow",
    title: "Turning ambiguous requests into sprint-ready work",
    steps: [
      { title: "Discover", detail: "Clarify stakeholder needs" },
      { title: "Validate", detail: "Recheck 40+ requirements" },
      { title: "Prioritise", detail: "Apply MoSCoW and dependencies" },
      { title: "Specify", detail: "Define acceptance criteria" },
      { title: "Plan", detail: "Support sprint planning and UAT" },
    ],
  },
  "pre-check-verification-platform": {
    eyebrow: "Illustrative analysis flow",
    title: "Making verification workflows testable",
    steps: [
      { title: "Elicit", detail: "Understand HR workflow needs" },
      { title: "Model", detail: "Map data flows and hand-offs" },
      { title: "Specify", detail: "Document functional requirements" },
      { title: "Align", detail: "Define integration criteria" },
      { title: "Validate", detail: "Support UAT and sign-off" },
    ],
  },
};

export function CaseStudyFlow({ slug }: { slug: string }) {
  const flow = flows[slug];

  if (!flow) return null;

  return (
    <section className="border-b border-line bg-surface/70" aria-labelledby="case-flow-heading">
      <div className="container py-10 sm:py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{flow.eyebrow}</p>
            <h2 id="case-flow-heading" className="mt-3 max-w-3xl text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
              {flow.title}
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-muted">
            <Workflow size={14} className="text-brand" /> Simplified process view
          </span>
        </div>

        <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {flow.steps.map((step, index) => (
            <li key={step.title} className="relative min-w-0">
              <div className="h-full rounded-2xl border border-line bg-paper p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-glow">
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-8 place-items-center rounded-xl bg-brand/10 font-mono text-xs font-bold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index === flow.steps.length - 1 ? (
                    <CheckCircle2 size={17} className="text-brand" aria-label="Final step" />
                  ) : (
                    <ArrowRight size={16} className="text-muted" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted">
          <FileCheck2 size={14} className="mt-0.5 shrink-0" />
          This is a portfolio-level summary based on the described work, not a reproduction of a confidential client artefact.
        </p>
      </div>
    </section>
  );
}
