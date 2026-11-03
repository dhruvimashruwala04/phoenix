"use client";
import { Flex } from "@/imports/core/components/Flex";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import styled from "styled-components";
import useMilestonesStore from "../../store/milestonesStore";

const ViewToolbar = () => {
  const { selectedView, setSelectedView, setShowModal, showModal, milestones } =
    useMilestonesStore();

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
    $active ? "var(--violet-700)" : "var(--text-muted)"};
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
