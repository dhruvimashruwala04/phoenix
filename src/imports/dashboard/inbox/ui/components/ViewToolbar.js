"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import { ReadMark } from "../assets/Icons";
import useInboxStore from "../../store/inboxStore";

const ViewToolbar = () => {
  const { selectedView, setSelectedView, messages, handleAllRead } =
    useInboxStore();

  const all = messages.filter((message) => !message.archive).length;
  const unread = messages.filter((message) => !message.read).length;
  const mentions = messages.filter(
    (message) => message.type === "Mention",
  ).length;
  const archive = messages.filter((message) => message.archive).length;

  const views = [
    { label: "All", value: "all", number: all },
    { label: "Unread", value: "unread", number: unread },
    { label: "Mentions", value: "mentions", number: mentions },
    { label: "Archived", value: "archived", number: archive },
  ];

  return (
    <Toolbar align="center" justify="space-between" gap="16px">
      <ViewTabs align="center">
        {views.map((v, i) => (
          <Tab
            key={i}
            $active={v.value === selectedView}
            onClick={() => setSelectedView(v.value)}
          >
            {v.label}
            <span>{v.number}</span>
          </Tab>
        ))}
      </ViewTabs>

      <ReadButton onClick={handleAllRead}>
        <ReadMark />
        Mark all as read
      </ReadButton>
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
  > span {
    font-size: var(--fs-10);
    color: var(--text-muted-2);
  }
`;
const ReadButton = styled.button`
  height: 34px;
  padding: 0px 14px;
  border-radius: var(--radius-8);
  border: 0px;
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  font-size: var(--fs-13);
  color: var(--slate-700);
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
`;
