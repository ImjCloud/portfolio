import type { ComponentType } from "react";
import {
  AppWindow,
  BarChart,
  BarChart3,
  BookOpen,
  Boxes,
  Cloud,
  Contact,
  Database,
  Figma,
  FileSpreadsheet,
  Github,
  GitBranch,
  Kanban,
  Layout,
  MessageSquare,
  Network,
  PenTool,
  Presentation,
  Send,
  Share,
  Slack,
  Sparkles,
  StickyNote,
  Table,
  Trello,
  Video,
  Workflow,
} from "lucide-react";
import { toolLibrary } from "@/data/site";
import { cn } from "@/lib/utils";

const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Jira: Kanban,
  Confluence: BookOpen,
  Trello: Trello,
  Lucidchart: PenTool,
  Miro: StickyNote,
  Notion: Layout,
  "Power BI": BarChart,
  Excel: FileSpreadsheet,
  "Power Apps": AppWindow,
  "Google Workspace": Cloud,
  Canva: Presentation,
  Zoom: Video,
  SQL: Database,
  Visio: Workflow,
  "Draw.io": Network,
  "Azure DevOps": GitBranch,
  SharePoint: Share,
  "Microsoft Teams": MessageSquare,
  GitHub: Github,
  Postman: Send,
  Tableau: Table,
  "AI-assisted analysis": Sparkles,
  Slack: Slack,
  Figma: Figma,
  "Google Analytics": BarChart3,
  "HubSpot CRM": Contact,
};

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {toolLibrary.map((tool) => {
        const Icon = iconMap[tool.name] ?? Boxes;
        const learning = tool.status === "learning";
        return (
          <div
            key={tool.name}
            className={cn(
              "relative flex flex-col gap-3 rounded-2xl border bg-paper p-4 shadow-card transition duration-300 hover:-translate-y-1",
              learning ? "border-line hover:border-accent/40 hover:shadow-glow" : "border-line hover:border-brand/30 hover:shadow-glow",
            )}
          >
            {learning ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white shadow-sm">
                Learning
              </span>
            ) : null}
            <span className={cn("grid size-10 place-items-center rounded-xl", learning ? "bg-accent/10 text-accent" : "bg-brand/10 text-brand")}>
              <Icon size={19} />
            </span>
            <p className="text-sm font-semibold text-ink">{tool.name}</p>
          </div>
        );
      })}
    </div>
  );
}
