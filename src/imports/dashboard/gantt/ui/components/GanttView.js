"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskDetailsCard from "./TaskDetailsCard";
import MainView from "./MainView";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";

const GanttView = ({ searchQuery }) => {
  const { tasks } = useKanbanStore();

  const initialId = tasks[0]?.id;
  useEffect(() => {
    setSelectedId(initialId);
  }, [tasks]);

  const [selectedId, setSelectedId] = useState(initialId);

  return (
    <Grid>
      <MainView setSelectedId={setSelectedId} searchQuery={searchQuery} />
      <TaskDetailsCard selectedId={selectedId} tasks={tasks} />
    </Grid>
  );
};

export default GanttView;

const Grid = styled.div`
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
  gap: 24px;
  align-items: start;
`;
