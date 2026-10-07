import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Clock, Completed, Folder, Team } from "../assets/Icons";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";

const StatsCards = () => {
  const tasks = useKanbanStore((state) => state.tasks);
  const stats = [
    {
      title: "Active projects",
      value: tasks.length,
      subText: "2 due this quarter",
      icon: Folder,
      iconBg: "rgb(238, 242, 255)",
    },
    {
      title: "Due this week",
      value: "14",
      subText: "3 overdue",
      icon: Clock,
      iconBg: "rgb(255, 251, 235)",
    },
    {
      title: "Completed this month",
      value: "72",
      subText: "↑ 16% vs last month",
      icon: Completed,
      iconBg: "rgb(236, 253, 245)",
    },
    {
      title: "Team members",
      value: "12",
      subText: "9 online now",
      icon: Team,
      iconBg: "rgb(245, 243, 255)",
    },
  ];

  return (
    <Container>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} align="center">
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
export default StatsCards;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
`;
const Card = styled(Flex)`
  min-width: 0;
  padding: 20px 16px;
  gap: 16px;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgb(241, 245, 249) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
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
`;
