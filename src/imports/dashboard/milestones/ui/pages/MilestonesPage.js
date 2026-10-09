"use client";
import styled from "styled-components";
import MilestonesHeader from "../components/MilestonesHeader";
import { Flex } from "@/imports/core/components/Flex";
import ViewToolbar from "../components/ViewToolbar";
import MilestonesView from "../components/MilestonesView";
import useMilestones from "../../store/milestonesStore";
import NewMilestones from "../components/NewMilestones";

const MilestonesPage = () => {
  const { showModal } = useMilestones();
  return (
    <Page direction="column">
      <MilestonesHeader />
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
