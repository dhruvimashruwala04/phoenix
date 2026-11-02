"use client";
import { Play, Stop } from "@/imports/core/assets/Icons";
import DropdownInput from "@/imports/core/components/DropdownInput";
import { Flex } from "@/imports/core/components/Flex";
import Input from "@/imports/core/components/Input";
import { projects } from "@/imports/dashboard/kanban/api/constants";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import styled from "styled-components";
import useTimeTracking from "../../hooks/useTimeTracking";

const NewTrackingModal = ({
  title,
  setTitle,
  proj,
  setProj,
  isRunning,
  handleStart,
  handleStop,
  elapsed,
  formatTime,
}) => {
  return (
    <Modal gap="10px" align="center">
      <Input
        width="60%"
        name="title"
        type="text"
        placeholder="What are you working it?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <DropdownInput
        options={projects}
        value={proj}
        onChange={(e) => setProj(e.target.value)}
      />

      <Timer $running={isRunning}>{formatTime(elapsed)}</Timer>

      <ActionButton
        text={isRunning ? "Stop" : "Start"}
        icon={isRunning ? <Stop /> : <Play />}
        height="38px"
        variant={isRunning ? "tertiary" : "secondary"}
        onClick={isRunning ? handleStop : handleStart}
      />
    </Modal>
  );
};

export default NewTrackingModal;

const Modal = styled(Flex)`
  width: 100%;
  background: var(--white);
  border-radius: var(--radius-12);
  box-shadow:
    var(--gray-100) 0px 0px 0px 1px inset,
    var(--shadow-black) 0px 1px 2px;
  padding: 16px;
`;
const Timer = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $running }) =>
    $running ? "var(--violet-700)" : "var(--text-muted)"};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;
