import styled from "styled-components";
import { Deadlines, Event, Focus, Meetings } from "../assets/Icons";
import { Flex } from "@/imports/core/components/Flex";

const CalendarStats = () => {
  const stats = [
    {
      title: "Events This Month",
      value: "32",
      subText: "↑ 12% vs last month",
      icon: Event,
      iconBg: "var(--indigo-50)",
    },
    {
      title: "Meetings",
      value: "18",
      subText: "↑ 8% vs last month",
      icon: Meetings,
      iconBg: "rgb(239, 246, 255)",
    },
    {
      title: "Deadlines",
      value: "6",
      subText: "↓ 2% vs last month",
      icon: Deadlines,
      iconBg: "rgb(254, 242, 242)",
    },
    {
      title: "Focus Time",
      value: "24h 30m",
      subText: "This month",
      icon: Focus,
      iconBg: "var(--violet-50)",
    },
  ];
  return (
    <Container>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card gap="16px" key={stat.title} align="center">
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

export default CalendarStats;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  padding: 24px;
`;
const Card = styled(Flex)`
  min-width: 0;
  padding: 20px 16px;
  background: var(--white);
  border-radius: 12px;
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
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
`;
