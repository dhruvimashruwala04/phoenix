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
      projName: "phoenix",
      searchQuery: "",

      events: [],

      setShowNewEvent: (showNewEvent) => set({ showNewEvent }),
      setTitle: (title) => set({ title }),
      setDate: (date) => set({ date }),
      setStartTime: (startTime) => set({ startTime }),
      setEndTime: (endTime) => set({ endTime }),
      setCategory: (category) => set({ category }),
      setProjName: (projName) => set({ projName }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      saveEvent: () =>
        set((state) => {
          const {
            selectedEventId,
            title,
            date,
            startTime,
            endTime,
            category,
            events,
            projName,
          } = state;

          const eventData = {
            title,
            date,
            startTime: `${date}T${startTime}`,
            endTime: `${date}T${endTime}`,
            category,
            projName,
          };

          if (selectedEventId) {
            return {
              events: events.map((event) =>
                event.id === selectedEventId
                  ? { ...event, ...eventData }
                  : event,
              ),
              showNewEvent: false,
              selectedEventId: null,
            };
          }

          const newEvent = {
            id: Date.now().toString(),
            ...eventData,
          };

          return {
            events: [...events, newEvent],
            showNewEvent: false,
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
            projName: event.projName,
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
          projName: "phoenix",
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
          projName: "phoenix",
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
