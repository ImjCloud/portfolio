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
            <p className="eyebrow">Digital Technology Business Analyst · Digital Products · Workflow Automation</p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.75rem]">Turning business needs into <span className="text-gradient-aurora">delivery-ready requirements.</span></h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted sm:text-xl">I&apos;m Oluwadamilola John Joseph, a Business Analyst who connects stakeholder needs to clear requirements, prioritised backlogs, testable acceptance criteria and UAT-ready delivery.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="brand"><a href="/downloads/resume.pdf" download><Download size={18} /> Download CV</a></Button>
              <Button asChild variant="secondary" size="lg"><Link href="/projects/"><FolderOpen size={18} /> View case studies</Link></Button>
              <Button asChild variant="ghost" size="lg"><Link href="/contact/"><Mail size={18} /> Contact me</Link></Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-muted">
              <span className="inline-flex items-center gap-2"><span className="relative flex size-2"><span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand" /><span className="relative inline-flex size-2 rounded-full bg-brand" /></span>Open to UK opportunities · relocation planned</span>
              <span>Lagos, Nigeria</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="container relative -mt-px grid border-x border-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-b border-line px-5 py-8 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
            <p className="font-mono text-4xl font-semibold tracking-[-.03em] text-ink">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 max-w-32 text-sm leading-5 text-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Recruiter quick-facts strip */}
      <section className="border-b border-line bg-surface">
        <div className="container grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-10">
          {recruiterFacts.map((fact) => (
            <div key={fact.label} className="glass rounded-2xl px-5 py-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-brand">{fact.label}</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="about-heading">
        <Reveal><SectionHeading eyebrow="01 · About" title="A delivery partner with the curiosity to get beneath the brief." description="I connect the dots between stakeholder intent, user needs and delivery reality, bringing structure to the messy middle so teams can move with purpose." /></Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
          <Reveal><article className="rounded-4xl border border-line bg-paper p-7 shadow-card sm:p-9"><p id="about-heading" className="text-2xl font-semibold tracking-[-.03em] text-ink">Clarity is a competitive advantage.</p><p className="mt-5 leading-8 text-muted">Across SaaS, HR-tech, food-tech and regulated operations, I translate ambiguous business problems into prioritised backlogs, usable documentation and delivery plans that teams can trust. My approach balances rigour with momentum: listen deeply, make the work visible, validate early, then create a rhythm for delivery.</p></article></Reveal>
          <Reveal delay={0.08}><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{[
            [Target, "Outcome-led", "Every requirement should trace to a business outcome, user need or delivery decision."],
            [UsersRound, "People-aware", "Better products emerge when stakeholders and delivery teams have shared language."],
            [CheckCircle2, "Evidence-driven", "I use acceptance criteria, UAT and clear metrics to replace assumptions with confidence."],
          ].map(([Icon, title, description]) => <article key={title as string} className="rounded-3xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-brand/25"><Icon size={20} className="text-brand" /><h3 className="mt-4 font-semibold text-ink">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted">{description as string}</p></article>)}</div></Reveal>
        </div>
      </section>

      <section className="section border-y border-line bg-surface" aria-labelledby="experience-heading"><div className="container"><Reveal><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="02 · Experience" title="Building momentum across complex delivery environments." description="Selected roles where I have led discovery, structured delivery and made performance more visible." /><Button asChild variant="secondary"><Link href="/experience/">Full experience <ArrowRight size={16} /></Link></Button></div></Reveal><Reveal delay={0.1}><div id="experience-heading"><ExperienceTimeline /></div></Reveal></div></section>

      <section className="section container" aria-labelledby="work-heading"><Reveal><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="03 · Selected work" title="Work designed to create a measurable shift." description="From workflow automation to delivery stabilisation, each case study separates the problem, my contribution, and the evidence available for the outcome." /><Button asChild variant="secondary"><Link href="/projects/">All projects <ArrowRight size={16} /></Link></Button></div></Reveal><div id="work-heading" className="mt-12 grid gap-6 md:grid-cols-2">{publishedProjects.map((project, index) => <Reveal key={project.slug} delay={index * 0.08}><ProjectCard project={project} /></Reveal>)}</div></section>

      <section className="section border-y border-line" aria-labelledby="skills-heading"><div className="container"><Reveal><SectionHeading eyebrow="04 · Capabilities" title="The analytical toolkit behind the delivery." description="A practical blend of business analysis, agile delivery, stakeholder management and developing data capability. Tap a category to explore." /></Reveal><div id="skills-heading" className="mt-12"><Reveal delay={0.08}><SkillsPanel /></Reveal></div></div></section>

      <section className="section container" aria-labelledby="downloads-heading"><Reveal><div className="relative overflow-hidden rounded-4xl bg-ink px-6 py-10 text-paper sm:p-10 lg:p-12"><div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand/25 blur-[100px]" /><div className="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-teal/15 blur-[100px]" /><div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-2xl"><p className="eyebrow text-accent">05 · Downloads</p><h2 id="downloads-heading" className="mt-4 text-balance text-3xl font-semibold tracking-[-.035em] sm:text-4xl">A focused library of professional resources.</h2><p className="mt-4 leading-7 text-paper/70">Download the latest CV, explore case-study material, or save reusable business-analysis resources. New files are automatically detected from the downloads folder at build time.</p></div><Button asChild variant="light"><Link href="/downloads/">Open document library <ArrowRight size={16} /></Link></Button></div></div></Reveal><div className="mt-8"><DownloadsLibrary compact /></div></section>

      <section className="section border-y border-line bg-surface" aria-labelledby="credentials-heading"><div className="container"><Reveal><SectionHeading eyebrow="06 · Credentials & education" title="Learning that keeps the toolkit current." /></Reveal><div id="credentials-heading" className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><div className="grid gap-4 sm:grid-cols-2">{certifications.map((certification, index) => <Reveal key={certification.name} delay={index * .05}><article className="rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"><span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-brand">{certification.status}</span><h3 className="mt-6 text-lg font-semibold text-ink">{certification.name}</h3><p className="mt-1 text-sm text-muted">{certification.organisation}</p></article></Reveal>)}</div><Reveal delay={.1}><article className="rounded-4xl border border-line bg-paper p-7 shadow-card"><CalendarDays className="text-brand" size={22} /><h3 className="mt-5 text-2xl font-semibold tracking-[-.03em] text-ink">Education</h3><div className="mt-6 grid gap-6">{education.map((item) => <div key={item.school} className="border-l-2 border-brand/30 pl-4"><p className="font-semibold text-ink">{item.school}</p><p className="mt-1 text-sm leading-6 text-muted">{item.qualification}</p><p className="mt-1 text-xs font-medium text-brand">{item.period}</p></div>)}</div></article></Reveal></div></div></section>

      <section className="section border-y border-line" aria-labelledby="testimonials-heading"><div className="container"><Reveal><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow="07 · Testimonials" title="Recommendations from people I've worked with." description="Every recommendation here is submitted directly and reviewed before publishing." /><Button asChild variant="secondary"><Link href="/testimonials/">All testimonials <ArrowRight size={16} /></Link></Button></div></Reveal><div id="testimonials-heading" className="mt-12"><Reveal delay={0.08}><TestimonialsList /></Reveal></div></div></section>

      <section className="section container" aria-labelledby="contact-heading"><Reveal><div className="relative isolate overflow-hidden rounded-[2.2rem] bg-brand-gradient px-6 py-12 text-white sm:p-12 lg:px-16"><div className="absolute -right-16 -top-20 -z-10 size-72 rounded-full bg-white/15 blur-3xl" /><div className="absolute inset-0 -z-10 bg-grid opacity-[0.08]" /><Sparkles className="text-accent" size={24} /><h2 id="contact-heading" className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Ready to turn a complicated brief into a clear next step?</h2><p className="mt-5 max-w-xl text-lg leading-8 text-white/85">I&apos;m open to conversations about business analysis, agile delivery, product operations and transformation work.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="light" size="lg"><Link href="/contact/">Start a conversation <ArrowRight size={18} /></Link></Button><Button asChild variant="secondary" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><a href={siteConfig.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn</a></Button></div></div></Reveal></section>
    </>
  );
}
