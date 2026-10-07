import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useAuthStore from "@/imports/auth/store/authStore";
import getInitials from "@/imports/core/utils/getInitials";
import formatDate from "@/imports/core/utils/formatDate";

const TaskCard = ({ title, desc, status, priority, assignee, dueDate }) => {
  const progress = Math.floor(Math.random() * 100) + 1;
  const { user } = useAuthStore();
  const initials = getInitials(assignee || user?.name);

  return (
    <Card>
      <Title>{title}</Title>
      <Description>{desc}</Description>

      {status === "in_progress" && (
        <ProgressSection>
          <ProgressLabel justify="space-between">
            <span>Progress</span>
            <span>{progress}%</span>
          </ProgressLabel>

          <ProgressTrack>
            <ProgressBar $progress={progress} />
          </ProgressTrack>
        </ProgressSection>
      )}

      <Bottom>
        {status === "done" ? (
          <CompletedText>Completed</CompletedText>
        ) : (
          <Details align="center" justify="space-between">
            <Priority $priority={priority}>{priority.toUpperCase()}</Priority>
            <Right align="center" gap="8px">
              <DateText>
                <Clock>◷</Clock>
                {formatDate(dueDate)}
              </DateText>
              <Avatar justify="center" align="center">
                {initials}
              </Avatar>
            </Right>
          </Details>
        )}
      </Bottom>
    </Card>
  );
};

export default TaskCard;

const Card = styled.div`
  width: 100%;
  padding: 16px;
  background: #ffffff;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 11px;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.06);
  cursor: grab;
`;
const Title = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: rgb(30, 41, 59);
`;
const Description = styled.div`
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
  color: rgb(100, 116, 139);
`;
const ProgressSection = styled.div`
  margin-top: 10px;
`;
const ProgressLabel = styled(Flex)`
  margin-bottom: 5px;
  font-size: 10px;
  color: rgb(148, 163, 184);
`;
const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: 4px;
  background: rgb(226, 232, 240);
`;
const ProgressBar = styled.div`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: 4px;
  background: rgb(79, 70, 229);
`;
const Bottom = styled(Flex)`
  margin-top: 14px;
`;
const Priority = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;

  color: ${({ $priority }) => {
    if ($priority === "low") return "rgb(34, 197, 94)";
    if ($priority === "medium") return "rgb(234, 179, 8)";
    if ($priority === "high") return "rgb(244, 63, 94)";
  }};

  background: ${({ $priority }) => {
    if ($priority === "low") return "rgb(240, 253, 244)";
    if ($priority === "medium") return "rgb(254, 252, 232)";
    if ($priority === "high") return "rgb(255, 241, 242)";
  }};
`;
const Right = styled(Flex)`
  margin-left: auto;
`;
const DateText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  color: rgb(148, 163, 184);
`;
const Clock = styled.span`
  font-size: 13px;
`;
const Avatar = styled(Flex)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(99, 102, 241);
  color: white;
  font-size: 9px;
  font-weight: 600;
`;
const CompletedText = styled.span`
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  background: transparent;
  color: rgb(16, 185, 129);
`;
const Details = styled(Flex)`
  width: 100%;
`;
