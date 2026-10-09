import styled from "styled-components";
import InboxHeader from "../components/InboxHeader";
import { Flex } from "@/imports/core/components/Flex";
import ViewToolbar from "../components/ViewToolbar";
import InboxView from "../components/InboxView";

const InboxPage = () => {
  return (
    <Page direction="column">
      <InboxHeader />
      <Content direction="column" gap="24px">
        <ViewToolbar />
        <InboxView />
      </Content>
    </Page>
  );
};

export default InboxPage;

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
