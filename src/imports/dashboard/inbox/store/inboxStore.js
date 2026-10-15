import { create } from "zustand";
import { inbox_messages } from "../api/constants";

const useInboxStore = create((set) => ({
  selectedId: 1,
  reply: "",
  messages: inbox_messages,
  selectedView: "all",
  searchQuery: "",

  setSelectedView: (selectedView) => set({ selectedView }),
  setSelectedId: (selectedId) => set({ selectedId }),
  setReply: (reply) => set({ reply }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  handleMessageClick: (id) =>
    set((state) => ({
      selectedId: id,
      messages: state.messages.map((m) =>
        m.id === id
          ? {
              ...m,
              read: true,
            }
          : m,
      ),
    })),

  handleUnread: (id) =>
    set((state) => ({
      selectedId: id,
      messages: state.messages.map((m) =>
        m.id === id
          ? {
              ...m,
              read: false,
            }
          : m,
      ),
    })),

  handleAllRead: () =>
    set((state) => ({
      messages: state.messages.map((m) => ({
        ...m,
        read: true,
      })),
    })),

  handleStar: () =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === state.selectedId
          ? {
              ...m,
              starred: !m.starred,
            }
          : m,
      ),
    })),

  handleArchive: () =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === state.selectedId
          ? {
              ...m,
              archive: !m.archive,
            }
          : m,
      ),
    })),

  handleReply: () =>
    set((state) => {
      if (!state.reply.trim()) return state;

      return {
        messages: state.messages.map((m) =>
          m.id === state.selectedId
            ? {
                ...m,
                message: [
                  ...m.message,
                  {
                    out: state.reply,
                  },
                ],
              }
            : m,
        ),
        reply: "",
      };
    }),
}));

export default useInboxStore;
