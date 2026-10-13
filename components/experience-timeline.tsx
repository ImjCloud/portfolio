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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.03em] text-ink">{item.role}</p>
                    <p className="mt-1 font-medium text-brand">{item.company}</p>
                    <p className="mt-1 text-xs text-muted">{item.industry}</p>
                  </div>
                  <div className="text-sm text-muted sm:text-right">
                    <p className="font-mono text-xs">{item.period}</p>
                    <p className="mt-1 inline-flex items-center gap-1"><MapPin size={14} /> {item.location}</p>
                  </div>
                </div>

                <p className="mt-5 leading-7 text-muted">{item.summary}</p>

                <ul className="mt-5 grid gap-3 md:grid-cols-3">
                  {item.achievements.slice(0, isOpen ? undefined : 3).map((achievement) => (
                    <li key={achievement} className="flex gap-2 text-sm leading-6 text-ink">
                      <CheckCircle2 size={16} className="mt-1 shrink-0 text-brand" />
                      {achievement}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="sm:hidden">{isOpen ? "Show less" : "More detail"}</span>
                  <span className="hidden sm:inline">{isOpen ? "Show less" : "Stakeholders, methods & what I took from it"}</span>
                  <ChevronDown size={16} className={cn("shrink-0 transition-transform", isOpen && "rotate-180")} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
                        <div>
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Stakeholders worked with</p>
                          <div className="mt-2 flex flex-wrap gap-2">{item.stakeholders.map((s) => <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-ink">{s}</span>)}</div>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Methodologies</p>
                          <div className="mt-2 flex flex-wrap gap-2">{item.methodologies.map((m) => <span key={m} className="rounded-full border border-line px-3 py-1 text-xs text-ink">{m}</span>)}</div>
                        </div>
                        <p className="sm:col-span-2 rounded-2xl bg-brand/5 p-4 text-sm leading-6 text-ink">
                          <span className="font-semibold text-brand">What this taught me: </span>{item.lesson}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                  {item.tools.slice(0, 6).map((tool) => <span key={tool} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted sm:hidden">{tool}</span>)}
                  {item.tools.length > 6 ? <span className="rounded-full border border-dashed border-line px-3 py-1 text-xs font-medium text-brand sm:hidden">+{item.tools.length - 6} more</span> : null}
                  {item.tools.map((tool) => <span key={`full-${tool}`} className="hidden rounded-full border border-line px-3 py-1 text-xs font-medium text-muted sm:inline-block">{tool}</span>)}
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
