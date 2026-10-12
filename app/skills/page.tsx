import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SkillsPanel } from "@/components/skills-panel";
import { DynamicContentList } from "@/components/dynamic-content-list";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <>
      <PageHero eyebrow="Skills" title="A flexible toolkit for moving work forward." description="I pair a strong BA, PM and agile-delivery foundation with practical collaboration tools and developing analytical capability. Tap a category to explore." />
      <section className="section container">
        <SkillsPanel />
        <div className="mt-10"><DynamicContentList section="skills" /></div>
      </section>
    </>
  );
}
