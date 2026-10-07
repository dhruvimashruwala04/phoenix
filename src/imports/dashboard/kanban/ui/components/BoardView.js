import React from "react";
import { Flex } from "@/imports/core/components/Flex";
import styled from "styled-components";
import { Add } from "../assets/Icons";
import useKanbanStore from "../../store/kanbanStore";
import TaskCard from "./TaskCard";

const BoardView = ({ columns, getSortedTasks }) => {
  const { setShowTask } = useKanbanStore();

  return (
    <View>
      {columns.map((column) => {
        const sortedTasks = getSortedTasks(column);
        return (
          <Column direction="column" gap="12px" key={column.value}>
            <Header justify="space-between" align="center">
              <Left align="center">
                <Title>{column.title}</Title>
                <Counter>{sortedTasks.length}</Counter>
              </Left>
              <AddBtn onClick={() => setShowTask(true)}>
                <Add />
              </AddBtn>
            </Header>

            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                desc={task.desc}
                priority={task.priority}
                status={task.status}
                assignee={task.assignee}
                dueDate={task.dueDate}
              />
            ))}

            <AddTask onClick={() => setShowTask(true)}>+ Add task</AddTask>
          </Column>
        );
      })}
    </View>
  );
};

export default BoardView;

const View = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(260px, 1fr));
  gap: 24px;
  align-items: start;
`;
const Column = styled(Flex)`
  border-radius: 12px;
  min-height: 200px;
  outline: transparent dashed 2px;
  outline-offset: 6px;
`;
const Header = styled(Flex)`
  padding: 12px 14px;
  width: 100%;
`;
const Left = styled(Flex)`
  gap: 12px;
  color: rgb(100, 116, 139);
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: rgb(15, 23, 42);
`;
const Counter = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: rgb(100, 116, 139);
  background: rgb(226, 232, 240);
  border-radius: 9999px;
  padding: 1px 7px;
`;
const AddBtn = styled.div`
  cursor: pointer;
`;
const AddTask = styled.button`
  width: 100%;
  border: 0px;
  background: transparent;
  color: rgb(99, 102, 241);
  font-size: 12px;
  font-weight: 500;
  padding: 8px;
  cursor: pointer;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  &:hover {
    background: rgb(238, 242, 255);
  }
`;
