import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDocsStore = create(
  persist(
    (set) => ({
      title: "",
      editorVal: "",
      selectedDocId: null,
      viewState: "",
      text: "",

      documents: [],

      setEditorVal: (editorVal) => set({ editorVal }),
      setViewState: (viewState) => set({ viewState }),
      setText: (text) => set({ text }),

      addDocument: () => {
        set((state) => {
          const newDoc = {
            id: Date.now().toString(),
            title: "Untitled doc",
            content: "# Heading\nStart writing…",
            createdAt: Date.now(),
          };
          return {
            documents: [...state.documents, newDoc],
            selectedDocId: newDoc.id,
            title: newDoc.title,
            editorVal: newDoc.content,
            viewState: "edit",
            text: "All changes saved",
          };
        });
      },

      deleteDocument: (id) =>
        set((state) => {
          const documents = state.documents.filter((doc) => doc.id !== id);
          const firstDoc = documents[0];
          return {
            documents,
            selectedDocId: firstDoc?.id || null,
            title: firstDoc?.title || "",
            editorVal: firstDoc?.content || "",
            text: "All changes saved",
          };
        }),

      setSelectedDoc: (id) =>
        set((state) => {
          const doc = state.documents.find((doc) => doc.id === id);
          if (!doc) return state;
          return {
            selectedDocId: id,
            title: doc.title,
            editorVal: doc.content,
          };
        }),

      setTitle: (title) =>
        set((state) => ({
          title,
          documents: state.documents.map((doc) =>
            doc.id === state.selectedDocId ? { ...doc, title } : doc,
          ),
        })),

      setEditorVal: (editorVal) =>
        set((state) => ({
          editorVal,
          documents: state.documents.map((doc) =>
            doc.id === state.selectedDocId
              ? { ...doc, content: editorVal }
              : doc,
          ),
        })),
    }),
    {
      name: "docs-storage",
      partialize: (state) => ({
        documents: state.documents,
      }),
    },
  ),
);

export default useDocsStore;
