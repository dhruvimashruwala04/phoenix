import styled from "styled-components";
import DocsHeader from "../components/DocsHeader";
import { Flex } from "@/imports/core/components/Flex";
import DocsView from "../components/DocsView";

const DocsPage = () => {
  return (
    <Page direction="column">
      <DocsHeader />
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
