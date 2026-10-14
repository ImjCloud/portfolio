export const siteConfig = {
  name: "Oluwadamilola John Joseph",
  shortName: "Oluwadamilola Joseph",
  title: "Digital Technology Business Analyst | Workflow Automation",
  description:
    "Portfolio and CV of Oluwadamilola John Joseph, a digital technology Business Analyst focused on requirements engineering, workflow automation, Agile delivery, UAT and digital transformation across SaaS, fintech, HR-tech, pensions and operations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://oluwadamilola-cv.vercel.app",
  email: "jholuwadamilola@gmail.com",
  phone: "+234 706 470 6095",
  location: "Lagos, Nigeria",
  locationLong: "Lagos, Nigeria. Actively planning relocation to the UK",
  linkedin: "https://www.linkedin.com/in/oluwadamilola-joseph-578088b0",
  // Add a real Calendly (or similar) link here to show a "Book a call" option on /contact.
  calendlyUrl: "https://calendar.app.google/n7yt96xvFxCVWCx9A" as string,
  relocation: "Actively planning relocation to the UK",
  sponsorship: "Requires visa sponsorship",
};

export const navigation = [
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Work" },
  { href: "/skills/", label: "Skills" },
  { href: "/downloads/", label: "Downloads" },
  { href: "/contact/", label: "Contact" },
  { href: "/certifications/", label: "Certifications" },
  { href: "/testimonials/", label: "Testimonials" },
] as const;

export const stats = [
  { value: 3, suffix: "+", label: "Years delivering digital products" },
  { value: 30, suffix: "%", label: "Reported faster feature delivery" },
  { value: 40, suffix: "+", label: "Requirements revalidated on one platform" },
  { value: 25, suffix: "%", label: "Less manual reporting preparation" },
];

export const recruiterFacts = [
  { label: "Location", value: "Lagos, Nigeria (GMT+1)" },
  { label: "Open to", value: "UK remote and hybrid roles" },
  { label: "Notice period", value: "2 weeks" },
  { label: "Visa sponsorship", value: "Requires sponsorship" },
];

