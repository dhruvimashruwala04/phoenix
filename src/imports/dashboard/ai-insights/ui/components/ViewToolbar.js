import React from "react";
import { filters } from "../../api/constants";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";

const ViewToolbar = ({ activeFilter, setActiveFilter }) => {
  return (
    <Toolbar align="center">
      {filters.map((filter) => (
        <FilterButton
          key={filter.value}
          $active={activeFilter === filter.value}
          onClick={() => setActiveFilter(filter.value)}
        >
          {filter.label} · {filter.count}
        </FilterButton>
      ))}
    </Toolbar>
  );
};

export default ViewToolbar;

const Toolbar = styled(Flex)`
  gap: 9px;
  width: 100%;
`;
const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 35px;
  padding: 0 14px;
  border: 1px solid
    ${({ $active }) => ($active ? "#c7d2fe" : "var(--border-muted)")};
  border-radius: 22px;
  background: ${({ $active }) => ($active ? "#eef2ff" : "white")};
  color: ${({ $active }) => ($active ? "#5145e5" : "var(--slate-600)")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    border-color: #c7d2fe;
    background: #f5f6ff;
  }
`;
