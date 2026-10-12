import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCover } from "@/components/project-cover";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-4xl border border-line bg-paper p-3 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-glow">
      <ProjectCover category={project.category} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">{project.category}</p>
          <span className="shrink-0 text-xs text-muted">{project.period}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-ink">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.slice(0, 3).map((tool) => <span key={tool} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">{tool}</span>)}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="text-sm font-semibold text-ink">{project.kpi}</span>
          <Link href={`/projects/${projֻǱ˞