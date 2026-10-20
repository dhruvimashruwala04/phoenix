import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import { TotalTask, InProgress, Overdue, TeamWorkload } from "../assets/Icons";
import { CheckCircle } from "@/imports/core/assets/Icons";

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
      icon: CheckCircle,
      iconBg: "var(--emerald-50)",
    },
    {
      title: "In Progress",
      value: tasks.filter((task) => task.status === "in_progress").length,
      subText: "↑ 8% vs last week",
      icon: InProgress,
      iconBg: "var(--blue-50);",
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
  border-radius: var(--radius-12);
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
  padding: 20px 16px;
  height: 97px;
`;
const IconBox = styled(Flex)`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: var(--radius-12);
  background: ${({ $background }) => $background};
`;
const Content = styled(Flex)`
  min-width: 0;
`;
const Title = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-12);
  text-align: left;
  line-height: var(--lh-18);
`;
const Value = styled.span`
  color: var(--slate-900);
  font-size: var(--fs-22);
  font-weight: var(--fw-700);
  line-height: var(--lh-26);
`;
const SubText = styled.span`
  color: var(--text-muted-2);
  font-size: var(--fs-11);
  line-height: var(--lh-16);
  text-align: left;
`;
