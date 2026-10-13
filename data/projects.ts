export type Project = {
  slug: string;
  title: string;
  category: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  tools: string[];
  kpi: string;
  state: "published";
  deliverables: string[];
};

export const projects: Project[] = [
  {
    slug: "leadway-withholding-tax-automation",
    title: "Withholding tax receipt automation",
    category: "Pension operations · Workflow automation",
    period: "2025",
    role: "Business Analyst / Project Manager",
    summary: "Supporting requirements translation and workflow validation for automated withholding-tax receipt generation and distribution.",
    problem: "The workflow needed to process transaction schedules, produce PDF receipts, distribute them reliably, and support later retrieval or resend.",
    approach: "Supported the translation of business needs into workflow requirements and UAT validation. The solution ingests transaction schedules, extracts data to SharePoint, generates PDF receipts, distributes them by email, and supports retrieval and resend.",
    outcome: "Project records document 13 UAT scenarios marked passed and client sign-off for production deployment. A job completion certificate lists the role as Business Analyst / Project Manager.",
    tools: ["Power Apps", "SharePoint", "Excel", "Workflow automation", "UAT"],
    kpi: "13 UAT scenarios passed; client production sign-off documented",
    state: "published",
    deliverables: ["Workflow requirements", "UAT scenarios", "Validation records", "Production sign-off evidence"],
  },
  {
    slug: "docflow-digitisation",
    title: "DocFlow digitisation",
    category: "Digital transformation",
    period: "2025 to 2026",
    role: "Business Analyst / Delivery support",
    summary: "Defining and validating digital document-handling and enrolment workflows for a pension operations context.",
    problem: "Paper-based document handling and enrolment workflows created challenges for record capture, retrieval, hand-offs, and consistent processing.",
    approach: "Contributed to requirements gathering, workflow definition, UAT, and end-user documentation for document handling, enrolment, and governance. The described workflows included online forms and scan-to-digital processes, assignment and correction cycles, audit trails, and electronic-signature functionality.",
    outcome: "Produced workflow and user-documentation support for digitisation and process governance. No unverified percentage improvement or claim that the entire document library was digitised is asserted here.",
    tools: ["SharePoint", "Power Apps", "BPMN", "Requirements analysis", "UAT"],
    kpi: "Workflow requirements, UAT, and end-user documentation",
    state: "published",
    deliverables: ["Requirements notes", "Workflow maps", "UAT support", "User manuals"],
  },
  {
    slug: "ekofresh-delivery-stabilisation",
    title: "EkoFresh delivery stabilisation",
    category: "Food-tech platform",
    period: "2023 to 2024",
    role: "Business Analyst / Delivery stabilisation",
    summary: "Revalidating requirements and improving backlog clarity for a mobile food-marketplace delivery effort.",
    problem: "Requirements needed revalidation and clearer prioritisation to support planning, dependencies, and conversations between stakeholders and the delivery team.",
    approach: "Revalidated 40+ requirements, applied MoSCoW prioritisation, and supported sprint planning with clearer acceptance criteria and dependency tracking.",
    outcome: "The project reported a change in feature delivery cycle from around three weeks to around two weeks. Supporting sprint records or project-lead confirmation should be retained before using this metric in formal applications.",
    tools: ["Jira", "Confluence", "Lucidchart", "MoSCoW prioritisation", "Agile / Scrum", "UAT coordination"],
    kpi: "Reported feature cycle: about 3 weeks to 2 weeks",
    state: "published",
    deliverables: ["Prioritised backlog", "Requirements and acceptance criteria", "Dependency tracking", "UAT coordination"],
  },
  {
    slug: "pre-check-verification-platform",
    title: "Pre-Check verification platform",
    category: "HR-tech / API platform",
    period: "2024 to 2025",
    role: "Business Analyst",
    summary: "Clarifying HR verification workflows for an API-enabled pre-employment platform.",
    problem: "Teams needed a shared, testable view of HR workflow requirements and integration expectations for a pre-employment verification product.",
    approach: "Translated HR workflow needs into functional specifications, data-flow diagrams, and integration acceptance criteria, working with engineering to keep requirements testable.",
    outcome: "Provided a documented foundation for delivery and clearer hand-offs across business and engineering, from requirements through UAT and sign-off.",
    tools: ["BRDs", "Data-flow diagrams", "Jira", "API requirements", "UAT"],
    kpi: "Testable requirements across the workflow",
    state: "published",
    deliverables: ["Functional specification", "Data-flow diagrams", "Acceptance criteria", "UAT and sign-off support"],
  },
];

export const publishedProjects = projects;
