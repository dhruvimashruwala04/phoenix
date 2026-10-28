import { AiInsights } from "@/imports/core/assets/Icons";
import { Calendar, GanttChart, Rocket } from "../../ui/assets/Icons";

export const questions = [
  {
    question: "How does Auto Schedule decide new dates?",
    answer:
      "It looks at dependencies, assignee capacity and task priority, then shifts non-critical tasks to remove overlaps without moving milestone dates. You can undo from the toast right after it runs.",
  },
  {
    question: "Can I compare the plan to the original baseline?",
    answer:
      "Yes. Compare your current project schedule with the original baseline to see changes in dates and progress.",
  },
  {
    question: "How do I add a dependency between tasks?",
    answer:
      "Open a task, go to Dependencies and select the task that must be completed first.",
  },
  {
    question: "Who can see time tracking entries?",
    answer:
      "Workspace members with the appropriate project permissions can view time tracking entries.",
  },
  {
    question: "How do I invite guests with view-only access?",
    answer:
      "Open workspace settings, invite a guest and assign view-only access.",
  },
  {
    question: "Where does AI get its risk predictions?",
    answer:
      "AI analyzes project schedules, dependencies, task progress and workload patterns to identify possible risks.",
  },
];

export const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "New task", keys: ["N"] },
  { label: "Open AI Assistant", keys: ["⌘", "J"] },
  { label: "Go to board", keys: ["G", "B"] },
  { label: "Go to calendar", keys: ["G", "C"] },
  { label: "Toggle sidebar", keys: ["⌘", "\\"] },
];

export const resources = [
  {
    icon: Rocket,
    title: "Getting started",
    description: "5-minute setup",
    link: "/kanban",
  },
  {
    icon: GanttChart,
    title: "Planning with Gantt",
    description: "Dependencies & baselines",
    link: "/gantt-chart",
  },
  {
    icon: AiInsights,
    title: "Using AI",
    description: "Insights & auto-schedule",
    link: "/ai-insights",
  },
  {
    icon: Calendar,
    title: "Calendar sync",
    description: "Events and focus time",
    link: "/calendar",
  },
];

export const categories = ["Question", "Bug report", "Feature idea"];
