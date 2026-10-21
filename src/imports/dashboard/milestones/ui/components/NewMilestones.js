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
        <Input
          label="Title"
          name="title"
          type="text"
          placeholder="e.g. Beta release"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Phase"
          name="phase"
          type="text"
          placeholder="e.g. Development"
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
        />
        <Input
          label="Total Tasks"
          name="totalTasks"
          type="number"
          placeholder="e.g. 10"
          value={totalTasks}
          onChange={(e) => setTotalTasks(e.target.value)}
        />
        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
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
