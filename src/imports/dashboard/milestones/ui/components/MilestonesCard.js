import { Flex } from "@/imports/core/components/Flex";
import styled from "styled-components";
import { Calendar, Due, Flag, FlagFilled, Trash } from "../assets/Icons";
import formatDateLong from "@/imports/core/utils/formatDateLong";
import useMilestones from "../../store/useMilestones";

const MilestonesCard = ({ milestone }) => {
  const { deleteMilestone, handleToggleStatus } = useMilestones();

  const progress = Math.round(
    (milestone.completedTasks / milestone.totalTasks) * 100,
  );

  return (
    <Card>
      <TopSection align="center" gap="12px">
        <IconBox $status={milestone?.status}>
          {milestone.status === "Upcoming" ? (
            <Flag />
          ) : milestone.status === "Completed" ? (
            <FlagFilled />
          ) : (
            <Due />
          )}
        </IconBox>
        <ProjectInfo direction="column" gap="3px">
          <ProjectName>{milestone?.title}</ProjectName>
          <Category>{milestone?.phase}</Category>
        </ProjectInfo>
        <Status $status={milestone?.status}>{milestone?.status}</Status>
      </TopSection>
      <ProgressSection>
        <ProgressHeader justify="space-between" align="center">
          <ProgressLabel>PROGRESS</ProgressLabel>
          <ProgressValue>{progress}%</ProgressValue>
        </ProgressHeader>
        <ProgressTrack>
          <ProgressFill $progress={progress} $status={milestone?.status} />
        </ProgressTrack>
      </ProgressSection>
      <Details justify="space-between" align="center">
        <DueDate align="center" gap="6px">
          <Calendar />
          <span>Due {formatDateLong(milestone.dueDate)}</span>
        </DueDate>
        <TaskCount>
          {milestone.completedTasks}/{milestone.totalTasks} tasks
        </TaskCount>
      </Details>
      <Divider />
      <Actions align="center" gap="8px">
        <CompleteButton
          $completed={progress === 100}
          onClick={() => handleToggleStatus(milestone.id)}
        >
          {progress === 100 ? "Reopen" : "Mark complete"}
        </CompleteButton>
        <DeleteButton onClick={() => deleteMilestone(milestone.id)}>
          <Trash />
        </DeleteButton>
      </Actions>
    </Card>
  );
};

export default MilestonesCard;

const Card = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 19px;
  background: #ffffff;
  border: 1px solid #f0eef5;
  border-radius: 13px;
  box-shadow: 0 2px 5px rgba(15, 23, 42, 0.035);
  color: #111827;
`;
const TopSection = styled(Flex)`
  min-width: 0;
`;
const IconBox = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  color: ${({ $status }) =>
    $status === "Upcoming"
      ? "#7c3aed"
      : $status === "Due soon"
        ? "rgb(217, 119, 6)"
        : "rgb(5, 150, 105)"};
  background: ${({ $status }) =>
    $status === "Upcoming"
      ? "rgb(245, 243, 255)"
      : $status === "Due soon"
        ? "rgb(255, 251, 235)"
        : "rgb(236, 253, 245)"};
`;
const ProjectInfo = styled(Flex)`
  flex: 1;
  min-width: 0;
`;
const ProjectName = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  line-height: 18px;
  color: #111827;
`;
const Category = styled.span`
  font-size: 11px;
  color: #64748b;
`;
const Status = styled.span`
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 650;
  color: ${({ $status }) =>
    $status === "Upcoming"
      ? "#7c3aed"
      : $status === "Due soon"
        ? "rgb(217, 119, 6)"
        : "rgb(5, 150, 105)"};
  background: ${({ $status }) =>
    $status === "Upcoming"
      ? "rgb(245, 243, 255)"
      : $status === "Due soon"
        ? "rgb(255, 251, 235)"
        : "rgb(236, 253, 245)"};
`;
const ProgressSection = styled.div`
  margin-top: 15px;
`;
const ProgressHeader = styled(Flex)`
  margin-bottom: 6px;
`;
const ProgressLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.25px;
  color: #64748b;
`;
const ProgressValue = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #111827;
`;
const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 20px;
  overflow: hidden;
  background: #f0f0f3;
`;
const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  border-radius: inherit;
  transition: width 250ms ease;
  background: ${({ $status }) =>
    $status === "Upcoming"
      ? "#7c3aed"
      : $status === "Due soon"
        ? "rgb(217, 119, 6)"
        : "rgb(5, 150, 105)"};
`;
const Details = styled(Flex)`
  margin-top: 14px;
`;
const DueDate = styled(Flex)`
  font-size: 11px;
  color: #64748b;
`;
const TaskCount = styled.span`
  font-size: 11px;
  color: #64748b;
`;
const Divider = styled.div`
  height: 1px;
  margin: 14px 0 12px;
  background: #f1f0f5;
`;
const Actions = styled(Flex)`
  width: 100%;
`;
const CompleteButton = styled.button`
  flex: 1;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: ${({ $completed }) => ($completed ? "#ede9fe" : "#f5f1ff")};
  color: #7c3aed;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  transition: background 150ms ease;
  &:hover {
    background: #ede5ff;
  }
`;
const DeleteButton = styled.button`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #94a3b8;
  cursor: pointer;
  &:hover {
    background: #fff1f2;
    color: #e11d48;
    border-color: #fecdd3;
  }
`;
