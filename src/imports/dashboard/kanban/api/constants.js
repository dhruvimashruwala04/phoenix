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
