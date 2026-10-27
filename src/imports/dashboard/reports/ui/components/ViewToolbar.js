import DropdownInput from "@/imports/core/components/DropdownInput";
import { Flex } from "@/imports/core/components/Flex";
import { Download } from "@/imports/dashboard/ui/assets/Icons";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import React from "react";
import styled from "styled-components";

const ViewToolbar = ({
  projOptions,
  selectedProj,
  setSelectedProj,
  view,
  setView,
}) => {
  const views = ["7 days", "30 days", "90 days"];

  return (
    <Toolbar align="center" justify="space-between" gap="16px">
      <Wrapper>
        <ViewTabs align="center">
          {views.map((v, i) => (
            <Tab key={i} $active={v === view} onClick={() => setView(v)}>
              {v}
            </Tab>
          ))}
        </ViewTabs>

        <DropdownInput
          options={projOptions}
          value={selectedProj}
          onChange={(e) => setSelectedProj(e.target.value)}
        />
      </Wrapper>

      <ActionButton text="Export CSV" icon={<Download />} />
    </Toolbar>
  );
};

export default ViewToolbar;

const Toolbar = styled(Flex)`
  width: 100%;
`;
const Wrapper = styled(Flex)`
  display: flex;
  gap: 12px;
`;
const ViewTabs = styled(Flex)`
  height: 36px;
  padding: 3px;
  background: var(--slate-100);
  border-radius: var(--radius-9);
`;
const Tab = styled.button`
  display: flex;
  gap: 6px;
  align-items: center;
  height: 30px;
  padding: 0 25px;
  border: none;
  border-radius: var(--radius-7);
  background: ${({ $active }) => ($active ? "var(--white)" : "transparent")};
  color: ${({ $active }) =>
    $active ? "var(--indigo-700)" : "var(--text-muted)"};
  font-size: var(--fs-14);
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px var(--shadow-md)" : "none"};
`;
