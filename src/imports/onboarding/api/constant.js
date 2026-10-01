import { Calendar, Gantt, Kanban } from "../ui/assets/Icons";

export const steps = [
  {
    name: "About you",
    stepNum: 1,
    title: "Tell us about you",
    subText: "We'll tailor templates and AI suggestions to how you work.",
    href: "/onboarding/about-you",
  },
  {
    name: "Workspace",
    stepNum: 2,
    title: "Set up your workspace",
    subText: "Tell us a little about your workspace.",
    href: "/onboarding/workspace",
  },
  {
    name: "Invite team",
    stepNum: 3,
    title: "Invite your team",
    subText: "Bring your team into Phoenix.",
    href: "/onboarding/invite-team",
  },
  {
    name: "First project",
    stepNum: 4,
    title: "Create your first project",
    subText: "Let's get your first project set up.",
    href: "/onboarding/first-project",
  },
  {
    name: "Done",
    stepNum: 5,
    title: "You're all set",
    subText: "Your Phoenix workspace is ready.",
    href: "/onboarding/done",
  },
];

export const roles = [
  "Product",
  "Design",
  "Engineering",
  "Marketing",
  "Operations",
  "Other",
];
export const teamSizes = ["Just me", "2-10", "11-50", "51-200", "200+"];

export const initialsColors = [
  "#4f46e5",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#172033",
];
export const views = [
  {
    name: "Kanban board",
    description: "Move tasks through Backlog → Done",
    icon: <Kanban />,
  },
  {
    name: "Gantt roadmap",
    description: "Plan phases with dates & dependencies",
    icon: <Gantt />,
  },
  {
    name: "Calendar",
    description: "Schedule meetings, deadlines & focus",
    icon: <Calendar />,
  },
];

export const tasks = [
  "Define goals & success metrics",
  "Kickoff meeting with stakeholders",
  "Draft Website Redesign requirements",
  "Set up first milestone",
];
