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
        ֻǱ˞