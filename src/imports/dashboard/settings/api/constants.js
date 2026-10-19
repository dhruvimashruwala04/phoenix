import {
  Billing,
  DangerZone,
  Integrations,
  Notifications,
  Profile,
} from "../assets/Icons";

export const tabs = [
  { label: "Profile", icon: Profile },
  { label: "Notifications", icon: Notifications },
  { label: "Integrations", icon: Integrations },
  { label: "Billing", icon: Billing },
  { label: "Danger Zone", icon: DangerZone, danger: true },
];

export const initialPermissions = [
  {
    name: "Mentions",
    value: "mentions",
    description: "When someone @mentions you",
    allow: true,
  },
  {
    name: "Assignments",
    value: "assignments",
    description: "When a task is assigned to you",
    allow: true,
  },
  {
    name: "Due date reminders",
    value: "duedate",
    description: "24 hours before a task is due",
    allow: true,
  },
  {
    name: "Status changes",
    value: "status",
    description: "When tasks you follow change status",
    allow: false,
  },
  {
    name: "AI insights",
    value: "aiinsights",
    description: "Weekly risks and recommendations digest",
    allow: true,
  },
  {
    name: "Email digest",
    value: "email",
    description: "Daily summary email at 8:00 AM",
    allow: false,
  },
];
