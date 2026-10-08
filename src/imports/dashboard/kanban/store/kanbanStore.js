import { persist } from "zustand/middleware";
import { create } from "zustand";
import useAuthStore from "@/imports/auth/store/authStore";

const useKanbanStore = create(
  persist(
    (set) => ({
      aiPanel: true,
      showTask: false,
      view: "board",

      title: "",
      desc: "",
      priority: "high",
      status: "backlog",
      assignee: useAuthStore.getState().user?.name || "",
      dueDate: "",

      tasks: [],

      sortBy: "title",
      filterBy: "all",
      groupBy: "status",

      setAiPanel: (aiPanel) => set({ aiPanel }),
      setShowTask: (showTask) => set({ showTask }),
      setView: (view) => set({ view }),

      setTitle: (title) => set({ title }),
      setDesc: (desc) => set({ desc }),
      setPriority: (priority) => set({ priority }),
      setStatus: (status) => set({ status }),
      setAssignee: (assignee) => set({ assignee }),
      setDueDate: (dueDate) => set({ dueDate }),

      setSortBy: (sortBy) => set({ sortBy }),
      setFilterBy: (filterBy) => set({ filterBy }),
      setGroupBy: (groupBy) => set({ groupBy }),

      resetTask: () =>
        set({
          title: "",
          description: "",
          priority: "high",
          status: "backlog",
        }),

      addTask: () =>
        set((state) => {
          const newTask = {
            id: Date.now().toString(),
            title: state.title,
            desc: state.desc,
            priority: state.priority,
            status: state.status,
            assignee: state.assignee,
            dueDate: state.dueDate,
          };

          return {
            tasks: [...state.tasks, newTask],
            title: "",
            desc: "",
            priority: "high",
            status: "backlog",
            assignee: "",
            dueDate: "",
          };
        }),

      updateTaskStatus: (taskId, newStatus) =>
        set((state) => {
          return {
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, status: newStatus } : task,
            ),
          };
        }),
    }),
    {
      name: "kanban-storage",
      partialize: (state) => ({
        tasks: state.tasks,
      }),
    },
  ),
);

export default useKanbanStore;
