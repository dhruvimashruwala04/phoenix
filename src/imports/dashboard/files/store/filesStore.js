import { create } from "zustand";

const useFilesStore = create((set) => ({
  aciveCategory: "all",
  view: "grid",

  //   setActiveCategory:()
}));

export default useFilesStore;
