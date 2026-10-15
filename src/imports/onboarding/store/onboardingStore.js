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
      linkStatus: "Pending",
      team: "Design",
      status: "Deactivated",
      invites: [],

      projectName: "Website Redesign",
      view: "Kanban board",
      aiTasks: false,

      selectedView: "Members",
      activeFilter: "All",

      searchQuery: "",

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
      setLinkStatus: (linkStatus) => set({ linkStatus }),
      setTeam: (team) => set({ team }),
      setStatus: (status) => set({ status }),

      setSelectedView: (selectedView) => set({ selectedView }),
      setActiveFilter: (activeFilter) => set({ activeFilter }),

      setProjectName: (projectName) => set({ projectName }),
      setView: (view) => set({ view }),
      setAiTasks: (aiTasks) => set({ aiTasks }),

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      addInvite: () =>
        set((state) => {
          if (!state.inviteeEmail.trim()) return state;

          const newInvite = {
            inviteeEmail: state.inviteeEmail,
            inviteeRole: state.inviteeRole,
            inviteeName: state.inviteeName,
            linkStatus: state.linkStatus,
            team: state.team,
            status: state.status,
            initials: getInitials(state.inviteeName),
            color: "#6366f1",
          };

          return {
            invites: [...state.invites, newInvite],
            inviteeEmail: "",
            inviteeRole: "Member",
            inviteeName: "",
            linkStatus: "Pending",
            team: "Design",
            status: "Deactivated",
          };
        }),

      removeInvite: (inviteeEmail) =>
        set((state) => ({
          invites: state.invites.filter(
            (invite) => invite.inviteeEmail !== inviteeEmail,
          ),
        })),

      updateInvite: (inviteeEmail) =>
        set((state) => ({
          invites: state.invites.map((invite) =>
            invite.inviteeEmail === inviteeEmail
              ? {
                  ...invite,
                  linkStatus: "Accepted",
                  status: invite.status === "Active" ? "Deactivated" : "Active",
                }
              : invite,
          ),
        })),

      changeInviteeRole: (inviteeEmail, inviteeRole) =>
        set((state) => ({
          invites: state.invites.map((invite) =>
            invite.inviteeEmail === inviteeEmail
              ? { ...invite, inviteeRole: inviteeRole }
              : invite,
          ),
        })),

      addStaticInvite: (invite) => {
        set((state) => {
          const newInvite = {
            inviteeEmail: invite.email,
            inviteeRole: "Viewer",
            inviteeName: invite.name,
            linkStatus: "Accepted",
            team: invite.team,
            status: "Active",
            initials: getInitials(invite.name),
            color: "#6366f1",
          };

          return { invites: [...state.invites, newInvite] };
        });
      },
    }),
    {
      name: "invites-storage",
    },
  ),
);

export default useOnboardingStore;
