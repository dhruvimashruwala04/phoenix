import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import useKanbanStore from "../../store/kanbanStore";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import useAuthStore from "@/imports/auth/store/authStore";
import { Close } from "@/imports/core/assets/Icons";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import CancelButton from "@/imports/core/components/CancelButton";
import { projects } from "../../api/constants";

const NewTaskModal = () => {
  const {
    title,
    setTitle,
    desc,
    setDesc,
    priority,
    setPriority,
    status,
    setStatus,
    dueDate,
    setDueDate,
    assignee,
    setAssignee,
    addTask,
    setShowTask,
    projName,
    setProjName,
  } = useKanbanStore();
  const { invites } = useOnboardingStore();
  const { user } = useAuthStore();

  return (
    <Overlay onClick={() => setShowTask(false)} align="center" justify="center">
      <Card onClick={(e) => e.stopPropagation()}>
        <Header align="center" justify="space-between">
          <Title>New Task</Title>
          <CloseButton onClick={() => setShowTask(false)}>
            <Close />
          </CloseButton>
        </Header>

        <TitleInput direction="column" gap="6px">
          Title
          <input
            name="title"
            type="text"
            placeholder="e.g. Onboarding email sequence"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </TitleInput>

        <DescInput direction="column" gap="6px">
          Description
          <textarea
            name="desc"
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </DescInput>

        <Details gap="12px">
          <DropdownInput direction="column" gap="6px">
            Priority
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </DropdownInput>
          <DropdownInput direction="column" gap="6px">
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="backlog">Backlog</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </DropdownInput>
          <DropdownInput direction="column" gap="6px">
            Due Date
            <input
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </DropdownInput>
        </Details>
        <Details gap="12px">
          <DropdownInput direction="column" gap="6px">
            Assignee
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value={user.name}>{user.name}</option>
              {invites?.map((i) => (
                <option key={i.inviteeName} value={i.inviteeName}>
                  {i.inviteeName}
                </option>
              ))}
            </select>
          </DropdownInput>
          <DropdownInput direction="column" gap="6px">
            Project
            <select
              value={projName}
              onChange={(e) => setProjName(e.target.value)}
            >
              {projects?.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </DropdownInput>
        </Details>

        <Footer justify="flex-end" gap="8px">
          <CancelButton onClick={() => setShowTask(false)}>Cancel</CancelButton>
          <PrimaryButton
            width="fit-content"
            onClick={() => {
              addTask();
              setShowTask(false);
            }}
          >
            Create Task
          </PrimaryButton>
        </Footer>
      </Card>
    </Overlay>
  );
};

export default NewTaskModal;

const Overlay = styled(Flex)`
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background: var(--overlay);
`;
const Card = styled.form`
  width: 440px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: var(--radius-14);
  box-shadow: var(--shadow-modal) 0px 20px 50px;
  padding: 24px;
  gap: 16px;
`;
const Header = styled(Flex)``;
const Title = styled.span`
  color: var(--slate-900);
  font-size: var(--fs-16);
  font-weight: var(--fw-600);
`;
const CloseButton = styled(Flex)`
  background: transparent;
  cursor: pointer;
`;
const TitleInput = styled(Flex)`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  > input {
    height: 38px;
    border-radius: var(--radius-8);
    border: 0px;
    box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
    padding: 0px 12px;
    font-size: var(--fs-14);
    outline: 0px;
    width: 100%;
  }
`;
const DescInput = styled(Flex)`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  > textarea {
    border-radius: var(--radius-8);
    border: 0px;
    box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
    padding: 10px 12px;
    font-size: var(--fs-13);
    outline: 0px;
    width: 100%;
    resize: vertical;
  }
`;
const Details = styled(Flex)``;
const DropdownInput = styled(Flex)`
  flex: 1 1 0%;
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  > select,
  > input {
    width: 100%;
    height: 38px;
    border-radius: var(--radius-8);
    border: 1px solid var(--border-muted);
    padding: 0px 8px;
    font-size: var(--fs-13);
    color: var(--slate-600);
  }
`;
const Footer = styled(Flex)`
  margin-top: 4px;
`;
