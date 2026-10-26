"use client";
import React from "react";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import { Block, Chain } from "@/imports/dashboard/ui/assets/Icons";
import DropdownInput from "@/imports/core/components/DropdownInput";
import { RightArrow } from "@/imports/core/assets/Icons";

const AddModal = ({
  showModal,
  setShowModal,
  tasks,
  blockedTask,
  setBlockedTask,
  blockingTask,
  setBlockingTask,
  handleLink,
  blockedOnly,
  setBlockedOnly,
  dependencies,
}) => {
  const total = dependencies.length;
  const blockedCount = dependencies.filter(
    (item) => item.status === "Blocked",
  ).length;

  return (
    <Container direction="column" gap="20px">
      <ViewToolbar justify="space-between" align="center">
        <Left gap="10px" align="center">
          <Button
            onClick={() => setBlockedOnly(!blockedOnly)}
            $active={blockedOnly === true}
          >
            <Block />
            Blocked Only
          </Button>
          <Text>
            {total} links · {blockedCount} currently blocking
          </Text>
        </Left>
        <ActionButton
          text="Add dependency"
          variant="secondary"
          icon={<Chain />}
          onClick={() => setShowModal(!showModal)}
        />
      </ViewToolbar>
      {showModal && (
        <Modal gap="10px" align="center">
          <DropdownInput
            label="Blocking Task"
            options={tasks}
            value={blockingTask}
            onChange={(e) => setBlockingTask(e.target.value)}
          />
          <Icon>
            <RightArrow />
          </Icon>
          <DropdownInput
            label="Blocked Task"
            options={tasks}
            value={blockedTask}
            onChange={(e) => setBlockedTask(e.target.value)}
          />
          <BtnWrapper align="center">
            <ActionButton
              text="Link"
              icon=""
              variant="secondary"
              onClick={handleLink}
            />
          </BtnWrapper>
        </Modal>
      )}
    </Container>
  );
};

export default AddModal;

const Container = styled(Flex)`
  width: 100%;
`;
const ViewToolbar = styled(Flex)`
  width: 100%;
`;
const Left = styled(Flex)`
  width: 100%;
`;
const Icon = styled(Flex)`
  margin-top: 24px;
`;
const Button = styled.button`
  height: 34px;
  padding: 0px 14px;
  border-radius: var(--radius-8);
  border: 0px;
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
  color: ${({ $active }) => ($active ? "var(--rose-500)" : "var(--slate-700)")};
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  background: ${({ $active }) => ($active ? "var(--rose-50)" : "var(--white)")};
`;
const Text = styled.span`
  font-size: var(--fs-13);
  color: var(--text-muted);
`;
const Modal = styled(Flex)`
  width: 100%;
  padding: 16px;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-13);
  background: var(--white);
  color: rgb(156, 163, 175);
`;
const BtnWrapper = styled(Flex)`
  margin-top: 24px;
`;
