"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eye } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";

export function VisitorCounterBadge({ className }: { className?: string }) {
  const [visits, setVisits] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visit-counted");
    const method = alreadyCounted ? "GET" : "POST";

    fetch("/api/visits/", { method })
      .then((response) => response.json())
      .then((result: { configured: boolean; visits: number | null }) => {
        if (result.visits !== null) {
          setVisits(result.visits);
          sessionStorage.setItem("visit-counted", "true");
        }
      })
      .catch(() => null);
  }, []);

  if (visits === null) return null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.75 }}
      className={className}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal" />
          <span className="relative inline-flex size-2 rounded-full bg-teal" />
        </span>
        <Eye size={13} className="text-muted" />
        <p className="text-sm font-semibold text-ink">
          <AnimatedCounter value={visits} />
        </p>
        <p className="text-[11px] text-muted">visits</p>
      </div>
    </motion.div>
  );
}
