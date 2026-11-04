"use client";
import { Flex } from "@/imports/core/components/Flex";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import AiInsightsBox from "@/imports/dashboard/ui/components/AiInsightsBox";
import NotificationBox from "@/imports/dashboard/ui/components/NotificationBox";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import React, { useState } from "react";
import styled from "styled-components";
import { nav } from "../../api/constants";
import { useRouter } from "next/navigation";

const GanttHeader = ({ searchQuery, setSearchQuery }) => {
  const [view, setView] = useState("Gantt");
  const router = useRouter();

  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <Row gap="12px 16px" wrap="wrap" align="center">
        <Left>
          <SearchBox
            width="100%"
            placeholder="Search tasks, milestones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
          />
        </Left>
        <Right gap="12px" align="center">
          <AiInsightsBox text="AI Assistant" variant="secondary" />
          <NotificationBox />
          <ActionButton text="Add Task" variant="secondary" />
        </Right>
      </Row>
      <Row gap="10px" align="center">
        {nav.map((item, index) => (
          <Item
            key={index}
            $active={view === item.label}
            onClick={() => {
              router.push(item.href);
              setView(item.label);
            }}
          >
            {item.label}
          </Item>
        ))}
      </Row>
    </Header>
  );
};

export default GanttHeader;

const Header = styled(Flex)`
  background: var(--white);
  border-bottom: 1px solid var(--slate-100);
  padding: 12px 24px 0;
  position: sticky;
  top: 0px;
  z-index: var(--z-header);
  width: 100%;
`;
const Row = styled(Flex)`
  width: 100%;
`;
const Left = styled(Flex)`
  flex: 1;
`;
const Right = styled(Flex)`
  width: fit-content;
`;
const Item = styled.span`
  padding: 10px 20px;
  border: 0px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  color: ${({ $active }) => ($active ? "#7625e8" : "#475569")};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  box-shadow: ${({ $active }) =>
    $active ? "rgb(109, 40, 217) 0px -2px 0px inset" : "none"};
`;
