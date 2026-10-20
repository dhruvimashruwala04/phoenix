import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import useMilestones from "../../store/milestonesStore";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import Input from "@/imports/core/components/Input";

const NewMilestones = () => {
  const {
    title,
    phase,
    totalTasks,
    dueDate,
    setTitle,
    setPhase,
    setTotalTasks,
    setDueDate,
    addMilestone,
    setShowModal,
  } = useMilestones();

  return (
    <Modal direction="column" gap="10px" align="flex-end">
      <Row>
        <InputWrapper direction="column" gap="6px">
          Title
          <Input
            name="title"
            type="text"
            placeholder="e.g. Beta release"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper direction="column" gap="6px">
          Phase
          <Input
            name="phase"
            type="text"
            placeholder="e.g. Development"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper direction="column" gap="6px">
          Total Tasks
          <Input
            name="totalTasks"
            type="number"
            placeholder="e.g. 10"
            value={totalTasks}
            onChange={(e) => setTotalTasks(e.target.value)}
          />
        </InputWrapper>
        <DropdownInput direction="column" gap="6px">
          Due Date
          <Input
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </DropdownInput>
      </Row>
      <ActionButton
        text="Create"
        variant="secondary"
        icon=""
        onClick={() => {
          addMilestone();
          setShowModal(false);
        }}
      />
    </Modal>
  );
};

export default NewMilestones;

const Modal = styled(Flex)`
  width: 100%;
  background: var(--white);
  border-radius: var(--radius-12);
  box-shadow:
    var(--gray-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
  padding: 16px;
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const InputWrapper = styled(Flex)`
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
`;
const DropdownInput = styled(Flex)`
  flex: 1 1 0%;
  font-size: var(--fs-12);
  font-weight: var(--fw-600);
  color: var(--slate-600);
  > select {
    width: 100%;
    height: 38px;
    border-radius: var(--radius-8);
    border: 1px solid var(--border-muted);
    padding: 0px 8px;
    font-size: var(--fs-13);
    color: var(--slate-600);
  }
`;
