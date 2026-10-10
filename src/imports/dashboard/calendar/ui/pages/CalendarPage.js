import styled from "styled-components";
import CalendarHeader from "../components/CalendarHeader";
import { Flex } from "@/imports/core/components/Flex";
import CalendarStats from "../components/CalendarStats";
import CalendarView from "../components/CalendarView";

const CalendarPage = () => {
  return (
    <Page direction="column">
      <CalendarHeader />
      <CalendarStats />
      <CalendarView />
    </Page>
  );
};

export default CalendarPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
