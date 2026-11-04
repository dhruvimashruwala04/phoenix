import {
  Overdue,
  Prediction,
  Recommendation,
} from "../../kanban/ui/assets/Icons";

export const filters = [
  { label: "All", value: "all", count: 6 },
  { label: "Risks", value: "risks", count: 2 },
  { label: "Recommendation", value: "recommendations", count: 2 },
  { label: "Predictions", value: "predictions", count: 2 },
];

export const stats = [
  {
    label: "Delivery confidence",
    value: "79%",
    progressBar: 79,
  },
  {
    label: "Open risks",
    value: "2",
    color: "var(--red-500)",
    subLabel: "across 2 projects",
  },
  {
    label: "Hours saved by AI",
    value: "14h",
    subLabel: "this month",
  },
];

export const initialInsights = [
  {
    id: 1,
    type: "risks",
    label: "RISK",
    project: "Project Phoenix",
    title: "AI onboarding flow is overdue",
    description:
      '"AI onboarding flow" is 2 days late and blocks the beta checklist. Reassign to Alex or move the due date to May 28.',
    action: "Reassign to Alex",
    applied: false,
  },
  {
    id: 2,
    type: "risks",
    label: "RISK",
    project: "Mobile App",
    title: "Backend will finish after Frontend needs it",
    description:
      "Backend Development ends Jul 14, 4 days after Frontend expects endpoints. Consider stubbing the API contract.",
    action: "Create stub task",
    applied: false,
  },
  {
    id: 3,
    type: "recommendations",
    label: "RECOMMENDATION",
    project: "Project Phoenix",
    title: "Balance Sarah's workload",
    description:
      'Sarah has 8 tasks this week (43h). Moving "Dashboard analytics" to Alex brings both under 40h.',
    action: "Balance now",
    applied: false,
  },
  {
    id: 4,
    type: "recommendations",
    label: "RECOMMENDATION",
    project: "Website Redesign",
    title: "Merge duplicate review meetings",
    description:
      "Design Review and Stakeholder Update overlap in attendees 80%. Merging saves ~2h/week.",
    action: "Merge meetings",
    applied: false,
  },
  {
    id: 5,
    type: "predictions",
    label: "PREDICTION",
    project: "Project Phoenix",
    title: "Sprint 14 will close at 92%",
    description:
      "Based on current velocity (+12%), 23 of 25 committed tasks will finish by Friday.",
    action: "Notify team",
    applied: false,
  },
  {
    id: 6,
    type: "predictions",
    label: "PREDICTION",
    project: "Marketing Campaign",
    title: "Launch assets ready 3 days early",
    description:
      "Copy and design tasks are trending ahead; video production is the long pole.",
    action: "Share update",
    applied: false,
  },
];

export const typeStyles = {
  risks: {
    color: "#ff334f",
    background: "#fff1f2",
    border: "#ffc4cc",
    icon: Overdue,
  },
  recommendations: {
    color: "#5545ff",
    background: "#eef2ff",
    border: "#c7d2fe",
    icon: Recommendation,
  },
  predictions: {
    color: "#00a77b",
    background: "#eafbf5",
    border: "#9aefd0",
    icon: Prediction,
  },
};

export const suggestions = [
  "Which tasks are most likely to slip?",
  "Who has capacity this week?",
  "Summarize all projects",
];

export const answers = {
  "which tasks are most likely to slip?": {
    title: "Tasks most likely to slip",
    description:
      "Based on current progress and due dates, these tasks need attention:",
    points: [
      "AI onboarding flow – 2 days overdue and blocking the beta checklist.",
      "Backend Development – expected to finish 4 days after Frontend needs the endpoints.",
      "Video production – currently the longest-pending task in the Marketing Campaign.",
    ],
    conclusion:
      "Consider reassigning the onboarding task and creating a temporary API stub to avoid delays.",
  },

  "who has capacity this week?": {
    title: "Team capacity this week",
    description: "Here is the current workload overview for your team:",
    points: [
      "Alex Lee – Available capacity for approximately 8 hours.",
      "Sarah Kim – 8 assigned tasks (43 hours); currently over capacity.",
      "Mike Johnson – Moderate workload with room for additional tasks.",
      "Emma Wilson – Available for design-related tasks.",
    ],
    conclusion:
      "Moving Dashboard analytics from Sarah to Alex would help balance the workload.",
  },

  "summarize all projects": {
    title: "Project summary",
    description: "Here is a quick overview of your active projects:",
    points: [
      "Project Phoenix – Sprint 14 is progressing well, with an estimated 92% completion.",
      "Mobile App – Backend development is behind the frontend dependency.",
      "Website Redesign – Review meetings can be merged to save approximately 2 hours per week.",
      "Marketing Campaign – Launch assets are trending 3 days ahead of schedule.",
    ],
    conclusion:
      "Overall, projects are progressing, but the onboarding and backend dependencies need attention.",
  },
};

export const defaultAnswer = {
  title: "Project assistant",
  description:
    "I can help you understand your projects, tasks, and team workload. Try asking one of these questions:",
  points: suggestions,
  conclusion:
    "For other questions, try asking about task progress, overdue work, project status, or team capacity.",
};
