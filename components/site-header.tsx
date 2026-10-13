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
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-gradient text-sm font-bold tracking-tight text-white shadow-sm transition group-hover:-rotate-6">OJ</span>
          <span className="hidden text-sm font-semibold tracking-[-0.01em] text-ink sm:block">Oluwadamilola Joseph</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 rounded-full border border-line/70 bg-surface/60 p-1 xl:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={cn("rounded-full px-4 py-2 text-[13.5px] font-medium transition hover:bg-brand/[0.08] hover:text-ink", pathname === item.href ? "bg-brand/[0.08] text-ink" : "text-muted")}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button asChild variant="secondary" size="sm">
            <a href="/downloads/resume.pdf" download aria-label="Download CV as PDF"><Download size={15} /> CV</a>
          </Button>
          <Button asChild variant="brand" size="sm">
            <Link href="/contact/" aria-label="Start a conversation">Let&apos;s talk</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="grid size-11 place-items-center rounded-full border border-line text-ink transition active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <motion.span
              key={open ? "close" : "menu"}
              initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="grid place-items-center"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div id="mobile-navigation" className="container mt-2 rounded-3xl glass-strong px-4 py-5 shadow-card">
              <nav aria-label="Mobile navigation" className="grid gap-1">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} onClick={close} className="rounded-xl px-4 py-3 text-base font-medium text-ink transition active:scale-[0.98] active:bg-brand/10 hover:bg-brand/10">
                    {item.label}
                  </Link>
                ))}
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Button asChild variant="secondary"><a href="/downloads/resume.pdf" download onClick={close}><Download size={16} /> CV</a></Button>
                  <Button asChild variant="brand"><Link href="/contact/" onClick={close}>Let&apos;s talk</Link></Button>
                </div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
