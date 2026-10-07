import { Flex } from "@/imports/core/components/Flex";
import SearchBox from "@/imports/dashboard/ui/components/SearchBox";
import styled from "styled-components";
import { Filter, Group, KanbanHeaderIcon } from "../assets/Icons";
import AiInsightsBox from "@/imports/dashboard/ui/components/AiInsightsBox";
import ActionButton from "@/imports/dashboard/ui/components/ActionButton";
import { useState } from "react";
import useKanbanStore from "../../store/kanbanStore";

const KanbanHeader = () => {
  const { aiPanel, setAiPanel, setShowTask } = useKanbanStore();

  const [openFilter, setOpenFilter] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);

  return (
    <Header wrap="wrap" align="center">
      <IconWrapper justify="center" align="center">
        <KanbanHeaderIcon />
      </IconWrapper>

      <TextWrapper direction="column">
        <Title>Project Phoenix</Title>
        <Content>Build AI-powered SaaS platform for analytics</Content>
      </TextWrapper>

      <SearchBox placeholder="Search tasks, people, tags..." />
      <AiInsightsBox text="AI Insights" onClick={() => setAiPanel(!aiPanel)} />

      <FilterWrapper>
        <FilterBox onClick={() => setOpenFilter(!openFilter)}>
          <Filter /> Filter
        </FilterBox>
        {openFilter && <FilterOptions>filter</FilterOptions>}
      </FilterWrapper>

      <GroupWrapper>
        <GroupBox onClick={() => setOpenGroup(!openGroup)}>
          <Group />
          Group: Status
        </GroupBox>
        {openGroup && <GroupOptions>group</GroupOptions>}
      </GroupWrapper>
      <ActionButton text="New Task" onClick={setShowTask} />
    </Header>
  );
};

export default KanbanHeader;
const Header = styled(Flex)`
  min-height: 64px;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(241, 245, 249);
  gap: 12px 16px;
  padding: 12px 24px;
  /* position: relative; */
  /* top: 0px; */
  z-index: 5;
  width: 100%;
`;
const IconWrapper = styled(Flex)`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgb(238, 242, 255);
  color: rgb(79, 70, 229);
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
  color: rgb(100, 116, 139);
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
  background: rgb(255, 255, 255);
  box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
  color: rgb(51, 65, 85);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const FilterOptions = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  width: fit-content;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgba(15, 23, 42, 0.14) 0px 12px 32px,
    rgb(241, 245, 249) 0px 0px 0px 1px inset;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background: rgb(255, 255, 255);
  box-shadow: rgb(226, 232, 240) 0px 0px 0px 1px inset;
  color: rgb(51, 65, 85);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const GroupOptions = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  width: fit-content;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow:
    rgba(15, 23, 42, 0.14) 0px 12px 32px,
    rgb(241, 245, 249) 0px 0px 0px 1px inset;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 20;
`;
