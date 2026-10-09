import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import useMilestones from "../../store/useMilestones";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";

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
        <Input direction="column" gap="6px">
          Title
          <input
            name="title"
            type="text"
            placeholder="e.g. Beta release"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Input>
        <Input direction="column" gap="6px">
          Phase
          <input
            name="phase"
            type="text"
            placeholder="e.g. Development"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          />
        </Input>
        <Input direction="column" gap="6px">
          Total Tasks
          <input
            name="totalTasks"
            type="number"
            placeholder="e.g. 10"
            value={totalTasks}
            onChange={(e) => setTotalTasks(e.target.value)}
          />
        </Input>
        <DropdownInput direction="column" gap="6px">
          Due Date
          <input
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
  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgb(243, 244, 246) 0px 0px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 1px 2px;
  padding: 16px;
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const Input = styled(Flex)`
  font-size: 12px;
  font-weight: 600;
  color: rgb(71, 85, 105);
  > input {
    height: 38px;
    border-radius: 8px;
    border: 0px;
    box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
    padding: 0px 12px;
    font-size: 14px;
    outline: 0px;
    width: 100%;
  }
`;
const DropdownInput = styled(Flex)`
  flex: 1 1 0%;
  font-size: 12px;
  font-weight: 600;
  color: rgb(71, 85, 105);
  > select,
  > input {
    width: 100%;
    height: 38px;
    border-radius: 8px;
    border: 1px solid rgb(226, 232, 240);
    padding: 0px 8px;
    font-size: 13px;
    color: rgb(71, 85, 105);
  }
`;
