"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, FileText, ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagPicker } from "@/components/tag-picker";
import { skillGroups, toolLibrary } from "@/data/site";

const ALL_SKILL_NAMES = Array.from(
  new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.replace(/\s*\(in progress\)\s*/i, "").trim()))),
);
const ALL_TOOL_NAMES = toolLibrary.map((tool) => tool.name);

type Section = "testimonials" | "references" | "certificates" | "skills" | "experience";

const SECTION_OPTIONS: { value: Section; label: string }[] = [
  { value: "certificates", label: "Certificates" },
  { value: "skills", label: "Skills" },
  { value: "experience", label: "Work Experience" },
  { value: "testimonials", label: "Testimony" },
  { value: "references", label: "Reference" },
];

const SECTION_LABELS: Record<string, string> = {
  certificates: "Certificates",
  skills: "Skills",
  experience: "Work Experience",
};

type ContentItem = {
  id: string;
  section: string;
  name: string;
  description: string | null;
  tools: string | null;
  file_name: string | null;
  image_name: string | null;
  created_at: string;
};

export function AdminContentPanel() {
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [items, setItems] = useState<CֻǱ˞