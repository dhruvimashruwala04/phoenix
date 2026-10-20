import { Flex } from "@/imports/core/components/Flex";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import styled from "styled-components";
import { Filter, Flag, Group, KanbanHeaderIcon, User } from "../assets/Icons";
import AiInsightsBox from "@/imports/dashboard/ui/components/AiInsightsBox";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import { useState } from "react";
import useKanbanStore from "../../store/kanbanStore";
import { Kanban } from "@/imports/dashboard/ui/assets/Icons";

const KanbanHeader = () => {
  const {
    aiPanel,
    setAiPanel,
    setShowTask,
    groupBy,
    setGroupBy,
    filterBy,
    setFilterBy,
    searchQuery,
    setSearchQuery,
  } = useKanbanStore();

  const [openFilter, setOpenFilter] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);

  const groupOptions = [
    {
      label: "Status",
      value: "status",
      icon: Kanban,
    },
    {
      label: "Priority",
      value: "priority",
      icon: Flag,
    },
    {
      label: "Assignee",
      value: "assignee",
      icon: User,
    },
  ];

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];
  return (
    <Header gap="12px 16px" wrap="wrap" align="center">
      <IconWrapper justify="center" align="center">
        <KanbanHeaderIcon />
      </IconWrapper>

      <TextWrapper direction="column">
        <Title>Project Phoenix</Title>
        <Content>Build AI-powered SaaS platform for analytics</Content>
      </TextWrapper>

      <SearchBox
        placeholder="Search tasks, people, tags..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <AiInsightsBox text="AI Insights" onClick={() => setAiPanel(!aiPanel)} />

      <FilterWrapper>
        <FilterBox onClick={() => setOpenFilter(!openFilter)}>
          <Filter />
          Filter
        </FilterBox>
        {openFilter && (
          <FilterOptions direction="column" align="stretch" gap="10px">
            {filterOptions.map((option) => (
              <FilterOption
                key={option.value}
                $active={filterBy === option.value}
                onClick={() => {
                  setFilterBy(option.value);
                  setOpenFilter(false);
                }}
              >
                {option.label}
              </FilterOption>
            ))}
          </FilterOptions>
        )}
      </FilterWrapper>

      <GroupWrapper>
        <GroupBox onClick={() => setOpenGroup(!openGroup)}>
          <Group />
          Group:{" "}
          {groupBy === "status"
            ? "Status"
            : groupBy === "priority"
              ? "Priority"
              : "Assignee"}
        </GroupBox>
        {openGroup && (
          <GroupOptions direction="column" gap="2px">
            {groupOptions.map((option) => {
              const active = groupBy === option.value;
              const Icon = option.icon;

              return (
                <GroupOption
                  align="center"
                  gap="10px"
                  key={option.value}
                  $active={active}
                  onClick={() => {
                    setGroupBy(option.value);
                    setOpenGroup(false);
                  }}
                >
                  <Icon />
                  <OptionText $active={active}>{option.label}</OptionText>

                  {active && <Check />}
                </GroupOption>
              );
            })}
          </GroupOptions>
        )}
      </GroupWrapper>
      <ActionButton text="New Task" onClick={setShowTask} />
    </Header>
  );
};

export default KanbanHeader;
const Header = styled(Flex)`
  min-height: 64px;
  background: var(--white);
  border-bottom: 1px solid var(--slate-100);
  padding: 12px 24px;
  z-index: 5;
  width: 100%;
`;
const IconWrapper = styled(Flex)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--indigo-50);
  color: var(--blue-accent);
  flex-shrink: 0;
`;
const TextWrapper = styled(Flex)`
  min-width: 160px;
  flex: 1 1 160px;
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;
const Content = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  line-height: 16px;
  text-align: left;
`;
const FilterWrapper = styled.div`
  position: relative;
`;
const FilterBox = styled.button`
  flex-shrink: 0;
  white-space: nowrap;
  height: 36px;
  padding: 0px 14px;
  border-radius: 8px;
  border: 0px;
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  color: var(--slate-700);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const FilterOptions = styled(Flex)`
  position: absolute;
  top: 36px;
  left: 0;
  width: fit-content;
  background: var(--white);
  border-radius: 12px;
  box-shadow:
    rgba(15, 23, 42, 0.14) 0px 12px 32px,
    var(--slate-100) 0px 0px 0px 1px inset;
  padding: 14px;
  z-index: 20;
`;
const GroupWrapper = styled.div`
  position: relative;
`;
const GroupBox = styled.button`
  flex-shrink: 0;
  white-space: nowrap;
  height: 36px;
  padding: 0px 14px;
  border-radius: 8px;
  border: 0px;
  background: var(--white);
  box-shadow: var(--border-muted) 0px 0px 0px 1px inset;
  color: var(--slate-700);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const GroupOptions = styled(Flex)`
  position: absolute;
  top: 42px;
  left: 0;
  width: 200px;
  background: var(--white);
  border-radius: 12px;
  box-shadow:
    rgba(15, 23, 42, 0.14) 0px 12px 32px,
    var(--slate-100) 0px 0px 0px 1px inset;
  padding: 5px;
  z-index: 20;
`;
const GroupOption = styled(Flex)`
  width: 100%;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "var(--indigo-50)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--slate-700)")};
  &:hover {
    background: var(--slate-50);
  }
`;
const OptionText = styled.span`
  font-size: 13px;
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--slate-700)")};
`;
const Check = styled.span`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FilterOption = styled.button`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: none;
  border-radius: 7px;
  background: ${({ $active }) =>
    $active ? "var(--indigo-50)" : "transparent"};
  color: ${({ $active }) => ($active ? "var(--blue-accent)" : "var(--slate-700)")};
  text-align: left;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background: var(--slate-50);
  }
`;
