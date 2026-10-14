import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Compass, HeartHandshake, Lightbulb } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { leadership } from "@/data/site";

export const metadata: Metadata = { title: "About" };

const principles = [
  [Compass, "Start with context", "Understand the problem, its constraints and the decision that needs to be made."],
  [Lightbulb, "Make complexity visible", "Use maps, stories and measures to give people a shared view of the work."],
  [HeartHandshake, "Build alignment early", "Bring stakeholders and delivery teams into the conversation before assumptions become rework."],
  [CheckCircle2, "Validate the outcome", "Use acceptance criteria, UAT and feedback loops to prove that value was delivered."],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="A thoughtful operator in the space between strategy and delivery." description="I help teams make the right work visible, understandable and achievable, especially when priorities, people and constraints are all moving at once." />

      <section className="section container">
        <div className="grid gap-10 lg:grid-cols-[.62fr_1fr]">
          <Reveal>
            <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/15 blur-3xl" />
              <div className="glass-strong overflow-hidden rounded-[2rem] p-2 shadow-glass-lg">
                <Image src="/images/profile/oluwadamilola.png" alt="Oluwadamilola John Joseph" width={500} height={620} sizes="(min-width: 1024px) 420px, 320px" className="aspect-[4/5] w-full rounded-[1.6rem] object-cover" />
              </div>
              <div className="glass absolute -bottom-6 -right-4 w-44 rounded-2xl p-4 shadow-card">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">Based in</p>
                <p className="mt-1 text-sm font-semibold text-ink">Lagos, Nigeria</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading eyebrow="My story" title="Structured thinking, practical delivery." />
              <div className="mt-8 grid gap-5 text-[1.05rem] leading-8 text-muted">
                <p>My experience spans SaaS, fintech, HR-tech, food-tech and regulated operations. Before that, I founded and ran a diversified consultancy, spanning fintech payments, real estate and agriculture, as a side business throughout seven years of full-time undergraduate study. That breadth is where my approach to business analysis comes from: good delivery is rarely about applying one framework, it is about creating the clarity, cadence and confidence a particular team needs right now.</p>
                <p>I work at the intersection of stakeholder discovery, requirements definition, prioritisation and agile delivery. Whether a product needs rescuing mid-sprint, an operation needs a more visible process, or a founder needs a steady project lead, I make the next decision easier to take.</p>
                <p>I moved from independent consulting into full-time Business Analysis to build a career with genuine international reach. I am currently based in Lagos, planning relocation to the UK and will require visa sponsorship. My next development goals include the BCS Practitioner Certificate in Business Analysis Practice and the BCS Practitioner Certificate in Requirements Engineering, alongside continued development in SQL and data modelling.</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-4xl bg-ink p-7 text-paper sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">How I work</p>
                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                  {principles.map(([Icon, title, copy]) => (
                    <div key={title} className="flex gap-4">
                      <Icon size={20} className="mt-1 shrink-0 text-accent" />
                      <div>
                        <h2 className="font-semibold">{title}</h2>
                        <p className="mt-1 text-sm leading-6 text-paper/65">{copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-surface">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Beyond the day job" title="Leadership, teaching and volunteer work." description="A few of the roles that have shaped how I lead, communicate and stay accountable." /></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {leadership.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-3xl border border-line bg-paper p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-glow">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
