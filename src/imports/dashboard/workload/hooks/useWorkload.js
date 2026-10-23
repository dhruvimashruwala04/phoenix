import { useEffect, useState } from "react";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import getInitials from "@/imports/core/utils/getInitials";
import useAuthStore from "@/imports/auth/store/authStore";

const useWorkload = () => {
  const { invites, role } = useOnboardingStore();
  const { user } = useAuthStore();

  const initial = invites.map((i) => ({
    name: i.inviteeName,
    team: i.team,
    initials: getInitials(i.inviteeName),
    avatar: i.color,
    hours: [4, 5, 6, 5, 10],
  }));

  const full = [
    {
      name: user?.name,
      team: role,
      initials: getInitials(user?.name),
      avatar: "#6366f1",
      hours: [4, 5, 6, 5, 10],
    },
    ...initial,
  ];

  const [members, setMembers] = useState(full);

  useEffect(() => {
    setMembers(full);
  }, [invites]);

  const getCapacity = (hours) => hours.reduce((total, hour) => total + hour, 0);

  const getStatus = (hours) => {
    if (hours >= 9) return "high";
    if (hours >= 6) return "medium";
    return "low";
  };

  const min_hr = 0;
  const max_hr = 12;

  const handleLeftClick = (member_idx, hour_idx) => {
    const updatedMembers = members.map((member, m_idx) => {
      if (m_idx !== member_idx) return member;

      return {
        ...member,
        hours: member.hours.map((h, h_idx) => {
          if (h_idx !== hour_idx) return h;
          return h < max_hr ? h + 1 : h;
        }),
      };
    });
    setMembers(updatedMembers);
  };

  const handleRightClick = (e, member_idx, hour_idx) => {
    e.preventDefault();
    const updatedMembers = members.map((member, m_idx) => {
      if (m_idx !== member_idx) return member;

      return {
        ...member,
        hours: member.hours.map((h, h_idx) => {
          if (h_idx !== hour_idx) return h;
          return h > min_hr ? h - 1 : h;
        }),
      };
    });
    setMembers(updatedMembers);
  };

  const overloadCount = members.filter(
    (member) => getCapacity(member.hours) > 40,
  ).length;

  const workingDays = 5;
  const hoursPerDay = 8;

  const totalCapacity = members.length * workingDays * hoursPerDay;

  const totalAssignedHours = members.reduce((total, member) => {
    return total + member.hours.reduce((sum, hour) => sum + hour, 0);
  }, 0);

  const teamUtilization =
    totalCapacity > 0
      ? Math.round((totalAssignedHours / totalCapacity) * 100)
      : 0;

  const freeCapacity = members.reduce((total, member) => {
    const assignedHours = member.hours.reduce((sum, hour) => sum + hour, 0);
    return total + Math.max(0, 40 - assignedHours);
  }, 0);

  return {
    getCapacity,
    getStatus,
    members,
    setMembers,
    handleLeftClick,
    handleRightClick,
    overloadCount,
    teamUtilization,
    freeCapacity,
  };
};

export default useWorkload;
