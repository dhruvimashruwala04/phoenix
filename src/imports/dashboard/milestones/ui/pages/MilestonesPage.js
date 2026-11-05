"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import ViewToolbar from "../components/ViewToolbar";
import MilestonesView from "../components/MilestonesView";
import useMilestonesStore from "../../store/milestonesStore";
import NewMilestones from "../components/NewMilestones";
import CommonHeader from "@/imports/core/components/CommonHeader";

const MilestonesPage = () => {
  const { showModal, searchQuery, setSearchQuery } = useMilestonesStore();

  return (
    <Page direction="column">
      <CommonHeader
        title="Milestones"
        description="Track major deliverables"
        placeholder="Search milestones..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content direction="column" gap="24px">
        <ViewToolbar />
        {showModal && <NewMilestones />}
        <MilestonesView />
      </Content>
    </Page>
  );
};

export default MilestonesPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const Content = styled(Flex)`
  flex: 1;
  padding: 24px;
  width: 100%;
  min-width: 0;
  min-height: 0;
`;
