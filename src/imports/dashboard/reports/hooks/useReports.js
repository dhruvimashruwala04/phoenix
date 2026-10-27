"use client";
import { useState } from "react";
import useKanbanStore from "../../kanban/store/kanbanStore";
import { projects } from "../../kanban/api/constants";

const useReports = () => {
  const [sortBy, setSortBy] = useState("Completed");
  const [selectedProj, setSelectedProj] = useState("all");
  const [view, setView] = useState("7 days");

  const { tasks } = useKanbanStore();

  const totalTasks = tasks.length;

  const members = tasks.reduce((acc, t) => {
    const assn = t.assignee;
    if (!acc[assn]) {
      acc[assn] = { completed: 0, share: 0 };
    }
    if (t.status === "done") acc[assn].completed++;
    return acc;
  }, {});

  Object.values(members).forEach((member) => {
    member.share =
      totalTasks > 0 ? Math.round((member.completed / totalTasks) * 100) : 0;
  });

  const sortedMembers = Object.entries(members)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => {
      if (sortBy === "Completed") {
        return b.completed - a.completed;
      }
      if (sortBy === "Name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "On Time") {
        return (b.onTime ?? 0) - (a.onTime ?? 0);
      }
      return 0;
    });

  const filteredTasks =
    selectedProj === "all"
      ? tasks
      : tasks.filter((t) => t.projName === selectedProj);

  const statusCounts = filteredTasks.reduce((acc, task) => {
    const status = task.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name:
      status === "done"
        ? "Done"
        : status === "in_progress"
          ? "In Progress"
          : status === "review"
            ? "Review"
            : "Backlog",
    value: count,
  }));

  const proj = projects.map((p) => ({ label: p.label, value: p.value }));
  const projOptions = [{ label: "All Projects", value: "all" }, ...proj];

  return {
    sortBy,
    selectedProj,
    setSelectedProj,
    projOptions,
    sortedMembers,
    data,
    view,
    setView,
  };
};

export default useReports;
