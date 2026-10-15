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
