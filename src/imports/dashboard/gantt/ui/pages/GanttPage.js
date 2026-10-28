import React from "react";
import GanttHeader from "../components/GanttHeader";
import styled from "styled-components";
import { Flex } from "@/imports/core/components/Flex";
import Stats from "../components/Stats";
import Cards from "../components/Cards";
import GanttView from "../components/GanttView";

const GanttPage = () => {
  return (
    <Page direction="column">
      <GanttHeader />
      <Content gap="24px" direction="column">
        <Stats />
        <GanttView />
        <Cards />
      </Content>
    </Page>
  );
};

export default GanttPage;

const Page = styled(Flex)`
  width: 100%;
  height: 100vh;
  overflow: auto;
`;
const Content = styled(Flex)`
  width: 100%;
  padding: 24px;
`;
