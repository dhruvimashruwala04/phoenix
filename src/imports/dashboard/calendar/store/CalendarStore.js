import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCalendarStore = create(
  persist(
    (set) => ({
      showNewEvent: false,
      title: "",
      date: new Date().toISOString().slice(0, 10),
      startTime: "10:00",
      endTime: "11:00",
      category: "Meeting",
      selectedEventId: null,

      events: [],

      setShowNewEvent: (showNewEvent) => set({ showNewEvent }),
      setTitle: (title) => set({ title }),
      setDate: (date) => set({ date }),
      setStartTime: (startTime) => set({ startTime }),
      setEndTime: (endTime) => set({ endTime }),
      setCategory: (category) => set({ category }),

      saveEvent: () =>
        set((state) => {
          const newEvent = {
            id: Date.now().toString(),
            title: state.title,
            startTime: `${state.date}T${state.startTime}`,
            endTime: `${state.date}T${state.endTime}`,
            category: state.category,
          };

          return {
            events: [...state.events, newEvent],
            showNewEvent: false,
            selectedEventId: null,
            title: "",
            date: new Date().toISOString().slice(0, 10),
            startTime: "10:00",
            endTime: "11:00",
            category: "Meeting",
          };
        }),

      setSelectedEvent: (id) =>
        set((state) => {
          const event = state.events.find((event) => event.id === id);

          if (!event) return state;

          return {
            selectedEventId: id,
            title: event.title,
            date: event.startTime.split("T")[0],
            startTime: event.startTime.split("T")[1].slice(0, 5),
            endTime: event.endTime.split("T")[1].slice(0, 5),
            category: event.category,
          };
        }),

      clearSelectedEvent: () =>
        set({
          selectedEventId: null,
          title: "",
          date: new Date().toISOString().slice(0, 10),
          startTime: "10:00",
          endTime: "11:00",
          category: "Meeting",
        }),

      deleteEvent: () =>
        set((state) => ({
          events: state.events.filter(
            (event) => event.id !== state.selectedEventId,
          ),
          showNewEvent: false,
          selectedEventId: null,
          title: "",
          date: new Date().toISOString().slice(0, 10),
          startTime: "10:00",
          endTime: "11:00",
          category: "Meeting",
        })),
    }),
    {
      name: "events-storage",
      partialize: (state) => ({
        events: state.events,
      }),
    },
  ),
);

export default useCalendarStore;
