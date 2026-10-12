import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "about",
    "resume",
    "experience",
    "projects",
    "skills",
    "certifications",
    "education",
    "services",
    "testimonials",
    "references",
    "contact",
    "downloads",
  ];

  return [
    ...paths.map((path) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        path === "" ? "weekly" : "monthly";

      return {
        url: `${siteConfig.url}/${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority: path === "" ? 1 : 0.7,
      };
    }),

    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}