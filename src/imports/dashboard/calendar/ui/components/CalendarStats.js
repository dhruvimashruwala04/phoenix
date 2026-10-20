import styled from "styled-components";
import { Event } from "../assets/Icons";
import { Clock, Flag, Users } from "@/imports/core/assets/Icons";
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
      icon: Users,
      iconColor: "var(--blue-500)",
      iconBg: "var(--blue-50)",
    },
    {
      title: "Deadlines",
      value: "6",
      subText: "↓ 2% vs last month",
      icon: Flag,
      iconSize: 16,
      iconColor: "var(--red-500)",
      iconBg: "var(--red-50)",
    },
    {
      title: "Focus Time",
      value: "24h 30m",
      subText: "This month",
      icon: Clock,
      iconColor: "#A855F7",
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
              <Icon color={stat.iconColor} size={stat.iconSize} />
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
  border-radius: var(--radius-12);
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
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
`;
