"use client";

import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { Down, Fullscreen, More, Sort } from "../assets/Icons";
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
          <Down />
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
  background: rgb(241, 245, 249);
  border-radius: 9px;
`;
const Tab = styled.button`
  height: 30px;
  padding: 0 25px;
  border: none;
  border-radius: 7px;
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) =>
    $active ? "rgb(67, 56, 202)" : "rgb(100, 116, 139)"};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none"};
`;
const Actions = styled(Flex)`
  margin-left: auto;
`;
const SortButton = styled(Flex)`
  width: 115px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 8px;
  background: #ffffff;
  color: rgb(100, 116, 139);
  font-size: 12px;
  cursor: pointer;
  strong {
    color: rgb(30, 41, 59);
    font-weight: 600;
  }
`;
const IconButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(226, 232, 240);
  border-radius: 7px;
  background: #ffffff;
  color: rgb(71, 85, 105);
  cursor: pointer;
  &:hover {
    background: rgb(248, 250, 252);
  }
`;
