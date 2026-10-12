import type { ReactNode } from "react";
import { AuroraBackground } from "@/components/aurora-background";

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line py-20 sm:py-24">
      <AuroraBackground variant="subtle" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_65%_60%_at_20%_0%,black,transparent)]" />
      <div className="container relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">{description}</p>
        {children}
      </div>
    </section>
  );
}
