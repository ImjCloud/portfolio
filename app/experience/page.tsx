import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { DynamicContentList } from "@/components/dynamic-content-list";

export const metadata: Metadata = { title: "Experience" };
export default function ExperiencePage() {
  return <><PageHero eyebrow="Experience" title="Experience anchored in outcomes, not activity." description="A track record of translating operational needs into organised work, stronger delivery rhythms and measurable improvement." /><section className="section container"><SectionHeading eyebrow="Career timeline" title="From business ownership to digital delivery." description="Selected responsibilities, tools and outcomes. Client-sensitive details are deliberately kept at an appropriate level." /><ExperienceTimeline /><div className="mt-10"><DynamicContentList section="experience" /></div></section></>;
}
