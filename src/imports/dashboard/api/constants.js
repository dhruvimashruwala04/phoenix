import {
  AiInsights,
  Activity,
  Calendar,
  Dependencies,
  Docs,
  Files,
  GanttChart,
  Help,
  Inbox,
  Kanban,
  Milestones,
  Overview,
  Reports,
  Settings,
  Team,
  TimeTracking,
  Timeline,
  Workload,
} from "../ui/assets/Icons";

export const nav = [
  {
    header: "Workspace",
    links: [
      { label: "Overview", href: "/", icon: <Overview />, active: true },
      { label: "Inbox", href: "/inbox", icon: <Inbox />, active: false },
      { label: "Kanban", href: "/kanban", icon: <Kanban />, active: false },
      {
        label: "Gantt Chart",
        href: "/gantt-chart",
        icon: <GanttChart />,
        active: false,
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: <Calendar />,
        active: false,
      },
      {
        label: "Timeline",
        href: "/timeline",
        icon: <Timeline />,
        active: false,
      },
      {
        label: "Milestones",
        href: "/milestones",
        icon: <Milestones />,
        active: false,
      },
      {
        label: "Dependencies",
        href: "/dependencies",
        icon: <Dependencies />,
        active: false,
      },
    ],
  },
  {
    header: "Analytics",
    links: [
      { label: "Reports", href: "/reports", icon: <Reports />, active: true },
      {
        label: "Workload",
        href: "/workload",
        icon: <Workload />,
        active: false,
      },
      {
        label: "Time Tracking",
        href: "/time-tracking",
        icon: <TimeTracking />,
        active: false,
      },
      {
        label: "Activity",
        href: "/calendar",
        icon: <Activity />,
        active: false,
      },
      {
        label: "AI Insights",
        href: "/ai-insights",
        icon: <AiInsights />,
        active: false,
      },
    ],
  },
  {
    header: "Resources",
    links: [
      { label: "Files", href: "/files", icon: <Files />, active: true },
      { label: "Docs", href: "/docs", icon: <Docs />, active: false },
      { label: "Team", href: "/team", icon: <Team />, active: false },
    ],
  },
  {
    header: "Projects",
    links: [
      { label: "Project Phoenix", href: "/reports", active: true },
      { label: "Mobile App", href: "/workload", active: false },
      {
        label: "Website Redesign",
        href: "/website-redesign",

        active: false,
      },
      {
        label: "Marketing Campaign",
        href: "/marketing-campaign",

        active: false,
      },
    ],
  },
  {
    header: "Account",
    links: [
      {
        label: "Settings",
        href: "/settings",
        icon: <Settings />,
        active: true,
      },
      {
        label: "Help & Feedback",
        href: "/help-feedback",
        icon: <Help />,
        active: false,
      },
    ],
  },
];
