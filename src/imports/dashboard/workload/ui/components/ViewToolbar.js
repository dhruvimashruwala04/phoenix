import { Flex } from "@/imports/core/components/Flex";
import formatDate from "@/imports/core/utils/formatDate";
import AiInsightsBox from "@/imports/dashboard/ui/components/AiInsightsBox";
import React from "react";
import styled from "styled-components";

const ViewToolbar = ({ view, setView }) => {
  const views = [
    {
      label: `This week - ${formatDate(new Date())}`,
      value: "thisWeek",
    },
    {
      label: `Next week - ${formatDate(new Date().setDate(new Date().getDate() + 7))}`,
      value: "nextWeek",
    },
  ];

  const load = [
    { label: "Under 6h", value: "under6", bg: "var(--emerald-200)" },
    { label: "6-8h", value: "6to8", bg: "var(--amber-200)" },
    { label: "Over 8h", value: "over8", bg: "var(--rose-200)" },
  ];

  return (
    <Toolbar align="center" justify="space-between" gap="16px">
      <Left align="center" gap="12px">
        <ViewTabs align="center">
          {views.map((v, i) => (
            <Tab
              key={i}
              $active={v.value === view}
              onClick={() => setView(v.value)}
            >
              {v.label}
            </Tab>
          ))}
        </ViewTabs>
        <LoadDetails gap="14px">
          {load.map((l, i) => (
            <LoadDetail key={i} align="center" gap="5px">
              <Indicator $bg={l.bg} />
              {l.label}
            </LoadDetail>
          ))}
        </LoadDetails>
      </Left>
      <AiInsightsBox text="AI Rebalance" />
    </Toolbar>
  );
};

export default ViewToolbar;

const Toolbar = styled(Flex)`
  width: 100%;
`;
const Left = styled(Flex)``;
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
const LoadDetails = styled(Flex)`
  font-size: var(--fs-12);
  color: var(--text-muted);
`;
const LoadDetail = styled(Flex)``;
const Indicator = styled.span`
  width: 10px;
  height: 10px;
  border-radius: var(--radius-3);
  background-color: ${({ $bg }) => $bg};
`;
