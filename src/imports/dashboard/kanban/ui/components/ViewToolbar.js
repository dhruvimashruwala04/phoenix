"use client";

import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Fullscreen, More, Sort } from "../assets/Icons";
import { ChevronDown } from "@/imports/core/assets/Icons";
import useKanbanStore from "../../store/kanbanStore";

const ViewToolbar = () => {
  const views = [
    { label: "Board", value: "board" },
    { label: "Table", value: "table" },
    { label: "All Tasks", value: "all_tasks" },
  ];
  const { view, setView, sortBy, setSortBy } = useKanbanStore();

  return (
    <Toolbar align="center" justify="space-between" gap="16px">
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

      <Actions align="center" gap="8px">
        <SortButton
          gap="6px"
          align="center"
          justify="space-between"
          onClick={() => {
            if (sortBy === "title") {
              setSortBy("priority");
            } else if (sortBy === "priority") {
              setSortBy("dueDate");
            } else {
              setSortBy("title");
            }
          }}
        >
          <span>
            Sort by:{" "}
            <strong>
              {sortBy === "title"
                ? "Title"
                : sortBy === "priority"
                  ? "Priority"
                  : "Due date"}
            </strong>
          </span>
          <ChevronDown />
        </SortButton>

        <IconButton>
          <Sort />
        </IconButton>

        <IconButton>
          <Fullscreen />
        </IconButton>

        <IconButton>
          <More />
        </IconButton>
      </Actions>
    </Toolbar>
  );
};

export default ViewToolbar;

const Toolbar = styled(Flex)`
  width: 100%;
`;
const ViewTabs = styled(Flex)`
  height: 36px;
  padding: 3px;
  background: var(--slate-100);
  border-radius: var(--radius-9);
`;
const Tab = styled.button`
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
const Actions = styled(Flex)`
  margin-left: auto;
`;
const SortButton = styled(Flex)`
  width: fit-content;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-8);
  background: var(--white);
  color: var(--text-muted);
  font-size: var(--fs-12);
  cursor: pointer;
  strong {
    color: var(--slate-800);
    font-weight: var(--fw-600);
  }
`;
const IconButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-7);
  background: var(--white);
  color: var(--slate-600);
  cursor: pointer;
  &:hover {
    background: var(--slate-50);
  }
`;
