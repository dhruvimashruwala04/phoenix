import useAuthStore from "@/imports/auth/store/authStore";
import getInitials from "@/imports/core/utils/getInitials";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import { useState } from "react";

const useTeam = () => {
  const { user } = useAuthStore();

  const {
    invites,
    activeFilter,
    selectedView,
    role,
    removeInvite,
    updateInvite,
    changeInviteeRole,
  } = useOnboardingStore();

  const [showInvite, setShowInvite] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showBulkStrip, setShowBulkStrip] = useState(false);

  const pendingInvites = invites.filter(
    (invite) => invite.linkStatus === "Pending",
  );
  const acceptedInvitees = invites.filter(
    (invite) => invite.linkStatus !== "Pending",
  );

  const active = [
    {
      color: "#6366f1",
      inviteeEmail: user?.email,
      initials: getInitials(user?.name),
      inviteeName: user?.name,
      team: role,
      status: "Active",
      inviteeRole: "Owner",
      you: true,
    },
    ...acceptedInvitees,
  ];

  const teamCount = active.reduce(
    (acc, invite) => {
      if (invite.team === "Design") acc.design++;
      if (invite.team === "Engineering") acc.engineering++;
      if (invite.team === "Product") acc.product++;
      if (invite.team === "Marketing") acc.marketing++;
      return acc;
    },
    {
      design: 0,
      engineering: 0,
      product: 0,
      marketing: 0,
    },
  );

  const roleCount = active.reduce(
    (acc, invite) => {
      if (invite.inviteeRole === "Owner" || invite.inviteeRole === "Admin") {
        acc.admin++;
      } else if (invite.inviteeRole === "Member") {
        acc.member++;
      } else if (invite.inviteeRole === "Viewer") {
        acc.viewer++;
      }

      return acc;
    },
    { admin: 0, member: 0, viewer: 0 },
  );

  const teamFilter =
    activeFilter === "All"
      ? active
      : active.filter((invite) => invite.team === activeFilter);

  const toggleSelected = (inviteeEmail) => {
    setSelected((prev) => {
      const next = prev.includes(inviteeEmail)
        ? prev.filter((email) => email !== inviteeEmail)
        : [...prev, inviteeEmail];

      setShowBulkStrip(next.length > 0);
      return next;
    });
  };

  const toggleAll = () => {
    const allEmails = teamFilter
      .filter((member) => !member.you)
      .map((member) => member.inviteeEmail);

    const allSelected =
      allEmails.length > 0 &&
      allEmails.every((email) => selected.includes(email));

    const next = allSelected
      ? selected.filter((email) => !allEmails.includes(email))
      : [...new Set([...selected, ...allEmails])];

    setSelected(next);
    setShowBulkStrip(next.length > 0);
  };

  const bulkDelete = () => {
    selected.forEach((email) => removeInvite(email));
    setShowBulkStrip(false);
  };

  const bulkChangeRole = () => {
    selected.forEach((email) => changeInviteeRole(email, "Viewer"));
  };

  const bulkDeactivate = () => {
    selected.forEach((email) => updateInvite(email));
  };

  return {
    showInvite,
    setShowInvite,
    selected,
    setSelected,
    pendingInvites,
    active,
    teamCount,
    teamFilter,
    showBulkStrip,
    setShowBulkStrip,
    selectedView,
    toggleSelected,
    toggleAll,
    changeInviteeRole,
    bulkDelete,
    bulkChangeRole,
    bulkDeactivate,
    roleCount,
  };
};

export default useTeam;
