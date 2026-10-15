import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMilestones = create(
  persist(
    (set) => ({
      selectedView: "all",
      showModal: false,

      title: "",
      phase: "",
      completedTasks: 6,
      totalTasks: "",
      dueDate: "",
      status: "",
      searchQuery: "",

      milestones: [],

      setSelectedView: (selectedView) => set({ selectedView }),
      setShowModal: (showModal) => set({ showModal }),
      setTitle: (title) => set({ title }),
      setPhase: (phase) => set({ phase }),
      setTotalTasks: (totalTasks) => set({ totalTasks }),
      setDueDate: (dueDate) => set({ dueDate }),
      setStatus: (status) => set({ status }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      addMilestone: () => {
        set((state) => {
          const totalTasks = Number(state.totalTasks);
          const completedTasks = Number(state.completedTasks);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const dueDate = new Date(state.dueDate);
          dueDate.setHours(0, 0, 0, 0);

          const daysRemaining = Math.ceil(
            (dueDate - today) / (1000 * 60 * 60 * 24),
          );

          const status =
            totalTasks > 0 && completedTasks >= totalTasks
              ? "Completed"
              : daysRemaining <= 5
                ? "Due soon"
                : "Upcoming";

          const newMilestone = {
            id: Date.now().toString(),
            title: state.title,
            phase: state.phase,
            completedTasks: state.completedTasks,
            totalTasks,
            dueDate: state.dueDate,
            status,
          };

          return {
            milestones: [...state.milestones, newMilestone],
            title: "",
            phase: "",
            totalTasks: "",
            dueDate: "",
          };
        });
      },

      deleteMilestone: (id) => {
        set((state) => ({
          milestones: state.milestones.filter((m) => m.id !== id),
        }));
      },

      handleToggleStatus: (id) => {
        set((state) => ({
          milestones: state.milestones.map((m) => {
            if (m.id !== id) return m;
            if (m.status === "Completed") {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const dueDate = new Date(m.dueDate);
              dueDate.setHours(0, 0, 0, 0);

              const daysRemaining = Math.ceil(
                (dueDate - today) / (1000 * 60 * 60 * 24),
              );

              return {
                ...m,
                status: daysRemaining <= 5 ? "Due soon" : "Upcoming",
                completedTasks: 2,
              };
            }

            return {
              ...m,
              status: "Completed",
              completedTasks: m.totalTasks,
            };
          }),
        }));
      },
    }),
    {
      name: "milestones-storage",
    },
  ),
);

export default useMilestones;
