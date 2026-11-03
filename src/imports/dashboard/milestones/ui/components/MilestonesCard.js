import { Flex } from "@/imports/core/components/Flex";
import styled from "styled-components";
import { Calendar, Due } from "../assets/Icons";
import { Flag, Trash } from "@/imports/core/assets/Icons";
import useMilestonesStore from "../../store/milestonesStore";
import formatDate from "@/imports/core/utils/formatDate";

const MilestonesCard = ({ milestone }) => {
  const { deleteMilestone, handleToggleStatus } = useMilestonesStore();

  const progress = Math.round(
    (milestone.completedTasks / milestone.totalTasks) * 100,
  );

  return (
    <Card>
      <TopSection align="center" gap="12px">
        <IconBox align="center" justify="center" $status={milestone?.status}>
          {milestone.status === "Upcoming" ? (
            <Flag />
          ) : milestone.status === "Completed" ? (
            <Flag filled />
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
          <span>Due {formatDate(milestone.dueDate, "long")}</span>
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
  background: var(--white);
  border: 1px solid #f0eef5;
  border-radius: var(--radius-13);
  box-shadow: 0 2px 5px var(--shadow-xs);
  color: var(--gray-900);
`;
const TopSection = styled(Flex)`
  min-width: 0;
`;
const IconBox = styled(Flex)`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: var(--radius-11);
  color: ${({ $status }) =>
    $status === "Upcoming"
      ? "var(--violet-600)"
      : $status === "Due soon"
        ? "var(--amber-600)"
        : "var(--emerald-600)"};
  background: ${({ $status }) =>
    $status === "Upcoming"
      ? "var(--violet-50)"
      : $status === "Due soon"
        ? "var(--amber-50)"
        : "var(--emerald-50)"};
`;
const ProjectInfo = styled(Flex)`
  flex: 1;
  min-width: 0;
`;
const ProjectName = styled.h3`
  margin: 0;
  font-size: var(--fs-14);
  font-weight: var(--fw-650);
  line-height: var(--lh-18);
  color: var(--gray-900);
`;
const Category = styled.span`
  font-size: var(--fs-11);
  color: var(--text-muted);
`;
const Status = styled.span`
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: var(--radius-4);
  font-size: var(--fs-10);
  font-weight: var(--fw-650);
  color: ${({ $status }) =>
    $status === "Upcoming"
      ? "var(--violet-600)"
      : $status === "Due soon"
        ? "var(--amber-600)"
        : "var(--emerald-600)"};
  background: ${({ $status }) =>
    $status === "Upcoming"
      ? "var(--violet-50)"
      : $status === "Due soon"
        ? "var(--amber-50)"
        : "var(--emerald-50)"};
`;
const ProgressSection = styled.div`
  margin-top: 15px;
`;
const ProgressHeader = styled(Flex)`
  margin-bottom: 6px;
`;
const ProgressLabel = styled.span`
  font-size: var(--fs-10);
  letter-spacing: var(--ls-sm);
  color: var(--text-muted);
`;
const ProgressValue = styled.span`
  font-size: var(--fs-11);
  font-weight: var(--fw-700);
  color: var(--gray-900);
`;
const ProgressTrack = styled.div`
  width: 100%;
  height: 6px;
  border-radius: var(--radius-20);
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
      ? "var(--violet-600)"
      : $status === "Due soon"
        ? "var(--amber-600)"
        : "var(--emerald-600)"};
`;
const Details = styled(Flex)`
  margin-top: 14px;
`;
const DueDate = styled(Flex)`
  font-size: var(--fs-11);
  color: var(--text-muted);
`;
const TaskCount = styled.span`
  font-size: var(--fs-11);
  color: var(--text-muted);
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
  border-radius: var(--radius-8);
  background: ${({ $completed }) => ($completed ? "#ede9fe" : "#f5f1ff")};
  color: var(--violet-600);
  font-size: var(--fs-12);
  font-weight: var(--fw-650);
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
  border-radius: var(--radius-8);
  background: var(--white);
  color: var(--text-muted-2);
  cursor: pointer;
  &:hover {
    background: var(--rose-50);
    color: var(--rose-600);
    border-color: var(--rose-200);
  }
`;
