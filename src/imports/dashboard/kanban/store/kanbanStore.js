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
      assignee: useAuthStore.getState().user?.name,
      dueDate: "",
      projName: "phoenix",

      tasks: [],

      sortBy: "title",
      filterBy: "all",
      groupBy: "status",

      searchQuery: "",

      setAiPanel: (aiPanel) => set({ aiPanel }),
      setShowTask: (showTask) => set({ showTask }),
      setView: (view) => set({ view }),

      setTitle: (title) => set({ title }),
      setDesc: (desc) => set({ desc }),
      setPriority: (priority) => set({ priority }),
      setStatus: (status) => set({ status }),
      setAssignee: (assignee) => set({ assignee }),
      setDueDate: (dueDate) => set({ dueDate }),
      setProjName: (projName) => set({ projName }),

      setSortBy: (sortBy) => set({ sortBy }),
      setFilterBy: (filterBy) => set({ filterBy }),
      setGroupBy: (groupBy) => set({ groupBy }),

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      resetTask: () =>
        set({
          title: "",
          description: "",
          priority: "high",
          status: "backlog",
          projName: "phoenix",
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
            projName: state.projName,
          };

          return {
            tasks: [...state.tasks, newTask],
            title: "",
            desc: "",
            priority: "high",
            status: "backlog",
            assignee: "",
            dueDate: "",
            projName: "phoenix",
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

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task,
          ),
        })),
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
