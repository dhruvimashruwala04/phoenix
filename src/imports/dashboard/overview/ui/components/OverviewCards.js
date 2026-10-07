import React from "react";
import styled from "styled-components";
import Projects from "./Projects";
import Deadlines from "./Deadlines";
import MyTasks from "./MyTasks";
import RecentActivities from "./RecentActivities";

const OverviewCards = () => {
  return (
    <Section>
      <Projects />
      <Deadlines />
      <MyTasks />
      <RecentActivities />
    </Section>
  );
};

export default OverviewCards;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(340px, 1fr));
  gap: 24px;
  align-items: start;
  width: 100%;
`;
