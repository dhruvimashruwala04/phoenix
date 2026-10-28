"use client";

import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Flag, Path, Shield, Users } from "@/imports/core/assets/Icons";
import useWorkload from "@/imports/dashboard/workload/hooks/useWorkload";
import useMilestones from "@/imports/dashboard/milestones/store/milestonesStore";
import formatDate from "@/imports/core/utils/formatDate";

const Cards = () => {
  const { milestones } = useMilestones();
  const { teamUtilization } = useWorkload();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = milestones
    .filter((m) => m.status === "Upcoming" && new Date(m.dueDate) >= today)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  const daysLeft = upcoming
    ? Math.ceil(
        (new Date(upcoming.dueDate).setHours(0, 0, 0, 0) - today.getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  const highlights = [
    {
      title: "Critical Path",
      subtitle: "7 tasks",
      description: "Ends on Aug 11, 2026",
      icon: Path,
      color: "#a12bff",
      bg: "#faf2ff",
      type: "critical",
    },
    {
      title: "Upcoming Milestones",
      subtitle: upcoming?.title,
      description: `${formatDate(upcoming?.dueDate, "long")} (${daysLeft} days left)`,
      icon: Flag,
      color: "#8138ff",
      bg: "#f5f1ff",
      type: "milestone",
    },
    {
      title: "Workload Overview",
      subtitle: `${teamUtilization}%`,
      description: "BALANCED",
      icon: Users,
      color: "#2683ff",
      bg: "#edf5ff",
      type: "workload",
    },
    {
      title: "AI Risk Detection",
      subtitle: "2 tasks may impact project timeline",
      description: "View Risks",
      icon: Shield,
      color: "#ff4352",
      bg: "#fff0f1",
      type: "risk",
    },
  ];

  return (
    <Highlights>
      {highlights.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} align="center" gap="16px">
            <IconBox
              align="center"
              justify="center"
              $bg={item.bg}
              $color={item.color}
            >
              <Icon size={20} color={item.color} />
            </IconBox>

            <Content direction="column" gap="5px">
              <Title>{item.title}</Title>

              {item.type === "workload" ? (
                <>
                  <WorkloadRow align="center" justify="space-between">
                    <StrongValue>{item.subtitle}</StrongValue>
                    <Balanced>{item.description}</Balanced>
                  </WorkloadRow>

                  <ProgressTrack>
                    <ProgressFill $value={78} />
                  </ProgressTrack>
                </>
              ) : item.type === "risk" ? (
                <>
                  <Description>{item.subtitle}</Description>
                  <RiskLink
                    type="button"
                    onClick={() => console.log("View AI risks")}
                  >
                    {item.description}
                  </RiskLink>
                </>
              ) : (
                <>
                  <Subtitle>{item.subtitle}</Subtitle>
                  <Description>{item.description}</Description>
                </>
              )}
            </Content>

            {item.type === "risk" && <RiskBadge>2 RISKS</RiskBadge>}
          </Card>
        );
      })}
    </Highlights>
  );
};

export default Cards;

const Highlights = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
const Card = styled(Flex)`
  position: relative;
  min-height: 100px;
  padding: 20px 22px;
  background: var(--white, #fff);
  border: 1px solid #edf0f5;
  border-radius: var(--radius-13);
  box-shadow: 0 2px 3px rgba(20, 30, 50, 0.04);
`;
const IconBox = styled(Flex)`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-12);
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;
const Content = styled(Flex)`
  flex: 1;
  min-width: 0;
`;
const Title = styled.span`
  color: #172033;
  font-size: var(--fs-12);
  line-height: 1.3;
  font-weight: var(--fw-700);
`;
const Subtitle = styled.span`
  color: var(--text-secondary);
  font-size: var(--fs-11);
  line-height: 1.4;
`;
const Description = styled.span`
  color: var(--gray-500);
  font-size: var(--fs-10);
  text-align: left;
  line-height: 1.5;
`;
const WorkloadRow = styled(Flex)`
  width: 100%;
`;
const StrongValue = styled.span`
  color: #172033;
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
`;
const Balanced = styled.span`
  color: var(--gray-500);
  font-size: var(--fs-9);
  letter-spacing: 0.3px;
`;
const ProgressTrack = styled.div`
  display: flex;
  width: 100%;
  height: 4px;
  margin-top: 3px;
  overflow: hidden;
  border-radius: var(--radius-10);
  background: #edf0f5;
`;
const ProgressFill = styled.div`
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  border-radius: inherit;
  background: var(--violet-700);
`;
const RiskBadge = styled.span`
  position: absolute;
  top: 22px;
  right: 20px;
  padding: 3px 6px;
  border-radius: 4px;
  background: #ffe4e6;
  color: var(--red-500);
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
`;
const RiskLink = styled.button`
  align-self: flex-start;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--red-500);
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
