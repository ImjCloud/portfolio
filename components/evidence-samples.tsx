"use client";

import { ClipboardCheck, FileText, GitBranch, ShieldCheck } from "lucide-react";

type EvidenceSample = {
  type: string;
  title: string;
  purpose: string;
  sampleLabel: string;
  sample: string;
};

const samples: Record<string, EvidenceSample[]> = {
  "leadway-withholding-tax-automation": [
    {
      type: "UAT test case",
      title: "Generate and distribute a receipt",
      purpose: "Validate the key path from an accepted transaction schedule to an emailed PDF receipt.",
      sampleLabel: "Illustrative acceptance checks",
      sample: "Given a valid transaction schedule is available, when processing completes, then the receipt contains the expected transaction details, is generated as a PDF, and is queued for the intended email recipient.",
    },
    {
      type: "Exception scenario",
      title: "Handle incomplete transaction data",
      purpose: "Make exception behaviour explicit before sign-off.",
      sampleLabel: "Validation question",
      sample: "If a required field is missing, should the record be rejected, held for correction, or processed with an exception status? Agree the rule with the process owner and record the expected outcome.",
    },
    {
      type: "Traceability",
      title: "Connect requirement to evidence",
      purpose: "Keep a clear link between business need, test execution and approval.",
      sampleLabel: "Example trace",
      sample: "Requirement → acceptance criteria → UAT case → execution result → defect or exception reference → business sign-off.",
    },
  ],
  "docflow-digitisation": [
    {
      type: "Business rule",
      title: "Route incomplete submissions",
      purpose: "Clarify how the workflow should respond when submitted documents need correction.",
      sampleLabel: "Illustrative rule",
      sample: "When required information is missing, set the item to Correction required, assign it to the responsible party, preserve the audit history, and allow resubmission without losing the prior record.",
    },
    {
      type: "Process control",
      title: "Preserve an auditable hand-off",
      purpose: "Define the minimum information captured at each assignment or status change.",
      sampleLabel: "Suggested fields",
      sample: "Record ID · previous status · new status · assigned team · timestamp · action owner · correction note.",
    },
    {
      type: "UAT scenario",
      title: "Resubmit a corrected document",
      purpose: "Check the correction loop from the user's perspective.",
      sampleLabel: "Expected outcome",
      sample: "The corrected submission is linked to the original record, returns to the agreed review step, and retains a history of the correction and reassignment.",
    },
  ],
  "ekofresh-delivery-stabilisation": [
    {
      type: "User story",
      title: "Clarify a marketplace requirement",
      purpose: "Show how a stakeholder need can be expressed as testable delivery work.",
      sampleLabel: "Illustrative story",
      sample: "As a marketplace customer, I want to review the key details of an order before confirming it, so that I can identify errors before submission.",
    },
    {
      type: "Acceptance criteria",
      title: "Define a testable outcome",
      purpose: "Reduce ambiguity between business, design, engineering and QA.",
      sampleLabel: "Example checks",
      sample: "Given an order is ready for review, when the customer opens the confirmation step, then the agreed order details are visible and the customer can return to edit before final submission.",
    },
    {
      type: "Prioritisation",
      title: "Make scope trade-offs visible",
      purpose: "Support sprint planning when capacity or dependencies change.",
      sampleLabel: "Decision record",
      sample: "Classify each item as Must, Should, Could or Won't for the current scope; record the business rationale, dependency and decision owner before sprint commitment.",
    },
  ],
  "pre-check-verification-platform": [
    {
      type: "Functional requirement",
      title: "Define a verification status",
      purpose: "Create a shared, testable rule for workflow status handling.",
      sampleLabel: "Illustrative requirement",
      sample: "The platform shall display the current verification status and last update timestamp to authorised users, using the status definitions agreed with the business owner.",
    },
    {
      type: "Integration criterion",
      title: "Specify a service response",
      purpose: "Make integration behaviour understandable to engineering and QA.",
      sampleLabel: "Questions to resolve",
      sample: "Define required request fields, success response, validation errors, timeout behaviour, retry rules, correlation ID and how duplicate requests are handled.",
    },
    {
      type: "UAT scenario",
      title: "Validate an end-to-end hand-off",
      purpose: "Check that a verification request moves between agreed workflow states.",
      sampleLabel: "Expected evidence",
      sample: "Capture test data reference, initial state, action performed, expected result, actual result, pass/fail status and defect reference where relevant.",
    },
  ],
};

const icons = [FileText, ClipboardCheck, GitBranch];

export function EvidenceSamples({ slug }: { slug: string }) {
  const items = samples[slug];

  if (!items) return null;

  return (
    <section className="border-y border-line bg-paper" aria-labelledby="evidence-samples-heading">
      <div className="container py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Evidence library · Illustrative samples</p>
          <h2 id="evidence-samples-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
            See how the analysis becomes delivery-ready.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            These are portfolio examples created to demonstrate analysis technique. They are not original client files, approved project records, or claims about the exact wording used in delivery.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={item.title} className="flex h-full flex-col rounded-3xl border border-line bg-surface p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-glow sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand">
                    <Icon size={14} /> {item.type}
                  </span>
                  <ShieldCheck size={17} className="shrink-0 text-muted" aria-label="Illustrative sample" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.purpose}</p>
                <div className="mt-5 rounded-2xl border border-line bg-paper p-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">{item.sampleLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-ink">{item.sample}</p>
                </div>
                <p className="mt-auto pt-4 text-[11px] font-medium uppercase tracking-[0.1em] text-muted">Illustrative · Anonymised · Not a client artefact</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
