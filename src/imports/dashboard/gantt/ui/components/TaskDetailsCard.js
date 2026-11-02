import { useState } from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { More } from "@/imports/core/assets/Icons";
import getInitials from "@/imports/core/utils/getInitials";
import formatDate from "@/imports/core/utils/formatDate";
import { projects } from "@/imports/dashboard/kanban/api/constants";

const initialSubtasks = [
  { title: "Dashboard design", done: true },
  { title: "User flow screens", done: true },
  { title: "Mobile responsive", done: true },
  { title: "Design review", done: false },
  { title: "Prototype", done: false },
];

const TaskDetailsCard = ({ selectedId, tasks }) => {
  const [subtasks, setSubtasks] = useState(initialSubtasks);

  const completed = subtasks.filter((task) => task.done).length;
  const progress = Math.round((completed / subtasks.length) * 100);

  const toggleSubtask = (index) => {
    setSubtasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const selectedTask = tasks.find((t) => t.id === selectedId);
  const projectName = projects.find(
    (p) => p.value === selectedTask?.projName,
  )?.label;

  const getLabel = (value) =>
    value?.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Card direction="column">
      <Header align="center" justify="space-between">
        <Heading>Task Details</Heading>
        <MoreButton aria-label="More options">
          <More />
        </MoreButton>
      </Header>

      <Body direction="column" gap="20px">
        <TaskHeading direction="column" gap="8px">
          <TaskName align="center" gap="8px">
            <TaskDot />
            {selectedTask?.title}
          </TaskName>

          <Tag>{projectName}</Tag>
        </TaskHeading>

        <DetailRow>
          <Label>STATUS</Label>
          <StatusBadge $status={selectedTask?.status}>
            {getLabel(selectedTask?.status)}
          </StatusBadge>
        </DetailRow>

        <DetailRow>
          <Label>PRIORITY</Label>
          <PriorityBadge $priority={selectedTask?.priority}>
            {getLabel(selectedTask?.priority)}
          </PriorityBadge>
        </DetailRow>

        <DetailRow>
          <Label>ASSIGNEE</Label>
          <Assignee align="center" gap="7px">
            <Avatar>{getInitials(selectedTask?.assignee)}</Avatar>
            <AssigneeName>{selectedTask?.assignee}</AssigneeName>
          </Assignee>
        </DetailRow>

        <DetailRow>
          <Label>START DATE</Label>
          <DateValue>{formatDate(selectedTask?.startDate, "long")}</DateValue>
        </DetailRow>

        <DetailRow>
          <Label>DUE DATE</Label>
          <DateValue>{formatDate(selectedTask?.dueDate, "long")}</DateValue>
        </DetailRow>

        <ProgressSection direction="column" gap="8px">
          <DetailRow align="center" justify="space-between" flex="true">
            <Label>PROGRESS</Label>
            <ProgressValue>{progress}%</ProgressValue>
          </DetailRow>

          <ProgressTrack>
            <ProgressFill $value={progress} />
          </ProgressTrack>
        </ProgressSection>

        <DescriptionSection direction="column" gap="7px">
          <Label>DESCRIPTION</Label>
          <Description>{selectedTask?.desc}</Description>
        </DescriptionSection>

        <SubtasksSection direction="column" gap="9px">
          <DetailRow align="center" justify="space-between" flex="true">
            <Label>SUBTASKS</Label>
            <ProgressValue>
              {completed}/{subtasks.length}
            </ProgressValue>
          </DetailRow>

          {subtasks.map((task, index) => (
            <SubtaskRow key={task.title} align="center" gap="10px">
              <Checkbox
                type="checkbox"
                checked={task.done}
                onChange={() => toggleSubtask(index)}
                aria-label={task.title}
              />
              <SubtaskText $done={task.done}>{task.title}</SubtaskText>
            </SubtaskRow>
          ))}
        </SubtasksSection>

        <FullDetailsButton
          onClick={() => console.log("Open full task details")}
        >
          View Full Details
        </FullDetailsButton>
      </Body>
    </Card>
  );
};

export default TaskDetailsCard;

const Card = styled(Flex)`
  width: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid #edf0f5;
  border-radius: 13px;
  box-shadow: 0 2px 3px rgba(20, 30, 50, 0.04);
`;

const Header = styled(Flex)`
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid #edf0f5;
`;

