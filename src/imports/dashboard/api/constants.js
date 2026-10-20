import { projects } from "../kanban/api/constants";
import {
  Activity,
  Calendar,
  Dependencies,
  Docs,
  Files,
  GanttChart,
  Help,
  Inbox,
  Milestones,
  Overview,
  Reports,
  Settings,
  Team,
  TimeTracking,
  Timeline,
  Workload,
} from "../ui/assets/Icons";
import { AiInsights, Kanban } from "@/imports/core/assets/Icons";

export const nav = [
  {
    header: "Workspace",
    links: [
      { label: "Overview", href: "/", icon: Overview },
      { label: "Inbox", href: "/inbox", icon: Inbox },
      { label: "Kanban", href: "/kanban", icon: Kanban },
      {
        label: "Gantt Chart",
        href: "/gantt-chart",
        icon: GanttChart,
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: Calendar,
      },
      {
        label: "Timeline",
        href: "/timeline",
        icon: Timeline,
      },
      {
        label: "Milestones",
        href: "/milestones",
        icon: Milestones,
      },
      {
        label: "Dependencies",
        href: "/dependencies",
        icon: Dependencies,
      },
    ],
  },
  {
    header: "Analytics",
    links: [
      { label: "Reports", href: "/reports", icon: Reports },
      {
        label: "Workload",
        href: "/workload",
        icon: Workload,
      },
      {
        label: "Time Tracking",
        href: "/time-tracking",
        icon: TimeTracking,
      },
      {
        label: "Activity",
        href: "/calendar",
        icon: Activity,
      },
      {
        label: "AI Insights",
        href: "/ai-insights",
        icon: AiInsights,
      },
    ],
  },
  {
    header: "Resources",
    links: [
      { label: "Files", href: "/files", icon: Files },
      { label: "Docs", href: "/docs", icon: Docs },
      { label: "Team", href: "/team", icon: Team },
    ],
  },
  {
    header: "Projects",
    links: [
      ...projects.slice(0, 4).map((project) => ({
        label: project.label,
        href: `/?project=${project.value}`,
        color: project.color,
      })),
    ],
  },
  {
    header: "Account",
    links: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        label: "Help & Feedback",
        href: "/help-feedback",
        icon: Help,
      },
    ],
  },
];
