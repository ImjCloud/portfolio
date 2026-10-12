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
      <VisitorCounterBadge className="glass absolute -left-4 -top-5 hidden w-fit animate-float roundeֻǱ˞