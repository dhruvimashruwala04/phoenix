import React from "react";
import { Flex } from "@/imports/core/components/Flex";
import styled from "styled-components";
import { Add } from "../assets/Icons";
import useKanbanStore from "../../store/kanbanStore";
import TaskCard from "./TaskCard";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const BoardView = ({ columns, getSortedTasks }) => {
  const { setShowTask, searchQuery, updateTask, groupBy } = useKanbanStore();

  const query = searchQuery.trim().toLowerCase();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newValue = destination.droppableId;

    const fieldByGroup = {
      status: "status",
      assignee: "assignee",
      priority: "priority",
    };

    const field = fieldByGroup[groupBy];
    if (!field) return;

    updateTask(draggableId, {
      [field]: newValue,
    });
  };

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
      <View>
        {columns.map((column) => {
          const sortedTasks = getSortedTasks(column);
          const filteredTasks = sortedTasks.filter((task) => {
            return (
              task.title?.toLowerCase().includes(query) ||
              task.desc?.toLowerCase().includes(query)
            );
          });

          return (
            <Droppable
              key={column.value}
              droppableId={String(column.value)}
              isDropDisabled={false}
            >
              {(provided, snapshot) => (
                <Column
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  direction="column"
                  gap="12px"
                  $isDraggingOver={snapshot.isDraggingOver}
                >
                  <Header justify="space-between" align="center">
                    <Left gap="12px" align="center">
                      <Title>{column.title}</Title>
                      <Counter>{sortedTasks.length}</Counter>
                    </Left>

                    <AddBtn onClick={() => setShowTask(true)}>
                      <Add />
                    </AddBtn>
                  </Header>

                  <TaskList>
                    {filteredTasks.map((task, index) => (
                      <Draggable
                        key={String(task.id)}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <DraggableTask
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            $isDragging={snapshot.isDragging}
                          >
                            <TaskCard
                              title={task.title}
                              desc={task.desc}
                              priority={task.priority}
                              status={task.status}
                              assignee={task.assignee}
                              dueDate={task.dueDate}
                            />
                          </DraggableTask>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </TaskList>

                  <AddTask onClick={() => setShowTask(true)}>
                    + Add task
                  </AddTask>
                </Column>
              )}
            </Droppable>
          );
        })}
      </View>
    </DragDropContext>
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
  outline: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "rgb(165, 180, 252)dashed 2px" : "transparent"};
  outline-offset: 6px;
  border-radius: 12px;
  min-height: 200px;
  transition:
    background 150ms ease,
    border-color 150ms ease;
`;
const Header = styled(Flex)`
  padding: 12px 14px;
  width: 100%;
`;
const Left = styled(Flex)`
  color: var(--text-muted);
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--slate-900);
`;
const Counter = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--border-muted);
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
  color: var(--indigo-500);
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
    background: var(--indigo-50);
  }
`;
const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 80px;
  width: 100%;
`;
const DraggableTask = styled.div`
  width: 100%;
  cursor: grab;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.65 : 1)};
  &:active {
    cursor: grabbing;
  }
`;
