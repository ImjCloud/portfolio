"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { VisitorCounterBadge } from "@/components/visitor-counter-badge";

const velocity = [46, 52, 49, 58, 55, 66, 72];

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-brand/20 blur-[80px]" />

      {/* Portrait, the primary visual */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative overflow-hidden rounded-[2rem] p-2.5 shadow-glass-lg"
      >
        <Image
          src="/images/profile/oluwadamilola.png"
          alt="Oluwadamilola John Joseph, Business Analyst and Agile Delivery Specialist"
          width={640}
          height={780}
          priority
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 420px, 90vw"
          className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
        />
      </motion.div>

      {/* Floating badge: live visitor counter */}
      <VisitorCounterBadge className="glass absolute -left-4 -top-5 hidden w-fit animate-float rounded-2xl px-4 py-3 shadow-card sm:block" />

      {/* Floating badge: focus areas */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="glass absolute -right-4 -top-5 hidden w-44 animate-float rounded-2xl p-4 shadow-card sm:block"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand">Focus</p>
        <p className="mt-1 text-sm font-semibold text-ink">SaaS · Fintech · HR-tech</p>
      </motion.div>

      {/* Floating badge: velocity chart, grounded in real delivery data */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-strong absolute inset-x-3 -bottom-6 w-auto animate-float-slow rounded-2xl p-4 shadow-glass-lg sm:inset-x-auto sm:-bottom-8 sm:-left-6 sm:w-[15.5rem] lg:-left-9"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-brand/10 text-brand"><TrendingUp size={14} /></span>
          <p className="text-xs font-semibold text-ink">Sprint velocity</p>
        </div>
        <div className="mt-3 flex h-14 items-end gap-1">
          {velocity.map((height, index) => (
            <div key={index} className="flex-1 overflow-hidden rounded-sm bg-brand/[0.1]">
              <div
                className="w-full origin-bottom rounded-sm bg-brand-gradient"
                style={{
                  height: `${height}%`,
                  animation: reduceMotion ? undefined : "grow-bar 0.8s cubic-bezier(0.22,1,0.36,1) both",
                  animationDelay: `${0.55 + index * 0.05}s`,
                }}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
          <AnimatedCounter value={30} suffix="%" />
        </p>
        <p className="text-[11px] leading-tight text-muted">faster feature delivery cycle</p>
      </motion.div>

      {/* Floating badge: UAT confidence */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.62 }}
        className="glass absolute bottom-6 -right-3 hidden w-40 rounded-2xl p-3.5 shadow-card lg:block"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-brand" />
          <p className="text-xs font-semibold text-ink">UAT-led sign-off</p>
        </div>
        <p className="mt-1.5 text-[11px] leading-tight text-muted">Every release verified with stakeholders before go-live.</p>
      </motion.div>
    </div>
  );
}
