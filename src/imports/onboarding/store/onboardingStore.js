import getInitials from "@/imports/core/utils/getInitials";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOnboardingStore = create(
  persist(
    (set) => ({
      name: "John Smith",
      role: "Product",
      teamSize: "2-10",

      workspaceName: "Acme Inc.",
      workspaceUrl: "acme-inc",
      selectedColor: "#4f46e5",

      inviteeEmail: "",
      inviteeRole: "Member",
      inviteeName: "",
      status: "Pending",
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
      setInviteeName: (inviteeName) => set({ inviteeName }),
      setStatus: (status) => set({ status }),

      addInvite: () =>
        set((state) => {
          if (!state.inviteeEmail.trim()) return state;

          const newInvite = {
            inviteeEmail: state.inviteeEmail,
            inviteeRole: state.inviteeRole,
            inviteeName: state.inviteeName,
            status: state.status,
            initials: getInitials(state.inviteeName),
            color: "#6366f1",
          };

          return {
            invites: [...state.invites, newInvite],
            inviteeEmail: "",
            inviteeRole: "Member",
            inviteeName: "",
            status: "Pending",
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
    }),
    {
      name: "invites-storage",
      partialize: (state) => ({
        invites: state.invites,
      }),
    },
  ),
);

export default useOnboardingStore;
