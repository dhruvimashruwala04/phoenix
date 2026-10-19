import React from "react";
import styled from "styled-components";
import Projects from "./Projects";
import Deadlines from "./Deadlines";
import MyTasks from "./MyTasks";
import RecentActivities from "./RecentActivities";

const OverviewCards = () => {
  return (
    <Section>
      <Column>
        <Projects />
        <MyTasks />
      </Column>
      <Column>
        <Deadlines />
        <RecentActivities />
      </Column>
    </Section>
  );
};

export default OverviewCards;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