const Heading = styled.h3`
  margin: 0;
  color: #172033;
  font-size: 14px;
  font-weight: 700;
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
`;

const Body = styled(Flex)`
  width: 100%;
  padding: 20px;
`;

const TaskHeading = styled(Flex)`
  width: 100%;
  margin-bottom: 2px;
`;

const TaskName = styled(Flex)`
  color: #172033;
  font-size: 15px;
  font-weight: 700;
`;

const TaskDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a78bfa;
`;

const Tag = styled.span`
  align-self: flex-start;
  padding: 3px 8px;
  border-radius: 5px;
  background: #f4efff;
  color: #7838ed;
  font-size: 10px;
  font-weight: 700;
`;

const DetailRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  ${({ flex }) => flex && `display: flex;`}
`;

const Label = styled.span`
  color: #64748b;
  font-size: 10px;
  letter-spacing: 0.5px;
`;

const StatusBadge = styled.span`
  padding: 6px 10px;
  border-radius: 7px;
  background: #edf5ff;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
  justify-self: end;
  color: ${({ $status }) => {
    if ($status === "done") return "rgb(34, 197, 94)";
    if ($status === "review") return "rgb(234, 179, 8)";
    if ($status === "backlog") return "var(--rose-500)";
    if ($status === "in_progress") return "var(--indigo-500)";
  }};
  background: ${({ $status }) => {
    if ($status === "done") return "rgb(240, 253, 244)";
    if ($status === "review") return "rgb(254, 252, 232)";
    if ($status === "backlog") return "var(--rose-50)";
    if ($status === "in_progress") return "var(--indigo-50)";
  }};
`;

const PriorityBadge = styled.span`
  padding: 6px 11px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
  justify-self: end;
  color: ${({ $priority }) => {
    if ($priority === "low") return "rgb(34, 197, 94)";
    if ($priority === "medium") return "rgb(234, 179, 8)";
    if ($priority === "high") return "var(--rose-500)";
  }};
  background: ${({ $priority }) => {
    if ($priority === "low") return "rgb(240, 253, 244)";
    if ($priority === "medium") return "rgb(254, 252, 232)";
    if ($priority === "high") return "var(--rose-50)";
  }};
`;

const Assignee = styled(Flex)`
  padding: 6px 9px;
  border-radius: 8px;
  background: #f8fafc;
  width: fit-content;
  justify-self: end;
`;

const Avatar = styled(Flex).attrs({
  align: "center",
  justify: "center",
})`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #8538f4;
  color: white;
  font-size: 7px;
  font-weight: 700;
`;

const AssigneeName = styled.span`
  color: #172033;
  font-size: 11px;
  font-weight: 600;
`;

const DateValue = styled.div`
  flex: 1;
  min-width: 0;
  padding: 9px 10px;
  border: 1px solid #edf0f5;
  border-radius: 7px;
  background: #f8fafc;
  color: #172033;
  font-size: 12px;
  font-weight: 600;
`;

const ProgressSection = styled(Flex)`
  width: 100%;
`;

const ProgressValue = styled.span`
  color: #172033;
  font-size: 11px;
  font-weight: 700;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: 10px;
  background: #edf0f5;
`;

const ProgressFill = styled.div`
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  border-radius: inherit;
  background: #8538f4;
  transition: width 0.2s ease;
`;

const DescriptionSection = styled(Flex)`
  margin-top: 2px;
`;

const Description = styled.p`
  margin: 0;
  color: #475569;
  font-size: 12px;
  line-height: 1.6;
`;

const SubtasksSection = styled(Flex)`
  margin-top: 2px;
  width: 100%;
`;

const SubtaskRow = styled(Flex)`
  min-height: 16px;
  width: 100%;
`;

const Checkbox = styled.input`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin: 0;
  accent-color: #8538f4;
  cursor: pointer;
`;

const SubtaskText = styled.span`
  color: ${({ $done }) => ($done ? "#64748b" : "#334155")};
  font-size: 12px;
`;

const FullDetailsButton = styled.button`
  width: 100%;
  min-height: 40px;
  margin-top: 2px;
  border: 1px solid #edf0f5;
  border-radius: 8px;
  background: #fff;
  color: #7625e8;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #faf7ff;
    border-color: #d9ccff;
  }
`;
