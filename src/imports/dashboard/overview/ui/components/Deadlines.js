import React from "react";
import Card from "./Card";
import useKanbanStore from "@/imports/dashboard/kanban/store/kanbanStore";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import formatDateLong from "@/imports/core/utils/formatDateLong";

const Deadlines = () => {
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
        {tasks
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
                    {formatDateLong(task.dueDate).slice(0, 3).toUpperCase()}
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
  border-bottom: 1px solid #f1f3f7;
  &:last-child {
    border-bottom: none;
  }
`;
const DateBadge = styled(Flex)`
  width: 44px;
  min-width: 44px;
  height: 42px;
  background: #f8fafc;
  border: 1px solid #edf0f5;
  border-radius: 11px;
`;
const Month = styled.span`
  color: #ff4564;
  font-size: 9px;
  font-weight: 700;
  line-height: 12px;
`;
const Day = styled.span`
  color: #172033;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
`;
const TaskInfo = styled(Flex)`
  flex: 1;
  min-width: 0;
`;
const TaskTitle = styled.div`
  color: #172033;
  font-size: 13px;
  font-weight: 650;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Category = styled.div`
  color: #71809a;
  font-size: 11px;
  line-height: 14px;
`;
const Deadline = styled.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $type }) => {
    switch ($type) {
      case "Overdue":
        return "#ff334f";
      case "Tomorrow":
        return "#f97316";
      case "Today":
        return "#10b981";
      default:
        return "#64748b";
    }
  }};
  @media (max-width: 420px) {
    font-size: 10px;
  }
`;
