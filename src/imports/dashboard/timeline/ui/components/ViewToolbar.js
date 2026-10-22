"use client";
import { Flex } from "@/imports/core/components/Flex";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import { categories } from "@/imports/dashboard/calendar/api/constants";

const ViewToolbar = ({ showAdd, setShowAdd, filter, setFilter }) => {
  const filters = [
    { label: "All", color: "rgb(148, 163, 184)", bg: "white" },
    ...categories,
  ];
  return (
    <Toolbar align="center" justify="space-between" gap="16px">
      <Filters>
        {filters.map((category) => (
          <Filter
            key={category.label}
            type="button"
            $active={filter === category.label}
            $bg={category.bg}
            $color={category.color}
            onClick={() => setFilter(category.label)}
          >
            <Dot $color={category.color} />
            {category.label}
          </Filter>
        ))}
      </Filters>

      <ActionButton text="Add Item" onClick={() => setShowAdd(!showAdd)} />
    </Toolbar>
  );
};

export default ViewToolbar;

const Toolbar = styled(Flex)`
  margin-bottom: 20px;
  width: 100%;
`;
const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;
const Filter = styled.button`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0px 14px;
  border: 1px solid var(--border-input);
  border-radius: var(--radius-20);
  background-color: ${({ $active }) =>
    $active ? " rgb(239, 246, 255)" : "white"};
  color: var(--text-heading);
  font-size: var(--fs-13);
  font-weight: var(--fw-500);
  cursor: pointer;
`;
const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
