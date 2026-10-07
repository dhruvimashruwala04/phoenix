import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import {
  TotalTask,
  Completed,
  InProgress,
  Overdue,
  TeamWorkload,
} from "../assets/Icons";

const KanbanStats = () => {
  const tasks = useKanbanStore((state) => state.tasks);
  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      subText: "↑ 16% vs last month",
      icon: TotalTask,
      iconBg: "rgb(238, 242, 255)",
    },
    {
      title: "Completed",
      value: tasks.filter((task) => task.status === "done").length,
      subText: "56% of total tasks",
      icon: Completed,
      iconBg: "rgb(236, 253, 245)",
    },
    {
      title: "In Progress",
      value: tasks.filter((task) => task.status === "in_progress").length,
      subText: "↑ 8% vs last week",
      icon: InProgress,
      iconBg: "rgb(239, 246, 255);",
    },
    {
      title: "Overdue",
      value: tasks.filter((task) => task.status === "backlog").length,
      subText: "↑ 2% vs last week",
      icon: Overdue,
      iconBg: "rgb(255, 241, 242)",
    },
    {
      title: "Team Workload",
      value: "Medium",
      subText: "Balanced",
      icon: TeamWorkload,
      iconBg: "rgb(245, 243, 255)",
    },
  ];

  return (
    <Container>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} align="center" gap="16px">
            <IconBox $background={stat.iconBg}>
              <Icon />
            </IconBox>

            <Content direction="column">
              <Title>{stat.title}</Title>
              <Value>{stat.value}</Value>
              <SubText>{stat.subText}</SubText>
            </Content>
          </Card>
        );
      })}
    </Container>
  );
};
export default KanbanStats;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(180px, 1fr));
  gap: 16px;
`;
const Card = styled(Flex)`
  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgb(241, 245, 249) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
  padding: 20px 16px;
  height: 97px;
`;
const IconBox = styled(Flex)`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ $background }) => $background};
`;
const Content = styled(Flex)`
  min-width: 0;
`;
const Title = styled.span`
  color: rgb(100, 116, 139);
  font-size: 12px;
  text-align: left;
  line-height: 18px;
`;
const Value = styled.span`
  color: rgb(15, 23, 42);
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
`;
const SubText = styled.span`
  color: rgb(148, 163, 184);
  font-size: 11px;
  line-height: 16px;
  text-align: left;
`;
