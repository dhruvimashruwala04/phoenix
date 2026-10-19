import {
  Figma,
  GitHub,
  GoogleDrive,
  Jira,
  Slack,
  Zoom,
} from "../../settings/assets/Icons";

export const initialRequests = [
  {
    name: "Jordan Park",
    email: "jordan@acme.com",
    team: "Engineering",
  },
  {
    name: "Maya Chen",
    email: "maya@acme.com",
    request: "Marketing",
  },
];

export const initialPermissions = [
  {
    name: "Create & edit tasks",
    description: "Add, edit and move tasks on any board",
    admin: true,
    member: true,
    viewer: false,
  },
  {
    name: "Delete tasks",
    description: "Permanently remove tasks",
    admin: true,
    member: false,
    viewer: false,
  },
  {
    name: "Create projects",
    description: "Start new projects and templates",
    admin: true,
    member: true,
    viewer: false,
  },
  {
    name: "Manage milestones",
    description: "Create, edit and complete milestones",
    admin: true,
    member: true,
    viewer: false,
  },
  {
    name: "Comment",
    description: "Comment and @mention on tasks",
    admin: true,
    member: true,
    viewer: true,
  },
  {
    name: "View reports",
    description: "Access Reports and Workload analytics",
    admin: true,
    member: true,
    viewer: true,
  },
  {
    name: "Use AI actions",
    description: "Auto-schedule, rebalance and apply insights",
    admin: true,
    member: true,
    viewer: false,
  },
  {
    name: "Invite members",
    description: "Send invitations to the workspace",
    admin: true,
    member: false,
    viewer: false,
  },
  {
    name: "Manage billing",
    description: "Change plan, seats and invoices",
    admin: true,
    member: false,
    viewer: false,
  },
  {
    name: "Export data",
    description: "Download CSV exports",
    admin: true,
    member: true,
    viewer: false,
  },
];

export const initialIntegration = [
  {
    app: "Slack",
    description: "Post updates to channels",
    connected: true,
    icon: Slack,
  },
  {
    app: "GitHub",
    description: "Link PRs to tasks",
    connected: true,
    icon: GitHub,
  },
  {
    app: "Figma",
    description: "Embed live design files",
    connected: false,
    icon: Figma,
  },
  {
    app: "Google Drive",
    description: "Attach Drive files",
    connected: false,
    icon: GoogleDrive,
  },
  {
    app: "Jira",
    description: "Two-way issue sync",
    connected: false,
    icon: Jira,
  },
  {
    app: "Zoom",
    description: "Create meetings from events",
    connected: true,
    icon: Zoom,
  },
];

export const plans = [
  {
    name: "Starter",
    description: "Up to 5 members, 3 projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
  },
  {
    name: "Pro",
    description: "Unlimited projects, Gantt, AI insights",
    monthlyPrice: 12,
    yearlyPrice: 12 * 0.8,
  },
  {
    name: "Business",
    description: "SSO, audit log, advanced permissions",
    monthlyPrice: 24,
    yearlyPrice: 24 * 0.8,
  },
];
