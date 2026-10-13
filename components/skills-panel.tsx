"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "@/data/site";
import { ToolsGrid } from "@/components/tools-grid";
import { cn } from "@/lib/utils";

const groupCopy: Record<string, string> = {
  "Business analysis": "The core discipline, turning ambiguous asks into requirements a team can build against.",
  "Agile delivery": "How the work actually gets shipped: cadence, prioritisation and validation loops.",
  "Data & reporting": "Making performance and progress visible to the people who need to make decisions. SQL is a current development focus.",
  "Product & collaboration": "The day-to-day toolkit for keeping business, product and engineering in sync.",
  "Tools & platforms in progress": "Azure DevOps has been studied through dedicated coursework; the rest are next on the list. None of these are claimed as production experience yet.",
};

export function SkillsPanel() {
  const [active, setActive] = useState(0);
  const activeGroup = skillGroups[active];

  return (
    <div>
      <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="tablist" aria-label="Skill categories">
        {skillGroups.map((group, index) => (
          <button
            key={group.title}
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              "min-h-11 shrink-0 snap-start whitespace-nowrap rounded-full px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              active === index ? "bg-brand-gradient text-white shadow-glow" : "border border-line bg-paper text-muted hover:border-brand/40 hover:text-ink",
            )}
          >
            {group.title}
          </button>
        ))}
      </div>

      <div className="relative mt-6 min-h-[220px] overflow-hidden rounded-4xl border border-line bg-paper p-7 shadow-card sm:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-xl text-sm leading-6 text-muted">{groupCopy[activeGroup.title] ?? "A practical part of the delivery toolkit."}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {activeGroup.skills.map((skill, index) => {
                const developing = skill.toLowerCase().includes("in progress");
                const label = skill.replace(/\s*\(in progress\)\s*/i, "");
                return (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.045 }}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/[0.06]"
                  >
                    {label}
                    {developing ? <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">Developing</span> : null}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Tools in practice</p>
        <div className="mt-4"><ToolsGrid /></div>
      </div>
    </div>
  );
}
