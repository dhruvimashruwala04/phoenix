import { create } from "zustand";

const useOnboardingStore = create((set) => ({
  name: "John Smith",
  role: "Product",
  teamSize: "2-10",

  workspaceName: "Acme Inc.",
  workspaceUrl: "acme-inc",
  selectedColor: "#4f46e5",

  inviteeEmail: "",
  inviteeRole: "Member",
  invites: [],

  projectName: "Website Redesign",
  view: "Kanban board",
  aiTasks: false,

  setName: (name) => set({ name }),
  setRole: (role) => set({ role }),
  setTeamSize: (teamSize) => set({ teamSize }),

  setWorkspaceName: (workspaceName) => {
    const slug = workspaceName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    set({
      workspaceName,
      workspaceUrl: slug,
    });
  },

  setWorkspaceUrl: (workspaceUrl) => set({ workspaceUrl }),

  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setWorkspaceUrl: (workspaceUrl) => set({ workspaceUrl }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),

  setInviteeEmail: (inviteeEmail) => set({ inviteeEmail }),
  setInviteeRole: (inviteeRole) => set({ inviteeRole }),

  addInvite: () =>
    set((state) => {
      if (!state.inviteeEmail.trim()) return state;

      const initials = state.inviteeEmail
        .split("@")[0]
        .split(/[._-]/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      const newInvite = {
        inviteeEmail: state.inviteeEmail,
        inviteeRole: state.inviteeRole,
        initials,
        color: "#6366f1",
      };

      return {
        invites: [...state.invites, newInvite],
        inviteeEmail: "",
        inviteeRole: "Member",
      };
    }),

  removeInvite: (inviteeEmail) =>
    set((state) => ({
      invites: state.invites.filter(
        (invite) => invite.inviteeEmail !== inviteeEmail,
      ),
    })),

  setProjectName: (projectName) => set({ projectName }),
  setView: (view) => set({ view }),
  setAiTasks: (aiTasks) => set({ aiTasks }),
}));

export default useOnboardingStore;
