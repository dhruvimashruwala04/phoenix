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
  background: var(--white);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-14);
`;
const Table = styled.div`
  width: 100%;
  background: var(--white);
  border-radius: var(--radius-12);
  box-shadow:
    var(--slate-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
`;
const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 2.2fr) 1fr 1fr 1fr 1.2fr 64px;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--slate-100);
  font-size: var(--fs-10);
  font-weight: var(--fw-700);
  letter-spacing: var(--ls-lg);
  color: var(--text-muted-2);
  text-transform: uppercase;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 2.2fr) 1fr 1fr 1fr 1.2fr 64px;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--slate-50);
  align-items: center;
  &:hover {
    background: var(--slate-50);
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--slate-100);
  }
`;
const Cell = styled.div`
  font-size: var(--fs-13);
  color: var(--slate-600);
`;
const TaskTitle = styled.div`
  font-size: var(--fs-14);
  font-weight: var(--fw-600);
  color: var(--slate-900);
  margin-bottom: 3px;
`;
const TaskDescription = styled.div`
  font-size: var(--fs-12);
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StatusWrapper = styled(Flex)`
  align-items: center;
  gap: 7px;
  white-space: nowrap;
`;
const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: ${({ $status }) => {
    if ($status === "in_progress") return "var(--blue-500)";
    if ($status === "review") return "var(--orange-500)";
    if ($status === "done") return "var(--emerald-500)";
    return "var(--text-muted-2)";
  }};
`;
const Priority = styled.span`
  font-size: var(--fs-11);
  font-weight: var(--fw-600);
  padding: 4px 8px;
  border-radius: var(--radius-4);
  ${({ $priority }) => {
    if ($priority === "high") {
      return `
        color: var(--rose-500);
        background: var(--rose-50);
      `;
    }
    if ($priority === "medium") {
      return `
        color: var(--amber-500);
        background: var(--amber-50);
      `;
    }
    if ($priority === "done") {
      return `
        color: var(--emerald-500);
      `;
    }
    return `
      color: var(--emerald-500);
      background: var(--emerald-50);
    `;
  }}
`;

const DueDate = styled.span`
  color: var(--text-muted);
  white-space: nowrap;
`;
const ProgressWrapper = styled(Flex)`
  width: 150px;
  align-items: center;
  gap: 8px;
`;
const ProgressTrack = styled.div`
  width: 130px;
  height: 4px;
  border-radius: var(--radius-4);
  background: var(--border-muted);
  overflow: hidden;
`;
const ProgressBar = styled.div`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: var(--blue-accent);
  border-radius: var(--radius-4);
`;
const ProgressValue = styled.span`
  font-size: var(--fs-10);
  color: var(--text-muted-2);
  min-width: 28px;
`;
const OwnerAvatar = styled(Flex)`
  width: 26px;
  height: 26px;
  border-radius: var(--radius-full);
  background: var(--blue-500);
  color: var(--white);
  font-size: var(--fs-9);
  font-weight: var(--fw-700);
`;
