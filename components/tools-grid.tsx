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
              "reֻǱ˞