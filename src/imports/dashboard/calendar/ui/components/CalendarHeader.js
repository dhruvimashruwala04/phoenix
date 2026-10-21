"use client";
import { Flex } from "@/imports/core/components/Flex";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import AiInsightsBox from "@/imports/dashboard/ui/components/AiInsightsBox";
import NotificationBox from "@/imports/dashboard/ui/components/NotificationBox";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import useCalendarStore from "../../store/calendarStore";
import styled from "styled-components";
import { ChevronDown } from "@/imports/core/assets/Icons";
import { projects } from "@/imports/dashboard/kanban/api/constants";

const CalendarHeader = ({ currentProj, setCurrentProj }) => {
  const { setShowNewEvent, clearSelectedEvent, searchQuery, setSearchQuery } =
    useCalendarStore();

  const projectName =
    projects.find((p) => p.value === currentProj)?.label || "All";

  const handleNextProject = () => {
    const currentIndex = projects.findIndex((p) => p.value === currentProj);
    if (currentIndex === -1) {
      setCurrentProj(projects[0].value);
    } else if (currentIndex === projects.length - 1) {
      setCurrentProj(null);
    } else {
      setCurrentProj(projects[currentIndex + 1].value);
    }
  };

  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <TextWrapper direction="column">
        <Title>Calendar</Title>
        <Content>Plan, schedule and manage your work</Content>
      </TextWrapper>

      <Details type="button" onClick={handleNextProject}>
        <Dot $color={projects.find((p) => p.value === currentProj)?.color} />
        {projectName}
        <ChevronDown />
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
const Details = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
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
  background: ${({ $color }) => $color || "var(--text-muted)"};
`;
