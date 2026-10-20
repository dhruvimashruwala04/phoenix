import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Close } from "@/imports/core/assets/Icons";

const BulkStrip = ({
  selected,
  setSelected,
  setShowBulkStrip,
  bulkChangeRole,
  bulkDeactivate,
  bulkDelete,
}) => {
  if (selected.length === 0) return null;

  return (
    <Toolbar align="center" justify="space-between" gap="12px">
      <SelectedCount>{selected.length} selected</SelectedCount>

      <Actions align="center" gap="10px">
        <SecondaryButton onClick={bulkChangeRole} type="button">
          Set as Viewer
        </SecondaryButton>
        <SecondaryButton onClick={bulkDeactivate} type="button">
          Deactivate
        </SecondaryButton>
        <RemoveButton onClick={bulkDelete} type="button">
          Remove
        </RemoveButton>

        <CloseButton
          type="button"
          onClick={() => {
            setSelected([]);
            setShowBulkStrip(false);
          }}
        >
          <Close />
        </CloseButton>
      </Actions>
    </Toolbar>
  );
};

export default BulkStrip;

const Toolbar = styled(Flex)`
  width: 100%;
  min-height: 50px;
  padding: 9px 13px;
  box-sizing: border-box;
  border-radius: var(--radius-10);
  background: var(--slate-800);
  color: var(--white);
  margin: 14px 0 20px;
  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
const SelectedCount = styled.span`
  font-size: var(--fs-13);
  font-weight: var(--fw-650);
  white-space: nowrap;
`;
const Actions = styled(Flex)`
  flex-wrap: wrap;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
const SecondaryButton = styled.button`
  height: 31px;
  padding: 0 12px;
  border: none;
  border-radius: var(--radius-6);
  background: var(--slate-700);
  color: var(--slate-50);
  font-size: var(--fs-12);
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: var(--slate-600);
  }
`;
const RemoveButton = styled(SecondaryButton)`
  background: #f01846;
  color: var(--white);
  &:hover {
    background: #d9123c;
  }
`;
const CloseButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #a8b5c7;
  cursor: pointer;
  &:hover {
    color: var(--white);
  }
`;
