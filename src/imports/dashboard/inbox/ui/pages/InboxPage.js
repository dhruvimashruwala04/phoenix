"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import ViewToolbar from "../components/ViewToolbar";
import InboxView from "../components/InboxView";
import useInboxStore from "../../store/inboxStore";
import CommonHeader from "@/imports/core/components/CommonHeader";

const InboxPage = () => {
  const { searchQuery, setSearchQuery } = useInboxStore();

  return (
    <Page direction="column">
      <CommonHeader
        title="Inbox"
        description="Mentions, requests and updates"
        placeholder="Search inbox..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
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
