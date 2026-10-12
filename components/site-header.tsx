"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "container flex h-14 items-center justify-between gap-3 rounded-full px-3 transition-all duration-300 sm:h-16 sm:px-4",
          scrolled ? "glass shadow-card" : "border border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label={`${siteConfig.shortName} home`} className="group flex min-w-0 items-center gap-2.5" onClick={close}>
          <span className="grid size-9 shrink-0 place-items-center rounded-xֻǱ˞