"use client";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import DocsView from "../components/DocsView";
import CommonHeader from "@/imports/core/components/CommonHeader";
import useDocsStore from "../../store/docsStore";

const DocsPage = () => {
  const { searchQuery, setSearchQuery } = useDocsStore();

  return (
    <Page direction="column">
      <CommonHeader
        title="Docs"
        description="Specs, notes and meeting minutes"
        placeholder="Search documents..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Content>
        <DocsView />
      </Content>
    </Page>
  );
};

export default DocsPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

const Content = styled(Flex)`
  flex: 1 1 0%;
  padding: 24px;
  width: 100%;
`;
