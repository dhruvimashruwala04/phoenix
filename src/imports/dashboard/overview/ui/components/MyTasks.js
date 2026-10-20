import React from "react";
import Card from "./Card";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useKanbanStore from "../../../kanban/store/kanbanStore";
import formatDate from "@/imports/core/utils/formatDate";
import useAuthStore from "@/imports/auth/store/authStore";
import PrimaryButton from "@/imports/core/components/PrimaryButton";

const MyTasks = ({ tasksByProj }) => {
  const { updateTaskStatus } = useKanbanStore();
  const { user } = useAuthStore();

  const myTasks = tasksByProj
    .filter((task) => task.assignee === user?.name)
    .slice(0, 5);

  const total = myTasks.length;
  const done = myTasks.filter((task) => task.status === "done").length;

  return (
    <Card
      title="My tasks today"
      showLink={false}
      headerText={`${done} of ${total} done`}
    >
      <TaskList>
        {myTasks.map((task) => (
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

            <TaskTitle $done={task.status === "done"}>{task.title}</TaskTitle>

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
      <AddTask align="center" gap="8px">
        <Input
          placeholder="Add a task for today and press Enter"
          // value={reply}
          // onChange={(event) => setReply(event.target.value)}
          // onKeyDown={(event) => {
          //   if (event.key === "Enter" && !event.shiftKey) {
          //     event.preventDefault();
          //     handleReply();
          //   }
          // }}
        />

        <PrimaryButton width="fit-content">Add</PrimaryButton>
      </AddTask>
    </Card>
  );
};

export default MyTasks;

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
  border: 1px solid rgba(223, 228, 233, 1);
  border-radius: 5px;
  accent-color: var(--blue-accent);
  cursor: pointer;
`;
const TaskTitle = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
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
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
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
  font-size: 12px;
  color: var(--text-muted);
  text-align: right;
`;
const AddTask = styled(Flex)`
  width: 100%;
  padding: 14px 18px;
  border-top: 1px solid var(--slate-100);
`;
const Input = styled.input`
  flex: 1;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  box-sizing: border-box;
  border: 1px solid var(--slate-100);
  border-radius: 7px;
  outline: none;
  font-size: 12px;
  color: var(--slate-900);
  &::placeholder {
    color: var(--text-muted-2);
  }
  &:focus {
    border-color: var(--indigo-500);
  }
`;
