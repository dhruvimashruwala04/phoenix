import DropdownInput from "@/imports/core/components/DropdownInput";
import { Flex } from "@/imports/core/components/Flex";
import Input from "@/imports/core/components/Input";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import React from "react";
import styled from "styled-components";
import { categories } from "@/imports/dashboard/calendar/api/constants";
import { projects } from "@/imports/dashboard/kanban/api/constants";
import useCalendarStore from "@/imports/dashboard/calendar/store/calendarStore";

const NewTimelineModal = ({ setShowAdd }) => {
  const {
    category,
    setCategory,
    title,
    setTitle,
    date,
    setDate,
    projName,
    setProjName,
    saveEvent,
  } = useCalendarStore();

  return (
    <Modal direction="column" gap="10px" align="flex-end">
      <Row>
        <Input
          label="Title"
          name="title"
          type="text"
          placeholder="e.g. Public beta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <DropdownInput
          label="Track"
          options={categories.map((c) => ({
            value: c.label,
            label: c.label,
          }))}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <DropdownInput
          label="Project"
          options={projects.map((p) => ({
            label: p.label,
            value: p.value,
          }))}
          value={projName}
          onChange={(e) => setProjName(e.target.value)}
        />
      </Row>
      <ActionButton
        text="Save"
        icon=""
        onClick={() => {
          saveEvent();
          setShowAdd(false);
        }}
      />
    </Modal>
  );
};

export default NewTimelineModal;

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
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 10px;
`;
