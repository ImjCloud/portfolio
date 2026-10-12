export type DownloadCategory = "Resume" | "Case Studies" | "References";

export type DownloadMetadata = {
  title: string;
  description: string;
  category: DownloadCategory;
  featured?: boolean;
};

// Add optional friendly metadata for any file placed in public/downloads.
// New files appear automatically after the next build; nothing here is a placeholder.
export const documentMetadata: Record<string, DownloadMetadata> = {
  "resume.pdf": {
    title: "Oluwadamilola Joseph, Resume",
    description: "Current Business Analyst and Agile Delivery Specialist resume, kept in sync with this site.",
    category: "Resume",
    featured: true,
  },
};
