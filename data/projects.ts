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
    outcome: "The firm's entire document library was digitised, enabling instant retrieval of records and removing dependence on physical files. The enrolment process became fully digital, reducing processing time and improving data accuracy, wiֻǱ˞