export const experience = [
  {
    company: "Pro-ICE Limited",
    role: "Business Analyst / Project Manager",
    period: "2023 to Present",
    location: "Remote, Lagos & Abuja, Nigeria",
    industry: "SaaS, fintech, HR-tech, pensions & food-tech",
    summary:
      "End-to-end ownership of requirements, delivery coordination and sprint execution for enterprise SaaS platforms across fintech, HR-tech and food-tech.",
    achievements: [
      "Led a remote cross-functional delivery team of 12 to 18 across engineering, QA, design and stakeholders.",
      "Stabilised the EkoFresh food platform mid-execution, reducing average feature delivery cycle from three weeks to two (about 30% faster).",
      "Used Visio to map \u201cAs-Is\u201d and \u201cTo-Be\u201d process states adhering to BPMN 2.0 and UML standards, cutting requirement ambiguity and rework by around 30% across 5+ platform features.",
      "Directed AI tools, as prompt designer and reviewer, to transcribe stakeholder interviews, summarise user needs and draft first-pass gap analyses and user stories, with every output validated and refined before use.",
      "Delivered requirements and delivery coordination for Pre-Check, an API-enabled pre-employment verification platform.",
      "Maintained full traceability from business objectives through user stories, test cases, and release outcomes, improving sprint predictability and reducing carry-over work by eliminating ambiguity at the definition stage.",
      "Redesigned delivery reporting dashboards, cutting manual data preparation time by 25% and improving executive visibility, and tracked stakeholder account continuity using HubSpot CRM.",
      "Used SharePoint for secure document transfer and monitoring on a client engagement requiring controlled file governance.",
      "Authored Business Requirements Documents (BRDs), functional specifications, user stories, sprint reports, risk logs, user manual and retrospective summaries, maintaining a complete and auditable delivery record throughout each engagement."
    ],
    stakeholders: ["Engineering", "QA", "Product design", "CTO/CIO", "Client sponsors", "Executive stakeholders"],
    methodologies: ["Scrum", "Kanban", "MoSCoW prioritisation","Gap Analysis", "UAT coordination", "Risk & change management", "Process mapping (BPMN/UML)", "BRD writing", "User story mapping", "Acceptance criteria definition", "Requirements elicitation", "Stakeholder Management"],
    lesson: "Revalidating requirements early, before they reach a sprint, prevents most of the rework that later erodes stakeholder confidence.",
    tools: ["Jira", "Confluence", "Lucidchart", "Miro", "Power BI", "Microsoft Office Suite", "SQL", "Visio", "Azure DevOps", "Microsoft Teams", "Slack", "SharePoint", "Google Workspace", "HubSpot CRM", "AI-assisted analysis"],
  },
  {
    company: "Dana Air",
    role: "Business Process & Performance Analyst (NYSC Placement / Contract)",
    period: "2023 to 2024",
    location: "Lagos, Nigeria",
    industry: "Aviation (regulated operations)",
    summary:
      "National Youth Service Corps (NYSC) placement, Nigeria's mandatory one-year national service programme, undertaken concurrently with the fully remote Pro-ICE role. Supported operational process improvement and HR performance management in a regulated, high-compliance aviation environment.",
    achievements: [
      "Designed a KPI tracking framework across multiple departments that lifted operational productivity by 40%.",
      "Reduced onboarding time by 25% by documenting workflows and introducing standardised checklists.",
      "Improved budget-planning visibility by 25% through accurate, data-backed forecasting reports.",
      "Documented HR compliance processes and SOPs to keep the organisation audit ready.",
      "Analysed employee performance data to identify training gaps and inform targeted learning and development interventions, directly contributing to improved knowledge retention and operational consistency.",
    ],
    stakeholders: ["HR leadership", "Department heads & Operations", "Compliance & audit"],
    methodologies: ["KPI framework design", "Process mapping", "Gap analysis"],
    lesson: "In a regulated environment, a documented process is only as useful as the checklist that makes it repeatable for the next person.",
    tools: ["Excel", "KPI reporting", "Process mapping", "SOPs"],
  },
  {
    company: "ImjBlack Group",
    role: "Founder & Consultant",
    period: "2016 to 2023",
    location: "Nigeria",
    industry: "Multi-sector consultancy (side business)",
    summary:
      "Founded and operated a diversified consultancy as a side business throughout a seven-year period of full-time undergraduate study, delivering project management, business advisory, real estate and fintech payment services across multiple sectors.",
    achievements: [
      "Developed and managed alternative payment solutions for students, run remotely, facilitating access to educational fee payments and resolving infrastructural barriers to school fee payments.",
      "Brokered residential and agricultural land transactions, and coordinated agricultural project oversight on weekends, including the Safara Farm project, managing vendor relationships and on-site workflows.",
      "Delivered academic consulting and research support, including project guidance, research methodology, documentation and report writing.",
      "Applied project management frameworks to coordinate cross-sector deliverables and client relationships across fintech, real estate, education and agribusiness, alongside full-time academic commitments.",
    ],
    stakeholders: ["Clients", "Vendors", "Contractors", "Students & families"],
    methodologies: ["Project management", "Client advisory", "Operations planning"],
    lesson: "Running a consultancy end to end, from client conversation to delivery, is what first taught me that requirements and relationships have to move together.",
    tools: ["Project management", "Client advisory", "Operations"],
  },
];

export const skillGroups = [
  { title: "Business analysis", skills: ["Requirements elicitation", "BRD writing", "User story mapping", "Acceptance criteria", "Process mapping (BPMN 2.0, UML)", "Value stream mapping", "Business process reengineering", "Root cause analysis", "Fit-gap analysis", "MoSCoW prioritisation"] },
  { title: "Agile delivery", skills: ["Scrum", "Kanban", "Hybrid SDLC", "Sprint planning & retros", "UAT coordination & defect triage", "Risk & change management"] },
  { title: "Data & reporting", skills: ["Power BI", "Excel", "SQL (in progress)", "Data modelling", "KPI reporting", "Data visualisation", "Delivery forecasting"] },
  { title: "Product & collaboration", skills: ["Jira", "Confluence", "Trello", "Lucidchart", "Miro", "Notion", "Power Apps", "Google Workspace", "Canva", "AI-assisted analysis", "Zoom", "Microsoft Teams", "Slack", "Visio", "SharePoint", "HubSpot CRM"] },
  { title: "Tools & platforms in progress", skills: ["Azure DevOps (in progress)", "Draw.io (in progress)", "Postman (in progress)", "Tableau (in progress)", "Figma (in progress)", "Google Analytics (in progress)"] },
];

