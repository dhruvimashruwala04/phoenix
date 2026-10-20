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
      iconBg: "var(--indigo-50)",
    },
    {
      title: "Completed",
      value: tasks.filter((task) => task.status === "done").length,
      subText: "56% of total tasks",
      icon: Completed,
      iconBg: "var(--emerald-50)",
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
      iconBg: "var(--rose-50)",
    },
    {
      title: "Team Workload",
      value: "Medium",
      subText: "Balanced",
      icon: TeamWorkload,
      iconBg: "var(--violet-50)",
    },
  ];

  return (
    <Container>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} align="center" gap="16px">
            <IconBox align="center" justify="center" $background={stat.iconBg}>
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
  background: var(--white);
  border-radius: 12px;
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
  padding: 20px 16px;
  height: 97px;
`;
const IconBox = styled(Flex)`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ $background }) => $background};
`;
const Content = styled(Flex)`
  min-width: 0;
`;
const Title = styled.span`
  color: var(--text-muted);
  font-size: 12px;
  text-align: left;
  line-height: 18px;
`;
const Value = styled.span`
  color: var(--slate-900);
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
`;
const SubText = styled.span`
  color: var(--text-muted-2);
  font-size: 11px;
  line-height: 16px;
  text-align: left;
`;
