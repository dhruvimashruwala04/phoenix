import useKanbanStore from "../../kanban/store/kanbanStore";
import { CheckCircle, Clock, Folder, Users } from "@/imports/core/assets/Icons";

const tasks = useKanbanStore((state) => state.tasks);
export const stats = [
  {
    title: "Active projects",
    value: tasks.length,
    subText: "2 due this quarter",
    icon: <Folder />,
    iconBg: "rgb(238, 242, 255)",
  },
  {
    title: "Due this week",
    value: "14",
    subText: "3 overdue",
    icon: <Clock />,
    iconBg: "rgb(255, 251, 235)",
  },
  {
    title: "Completed this month",
    value: "72",
    subText: "↑ 16% vs last month",
    icon: <CheckCircle />,
    iconBg: "rgb(236, 253, 245)",
  },
  {
    title: "Team members",
    value: "12",
    subText: "9 online now",
    icon: <Users />,
    iconBg: "rgb(245, 243, 255)",
  },
];
