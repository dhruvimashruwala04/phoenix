import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";

const TaskCard = ({ name, progress, color }) => {
  return (
    <Task align="center" gap="10px">
      <Dot $color={color} />
      <TaskInfo direction="column" gap="2px">
        <TaskName>{name}</TaskName>
        <Progress>{progress}% complete</Progress>
      </TaskInfo>
    </Task>
  );
};

export default TaskCard;

const Task = styled(Flex)`
  flex: 1 1 0;
  min-width: 0;
  height: 50px;
  padding: 0 12px;
  border-radius: 11px;
  background: #f8f9fb;
`;
const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#8b5cf6"};
`;
const TaskInfo = styled(Flex)``;
const TaskName = styled.span`
  overflow: hidden;
  color: var(--text-heading);
  font-size: var(--fs-13);
  font-weight: var(--fw-600);
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Progress = styled.span`
  color: var(--text-muted);
  font-size: var(--fs-11);
`;
