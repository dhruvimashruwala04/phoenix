"use client";

import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useKanbanStore from "../../store/kanbanStore";
import formatDate from "@/imports/core/utils/formatDate";

const AllTaskView = ({ tasks }) => {
  const updateTaskStatus = useKanbanStore((state) => state.updateTaskStatus);

  const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      color: "var(--text-muted-2)",
    },
    {
      value: "in_progress",
      label: "In Progress",
      color: "var(--blue-500)",
    },
    {
      value: "review",
      label: "Review",
      color: "var(--orange-500)",
    },
    {
      value: "done",
      label: "Done",
      color: "var(--emerald-500)",
    },
  ];

  return (
    <Container>
      {statuses.map((status) => {
        const statusTasks = tasks.filter(
          (task) => task.status === status.value,
        );

        return (
          <StatusGroup key={status.value}>
            <GroupHeader>
              <GroupTitle>
                <StatusDot $color={status.color} />
                <span>{status.label}</span>
                <Count>{statusTasks.length}</Count>
              </GroupTitle>
            </GroupHeader>

            <TaskList>
              {statusTasks.map((task) => (
                <TaskRow key={task.id}>
                  <Checkbox
                    type="checkbox"
                    checked={task.status === "done"}
                    onChange={() => {
                      if (task.status === "done") {
                        updateTaskStatus(task.id, "backlog");
                      } else {
                        updateTaskStatus(task.id, "done");
                      }
                    }}
                  />

                  <TaskTitle $done={task.status === "done"}>
                    {task.title}
                  </TaskTitle>

                  <Priority $priority={task.priority}>
                    {task.priority === "high"
                      ? "High"
                      : task.priority === "medium"
                        ? "Medium"
                        : "Low"}
                  </Priority>

                  <DueDate>{formatDate(task.dueDate)}</DueDate>
                </TaskRow>
              ))}
            </TaskList>
          </StatusGroup>
        );
      })}
    </Container>
  );
};

export default AllTaskView;

const Container = styled(Flex)`
  align-items: stretch;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;
const StatusGroup = styled.div`
  width: 100%;
  background: var(--white);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-14);
  overflow: hidden;
`;
const GroupHeader = styled(Flex)`
  height: 44px;
  align-items: center;
  padding: 0 18px;
  border-bottom: 1px solid var(--border-muted);
`;
const GroupTitle = styled(Flex)`
  align-items: center;
  gap: 8px;
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  color: var(--slate-800);
`;
const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: var(--radius-full);
  background: ${({ $color }) => $color};
`;
const Count = styled.span`
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-9);
  background: var(--slate-100);
  color: var(--text-muted);
  font-size: var(--fs-10);
  font-weight: var(--fw-600);
`;
const TaskList = styled.div`
  width: 100%;
`;
const TaskRow = styled(Flex)`
  min-height: 42px;
  padding: 0 18px;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid var(--slate-100);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: var(--slate-50);
  }
`;
const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-5);
  accent-color: var(--blue-accent);
  cursor: pointer;
`;
const TaskTitle = styled.div`
  flex: 1;
  font-size: var(--fs-14);
  font-weight: var(--fw-500);
  color: ${({ $done }) => ($done ? "var(--text-muted)" : "var(--slate-900)")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: ${({ $done }) => ($done ? "line-through" : "none")};
`;
const Priority = styled.span`
  min-width: 56px;
  text-align: center;
  padding: 3px 7px;
  border-radius: var(--radius-4);
  font-size: var(--fs-10);
  font-weight: var(--fw-600);
  color: ${({ $priority }) => {
    if ($priority === "high") return "var(--rose-500)";
    if ($priority === "medium") return "var(--amber-500)";
    return "var(--emerald-500)";
  }};
  background: ${({ $priority }) => {
    if ($priority === "high") return "var(--rose-50)";
    if ($priority === "medium") return "var(--amber-50)";
    return "var(--emerald-50)";
  }};
`;
const DueDate = styled.span`
  width: 55px;
  font-size: var(--fs-12);
  color: var(--text-muted);
  text-align: right;
`;
