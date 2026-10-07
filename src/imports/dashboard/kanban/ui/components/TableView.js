"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import useAuthStore from "@/imports/auth/store/authStore";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import formatDate from "@/imports/core/utils/formatDate";
import getInitials from "@/imports/core/utils/getInitials";

const TableView = ({ tasks }) => {
  const user = useAuthStore((state) => state.user);
  const invites = useOnboardingStore((state) => state.invites);

  const getOwner = (assignee) => {
    if (!assignee) {
      return {
        name: user?.name || "You",
        initials: getInitials(user?.name) || "U",
      };
    }

    const invite = invites.find((invite) => invite.inviteeEmail === assignee);

    return {
      name: invite?.inviteeName || assignee,
      initials: invite?.initials || getInitials(assignee.split("@")[0]),
    };
  };

  const getStatusLabel = (status) => {
    if (status === "in_progress") return "In Progress";
    if (status === "review") return "Review";
    if (status === "done") return "Done";
    return "Backlog";
  };

  return (
    <TableWrapper>
      <Table>
        <HeaderRow>
          <span>Task</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Due</span>
          <span>Progress</span>
          <span>Owner</span>
        </HeaderRow>

        {tasks.map((task) => {
          const owner = getOwner(task.assignee);
          const progress = Math.floor(Math.random() * 100) + 1;

          return (
            <Row key={task.id}>
              <Cell>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskDescription>{task.desc}</TaskDescription>
              </Cell>

              <Cell>
                <StatusWrapper>
                  <StatusDot $status={task.status} />
                  {getStatusLabel(task.status)}
                </StatusWrapper>
              </Cell>

              <Cell>
                <Priority
                  $priority={task.status === "done" ? "done" : task.priority}
                >
                  {task.status === "done"
                    ? "Completed"
                    : task.priority.toUpperCase()}
                </Priority>
              </Cell>

              <Cell>
                <DueDate>{formatDate(task.dueDate)}</DueDate>
              </Cell>

              <Cell>
                <ProgressWrapper>
                  <ProgressTrack>
                    <ProgressBar $progress={progress} />
                  </ProgressTrack>

                  <ProgressValue>{progress}%</ProgressValue>
                </ProgressWrapper>
              </Cell>

              <Cell>
                <OwnerAvatar align="center" justify="center">
                  {owner.initials}
                </OwnerAvatar>
              </Cell>
            </Row>
          );
        })}
      </Table>
    </TableWrapper>
  );
};

export default TableView;
const TableWrapper = styled.div`
  width: 100%;
  background: white;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 14px;
`;
const Table = styled.div`
  width: 100%;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgb(241, 245, 249) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
`;
const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 2.2fr) 1fr 1fr 1fr 1.2fr 64px;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid rgb(241, 245, 249);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: rgb(148, 163, 184);
  text-transform: uppercase;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 2.2fr) 1fr 1fr 1fr 1.2fr 64px;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid rgb(248, 250, 252);
  align-items: center;
  &:hover {
    background: rgb(248, 250, 252);
  }
  &:not(:last-child) {
    border-bottom: 1px solid rgb(241, 245, 249);
  }
`;
const Cell = styled.div`
  font-size: 13px;
  color: rgb(71, 85, 105);
`;
const TaskTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: rgb(15, 23, 42);
  margin-bottom: 3px;
`;
const TaskDescription = styled.div`
  font-size: 12px;
  color: rgb(100, 116, 139);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
`;
const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $status }) => {
    if ($status === "in_progress") return "rgb(59, 130, 246)";
    if ($status === "review") return "rgb(249, 115, 22)";
    if ($status === "done") return "rgb(16, 185, 129)";
    return "rgb(148, 163, 184)";
  }};
`;
const Priority = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  ${({ $priority }) => {
    if ($priority === "high") {
      return `
        color: rgb(244, 63, 94);
        background: rgb(255, 241, 242);
      `;
    }
    if ($priority === "medium") {
      return `
        color: rgb(245, 158, 11);
        background: rgb(255, 251, 235);
      `;
    }
    if ($priority === "done") {
      return `
        color: rgb(16, 185, 129);
      `;
    }
    return `
      color: rgb(16, 185, 129);
      background: rgb(236, 253, 245);
    `;
  }}
`;

const DueDate = styled.span`
  color: rgb(100, 116, 139);
  white-space: nowrap;
`;
const ProgressWrapper = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ProgressTrack = styled.div`
  width: 130px;
  height: 4px;
  border-radius: 4px;
  background: rgb(226, 232, 240);
  overflow: hidden;
`;
const ProgressBar = styled.div`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: rgb(79, 70, 229);
  border-radius: 4px;
`;
const ProgressValue = styled.span`
  font-size: 10px;
  color: rgb(148, 163, 184);
  min-width: 28px;
`;
const OwnerAvatar = styled(Flex)`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgb(59, 130, 246);
  color: white;
  font-size: 9px;
  font-weight: 700;
`;
