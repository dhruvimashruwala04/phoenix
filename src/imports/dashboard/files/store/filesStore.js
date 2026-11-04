import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFilesStore = create(
  persist(
    (set) => ({
      category: "all",
      view: "grid",

      files: [],
      selectedId: "null",

      setCategory: (category) => set({ category }),
      setView: (view) => set({ view }),
      setSelectedId: (selectedId) => set({ selectedId }),

      addFile: (file) => {
        set((state) => {
          const newFile = {
            id: Date.now().toString(),
            name: file.name,
            type: file.name.split(".").pop().toLowerCase(),
            size: file.size,
            category: state.category === "all" ? "design" : state.category,
            owner: "You",
            modified: new Date().toISOString(),
            starred: false,
          };
          return { files: [newFile, ...state.files] };
        });
      },

      deleteFile: (id) =>
        set((state) => ({
          files: state.files.filter((file) => file.id !== id),
          selectedId: state.selectedId === id ? "" : state.selectedId,
        })),

      toggleStar: (id) =>
        set((state) => ({
          files: state.files.map((file) =>
            file.id === id ? { ...file, starred: !file.starred } : file,
          ),
        })),
    }),
    {
      name: "files-storage",
    },
  ),
);

export default useFilesStore;
