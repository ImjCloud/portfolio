"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, CheckCircle2, MapPin } from "lucide-react";
import { experience } from "@/data/site";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase();
}

export function ExperienceTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <ol className="relative mt-12">
      <div aria-hidden="true" className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand via-brand2/60 to-transparent sm:left-[38px]" />
      {experience.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <li key={item.company} className="relative pb-12 pl-16 last:pb-0 sm:pl-24">
            <span className="absolute left-0 top-0 grid size-12 place-items-center rounded-2xl border border-line bg-brand-gradient text-xs font-bold tracking-tight text-white shadow-glow sm:size-[52px]">
              {initials(item.company)}
            </span>
            <Reveal delay={index * 0.06}>
              <article className="rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:border-brand/25 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justֻǱ˞