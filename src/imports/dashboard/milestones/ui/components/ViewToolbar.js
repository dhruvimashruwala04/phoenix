"use client";
import { Flex } from "@/imports/core/components/Flex";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import styled from "styled-components";
import useMilestones from "../../store/useMilestones";

const ViewToolbar = () => {
  const { selectedView, setSelectedView, setShowModal, showModal, milestones } =
    useMilestones();

  const all = milestones.length;
  const upcoming = milestones.filter((m) => m.status === "Upcoming").length;
  const due = milestones.filter((m) => m.status === "Due soon").length;
  const completed = milestones.filter((m) => m.status === "Completed").length;

  const views = [
    { label: "All", value: "all", number: all },
    { label: "Upcoming", value: "upcoming", number: upcoming },
    { label: "Due soon", value: "due", number: due },
    { label: "Completed", value: "completed", number: completed },
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

      <ActionButton
        text="New Milestone"
        variant="secondary"
        onClick={() => setShowModal(!showModal)}
      />
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
  display: flex;
  gap: 6px;
  align-items: center;
  height: 30px;
  padding: 0 25px;
  border: none;
  border-radius: 7px;
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) =>
    $active ? "rgb(109, 40, 217)" : "rgb(100, 116, 139)"};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none"};
  > span {
    font-size: 10px;
    color: rgb(148, 163, 184);
  }
`;

const ReadButton = styled.button`
  height: 34px;
  padding: 0px 14px;
  border-radius: 8px;
  border: 0px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
  font-size: 13px;
  color: rgb(51, 65, 85);
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
`;
