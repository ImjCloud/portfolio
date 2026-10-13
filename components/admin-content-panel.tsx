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
  const [items, setItems] = useState<ContentItem[]>([]);
  const [configured, setConfigured] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [section, setSection] = useState<Section>("certificates");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const load = useCallback(async (key: string) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/content/admin/", { headers: { "x-admin-secret": key } });
      if (response.status === 401) {
        setStatus("error");
        setUnlocked(false);
        return;
      }
      const result = await response.json();
      setConfigured(result.configured !== false);
      setItems(result.items ?? []);
      setUnlocked(true);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem("admin-secret") : null;
    if (saved) {
      setSecret(saved);
      load(saved);
    }
  }, [load]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploadError(null);
    setUploading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/content/admin/", {
        method: "POST",
        headers: { "x-admin-secret": secret },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Upload failed.");
      formRef.current?.reset();
      await load(secret);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(item: ContentItem) {
    try {
      await fetch("/api/content/admin/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ id: item.id, fileName: item.file_name, imageName: item.image_name }),
      });
      setItems((current) => current.filter((existing) => existing.id !== item.id));
    } catch {
      setUploadError("Could not delete that item. Please try again.");
    }
  }

  if (!unlocked) {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sessionStorage.setItem("admin-secret", secret);
          load(secret);
        }}
        className="max-w-sm rounded-3xl border border-line bg-paper p-6 shadow-card"
      >
        <label className="block text-sm font-semibold text-ink">Admin secret
          <input type="password" value={secret} onChange={(event) => setSecret(event.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
        </label>
        <Button type="submit" variant="brand" className="mt-4">Unlock</Button>
        {status === "error" ? <p className="mt-3 text-sm text-red-600" role="alert">Incorrect secret, or ADMIN_SECRET is not set in your environment.</p> : null}
      </form>
    );
  }

  const isRedirectSection = section === "testimonials" || section === "references";

  return (
    <div className="grid gap-8">
      <div className="rounded-4xl border border-line bg-paper p-6 shadow-card sm:p-8">
        <label className="block text-sm font-semibold text-ink">Where should this appear?
          <select value={section} onChange={(event) => setSection(event.target.value as Section)} className="mt-2 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
            {SECTION_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>

        {isRedirectSection ? (
          <div className="mt-5 rounded-2xl border border-dashed border-brand/35 bg-brand/5 p-5 text-sm leading-6 text-muted">
            {section === "testimonials" ? (
              <>Testimonials have their own moderation flow, since visitors submit those directly with a rating.{" "}
                <Link href="/admin/testimonials/" className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">Go to Testimonial moderation <ExternalLink size={13} /></Link>
              </>
            ) : (
              <>Reference letters have their own upload page, built specifically for PDFs.{" "}
                <Link href="/admin/references/" className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">Go to Reference letters <ExternalLink size={13} /></Link>
              </>
            )}
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="mt-5 grid gap-5">
            <input type="hidden" name="section" value={section} />
            <label className="block text-sm font-semibold text-ink">Name
              <input
                name="name"
                required
                list={section === "skills" ? "skill-options" : undefined}
                placeholder={section === "skills" ? "Pick an existing skill, or type a new one" : "e.g. Agile Scrum Master"}
                className="mt-2 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              {section === "skills" ? <datalist id="skill-options">{ALL_SKILL_NAMES.map((skillName) => <option key={skillName} value={skillName} />)}</datalist> : null}
            </label>
            <label className="block text-sm font-semibold text-ink">Description
              <textarea name="description" rows={3} placeholder="A short description of what this is." className="mt-2 w-full resize-y rounded-2xl border border-line bg-surface px-4 py-3 text-base leading-6 text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20" />
            </label>
            <label className="block text-sm font-semibold text-ink">Tools used <span className="font-normal text-muted">(optional)</span>
              <div className="mt-2"><TagPicker name="tools" options={ALL_TOOL_NAMES} placeholder="Type or pick a tool used" /></div>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-line px-4 text-sm font-medium text-muted transition hover:border-brand/40">
                <FileText size={16} /> <span className="truncate">Document (optional)</span>
                <input type="file" name="file" accept=".pdf,.doc,.docx" className="hidden" />
              </label>
              <label className="flex min-h-12 cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-line px-4 text-sm font-medium text-muted transition hover:border-brand/40">
                <ImageIcon size={16} /> <span className="truncate">Picture (optional)</span>
                <input type="file" name="image" accept="image/*" className="hidden" />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" variant="brand" disabled={uploading}>
                {uploading ? <Loader2 size={16} className="animate-spin-slow" /> : <Upload size={16} />} {uploading ? "Uploading..." : "Upload"}
              </Button>
              {uploadError ? <p className="text-sm text-red-600" role="alert">{uploadError}</p> : null}
            </div>
            <p className="text-xs text-muted">PDF/Word up to 10MB, images up to 10MB. Goes live immediately on the public page for the section you picked.</p>
          </form>
        )}
      </div>

      {!configured ? <p className="rounded-3xl border border-dashed border-line p-8 text-sm text-muted">Supabase environment variables are not set on this deployment yet. See the README.</p> : null}

      {status === "loading" ? <Loader2 className="animate-spin-slow text-brand" /> : null}

      {configured && status === "idle" ? (
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Everything uploaded so far</p>
          {items.length === 0 ? (
            <p className="mt-4 rounded-3xl border border-dashed border-line p-8 text-sm text-muted">Nothing uploaded yet.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-4 shadow-card">
                  <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">{SECTION_LABELS[item.section] ?? item.section}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                    {item.description ? <p className="truncate text-xs text-muted">{item.description}</p> : null}
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => handleDelete(item)}><Trash2 size={14} /> Delete</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
