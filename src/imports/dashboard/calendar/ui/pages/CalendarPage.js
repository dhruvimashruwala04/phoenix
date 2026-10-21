"use client";
import styled from "styled-components";
import CalendarHeader from "../components/CalendarHeader";
import { Flex } from "@/imports/core/components/Flex";
import CalendarStats from "../components/CalendarStats";
import CalendarView from "../components/CalendarView";
import AiPanel from "../components/AiPanel";
import NewEventModal from "../components/NewEventModal";
import useCalendarStore from "../../store/calendarStore";
import { useEffect, useState } from "react";

const CalendarPage = () => {
  const { showNewEvent } = useCalendarStore();

  const [mainCalendarApi, setMainCalendarApi] = useState(null);
  const [miniCalendarApi, setMiniCalendarApi] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 17));
  const [currentProj, setCurrentProj] = useState(null);

  useEffect(() => {
    [mainCalendarApi, miniCalendarApi].forEach((api) => {
      if (!api) return;
      const calendarDate = api.getDate();
      if (calendarDate.getTime() !== currentDate.getTime()) {
        api.gotoDate(currentDate);
      }
    });
  }, [currentDate, mainCalendarApi, miniCalendarApi]);

  const syncDate = (date) => {
    setCurrentDate((previous) =>
      previous.getTime() === date.getTime() ? previous : date,
    );
  };

  return (
    <Page>
      <Content direction="column">
        <CalendarHeader
          currentProj={currentProj}
          setCurrentProj={setCurrentProj}
        />
        <CalendarStats />
        <CalendarView
          onCalendarReady={setMainCalendarApi}
          onDateChange={syncDate}
          selectedDate={currentDate}
          currentProj={currentProj}
        />
        {showNewEvent && <NewEventModal />}
      </Content>
      <AiPanel
        onCalendarReady={setMiniCalendarApi}
        onDateChange={syncDate}
        selectedDate={currentDate}
      />
    </Page>
  );
};

export default CalendarPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  flex: 1 1 70%;
  border-right: 1px solid var(--slate-100);
`;
