import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "Projects" };
export default function ProjectsPage() {
  return <><PageHero eyebrow="Projects" title="Selected work across digital transformation and delivery." description="Case studies written to show the business context, the work behind the scenes and the outcome, while respecting client confidentiality."/><section className="section container"><SectionHeading eyebrow="Case-study library" title="From a stalled backlog to a digital-first operation." description="Every case study below reflects verified, hands-on experience."/><div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ProjectCard key={project.slug} project={project}/>)}</div></section></>;
}
