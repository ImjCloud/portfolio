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
    slug: "docflow-digitisation",
    title: "DocFlow digitisation",
    category: "Digital transformation",
    period: "2025 to 2026",
    role: "Project Analyst",
    summary: "Replacing a pension firm's paper-based enrolment and record-management process with a searchable digital workflow.",
    problem: "A pension firm relied entirely on paper-based processes for document storage and client enrolment, creating inefficiencies in record retrieval, data accuracy and overall operational workflow.",
    approach: "I gathered and documented business requirements, identifying pain points across the firm's manual processes. Working with the team, we built a custom document capture application to scan and store hard copy records digitally, while redesigning the enrolment process to replace paper forms with online forms. I then conducted UAT to validate the system and produced user manuals to support staff training and adoption.",
    outcome: "The firm's entire document library was digitised, enabling instant retrieval of records and removing dependence on physical files. The enrolment process became fully digital, reducing processing time and improving data accuracy, with documentation supporting a smooth transition for the team.",
    tools: ["Jira", "Power Apps", "Zoom", "MoSCoW", "Agile / Scrum", "UAT coordination", "Requirements gathering"],
    kpi: "Paper dependency eliminated",
    state: "published",
    deliverables: ["Requirements pack", "Process maps", "UAT plan", "User manuals"],
  },
  {
    slug: "ekofresh-delivery-stabilisation",
    title: "EkoFresh delivery stabilisation",
    category: "Food-tech platform",
    period: "2023 to 2024",
    role: "Business Analyst / Delivery Stabilisation",
    summary: "Stabilising an at-risk mobile food-marketplace where unclear requirements and weak sprint planning had stalled delivery.",
    problem: "The platform was behind schedule due to unvalidated requirements, an unstructured backlog and weak sprint planning, resulting in high carry-over work and eroding stakeholder confidence.",
    approach: "I conducted a full requirements revalidation across 40+ backlog items, applied MoSCoW prioritisation to eliminate noise, and rebuilt the sprint planning structure with clear definition-of-done criteria and explicit dependency tracking in Jira.",
    outcome: "Reduced feature delivery cycle time from three weeks to two (about 30% faster), restored product-engineering alignment, and established a delivery cadence the team sustained through project completion.",
    tools: ["Jira", "Confluence", "Lucidchart", "MoSCoW prioritisation", "Agile / Scrum", "UAT coordination"],
    kpi: "About 30% faster delivery cycle",
    state: "published",
    deliverables: ["Prioritised backlog", "User stories", "Sprint cadence", "UAT coordination"],
  },
  {
    slug: "pre-check-verification-platform",
    title: "Pre-Check verification platform",
    category: "HR-tech / API platform",
    period: "2024 to 2025",
    role: "Business Analyst",
    summary: "Clarifying HR verification workflows for an API-enabled pre-employment platform.",
    problem: "Teams needed a shared, testable view of HR workflow requirements and integration expectations for a new pre-employment verification product.",
    approach: "I translated HR workflow needs into structured functional specifications, data-flow diagrams and integration acceptance criteria, working closely with engineering to keep scope testable.",
    outcome: "Provided an auditable foundation for delivery with clearer hand-offs across business, product and engineering, reducing ambiguity at the definition stage.",
    tools: ["BRDs", "Data-flow diagrams", "Jira", "API requirements"],
    kpi: "Clear, testable requirements across the full workflow",
    state: "published",
    deliverables: ["Functional specification", "Data-flow diagrams", "Acceptance criteria", "Risk log"],
  },
];

export const publishedProjects = projects;