// Tools actually used day to day ("used"), plus tools that are common in UK BA / Agile
// delivery job descriptions and genuinely on the learning list ("learning"). Nothing here
// is claimed as mastered unless it has real, resume-backed usage behind it.
export const toolLibrary = [
  { name: "Jira", status: "used" },
  { name: "Confluence", status: "used" },
  { name: "Trello", status: "used" },
  { name: "Lucidchart", status: "used" },
  { name: "Miro", status: "used" },
  { name: "Notion", status: "used" },
  { name: "Power BI", status: "used" },
  { name: "Excel", status: "used" },
  { name: "Power Apps", status: "used" },
  { name: "Google Workspace", status: "used" },
  { name: "Canva", status: "used" },
  { name: "AI-assisted analysis", status: "used" },
  { name: "Zoom", status: "used" },
  { name: "Microsoft Teams", status: "used" },
  { name: "Slack", status: "used" },
  { name: "SharePoint", status: "used" },
  { name: "HubSpot CRM", status: "used" },
  { name: "Visio", status: "used" },
  { name: "SQL", status: "learning" },
  { name: "Data modelling", status: "learning" },
  { name: "Azure DevOps", status: "learning" },
  { name: "Draw.io", status: "learning" },
  { name: "Postman", status: "learning" },
  { name: "Tableau", status: "learning" },
  { name: "Figma", status: "learning" },
  { name: "Google Analytics", status: "learning" },
] as const;

export const certifications = [
  { name: "Practitioner Certificate in Business Analysis Practice", organisation: "BCS", status: "Planned" },
  { name: "Practitioner Certificate in Requirements Engineering", organisation: "BCS", status: "Planned" },
  { name: "Agile Scrum Master", organisation: "Professional credential", status: "Completed" },
  { name: "Jira Project Management", organisation: "Professional credential", status: "Completed" },
  { name: "Advanced Agile Methodology", organisation: "Professional credential", status: "Completed" },
  { name: "Foundations of Scrum", organisation: "Professional credential", status: "Completed" },
  { name: "Business Process Management & Improvement", organisation: "Professional credential", status: "Completed" },
  { name: "Data Collection & Visualisation", organisation: "Professional credential", status: "Completed" },
];

export const education = [
  {
    school: "Federal University of Agriculture, Abeokuta (FUNAAB)",
    qualification: "B.Sc. Environmental Management, Second Class Upper, CGPA 4.09 / 5.00",
    period: "2016 to 2023",
    note: "Programme duration extended from the standard 5 years due to nationwide ASUU (Academic Staff Union of Universities) strike actions affecting Nigerian public universities during this period.",
  },
  {
    school: "Edubridge International School",
    qualification: "Global Financial Analysts, Accounting and Finance",
    period: "2025",
  },
  {
    school: "American Museum of Natural History",
    qualification: "Certificate programme, Ecology",
    period: "2019",
  },
];

export const leadership = [
  { title: "Student Representative Assembly (SRA) member", detail: "Represented the student body in university governance, policy and programme decisions." },
  { title: "Chairman, Audit Committee, Student Representative Assembly", detail: "Oversaw accountability for over ₦10M in financial allocations across departmental programmes." },
  { title: "Excel & SPSS Tutor", detail: "Privately tutored 100+ university students in data tools and research methods, lifting cohort pass rates by around 60%." },
  { title: "Media Team Lead, NYSC", detail: "Led a volunteer media team delivering communications and coverage for national service programmes." },
  { title: "Parliamentarian of the Year & 5x Best Head of Class", detail: "Recognised for leadership, academic excellence and peer engagement across undergraduate tenure." },
  { title: "TESOL volunteer", detail: "Helped teach English to non-English speakers in the community." },
  { title: "Tree Planting Programme, Abeokuta", detail: "Organised and raised over ₦6M for a tree-planting programme in Abeokuta, Nigeria." },
];
