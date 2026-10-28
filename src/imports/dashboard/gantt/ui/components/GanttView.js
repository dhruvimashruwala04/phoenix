import React from "react";
import styled from "styled-components";
import TaskDetailsCard from "./TaskDetailsCard";
import MainView from "./MainView";

const GanttView = () => {
  return (
    <Grid>
      <MainView />
      <TaskDetailsCard />
    </Grid>
  );
};

export default GanttView;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 24px;
`;
