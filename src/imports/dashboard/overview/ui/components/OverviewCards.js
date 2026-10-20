import React from "react";
import styled from "styled-components";
import Projects from "./Projects";
import Deadlines from "./Deadlines";
import MyTasks from "./MyTasks";
import RecentActivities from "./RecentActivities";

const OverviewCards = ({ tasksByProj, projByFilter }) => {
  return (
    <Section>
      <Column>
        <Projects projByFilter={projByFilter} />
        <MyTasks tasksByProj={tasksByProj} />
      </Column>
      <Column>
        <Deadlines tasksByProj={tasksByProj} />
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
