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
            clasֻǱ˞