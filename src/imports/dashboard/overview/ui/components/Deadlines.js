import React from "react";
import Card from "./Card";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import formatDate from "@/imports/core/utils/formatDate";

const Deadlines = ({ tasksByProj }) => {
  const { tasks } = useKanbanStore();

  const getLabel = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);

    const diff = dueDate - today;
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return "Overdue";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";

    return "Upcoming";
  };

  return (
    <Card
      title="Upcoming Deadlines"
      showLink={true}
      linkText="Calendar →"
      linkHref={"/calendar"}
    >
      <List direction="column">
        {tasksByProj
          .slice(0, 4)
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map((task) => {
            const label = getLabel(task.dueDate);
            return (
              <TaskRow key={task.id} align="center">
                <DateBadge
                  direction="column"
                  align="center"
                  justify="center"
                  gap="1px"
                >
                  <Month>
                    {formatDate(task.dueDate, "long").slice(0, 3).toUpperCase()}
                  </Month>
                  <Day>{task.dueDate.split("-")[2]}</Day>
                </DateBadge>

                <TaskInfo direction="column" gap="3px">
                  <TaskTitle>{task.title}</TaskTitle>
                  <Category>{task.desc}</Category>
                </TaskInfo>

                <Deadline $type={label}>{label}</Deadline>
              </TaskRow>
            );
          })}
      </List>
    </Card>
  );
};

export default Deadlines;

const List = styled.div`
  width: 100%;
`;
const TaskRow = styled(Flex)`
  gap: 14px;
  width: 100%;
  min-height: 69px;
  padding: 10px 18px;
  border-bottom: 1px solid var(--surface-muted);
  &:last-child {
    border-bottom: none;
  }
`;
const DateBadge = styled(Flex)`
  width: 44px;
  min-width: 44px;
  height: 42px;
  background: var(--slate-50);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-11);
`;
const Month = styled.span`
  color: #ff4564;
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
  line-height: 12px;
`;
const Day = styled.span`
  color: var(--text-heading);
  font-size: var(--fs-16);
  font-weight: var(--fw-700);
  line-height: var(--lh-18);
`;
const TaskInfo = styled(Flex)`
  flex: 1;
  min-width: 0;
`;
const TaskTitle = styled.div`
  color: var(--text-heading);
  font-size: var(--fs-13);
  font-weight: var(--fw-650);
  line-height: var(--lh-17);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Category = styled.div`
  color: #71809a;
  font-size: var(--fs-11);
  line-height: var(--lh-14);
`;
const Deadline = styled.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: var(--fs-11);
  font-weight: var(--fw-500);
  white-space: nowrap;
  color: ${({ $type }) => {
    switch ($type) {
      case "Overdue":
        return "#ff334f";
      case "Tomorrow":
        return "var(--orange-500)";
      case "Today":
        return "var(--emerald-500)";
      default:
        return "var(--text-muted)";
    }
  }};
  @media (max-width: 420px) {
    font-size: var(--fs-10);
  }
`;
