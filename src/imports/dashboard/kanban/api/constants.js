import { Balance, ErrorIcon, Priority, Risk, Task } from "../ui/assets/Icons";

export const help = [
  {
    icon: <Priority />,
    title: "Smart Prioritization",
    content: "AI suggests task priorities",
  },
  {
    icon: <Task />,
    title: "Task Breakdown",
    content: "Break down complex tasks",
  },
  { icon: <Risk />, title: "Risk Analysis", content: "Identify project risks" },
];

export const aiSuggestions = [
  {
    icon: <ErrorIcon />,
    variant: "red",
    title: "HIGH PRIORITY TASK DETECTED",
    content:
      "AI onboarding flow is overdue by 2 days. Consider reassigning or adjusting timeline.",
    buttonText: "View Task",
  },
  {
    icon: <Balance />,
    variant: "green",
    title: "WORKLOAD BALANCE",
    content:
      "Sarah has 8 tasks this week. Consider redistributing for better balance.",
    buttonText: "Balance Now",
  },
];

export const statusConfig = {
  backlog: {
    color: "rgb(234, 179, 8)",
    label: "Backlog",
  },

  in_progress: {
    color: "rgb(59, 130, 246)",
    label: "In Progress",
  },

  review: {
    color: "rgb(168, 85, 247)",
    label: "Review",
  },

  done: {
    color: "rgb(34, 197, 94)",
    label: "Done",
  },
};

export const projects = [
  {
    label: "Project Phoenix",
    value: "phoenix",
    status: "in_progress",
    color: "rgb(59, 130, 246)",
  },
  {
    label: "Mobile App",
    value: "mobile",
    status: "done",
    color: "rgb(168, 85, 247)",
  },
  {
    label: "Website Redesign",
    value: "website",
    status: "backlog",
    color: "rgb(249, 115, 22)",
  },
  {
    label: "Marketing Campaign",
    value: "marketing",
    status: "review",
    color: "rgb(234, 179, 8)",
  },
  {
    label: "Product Launch",
    value: "launch",
    status: "done",
    color: "rgb(34, 197, 94)",
  },
];
