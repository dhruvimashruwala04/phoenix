"use client";
import React from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { AiInsights, Flag, Users } from "@/imports/core/assets/Icons";
import { Overdue, Task } from "@/imports/dashboard/kanban/ui/assets/Icons";
import useMilestonesStore from "@/imports/dashboard/milestones/store/milestonesStore";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import useWorkload from "@/imports/dashboard/workload/hooks/useWorkload";

const Stats = () => {
  const { milestones } = useMilestonesStore();
  const { tasks } = useKanbanStore();
  const { teamUtilization } = useWorkload();

  const upcoming = milestones.filter((m) => m.status === "Upcoming").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const overdue = tasks.filter((t) => t.status === "backlog").length;

  const stats = [
    {
      title: "MILESTONES",
      value: milestones.length,
      subtitle: `${upcoming} upcoming`,
      icon: Flag,
      color: "var(--violet-600)",
      bg: "#f5f1ff",
    },
    {
      title: "TASKS",
      value: tasks.length,
      subtitle: `${inProgress} in progress`,
      icon: Task,
      color: "var(--blue-500)",
      bg: "var(--blue-50)",
    },
    {
      title: "OVERDUE",
      value: overdue,
      subtitle: `${overdue} tasks`,
      icon: Overdue,
      color: "var(--red-500)",
      bg: "var(--red-50)",
    },
    {
      title: "TEAM CAPACITY",
      value: `${teamUtilization}%`,
      subtitle: "Balanced",
      icon: Users,
      color: "var(--emerald-500)",
      bg: "var(--emerald-50)",
    },
  ];

  return (
    <Overview align="stretch" gap="20px" wrap="wrap">
      <ProgressCard align="center" gap="16px">
        <Donut align="center" justify="center" $progress={68}>
          <DonutInner align="center" justify="center">
            68%
          </DonutInner>
        </Donut>

        <ProgressInfo direction="column" gap="3px">
          <SmallTitle>
            OVERALL
            <br />
            PROGRESS
          </SmallTitle>
          <Change>↑12%</Change>
          <Subtitle>vs last month</Subtitle>
        </ProgressInfo>
      </ProgressCard>

      {stats.map((item) => {
        return (
          <StatCard key={item.title} align="center" gap="16px">
            <IconBox
              $bg={item.bg}
              $color={item.color}
              align="center"
              justify="center"
            >
              <item.icon color={item.color} />
            </IconBox>

            <StatInfo direction="column" gap="3px">
              <SmallTitle>{item.title}</SmallTitle>
              <StatValue>{item.value}</StatValue>
              <Subtitle>{item.subtitle}</Subtitle>
            </StatInfo>
          </StatCard>
        );
      })}

      <AIcard direction="column" gap="8px">
        <AIHeading align="flex-start" gap="7px">
          <AiInsights />
          <AIHeadingText>
            AI PROJECT
            <br />
            SUMMARY
          </AIHeadingText>
          <NewBadge>NEW</NewBadge>
        </AIHeading>

        <AIMessage>
          Project is on track to complete 5 days ahead of schedule.
        </AIMessage>

        <Insights onClick={() => console.log("View project insights")}>
          View Insights →
        </Insights>
      </AIcard>
    </Overview>
  );
};

export default Stats;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;
const BaseCard = styled(Flex)`
  min-height: 148px;
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-13);
  box-shadow: 0 2px 3px rgba(20, 30, 50, 0.035);
`;
const ProgressCard = styled(BaseCard)`
  flex: 1.15 1 175px !important;
`;
const Donut = styled(Flex)`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: conic-gradient(
    #8538f4 0%,
    #8538f4 ${({ $progress }) => $progress}%,
    #eee7ff ${({ $progress }) => $progress}%,
    #eee7ff 100%
  );
`;
const DonutInner = styled(Flex)`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: #fff;
  color: #172033;
  font-size: var(--fs-12);
  font-weight: var(--fw-800);
`;
const ProgressInfo = styled(Flex)``;
const SmallTitle = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-10);
  line-height: 1.25;
  font-weight: var(--fw-700);
  letter-spacing: 0.25px;
  text-align: left;
`;
const Change = styled.span`
  color: var(--violet-600);
  font-size: var(--fs-18);
  font-weight: 700;
  line-height: 1.1;
`;
const Subtitle = styled.span`
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1.5;
  text-align: left;
`;
const StatCard = styled(BaseCard)`
  flex: 1 1 150px !important;
`;
const IconBox = styled(Flex)`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-13);
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;
const StatInfo = styled(Flex)`
  min-width: 0;
`;
const StatValue = styled.span`
  color: var(--slate-900);
  font-size: 24px;
  line-height: 1.15;
  font-weight: var(--fw-700);
`;
const AIcard = styled(BaseCard)`
  flex: 1.1 1 175px !important;
  padding: 17px 19px;
  background: var(--violet-700);
  border-color: var(--violet-700);
  box-shadow: 0 5px 18px rgba(112, 37, 216, 0.16);
  color: white;
`;
const AIHeading = styled(Flex)`
  width: 100%;
  color: #fff;
`;
const AIHeadingText = styled.span`
  flex: 1;
  font-size: 10px;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: 0.35px;
`;
const NewBadge = styled.span`
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  font-size: var(--fs-8);
  font-weight: var(--fw-700);
`;
const AIMessage = styled.span`
  color: var(--white);
  font-size: var(--fs-12);
  line-height: 1.4;
`;
const Insights = styled.button`
  align-self: flex-start;
  margin-top: auto;
  padding: 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
