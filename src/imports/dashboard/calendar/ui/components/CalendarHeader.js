"use client";
import { Flex } from "@/imports/core/components/Flex";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import AiInsightsBox from "@/imports/dashboard/ui/components/AiInsightsBox";
import NotificationBox from "@/imports/dashboard/ui/components/NotificationBox";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import useCalendarStore from "../../store/calendarStore";
import styled from "styled-components";
import { Down } from "../assets/Icons";

const CalendarHeader = () => {
  const projectName = useOnboardingStore((state) => state.projectName);
  const { setShowNewEvent, clearSelectedEvent, searchQuery, setSearchQuery } =
    useCalendarStore();

  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <TextWrapper direction="column">
        <Title>Calendar</Title>
        <Content>Plan, schedule and manage your work</Content>
      </TextWrapper>

      <Details gap="6px" align="center" justify="space-between">
        <Dot></Dot>
        {projectName}
        <Down />
      </Details>
      <SearchBox
        placeholder="Search events, tasks, people..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <AiInsightsBox text="AI Insights" />
      <NotificationBox />
      <ActionButton
        text="Create Event"
        onClick={() => {
          clearSelectedEvent();
          setShowNewEvent(true);
        }}
      />
    </Header>
  );
};

export default CalendarHeader;

const Header = styled(Flex)`
  min-height: 64px;
  background: var(--white);
  border-bottom: 1px solid var(--slate-100);
  padding: 12px 24px;
  z-index: var(--z-header);
  width: 100%;
`;
const TextWrapper = styled(Flex)`
  min-width: 160px;
  flex: 1 1 160px;
`;
const Title = styled.span`
  font-weight: var(--fw-700);
  font-size: var(--fs-18);
  line-height: var(--lh-24);
`;
const Content = styled.span`
  font-size: var(--fs-12);
  color: var(--text-muted);
  line-height: var(--lh-16);
  text-align: left;
`;
const Details = styled(Flex)`
  width: fit-content;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-8);
  background: var(--white);
  color: var(--text-muted);
  font-size: var(--fs-12);
  cursor: pointer;
  strong {
    color: var(--slate-800);
    font-weight: var(--fw-600);
  }
`;
const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: var(--indigo-500);
`;
