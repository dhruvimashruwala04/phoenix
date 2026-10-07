"use client";

import useKanbanStore from "../store/kanbanStore";
import useAuthStore from "@/imports/auth/store/authStore";

const useKanbanView = () => {
  const { tasks, sortBy, filterBy, groupBy } = useKanbanStore();

  const { user } = useAuthStore();

  // 1. Filter
  const filteredTasks =
    filterBy === "all"
      ? tasks
      : tasks.filter((task) => task.priority === filterBy);

  // 2. Sort
  const sortTasks = (taskList) => {
    return [...taskList].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "priority") {
        const priorityOrder = {
          high: 1,
          medium: 2,
          low: 3,
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      return 0;
    });
  };

  // 3. Board columns
  let columns = [];

  if (groupBy === "status") {
    columns = [
      { title: "Backlog", value: "backlog" },
      { title: "In Progress", value: "in_progress" },
      { title: "Review", value: "review" },
      { title: "Done", value: "done" },
    ];
  }

  if (groupBy === "priority") {
    columns = [
      { title: "High Priority", value: "high" },
      { title: "Medium Priority", value: "medium" },
      { title: "Low Priority", value: "low" },
    ];
  }

  if (groupBy === "assignee") {
    const assignees = [...new Set(filteredTasks.map((task) => task.assignee))];

    columns = assignees.map((assignee) => ({
      title: assignee === "" ? user?.name : assignee,
      value: assignee,
    }));
  }

  // 4. Used by BoardView
  const getSortedTasks = (column) => {
    const columnTasks = filteredTasks.filter((task) => {
      if (groupBy === "status") {
        return task.status === column.value;
      }

      if (groupBy === "priority") {
        return task.priority === column.value;
      }

      if (groupBy === "assignee") {
        return task.assignee === column.value;
      }

      return true;
    });

    return sortTasks(columnTasks);
  };

  // 5. Used by TableView + AllTaskView
  const sortedTasks = sortTasks(filteredTasks);

  return {
    filteredTasks,
    sortedTasks,
    columns,
    getSortedTasks,
  };
};

export default useKanbanView;
