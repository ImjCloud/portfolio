import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Download, FolderOpen, Mail, Sparkles, Target, UsersRound } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/aurora-background";
import { AnimatedCounter } from "@/components/animated-counter";
import { HeroVisual } from "@/components/hero-visual";
import { ProjectCard } from "@/components/project-card";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { DownloadsLibrary } from "@/components/downloads-library";
import { SkillsPanel } from "@/components/skills-panel";
import { TestimonialsList } from "@/components/testimonials-list";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { certifications, education, recruiterFacts, siteConfig, stats } from "@/data/site";
import { publishedProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <AuroraBackground />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.4] [mask-image:radial-gradient(ellipse_70%_65%_at_25%_0%,black,transparent)]" />
        <div className="container grid min-h-[calc(100svh-68px)] items-center gap-14 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <Reveal>
            <p className="eyebrow">Business analysis · AgiֻǱ˞