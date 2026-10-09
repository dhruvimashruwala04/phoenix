import { create } from "zustand";

const useMilestones = create((set) => ({
  selectedView: "all",
  showModal: false,

  setSelectedView: (selectedView) => set({ selectedView }),
  setShowModal: (showModal) => set({ showModal }),
}));

export default useMilestones;
