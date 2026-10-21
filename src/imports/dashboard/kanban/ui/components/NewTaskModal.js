import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import useKanbanStore from "../../store/kanbanStore";
import useOnboardingStore from "@/imports/onboarding/store/onboardingStore";
import useAuthStore from "@/imports/auth/store/authStore";
import { Close } from "@/imports/core/assets/Icons";
import PrimaryButton from "@/imports/core/components/PrimaryButton";
import CancelButton from "@/imports/core/components/CancelButton";
import { priorityOptions, projects, statusOptions } from "../../api/constants";
import Input from "@/imports/core/components/Input";
import DropdownInput from "@/imports/core/components/DropdownInput";

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
        <Input
          label="Title"
          name="title"
          type="text"
          placeholder="e.g. Onboarding email sequence"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Description"
          name="desc"
          variant="textarea"
          rows="4"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Details>
          <DropdownInput
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={priorityOptions}
          />
          <DropdownInput
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={statusOptions}
          />
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Details>
        <Details>
          <DropdownInput
            label="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            options={[
              { value: user.name, label: user.name },
              ...invites?.map((i) => ({
                value: i.inviteeName,
                label: i.inviteeName,
              })),
            ]}
          />
          <DropdownInput
            label="Project"
            value={projName}
            onChange={(e) => setProjName(e.target.value)}
            options={projects?.map((p) => ({
              value: p.value,
              label: p.label,
            }))}
          />
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
const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 16px;
`;
const Footer = styled(Flex)`
  margin-top: 4px;
`;
