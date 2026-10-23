import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";

const Stats = ({ overloadCount, teamUtilization, freeCapacity }) => {
  const summaryData = [
    {
      id: 1,
      type: "team",
      label: "Team utilization",
      value: `${teamUtilization}%`,
      description: "Target 75–85%",
    },
    {
      id: 2,
      type: "overload",
      label: "Overloaded members",
      value: overloadCount,
      description:
        overloadCount > 0 ? "Above 40h this week" : "Nobody above 40h",
    },
    {
      id: 3,
      type: "free",
      label: "Free capacity",
      value: `${freeCapacity}h`,
      description: "Available to assign",
    },
  ];
  return (
    <SummaryContainer>
      {summaryData.map((item) => (
        <SummaryCard key={item.id} direction="column" gap="4px">
          <Label>{item.label}</Label>

          <Value
            $type={item.type}
            $overloadCount={overloadCount}
            $teamUtilization={teamUtilization}
            $freeCapacity={freeCapacity}
          >
            {item.value}
          </Value>

          <Description>{item.description}</Description>
        </SummaryCard>
      ))}
    </SummaryContainer>
  );
};

export default Stats;

const SummaryContainer = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  width: 100%;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled(Flex)`
  min-width: 0;
  min-height: 98px;
  padding: 16px 20px;
  border: 1px solid #edf0f5;
  border-radius: 13px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgb(15 23 42 / 4%);
`;

const Label = styled.span`
  color: #8091ad;
  font-size: 12px;
  font-weight: 400;
`;

const Value = styled.span`
  ${({ $type, $overloadCount, $teamUtilization }) => {
    switch ($type) {
      case "team":
        return `color: ${
          $teamUtilization > 100 ? "var(--rose-500)" : "var(--slate-900)"
        };`;

      case "overload":
        return `color: ${
          $overloadCount > 0 ? "var(--rose-500)" : "var(--emerald-500)"
        };`;

      case "free":
        return "color: var(--indigo-700);";

      default:
        return "";
    }
  }}

  font-size: 22px;
  font-weight: 700;
`;

const Description = styled.span`
  color: #647b9b;
  font-size: 11px;
  line-height: 1.4;
`;
